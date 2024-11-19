import { NextResponse, type NextRequest } from "next/server";

import {
  UserProps,
	cancelTradeByBuyer,
} from '@lib/api/order';

// Download the helper library from https://www.twilio.com/docs/node/install
import twilio from "twilio";


export async function POST(request: NextRequest) {

  const body = await request.json();

  const { orderId, walletAddress: walletAddress } = body;

  //console.log("orderId", orderId);
  //console.log("walletAddress", walletAddress);
  

  const result = await cancelTradeByBuyer({
    orderId: orderId,
    walletAddress: walletAddress,
  });

  ////console.log("result", result);


  if (result) {


    const tradeId = result.updated?.tradeId;
    const to = result.updated?.mobile || "";
    const buyer = result.updated?.buyer;




    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const client = twilio(accountSid, authToken);



    let message = null;

    try {

      const msgBody = `[PPUMP] TID[${tradeId}] Your sell order has been cancelled by ${buyer?.nickname}!`;

      message = await client.messages.create({
        ///body: "This is the ship that made the Kessel Run in fourteen parsecs?",
        body: msgBody,
        from: "+17622254217",
        to: to,
      });

      console.log(message.sid);

    } catch (e) {
      console.error('Error sending SMS', e);
    }




    return NextResponse.json({

      result: true,
      
    });  
  } else {
 
    return NextResponse.json({

      result: false,
      
    });

  }
  
}

import { NextResponse, type NextRequest } from "next/server";

import {
  UserProps,
	buyOrderRequestPayment,
} from '@lib/api/order';

// Download the helper library from https://www.twilio.com/docs/node/install
import twilio from "twilio";



export async function POST(request: NextRequest) {

  const body = await request.json();
  /*
            orderId: orderId,
          tradeId: tradeId,
          amount: amount
  */

  const { lang, chain, orderId, transactionHash } = body;

  console.log("orderId", orderId);
  

  const result = await buyOrderRequestPayment({
    orderId: orderId,
    transactionHash: transactionHash,
  });


  //console.log("result", JSON.stringify(result));

  const {
    //mobile: mobile,
    seller: seller,
    buyer: buyer,
    tradeId: tradeId,
    krwAmount: krwAmount,
  } = result as UserProps;


  const bankName = seller?.bankInfo?.bankName;
  const accountNumber = seller?.bankInfo?.accountNumber;
  const accountHolder = seller?.bankInfo?.accountHolder;
  const depositName = tradeId;
  const amount = krwAmount;


    // send sms


    console.log("byuer.mobile", buyer?.mobile);



    if (!buyer?.mobile) {
      return NextResponse.json({
        result,
      });
    }

    // check buyer.mobile is prefixed with +
    if (!buyer?.mobile.startsWith("+")) {
      return NextResponse.json({
        result,
      });
    }

    const to = buyer?.mobile;


    if (!to) {


      const accountSid = process.env.TWILIO_ACCOUNT_SID;
      const authToken = process.env.TWILIO_AUTH_TOKEN;
      const client = twilio(accountSid, authToken);



      let message = null;

      try {

        const msgBody = `[AGENT] TID[${tradeId}] ${bankName} ${accountNumber} ${accountHolder} 입금자명:[${depositName}] ${amount}원`;

        message = await client.messages.create({
          ///body: "This is the ship that made the Kessel Run in fourteen parsecs?",
          body: msgBody,
          from: "+17622254217",
          to: to,
        });

        console.log(message.sid);

      } catch (e) {
          
        console.log("error", e);

      }


    }





 
  return NextResponse.json({

    result,
    
  });
  
}

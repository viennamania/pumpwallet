import { NextResponse, type NextRequest } from "next/server";

import {
	insertOne,
} from '@lib/api/otp';


// Download the helper library from https://www.twilio.com/docs/node/install
import twilio from "twilio";


export async function POST(request: NextRequest) {

  const body = await request.json();

  const { lang, chain, walletAddress, mobile } = body;

  console.log("lang", lang);
  console.log("chain", chain);
  console.log("walletAddress", walletAddress);
  console.log("mobile", mobile);


  const result = await insertOne({
    walletAddress: walletAddress,
  });

  //console.log("result", result);



  
  if (result) {

      const otpCode = result.otp;

      // send sms to user mobile number


      // send sms

      const to = mobile;
   


      const accountSid = process.env.TWILIO_ACCOUNT_SID;
      const authToken = process.env.TWILIO_AUTH_TOKEN;
      const client = twilio(accountSid, authToken);



      let message = null;


      try {

        let body = '';

        if (lang === 'en') {
          body = `[PUMP] Your OTP code is ${otpCode}`;
        } else if (lang === 'kr') {
          body = `[PUMP] 당신의 OTP 코드는 ${otpCode} 입니다`;
        } else {
          body = `[PUMP] Your OTP code is ${otpCode}`;
        }

        message = await client.messages.create({
          ///body: "This is the ship that made the Kessel Run in fourteen parsecs?",
          body: body,
          from: "+17622254217",
          to: to,
        });

        console.log(message.sid);

      } catch (e) {
        console.error('Error sending SMS', e);
      }

  }


 
  return NextResponse.json({

    result,
    
  });
  
}

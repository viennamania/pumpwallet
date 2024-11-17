import { NextResponse, type NextRequest } from "next/server";

import {
  UserProps,
	acceptBuyOrder,
} from '@lib/api/order';

// Download the helper library from https://www.twilio.com/docs/node/install
import twilio from "twilio";
import { idCounter } from "thirdweb/extensions/farcaster/idRegistry";


export async function POST(request: NextRequest) {

  const body = await request.json();

  const { lang, chain, orderId, sellerWalletAddress, sellerNickname, sellerAvatar, sellerMobile, sellerMemo, seller } = body;

  console.log("orderId", orderId);
  

  const result = await acceptBuyOrder({
    lang: lang,
    chain: chain,
    orderId: orderId,
    sellerWalletAddress: sellerWalletAddress,
    sellerNickname: sellerNickname,
    sellerAvatar: sellerAvatar,
    sellerMobile: sellerMobile,
    sellerMemo: sellerMemo,
    seller: seller,

  });

  ///console.log("result", result);



  const {
    mobile: mobile,
    buyer: buyer,
    tradeId: tradeId,
  } = result as UserProps;


  // if mobile number is not prefix with country code don't send sms
  if (!mobile || !mobile.startsWith('+')) {
    return NextResponse.json({
      result,
    });
  }


  /*

  curl -X POST \
    https://api.trongrid.io/wallet/createtransaction \
    -H 'Content-Type: application/json' \
    -H 'TRON-PRO-API-KEY: 25f66928-0b70-48cd-9ac6-da6f8247c663' \
    -d '{
      "to_address": "41e9d79cc47518930bc322d9bf7cddd260a0260a8d",
      "owner_address": "41D1E7A6BC354106CB410E65FF8B181C600FF14292",
      "amount": 1000
  }'
  */


  

    // send sms

    const to = mobile;


    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const client = twilio(accountSid, authToken);



    let message = null;

   

    try {

      let msgBody = '';

      if (lang === 'en') {
        msgBody = `[OWIN] TID[${tradeId}] Your buy order has been accepted by ${seller?.nickname}! You must escrow USDT to proceed with the trade in 10 minutes!`;
      } else if (lang === 'kr') {
        msgBody = `[OWIN] TID[${tradeId}] ${seller?.nickname}님이 구매 주문을 수락했습니다! 거래를 계속하기 위해 USDT를 에스크로해야 합니다!`;
      } else {
        msgBody = `[OWIN] TID[${tradeId}] Your buy order has been accepted by ${seller?.nickname}! You must escrow USDT to proceed with the trade in 10 minutes!`;
      }



      message = await client.messages.create({
        body: msgBody,
        from: "+17622254217",
        to: to,
      });

      console.log(message.sid);

      
      /*
      let msgBody2 = '';

      if (lang === 'en') { 
        msgBody2 = `[OWIN] TID[${tradeId}] Check the trade: https://gold.goodtether.com/${lang}/${chain}/sell-usdt/${orderId}`;
      } else if (lang === 'kr') {
        msgBody2 = `[OWIN] TID[${tradeId}] 거래 확인: https://gold.goodtether.com/${lang}/${chain}/sell-usdt/${orderId}`;
      } else {
        msgBody2 = `[OWIN] TID[${tradeId}] Check the trade: https://gold.goodtether.com/${lang}/${chain}/sell-usdt/${orderId}`;
      }


      message = await client.messages.create({
        body: msgBody2,
        from: "+17622254217",
        to: to,
      });

      console.log(message.sid);
      */

    } catch (e) {
      console.error('error', e);
    }




 
  return NextResponse.json({

    result,
    
  });
  
}

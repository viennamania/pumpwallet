import { NextResponse, type NextRequest } from "next/server";

import {
	getReceiveTransactionsByWalletAddress,
} from '@lib/api/transaction';


// Download the helper library from https://www.twilio.com/docs/node/install
import twilio from "twilio";



export async function POST(request: NextRequest) {

  const body = await request.json();

  const { storeCode, userId } = body;

  //// https://store.unove.space/Api/usdcReceiveHistory?storecode=2000001&memberid=helloworld@gmail.com

  // fetch api

  const url = `https://store.unove.space/Api/usdcReceiveHistory?storecode=${storeCode}&memberid=${userId}`;

  //////console.log("url", url);

  const result = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const jsonData = await result.json();

  return NextResponse.json({

    data: jsonData?.data,
    
  });
  
}

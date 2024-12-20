import { NextResponse, type NextRequest } from "next/server";

import {
	insertOne,
} from '@lib/api/agent';

// getOneByContractAddress
import {
  getOneByContractAddress,
} from '@lib/api/user';

import twilio from "twilio";

export async function POST(request: NextRequest) {

  const body = await request.json();

  /*
  walletAddress: address,
  agentBot: agentBot,
  userName: userName,
  userPhoneNumber: userPhoneNumber,
  userEmail: userEmail,
  htxUid: htxUid,
  htxUsdtWalletAddress: htxUsdtWalletAddress,
  apiAccessKey: apiAccessKey,
  apiSecretKey: apiSecretKey,
  */

  const { marketingCenter, center, walletAddress, agentBot, agentBotNumber, userName, userPhoneNumber, userEmail, userTelegramId, exchange, okxUid, htxUsdtWalletAddress, apiAccessKey, apiSecretKey, apiPassword } = body;




  const response = await fetch("https://owinwallet.com/api/agent/applyMintNFT", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      marketingCenter: marketingCenter,
      center: center,
      walletAddress: walletAddress,
      agentBot: agentBot,
      agentBotNumber: agentBotNumber,
      userName: userName,
      userPhoneNumber: userPhoneNumber,
      userEmail: userEmail,
      userTelegramId: userTelegramId,
      exchange: exchange,
      okxUid: okxUid,
      htxUsdtWalletAddress: htxUsdtWalletAddress,
      apiAccessKey: apiAccessKey,
      apiSecretKey: apiSecretKey,
      apiPassword: apiPassword,
    }),
  });

  if (!response.ok) {
    return NextResponse.error();
  }

  const jsonObj = await response.json();

  ////console.log("getReferApplications jsonObj: ", jsonObj);

 
  /*
  return NextResponse.json({

    result: jsonObj?.result,
    
  });
  */

  const result = jsonObj?.result;

 
  return NextResponse.json({

    result,
    
  });
  
}

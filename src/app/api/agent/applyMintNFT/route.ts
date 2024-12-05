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

  const { center, walletAddress, agentBot, agentBotNumber, userName, userPhoneNumber, userEmail, userTelegramId, htxUserId, htxUsdtWalletAddress, apiAccessKey, apiSecretKey, apiPassword } = body;




  const response = await fetch("https://owinwallet.com/api/agent/applyMintNFT", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      center: center,
      walletAddress: walletAddress,
      agentBot: agentBot,
      agentBotNumber: agentBotNumber,
      userName: userName,
      userPhoneNumber: userPhoneNumber,
      userEmail: userEmail,
      userTelegramId: userTelegramId,
      htxUserId: htxUserId,
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

  const applicationId = result.id;






  // send sms to agent holder
  // get user phone number by erc721ContractAddress is agentBot
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const client = twilio(accountSid, authToken);


  const user = await getOneByContractAddress(agentBot);
  if (user) {
    const { mobile } = user;

    if (mobile && mobile.length > 10) {

      const msgBody = `[AGENT] [TID:#${applicationId}] You have a new agent application from [${userName}]`;

      const message = await client.messages.create({
        body: msgBody,
        from: "+17622254217",
        to: mobile,
      });

    }

  }


  if (userPhoneNumber && userPhoneNumber.length > 10) {

    // send sms to userPhoneNumber
    const msgBody = `[AGENT] [TID:#${applicationId}] Your master bot application has been submitted successfully!`;

    const message = await client.messages.create({
      body: msgBody,
      from: "+17622254217",
      to: userPhoneNumber,
    });

  }

 
  return NextResponse.json({

    result,
    
  });
  
}

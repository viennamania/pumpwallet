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

  const { walletAddress, agentBot, agentBotNumber, userName, userPhoneNumber, userEmail, htxUserId, htxUsdtWalletAddress, apiAccessKey, apiSecretKey } = body;



  const result = await insertOne({
    walletAddress: walletAddress,
    agentBot: agentBot,
    agentBotNumber: agentBotNumber,
    userName: userName,
    userPhoneNumber: userPhoneNumber,
    userEmail: userEmail,
    htxUserId: htxUserId,
    htxUsdtWalletAddress: htxUsdtWalletAddress,
    apiAccessKey: apiAccessKey,
    apiSecretKey: apiSecretKey,
  });

  if (!result) {
    return NextResponse.error();
  }

  //console.log("result", result);

  const applicationId = result.id;

  // send sms to agent holder
  // get user phone number by erc721ContractAddress is agentBot
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const client = twilio(accountSid, authToken);


  const user = await getOneByContractAddress(agentBot);
  if (user) {
    const { mobile } = user;


    const msgBody = `[NOVA] [TID:#${applicationId}] You have a new agent application from [${userName}]`;

    const message = await client.messages.create({
      body: msgBody,
      from: "+17622254217",
      to: mobile,
    });

  }


  // send sms to userPhoneNumber
  const msgBody = `[NOVA] [TID:#${applicationId}] Your master bot application has been submitted successfully!`;

  const message = await client.messages.create({
    body: msgBody,
    from: "+17622254217",
    to: userPhoneNumber,
  });

 
  return NextResponse.json({

    result,
    
  });
  
}

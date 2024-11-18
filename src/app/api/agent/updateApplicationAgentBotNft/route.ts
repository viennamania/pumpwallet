import { NextResponse, type NextRequest } from "next/server";

/*
import {
	updateAgentBotNft,
} from '@lib/api/agent';
*/

import { Network, Alchemy } from 'alchemy-sdk';

const settings = {
  apiKey: process.env.ALCHEMY_API_KEY,
  network: Network.MATIC_MAINNET,
};

const alchemy = new Alchemy(settings);


export async function POST(request: NextRequest) {

  const body = await request.json();


  const { applicationId, agentBot, agentBotNumber } = body;





  const response = await fetch("https://owinwallet.com/api/agent/updateApplicationAgentBotNft", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      applicationId: applicationId,
      agentBot: agentBot,
      agentBotNumber: agentBotNumber,
    }),
  });

  //console.log("updateApplicationAgentBotNft res: ", res);

  
  if (!response.ok) {
    return NextResponse.error();
  }

  const jsonObj = await response.json();

  ////console.log("jsonObj=", jsonObj);


  return NextResponse.json({
    status: "success",
    result: jsonObj?.result,
  });
  



  
}

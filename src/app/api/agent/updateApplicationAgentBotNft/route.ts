import { NextResponse, type NextRequest } from "next/server";

import {
	updateAgentBotNft,
} from '@lib/api/agent';

import { Network, Alchemy } from 'alchemy-sdk';

const settings = {
  apiKey: process.env.ALCHEMY_API_KEY,
  network: Network.MATIC_MAINNET,
};

const alchemy = new Alchemy(settings);


export async function POST(request: NextRequest) {

  const body = await request.json();


  const { applicationId, agentBot, agentBotNumber } = body;


  const response = await alchemy.nft.getNftMetadata(
    agentBot, agentBotNumber
  );

  if (!response) {
    return NextResponse.error();
    
  }

  //console.log("response: ", response);


  
  const result = await updateAgentBotNft({
    applicationId: applicationId,
    agentBotNft: response,
  });
  
  if (!result) {
    return NextResponse.error();
  }

 
  return NextResponse.json({

    result: response,
    
  });
  
}

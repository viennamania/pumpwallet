import { NextResponse, type NextRequest } from "next/server";

import {
	getOneByWalletAddress,
} from '@lib/api/user';


import { polygon, arbitrum } from "thirdweb/chains";


//import { Engine } from "@thirdweb-dev/engine";

if (!process.env.THIRDWEB_ENGINE_URL) {
  throw new Error("THIRDWEB_ENGINE_URL is not defined");
}

if (!process.env.THIRDWEB_ENGINE_ACCESS_TOKEN) {
  throw new Error("THIRDWEB_ENGINE_ACCESS_TOKEN is not defined");
}

/*
const engine = new Engine({
  url: process.env.THIRDWEB_ENGINE_URL,
  accessToken: process.env.THIRDWEB_ENGINE_ACCESS_TOKEN,
});
*/


export async function POST(request: NextRequest) {

  const body = await request.json();



  const { chain, walletAddress } = body;

  /*
  const result = await engine.backendWallet.getBalance(
    chain: chain === "arbitrum" ? arbitrum : polygon,
    walletAddress,
  )
  */



  const chainId = chain === "polygon" ? polygon.id : arbitrum.id;
  const url = process.env.THIRDWEB_ENGINE_URL + "/backend-wallet/" + chainId + "/" + walletAddress + "/get-balance";

  const result = await fetch(url, {
    method: "GET",
    headers : {
      authorization: "Bearer " + process.env.THIRDWEB_ENGINE_ACCESS_TOKEN,
    },
  })

  const resultJson = await result.json();

  ///console.log("resultJson", resultJson);

 
  return NextResponse.json({

    result: resultJson.result,
    
  });
  
}

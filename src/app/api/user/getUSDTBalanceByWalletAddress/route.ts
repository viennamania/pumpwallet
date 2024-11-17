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

  //   const url = process.env.THIRDWEB_ENGINE_URL + "/backend-wallet/" + chainId + "/" + walletAddress + "/get-balance";

  
  //const url = process.env.THIRDWEB_ENGINE_URL + "/backend-wallet/" + chainId + "/" + walletAddress + "/get-balance";
  //https://cors.redoc.ly/contract/{chain}/{contractAddress}/erc20/balance-of

  const contractAddressPolygon = "0xc2132D05D31c914a87C6611C10748AEb04B58e8F"; // USDT on Polygon

  const contractAddressArbitrum = "0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9"; // USDT on Arbitrum

  const contractAddress = chain === "polygon" ? contractAddressPolygon : contractAddressArbitrum;


  try {

    const url = process.env.THIRDWEB_ENGINE_URL + "/contract/" + chainId + "/" + contractAddress + "/erc20/balance-of?wallet_address=" + walletAddress;

    ///console.log("url", url);


    const result = await fetch(url, {
      method: "GET",
      headers : {
        authorization: "Bearer " + process.env.THIRDWEB_ENGINE_ACCESS_TOKEN,
      },
    })

    ///console.log("result", result);


    const resultJson = await result?.json();

    //console.log("resultJson", resultJson);

  
    return NextResponse.json({

      result: resultJson.result,
      
    });

  } catch (e) {

    console.error("error=", e + "");

    return NextResponse.json({
      result: "error",
      error: e + ""
    });

  }
  
}

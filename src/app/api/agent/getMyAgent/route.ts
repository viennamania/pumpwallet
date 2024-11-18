import { NextResponse, type NextRequest } from "next/server";

/*
import {
	getOneByWalletAddress,
} from '@lib/api/agent';
*/


export async function POST(request: NextRequest) {

  const body = await request.json();

  const { walletAddress } = body;


  console.log("walletAddress", walletAddress);


  ////const result = await getOneByWalletAddress(walletAddress);

  const response = await fetch("https://owinwallet.com/api/agent/getMyAgent", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      walletAddress: walletAddress,
    }),
  });

  if (!response.ok) {
    return NextResponse.error();
  }

  const jsonObj = await response.json();


  const result = jsonObj?.result;

 
  return NextResponse.json({
    status: "success",
    result: result,
  });
  
}

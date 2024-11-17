import { NextResponse, type NextRequest } from "next/server";

import {
	getOneByTronWalletAddress,
} from '@lib/api/user';



export async function POST(request: NextRequest) {

  const body = await request.json();

  const { tronWalletAddress } = body;


  //console.log("walletAddress", walletAddress);


  const result = await getOneByTronWalletAddress(tronWalletAddress);


  ///console.log("getOneByWalletAddress result", result);

 
  return NextResponse.json({

    result,
    
  });
  
}

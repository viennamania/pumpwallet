import { NextResponse, type NextRequest } from "next/server";

import {
	getOneByContractAddress
} from '@lib/api/user';



export async function POST(request: NextRequest) {

  const body = await request.json();

  const { erc721ContractAddress } = body;


  //console.log("walletAddress", walletAddress);


  const result = await getOneByContractAddress(erc721ContractAddress);


  ///console.log("getOneByWalletAddress result", result);

 
  return NextResponse.json({

    result,
    
  });
  
}

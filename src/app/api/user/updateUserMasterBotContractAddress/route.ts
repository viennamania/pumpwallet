import { NextResponse, type NextRequest } from "next/server";

import {
	setMasterBotContractAddressByWalletAddress,
} from '@lib/api/user';


export async function POST(request: NextRequest) {

  const body = await request.json();

  const {
    walletAddress,
    masterBotContractAddress,
  } = body;

  console.log("walletAddress", walletAddress);
  console.log("masterBotContractAddress", masterBotContractAddress);

  const result = await setMasterBotContractAddressByWalletAddress(
    walletAddress,
    masterBotContractAddress,
  );


 
  return NextResponse.json({

    result,
    
  });
  
}

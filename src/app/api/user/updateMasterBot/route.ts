import { NextResponse, type NextRequest } from "next/server";

import {
	updateMasterBot,
} from '@lib/api/user';



export async function POST(request: NextRequest) {

  const body = await request.json();

  const { walletAddress, masterBot } = body;

  console.log("walletAddress", walletAddress);
  console.log("masterBot", masterBot);


  const result = await updateMasterBot({
    walletAddress: walletAddress,
    masterBot: masterBot,
  });


 
  return NextResponse.json({

    result,
    
  });
  
}

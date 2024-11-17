import { NextResponse, type NextRequest } from "next/server";

import {
	getTradesByWalletAddress,
} from '@lib/api/order';



export async function POST(request: NextRequest) {

  const body = await request.json();

  const { walletAddress } = body;

  console.log("walletAddress", walletAddress);
  

  const result = await getTradesByWalletAddress({
    walletAddress: walletAddress,
    limit: 100,
    page: 1,
  });

 
  return NextResponse.json({

    result,
    
  });
  
}

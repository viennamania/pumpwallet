import { NextResponse, type NextRequest } from "next/server";

import {
	getSellOrdersByWalletAddress,
} from '@lib/api/order';



export async function POST(request: NextRequest) {

  const body = await request.json();

  const { walletAddress } = body;

  console.log("walletAddress", walletAddress);
  

  const result = await getSellOrdersByWalletAddress({
    walletAddress: walletAddress,
    limit: 10,
    page: 1,
  });

 
  return NextResponse.json({

    result,
    
  });
  
}

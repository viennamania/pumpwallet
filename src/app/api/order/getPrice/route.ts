import { NextResponse, type NextRequest } from "next/server";

import {
	getUsdtPrice,
} from '@lib/api/order';



export async function POST(request: NextRequest) {

  const body = await request.json();

  const { walletAddress } = body;

  //console.log("walletAddress", walletAddress);
  //console.log("sellerStatus", sellerStatus);

  const result = await getUsdtPrice({
    walletAddress: walletAddress,
  });



 
  return NextResponse.json({

    result,
    
  });
  
}

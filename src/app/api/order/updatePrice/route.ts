import { NextResponse, type NextRequest } from "next/server";

import {
	updatePrice,
} from '@lib/api/order';



export async function POST(request: NextRequest) {

  const body = await request.json();

  const { walletAddress, price } = body;

  //console.log("walletAddress", walletAddress);
  //console.log("sellerStatus", sellerStatus);

  const result = await updatePrice({
    walletAddress: walletAddress,
    price: price,
  });


 
  return NextResponse.json({

    result,
    
  });
  
}

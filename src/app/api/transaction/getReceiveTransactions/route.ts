import { NextResponse, type NextRequest } from "next/server";

import {
	getReceiveTransactionsByWalletAddress,
} from '@lib/api/transaction';

export async function POST(request: NextRequest) {

  const body = await request.json();

  const { walletAddress } = body;

  console.log("walletAddress", walletAddress);


  const result = await getReceiveTransactionsByWalletAddress({
    walletAddress: walletAddress,
  });

  return NextResponse.json({

    result,
    
  });
  
}

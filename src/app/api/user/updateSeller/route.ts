import { NextResponse, type NextRequest } from "next/server";

import {
	updateSellerStatus,
} from '@lib/api/user';



export async function POST(request: NextRequest) {

  const body = await request.json();

  const { walletAddress, sellerStatus, bankName, accountNumber, accountHolder } = body;

  //console.log("walletAddress", walletAddress);
  //console.log("sellerStatus", sellerStatus);

  const result = await updateSellerStatus({
    walletAddress: walletAddress,
    sellerStatus: sellerStatus,
    bankName: bankName,
    accountNumber: accountNumber,
    accountHolder: accountHolder,
  });


 
  return NextResponse.json({

    result,
    
  });
  
}

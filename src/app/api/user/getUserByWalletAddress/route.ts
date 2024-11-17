import { NextResponse, type NextRequest } from "next/server";

import {
	getOneByWalletAddress,
} from '@lib/api/user';



export async function POST(request: NextRequest) {

  const body = await request.json();

  const { walletAddress } = body;



  const result = await getOneByWalletAddress(walletAddress);


 
 
  return NextResponse.json({

    result,
    
  });
  
}

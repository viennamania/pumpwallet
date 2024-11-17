import { NextResponse, type NextRequest } from "next/server";

import {
	insertOne,
} from '@lib/api/user';



export async function POST(request: NextRequest) {

  const body = await request.json();

  const { walletAddress, nickname, mobile } = body;



  const result = await insertOne({
    walletAddress: walletAddress,
    nickname: nickname,
    mobile: mobile,
  });


 
  return NextResponse.json({

    result,
    
  });
  
}

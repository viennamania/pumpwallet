import { NextResponse, type NextRequest } from "next/server";

import {
	insertOneVerified,
} from '@lib/api/user';



export async function POST(request: NextRequest) {

  const body = await request.json();


  const {
    walletAddress,
    nickname,
    userType,
    mobile,
    telegramId,
    center,
  } = body;


  const result = await insertOneVerified({
    walletAddress: walletAddress,
    nickname: nickname,
    userType: userType,
    mobile: mobile,
    telegramId: telegramId,
    center: center,
  });


 
  return NextResponse.json({

    result,
    
  });
  
}

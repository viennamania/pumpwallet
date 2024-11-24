import { NextResponse, type NextRequest } from "next/server";

import {
	updateOne,
} from '@lib/api/user';



export async function POST(request: NextRequest) {

  const body = await request.json();

  /*
                    nickname: nickname,
                     avatar: avatar,
                    userType: userType,
                    phoneNumber: userPhoneNumber,
                    telegramId: userTelegramId,
                    */

  const {
    walletAddress,
    nickname,
    avatar,
    userType,
    phoneNumber,
    telegramId,
  } = body;

  console.log("walletAddress", walletAddress);
  console.log("nickname", nickname);

  const result = await updateOne({
    walletAddress: walletAddress,
    nickname: nickname,
  });


 
  return NextResponse.json({

    result,
    
  });
  
}

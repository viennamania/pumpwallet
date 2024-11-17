import { NextResponse, type NextRequest } from "next/server";

import {
	updateAvatar,
} from '@lib/api/user';



export async function POST(request: NextRequest) {

  const body = await request.json();

  const { walletAddress, avatar } = body;

  console.log("walletAddress", walletAddress);
  console.log("avatar", avatar);

  const result = await updateAvatar({
    walletAddress: walletAddress,
    avatar: avatar,
  });


 
  return NextResponse.json({

    result,
    
  });
  
}

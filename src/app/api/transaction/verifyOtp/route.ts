import { NextResponse, type NextRequest } from "next/server";

import {
	findOne,
} from '@lib/api/otp';


export async function POST(request: NextRequest) {

  const body = await request.json();

  const { lang, chain, walletAddress, otp } = body;

  console.log("lang", lang);
  console.log("chain", chain);
  console.log("walletAddress", walletAddress);
  console.log("otp", otp);


  const result = await findOne({
    walletAddress: walletAddress,
    otp: otp,
  });

  console.log("result", result);


  if (result) {

    return NextResponse.json({
      status: 'success',
      message: 'OTP verified successfully',
    });

  } else {

    return NextResponse.json({
      status: 'error',
      message: 'Invalid OTP',
    });

  }
  
}

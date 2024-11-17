import { NextResponse, type NextRequest } from "next/server";

import {
	insertOne,
} from '@lib/api/user';



export async function POST(request: NextRequest) {

  const body = await request.json();

  const { nickname, mobile } = body;


  try {


    const storecode = nickname?.split('@').slice(-1)[0];
    const memberid = nickname?.split('@').slice(0, -1).join('@');




    const storeCodeNumber = process.env.STORE_CODE_NUMBER;

    if (storecode !== storeCodeNumber) {
      throw new Error("Invalid store code");
    }




    // https://store.unove.space/Api/walletAddress?storecode=2000001&memberid=google@gmail.com

    // {"result":1,"data":"0x8c1C4C15bd7e74A368E847C8278C0aB9F8182B25"}
    

    const data = await fetch(`https://store.unove.space/Api/walletAddress?storecode=${storecode}&memberid=${memberid}`);

    const json = await data?.json();

    if (!json?.data) {
      throw new Error("No wallet address found");
    }

    const walletAddress = json?.data;



    console.log("walletAddress", walletAddress);




    const result = await insertOne({
      walletAddress: walletAddress,
      nickname: nickname,
      mobile: mobile,
    });

    // return wallet address to user

    return NextResponse.json({

      result,
      walletAddress,
      
    });


  } catch (error) {
    console.log("error", error);

    return NextResponse.json({
      error,
      
    });
  }


 

  
}

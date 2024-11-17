import { NextResponse, type NextRequest } from "next/server";

import {
	getOneByNickname,
} from '@lib/api/user';



export async function POST(request: NextRequest) {

  const body = await request.json();

  const { nickname } = body;



  const result = await getOneByNickname(nickname);

  if (result) {
    return NextResponse.json({
      result: true
    });
  }

 
 
  return NextResponse.json({
    result: false
  });
  
}

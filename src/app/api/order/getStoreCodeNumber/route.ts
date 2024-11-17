import { NextResponse, type NextRequest } from "next/server";


export async function GET(request: NextRequest) {

  const storeCodeNumber = process.env.STORE_CODE_NUMBER;

  return NextResponse.json({

    storeCodeNumber: storeCodeNumber,
    
  });
  
}

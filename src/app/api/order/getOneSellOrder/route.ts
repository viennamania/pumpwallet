import { NextResponse, type NextRequest } from "next/server";

import {
	getOneSellOrder,
} from '@lib/api/order';



export async function POST(request: NextRequest) {

  const body = await request.json();



  const result = await getOneSellOrder({
    orderId: body.orderId,
    limit: 100,
    page: 1,
  });

 
  return NextResponse.json({

    result,
    
  });
  
}

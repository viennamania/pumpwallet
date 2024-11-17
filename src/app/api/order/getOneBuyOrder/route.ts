import { NextResponse, type NextRequest } from "next/server";

import {
	getOneBuyOrder,
} from '@lib/api/order';



export async function POST(request: NextRequest) {

  const body = await request.json();



  const result = await getOneBuyOrder({
    orderId: body.orderId,
    limit: 100,
    page: 1,
  });

 
  return NextResponse.json({

    result,
    
  });
  
}

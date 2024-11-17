import { NextResponse, type NextRequest } from "next/server";

import {
  UserProps,
	cancelTradeByAdmin,
} from '@lib/api/order';

// Download the helper library from https://www.twilio.com/docs/node/install
import twilio from "twilio";




export async function GET(request: NextRequest) {


  const result = await cancelTradeByAdmin();

  console.log("result", result);


  if (result) {
 

    return NextResponse.json({

      result: true,
      
    });

  } else {
 
    return NextResponse.json({

      result: false,
      
    });

  }
  
}

import { NextResponse, type NextRequest } from "next/server";

import {
	
  updateApplicationMasterBotInfo,

} from '@lib/api/agent';



export async function POST(request: NextRequest) {

  const body = await request.json();

  const {
    applicationId,
    masterBotInfo,
  } = body;


  const result = await updateApplicationMasterBotInfo({
    applicationId,
    masterBotInfo,
  });


 
  return NextResponse.json({

    result,
    
  });
  
}

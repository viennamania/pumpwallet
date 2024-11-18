import { NextResponse, type NextRequest } from "next/server";


/*
import {
	getAllAgents,
} from '@lib/api/agent';
*/


export async function POST(request: NextRequest) {

  const body = await request.json();

  const { walletAddress, center } = body;


  if (!walletAddress) {

    return NextResponse.error();
  }




    const response = await fetch("https://owinwallet.com/api/agent/getApplicationsCenter", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        walletAddress,
        center,
      }),
    });
  
    if (!response.ok) {
      return NextResponse.error();
    }
  
    const jsonObj = await response.json();
  
    ////console.log("getReferApplications jsonObj: ", jsonObj);
  
    
    return NextResponse.json({
  
      result: jsonObj?.result,
      
    });





  
}

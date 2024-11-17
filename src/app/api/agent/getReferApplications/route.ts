import { NextResponse, type NextRequest } from "next/server";


/*
import {
	getMyReferAgents,
} from '@lib/api/agent';
*/


export async function POST(request: NextRequest) {

  const body = await request.json();

  const {
    agentBot,
    agentBotNumber,
  } = body;

  console.log("getReferApplications agentBot: ", agentBot);
  console.log("getReferApplications agentBotNumber: ", agentBotNumber);


  if (!agentBot || !agentBotNumber) {
    return NextResponse.error();
  }




  /*
  const result = await getMyReferAgents({
    page: 1,
    limit: 100,
    agentBot: agentBot,
    agentBotNumber: agentBotNumber,
  });
  
  if (!result) {
    return NextResponse.error();
  }

  return NextResponse.json({
    status: "success",
    result: result,
  });
  */


  
  // https://owinwallet.com/api/agent/getReferApplications

  const response = await fetch("https://owinwallet.com/api/agent/getReferApplications", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      agentBot: agentBot,
      agentBotNumber: agentBotNumber,
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

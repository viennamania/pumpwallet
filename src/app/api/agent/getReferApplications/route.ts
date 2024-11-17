import { NextResponse, type NextRequest } from "next/server";



import {
	getMyReferAgents,
} from '@lib/api/agent';



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




  const result = await getMyReferAgents({
    page: 1,
    limit: 100,
    agentBot: agentBot,
    agentBotNumber: agentBotNumber,
  });
 
  return NextResponse.json({

    result,
    
  });
  
}

import { NextResponse, type NextRequest } from "next/server";



import {
	getAllAgents,
} from '@lib/api/agent';



export async function POST(request: NextRequest) {

  const body = await request.json();

  const { walletAddress } = body;


  if (!walletAddress) {

    return NextResponse.error();
  }

  if (walletAddress === "0x030549f3E1644008c920d0046caE758317Dab8CE" // wayne


    
    ) {

      const result = await getAllAgents({});
 
      return NextResponse.json({
    
        result,
        
      });


  } else {

    return NextResponse.error();

  }


  
}

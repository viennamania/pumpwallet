import { NextResponse, type NextRequest } from "next/server";



import {
	getAllAgents,
} from '@lib/api/agent';



export async function POST(request: NextRequest) {

  const body = await request.json();

  const { walletAddress } = body;


  /*
  if (!walletAddress) {

    return NextResponse.error();
  }
  */

  if (
      /*
      walletAddress === "0x7bfF3359841D26C8046364b93E7dA01886ae1c22"
      || walletAddress === "0xFb580c68794A963632FF272ab5A7233ee6114fef"

      // AI Labs
      || walletAddress === "0x3e3E906e33D25cecA1aee550CACB1bCE74450Ed6"
      || walletAddress === "0xE052B4f1B6842d422Debf17eB5361138830d6c1c"
      || walletAddress === "0x78d937Ec95f1674BF9E43d90D6231f504AC2D6c3"
      */
     true
    
    ) {

      const result = await getAllAgents({});
 
      return NextResponse.json({
    
        result,
        
      });


  } else {

    return NextResponse.error();

  }


  
}

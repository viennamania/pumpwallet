import { NextResponse, type NextRequest } from "next/server";






export async function POST(request: NextRequest) {

  const body = await request.json();

  
  const {
    applicationId,
    htxAccessKey,
    htxSecretKey,
   } = body;
  

    if (!applicationId) {
        return NextResponse.json({
            result: {
            status: "error",
            }
        });
    }


    const response = await fetch("https://owinwallet.com/api/agent/updateHtxUID", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        applicationId: applicationId,
        htxAccessKey: htxAccessKey,
        htxSecretKey: htxSecretKey,
      }),
    });
  
    //console.log("updateApplicationAgentBotNft res: ", res);
  
    
    if (!response.ok) {
      return NextResponse.error();
    }
  
    const jsonObj = await response.json();

    ///console.log("jsonObj=", jsonObj);


    return NextResponse.json({
      result: {
        status: "ok",
        htxUid: jsonObj.result.htxUid,
      }
    });


  
}

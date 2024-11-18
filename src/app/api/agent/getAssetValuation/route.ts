import { NextResponse, type NextRequest } from "next/server";


export async function POST(request: NextRequest) {

  const body = await request.json();

  
  const {
    htxAccessKey,
    htxSecretKey,
    applicationId,
   } = body;
  



      const res = await fetch("https://owinwallet.com/api/agent/getAssetValuation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          applicationId: applicationId,
          htxAccessKey: htxAccessKey,
          htxSecretKey: htxSecretKey
        }),
      });
    
      //console.log("updateApplicationAgentBotNft res: ", res);
    
      
      if (!res.ok) {
        return NextResponse.error();
      }
    
      const jsonObj = await res.json();

      ///console.log("jsonObj=", jsonObj);


      return NextResponse.json({
        result: {
          status: "ok",
          assetValuation: jsonObj.result.assetValuation,
        }
      });





 
    return NextResponse.json({
      result: {
          status: "error",
      },
    });
  
}

import { NextResponse, type NextRequest } from "next/server";






export async function POST(request: NextRequest) {

  const body = await request.json();

  
  const {
    applicationId,
    apiAccessKey,
    apiSecretKey,
    apiPassword,
   } = body;
  

    if (!applicationId || !apiAccessKey || !apiSecretKey || !apiPassword) {
        return NextResponse.json({
            result: {
            status: "error",
            }
        });
    }


    const response = await fetch("https://owinwallet.com/api/okx/getTradingAccountBalance", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        applicationId: applicationId,
        apiAccessKey: apiAccessKey,
        apiSecretKey: apiSecretKey,
        apiPassword: apiPassword,
      }),
    });
  
    //console.log("updateApplicationAgentBotNft res: ", res);
  
    
    if (!response.ok) {
      return NextResponse.error();
    }
  
    const jsonObj = await response.json();

    //console.log("jsonObj=", jsonObj);


    return NextResponse.json({
      result: {
        status: "ok",
        tradingAccountBalance: jsonObj.result.tradingAccountBalance,
      }
    });


  
}

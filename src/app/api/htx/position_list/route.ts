import { NextResponse, type NextRequest } from "next/server";

export async function POST(request: NextRequest) {

  const body = await request.json();

  
  const {
    htxAccessKey,
    htxSecretKey,
    applicationId,
   } = body;
  

   const res = await fetch("https://owinwallet.com/api/htx/position_list", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      htxAccessKey: htxAccessKey,
      htxSecretKey: htxSecretKey,
      applicationId: applicationId,
    }),
  });

  //console.log("postion_list res: ", res);

  
  if (!res.ok) {
    return NextResponse.error();
  }

  const jsonObj = await res.json();

  //console.log("jsonObj=", jsonObj);


  return NextResponse.json({
    result: jsonObj.result,
  });

  
}

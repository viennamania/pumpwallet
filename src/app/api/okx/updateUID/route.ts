import { NextResponse, type NextRequest } from "next/server";


import moment from 'moment';


import axios from 'axios';
import * as crypto from 'crypto';

const BASE_URL = 'https://www.okx.com';



async function makeRequest(
  endpoint: string,
  API_KEY: string,
  SECRET_KEY: string,
  PASSPHRASE: string,
): Promise<any> {
  const timestamp = new Date().toISOString();
  const message = timestamp + 'GET' + endpoint;

  const signature = crypto.createHmac('sha256', SECRET_KEY)
      .update(message)
      .digest('base64');

  const headers = {
      'OK-ACCESS-KEY': API_KEY,
      'OK-ACCESS-SIGN': signature,
      'OK-ACCESS-TIMESTAMP': timestamp,
      'OK-ACCESS-PASSPHRASE': PASSPHRASE,
      'Content-Type': 'application/json',
  };

  try {
      const response = await axios.get(BASE_URL + endpoint, { headers });
      return response.data;
  } catch (error : any) {
      console.error(`API 요청 오류: ${error?.message}`);
      return null;
  }
}



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


    const response = await fetch("https://owinwallet.com/api/okx/updateUID", {
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
  
   
    
    if (!response.ok) {
      return NextResponse.error();
    }
  
    const jsonObj = await response.json();

    //console.log("jsonObj=", jsonObj);


    /*
    const uid = jsonObj.result.okxUid;


    const affiliateInfo = await makeRequest(
      '/api/v5/affiliate/invitee/detail?uid=' + uid,
      apiAccessKey,
      apiSecretKey,
      apiPassword,
    );

    //console.log(affiliateInfo);
    
    {
      msg: 'Only affiliates can perform this action',
      code: '51620',
      data: []
    }
    


    if (affiliateInfo && affiliateInfo.code === '0') {
        console.log(`\naffiliateInfo: ${affiliateInfo.data}`);
    }
    */




    return NextResponse.json({
      result: jsonObj.result,
    });

  
}

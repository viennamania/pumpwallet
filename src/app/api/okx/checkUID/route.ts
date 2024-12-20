import { NextResponse, type NextRequest } from "next/server";


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
    apiAccessKey,
    apiSecretKey,
    apiPassword,
   } = body;
  

    if (!apiAccessKey || !apiSecretKey || !apiPassword) {
        return NextResponse.json({
            result: {
            status: "error",
            }
        });
    }


    try {


      // UID 조회 부분
      const accountInfo = await makeRequest(
        '/api/v5/account/config',
        apiAccessKey,
        apiSecretKey,
        apiPassword,
      );

      if (accountInfo && accountInfo.code === '0') {
          const uid = accountInfo.data?.[0]?.uid;
          if (uid) {
              console.log(`\nUID: ${uid}`);

              return NextResponse.json({
                result: {
                  status: "ok",
                  okxUid: uid,
                },
              });


          }
      }




    } catch (error) {
        console.error("error", error);


    }


    return NextResponse.json({
        result: {
          status: "error",
        },
    });



  
}

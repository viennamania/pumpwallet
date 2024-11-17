import { NextResponse, type NextRequest } from "next/server";

import moment from 'moment';


// var HmacSHA256 = require('crypto-js/hmac-sha256')

import {
  HmacSHA256,
} from 'crypto-js';

import CryptoJS from 'crypto-js';

/*
function sign_sha(method, baseurl, path, data) {
    var pars = [];
    for (let item in data) {
        pars.push(item + "=" + encodeURIComponent(data[item]));
    }
    var p = pars.sort().join("&");
    var meta = [method, baseurl, path, p].join('\n');
    // console.log(meta);
    var hash = HmacSHA256(meta, config.huobi.secretkey);
    var Signature = encodeURIComponent(CryptoJS.enc.Base64.stringify(hash));
    // console.log(`Signature: ${Signature}`);
    p += `&Signature=${Signature}`;
    // console.log(p);
    return p;
}
*/





export async function POST(request: NextRequest) {

  const body = await request.json();

  
  const {
    htxAccessKey,
    htxSecretKey,
    amount,
   } = body;
  

   console.log("htxFutureTransfer amount: ", amount);



   // /v1/account/accounts/{account-id}/balance

   //const path = `/v1/account/accounts`;

   //const path = `/v1/account/accounts/${accountId}/balance`;

    //const path = `/v2/account/asset-valuation`;

    const path = `/v1/futures/transfer`;


    //const HOST = 'api.huobipro.com';
    
    const HOST = 'api.huobi.pro';

    ///const HOST = 'api.hbdm.com';



    const DEFAULT_HEADERS = {
      "Content-Type": "application/json",
      "User-Agent": "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36"
    };




    ////const path = "/api/v1/contract_account_info";


    // accountType: 'spot', 'margin', 'otc', 'super-margin'
    // valuationCurrency: 'USD', 'CNY'



    const huobiBody: { [key: string]: string | number | undefined } = {
        AccessKeyId: htxAccessKey,
        SignatureMethod: "HmacSHA256",
        SignatureVersion: 2,
        Timestamp: moment.utc().format('YYYY-MM-DDTHH:mm:ss'),

        currency: 'usdt',
        amount: amount,
        type: "pro-to-futures"
        ///type: "futures-to-pro"
    };


    // var payload = sign_sha('GET', HOST, path, huobiBody);

    //const payload = sign_sha('GET', HOST, path, huobiBody);

    try {


      var p = '';

      var pars = [];
      for (let item in huobiBody) {
          const value = huobiBody[item];
          if (value !== undefined) {
              pars.push(item + "=" + encodeURIComponent(value));
          }
          p = pars.sort().join("&");
          var meta = ['GET', HOST, path, p].join('\n');
          
          var hash = HmacSHA256(meta, htxSecretKey);

          var Signature = encodeURIComponent(CryptoJS.enc.Base64.stringify(hash));
          p += `&Signature=${Signature}`;
      }

      //console.log(p);




      const response = await fetch(`https://${HOST}${path}?${p}`, {
          method: 'GET',
          headers: DEFAULT_HEADERS,
      });

      ///console.log(response);

      if (!response) {
          return NextResponse.json({
              result: {
                  status: "error",
              },
          });
      }

      const data = await response.json();

 
      console.log(JSON.stringify(data));


      /*
      {
        status: 'ok',
        data: [ { id: 63912897, type: 'spot', subtype: '', state: 'working' } ]
      }
      */

      return NextResponse.json({
          result: {
              status: "ok",
              data: data,
          }
      });
      
    } catch (error) {
        console.error("error", error);
    }

 
    return NextResponse.json({
      result: {
          status: "error",
      },
    });
  
}

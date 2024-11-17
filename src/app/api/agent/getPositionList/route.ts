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
   } = body;

  //console.log("htxAccessKey", htxAccessKey);
  //console.log("htxSecretKey", htxSecretKey);
  


   // /v1/account/accounts/{account-id}/balance

   //const path = `/v1/account/accounts`;

   //const path = `/v1/account/accounts/${accountId}/balance`;

    //const path = `/v2/account/asset-valuation`;

    const path = `/copytrading/trader/position_list`;


    //const HOST = 'api.huobipro.com';
    
    //const HOST = 'api.huobi.pro';

    const HOST = 'api.hbdm.com';



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

      ///console.log(JSON.stringify(data));

      /*
      {
        "code":200,
        "data":{"positions":[
          {"lever":"5","position_side":"long","contract_code":"BCH-USDT","open_avg_price":"377.48","volume":"136","margin_mode":"cross","position_margin":"103.53408","margin_rate":"0.033641785791011462","unreal_profit":"4.2976","profit":"4.2976","profit_rate":"0.041856522199851645","liquidation_price":"19.61"},
          {"lever":"5","position_side":"long","contract_code":"ONDO-USDT","open_avg_price":"0.7358","volume":"327","margin_mode":"cross","position_margin":"48.31752","margin_rate":"0.033641785791011462","unreal_profit":"0.977100000000000051","profit":"0.977100000000000051","profit_rate":"0.020304600173309145","liquidation_price":null},{"lever":"5","position_side":"long","contract_code":"MEW-USDT","open_avg_price":"0.009241","volume":"32","margin_mode":"cross","position_margin":"58.4384","margin_rate":"0.033641785791011462","unreal_profit":"-3.545999999999968","profit":"-3.545999999999968","profit_rate":"-0.05995171401713626","liquidation_price":null}]},
          
        "tid":"c9f98f245540463fa6a1d2e2f66069e1",
        "success":true
      }
      */
      /*
      {\"status\":null,\"err_code\":300013,\"err_msg\":\"未知错误:300,013: subuser:50751676,fail\",\"ts\":1731205339092,\"function\":\"getContractPositionsNew\"} ",
      "tid":"3b03bd41c5b3432e94fe7e91cdd69c48",
      "code":400000,
      "success":false
      }
      */

      console.log("data.code", data.code);

      if (data.code === 200) {

        console.log(JSON.stringify(data.data));


          return NextResponse.json({
              result: {
                  status: "ok",
                  data: data.data,
              }
          });
      } else {
          return NextResponse.json({
              result: {
                  status: "error",
              },
          });
      }
      
    } catch (error) {
        console.error("error", error);

        return NextResponse.json({
          result: {
              status: "error",
          },
        });
    }

  
}

import { NextResponse, type NextRequest } from "next/server";

import {
  UserProps,
	buyOrderConfirmPayment,
  buyOrderGetOrderById,
} from '@lib/api/order';


import {
  getOneByWalletAddress 
} from '@lib/api/user';

// Download the helper library from https://www.twilio.com/docs/node/install
import twilio from "twilio";




import {
  createThirdwebClient,
  eth_getTransactionByHash,
  getContract,
  sendAndConfirmTransaction,
  
  sendTransaction,
  sendBatchTransaction,
  eth_maxPriorityFeePerGas,


} from "thirdweb";

//import { polygonAmoy } from "thirdweb/chains";
import {
  polygon,
  arbitrum,
 } from "thirdweb/chains";

import {
  privateKeyToAccount,
  smartWallet,
  getWalletBalance,
  
 } from "thirdweb/wallets";


import {
  mintTo,
  totalSupply,
  transfer,
  
  getBalance,

  balanceOf,

} from "thirdweb/extensions/erc20";



if (!process.env.THIRDWEB_ENGINE_URL) {
  throw new Error("THIRDWEB_ENGINE_URL is not defined");
}

if (!process.env.THIRDWEB_ENGINE_ACCESS_TOKEN) {
  throw new Error("THIRDWEB_ENGINE_ACCESS_TOKEN is not defined");
}

/*
const engine = new Engine({
  url: process.env.THIRDWEB_ENGINE_URL,
  accessToken: process.env.THIRDWEB_ENGINE_ACCESS_TOKEN,
});
*/



// nextjs-app
export const maxDuration = 60; // This function can run for a maximum of 5 seconds

//nextjs /pages/api
/*
export const config = {
	//runtime: 'edge',
	maxDuration: 120, // This function can run for a maximum of 60 seconds
};
*/





//const chain = polygon;


// USDT Token (USDT)
const tokenContractAddressUSDT = '0xc2132D05D31c914a87C6611C10748AEb04B58e8F';

const contractAddressArbitrum = "0x2f2a2543B76A4166549F7aab2e75Bef0aefC5B0f"; // USDT on Arbitrum






export async function POST(request: NextRequest) {

  console.log("buyOrderConfirmPayment==================");


  const body = await request.json();

  const { lang, chain, orderId, paymentAmount, isSmartAccount } = body;

  console.log("lang", lang);
  console.log("chain", chain);

  console.log("orderId", orderId);

  console.log("paymentAmount", paymentAmount);






  
  try {



    // get buyer wallet address


    const order = await buyOrderGetOrderById( orderId );

    if (!order) {
      return NextResponse.json({
        result: null,
      });
    }
    

    const {
      seller: seller,
      walletAddress: walletAddress,
      usdtAmount: usdtAmount,
      buyer: buyer,
    } = order as UserProps;



    const sellerWalletAddress = seller.walletAddress;

    if (!sellerWalletAddress) {
      return NextResponse.json({
        result: null,
      });
    }

    const user = await getOneByWalletAddress(sellerWalletAddress);

    ///console.log("user", user);

    if (!user) {
      return NextResponse.json({
        result: null,
      });
    }


    const escrowWalletAddress = user.escrowWalletAddress;


    const toAddressStore = walletAddress;
  

    //console.log("toAddressStore", toAddressStore);

    const sendAmountToStore = usdtAmount;

    //console.log("sendAmountToStore", sendAmountToStore);




    let transactionHashResult = "";
    let queueId = "";



    if (isSmartAccount) {

      const escrowWalletPrivateKey = user.escrowWalletPrivateKey;

      if (!escrowWalletPrivateKey) {
        return NextResponse.json({
          result: null,
        });
      }


      const client = createThirdwebClient({
        secretKey: process.env.THIRDWEB_SECRET_KEY || "",
      });

      if (!client) {
        return NextResponse.json({
          result: null,
        });
      }


      const personalAccount = privateKeyToAccount({
        client,
        privateKey: escrowWalletPrivateKey,
      });
    
      if (!personalAccount) {
        return NextResponse.json({
          result: null,
        });
      }


      const wallet = smartWallet({

        chain: chain === 'polygon' ? polygon : arbitrum,

         
        sponsorGas: true,
      });

      // Connect the smart wallet
      const account = await wallet.connect({
        client: client,
        personalAccount: personalAccount,
      });

      if (!account) {
        return NextResponse.json({
          result: null,
        });
      }


      //const escrowWalletAddress = account.address;



      const contract = getContract({
        client,
        chain: chain === 'polygon' ? polygon : arbitrum,
        address: tokenContractAddressUSDT, // erc20 contract from thirdweb.com/explore
      });

      const transactionSendToStore = transfer({
        contract,
        to: toAddressStore,
        amount: sendAmountToStore,
      });


      const { transactionHash } = await sendTransaction({
        account: account,
        transaction: transactionSendToStore,
      });

      //console.log("transactionHash", transactionHash);

      transactionHashResult = transactionHash;


    
    } else {

      console.log("isSmartAccount is false, toAddressStore", toAddressStore);


      // /backend-wallet/{chain}/transfer
      /*
      {
        "to": "0x152e208d08cd3ea1aa5d179b2e3eba7d1a733ef4",
        "currencyAddress": "0x0000000000000000000000000000000000000000",
        "amount": "string",
        "txOverrides": {
          "gas": "530000",
          "maxFeePerGas": "1000000000",
          "maxPriorityFeePerGas": "1000000000",
          "value": "10000000000"
        }
      }
      */
      // if chain if "polygon" then chainId is 137
      const chainId = chain === "polygon" ? polygon.id : arbitrum.id;

      // https://cors.redoc.ly/contract/{chain}/{contractAddress}/erc20/transfer
      /*
      {
        "toAddress": "0x3EcDBF3B911d0e9052b64850693888b008e18373",
        "amount": "0.1"
        }
      */


      /*
      console.log("process.env.THIRDWEB_ENGINE_URL", process.env.THIRDWEB_ENGINE_URL);

      const contractAccress = chain === "polygon" ? tokenContractAddressUSDT : contractAddressArbitrum;

      const url = process.env.THIRDWEB_ENGINE_URL + "/contract/" + chainId + '/' + contractAccress + "/erc20/transfer";

      console.log("url", url);

      const resp = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + process.env.THIRDWEB_ENGINE_ACCESS_TOKEN,
          "x-backend-wallet-address": escrowWalletAddress,
        },
        body: JSON.stringify({
          toAddress: toAddressStore,
          amount: sendAmountToStore,
        }),
      });
      */


      
      const url = process.env.THIRDWEB_ENGINE_URL + "/backend-wallet/" + chainId + "/transfer";

      ///console.log("url", url);

      // replacement transaction underpriced

      const resp = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + process.env.THIRDWEB_ENGINE_ACCESS_TOKEN,
          "x-backend-wallet-address": escrowWalletAddress,
        },
        body: JSON.stringify({
          to: toAddressStore,
          currencyAddress: chain === "polygon" ? tokenContractAddressUSDT : contractAddressArbitrum,
          amount: sendAmountToStore,

          /*
          txOverrides: {
            gas: "530000",
            maxFeePerGas: "1000000000",
            
            //maxPriorityFeePerGas: "1000000000",
            maxPriorityFeePerGas: "5000000000",

            value: "10000000000",
          },
          */
          // Base: 0.000000035 Gwei |Max: 30.00000005 Gwei |Max Priority: 30 Gwei

          /*
          txOverrides: {
            gas: "830000",
            maxFeePerGas: "5000000000",
            maxPriorityFeePerGas: "5000000000",
            value: "50000000000",
          },
          */

        }),
      });
      
          

      /*
      {
        "result": {
          "transactionHash": "string"
        }
      }
      */

      //console.log("resp", resp);


      if (!resp) {
        return NextResponse.json({
          result: null,
        });
      }

      const responseJson = await resp.json();

      console.log("responseJson", responseJson);

      queueId = responseJson.result.queueId;

      ///const hash = responseJson.result.transactionHash;

      transactionHashResult = "0x";

    }








    
    console.log("Sent successfully!");

    //console.log(`Transaction hash: ${sendDataStore.transactionHash}`);
  

    const result = await buyOrderConfirmPayment({
      lang: lang,
      chain: chain,
      orderId: orderId,
      paymentAmount: paymentAmount,
      
      queueId: queueId,

      transactionHash: transactionHashResult,

    });
  
  
    //console.log("result", JSON.stringify(result));
  
    const {
      nickname: nickname,
      tradeId: tradeId,
    } = result as UserProps;
  
  
  
    const amount = usdtAmount;
  
  
      // send sms


    if (!buyer?.mobile) {
      return NextResponse.json({
        result,
      });
    }


    // check buyer.mobile is prefixed with +
    if (!buyer?.mobile.startsWith("+")) {
      return NextResponse.json({
        result,
      });
    }



    const to = buyer.mobile;


    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const client = twilio(accountSid, authToken);



    let message = null;


    try {


      const msgBody = `[PPUMP] TID[${tradeId}] You received ${amount} USDT from ${nickname}! https://gold.goodtether.com/${lang}/${chain}/sell-usdt/${orderId}`;
  
      message = await client.messages.create({
        ///body: "This is the ship that made the Kessel Run in fourteen parsecs?",
        body: msgBody,
        from: "+17622254217",
        to: to,
      });
  
      console.log(message.sid);

    } catch (error) {
        
      console.log("error", error);
  
    }

  
  
  
  
    
    return NextResponse.json({
  
      result,
      
    });









  } catch (error) {
      
    console.log(" error=====>" + error);



  }

  


 
  return NextResponse.json({

    result: null,
    
  });
  
}

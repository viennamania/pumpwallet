import { NextResponse, type NextRequest } from "next/server";

import {
  UserProps,
  getOneByWalletAddress,

  setEscrowWalletAddressByWalletAddress,

} from '@lib/api/user';


import { ethers } from "ethers";

import {
  createThirdwebClient,
  eth_getTransactionByHash,
  getContract,
  sendAndConfirmTransaction,
  
  sendBatchTransaction,


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


//import { Engine } from "@thirdweb-dev/engine";

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




export async function POST(request: NextRequest) {

  const body = await request.json();

  const { lang, chain, walletAddress, isSmartAccount } = body;

  console.log("lang", lang);
  console.log("chain", chain);
  console.log("walletAddress", walletAddress);






  
  try {


    // get user by wallet address

    const user = await getOneByWalletAddress(walletAddress);

    ///console.log("user", user);

    if (!user) {
      return NextResponse.json({
        result: null,
      });
    }

    let escrowWalletAddress = user.escrowWalletAddress;

    //console.log("escrowWalletAddress", escrowWalletAddress);

    if (escrowWalletAddress) {
      return NextResponse.json({
        result: {
          escrowWalletAddress: escrowWalletAddress,
        }
      });
    }



    let escrowWalletPrivateKey = '';

    if (!isSmartAccount) {


      const resp = await fetch(process.env.THIRDWEB_ENGINE_URL + "/backend-wallet/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + process.env.THIRDWEB_ENGINE_ACCESS_TOKEN,
        },
        body: JSON.stringify({
          label: user.id,
        }),
      });

      ///console.log("resp", resp);


      if (!resp) {
        return NextResponse.json({
          result: null,
        });
      }

      const resultCreateWallet = await resp.json();

      ///console.log("resultCreateWallet", resultCreateWallet);


      /*
      {
        "result": {
          "walletAddress": "0x....",
          "status": "success"
        }
      }
      */

      if (!resultCreateWallet) {
        return NextResponse.json({
          result: null,
        });
      }


      escrowWalletAddress = resultCreateWallet.result.walletAddress;

    } else {


    
      escrowWalletPrivateKey = ethers.Wallet.createRandom().privateKey;

      //console.log("escrowWalletPrivateKey", escrowWalletPrivateKey);

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

        factoryAddress: "0x9Bb60d360932171292Ad2b80839080fb6F5aBD97", // your own deployed account factory address
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

 
      escrowWalletAddress = account.address;

    }



    const result = await setEscrowWalletAddressByWalletAddress(
      walletAddress,
      escrowWalletAddress,
      escrowWalletPrivateKey,
    );

    //console.log("setEscrowWalletAddressByWalletAddress result", result);


    if (!result) {
      return NextResponse.json({
        result: null,
      });
    }

    return NextResponse.json({
      result: {
        escrowWalletAddress: escrowWalletAddress,
      }
    });



  } catch (error) {
      
    console.log(" error=====>" + error);

  }

  
  return NextResponse.json({
    result: null,
  });


}
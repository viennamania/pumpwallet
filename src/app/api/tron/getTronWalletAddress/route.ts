import { NextResponse, type NextRequest } from "next/server";

import {
  getOneByWalletAddress,

  setTronWalletAddressByWalletAddress,

} from '@lib/api/user';


import twilio from "twilio";

/*
const TronWeb = require('tronweb');
var crypto = require('crypto');
*/

import { TronWeb, utils as TronWebUtils, Trx, TransactionBuilder, Contract, Event, Plugin } from 'tronweb';


export async function POST(request: NextRequest) {

  const body = await request.json();

  const { lang, chain, walletAddress } = body;

  
  //console.log("body", body);

  // check if wallet address already exists and tronWalletAddress is empty

  const user = await getOneByWalletAddress(walletAddress);

  if (!user) {
    return NextResponse.json({
      result: null,
    });
  }

  if (user && user.tronWalletAddress) {
    return NextResponse.json({
      result: {
        status: 'success',
        message: 'Wallet already exists',
        tronWalletAddress: user.tronWalletAddress,
      }
    });
  }


  const newWallet = await TronWeb.createAccount();
  ////console.log("newWallet", newWallet);

  const tronWalletAddress = newWallet.address.base58;
  const tronWalletPrivateKey = newWallet.privateKey;

  console.log("tronWalletAddress", tronWalletAddress);


  

  // save tronWalletAddress to user
  const result = await setTronWalletAddressByWalletAddress(
    walletAddress,
    tronWalletAddress,
    tronWalletPrivateKey
  );

  if (!result) {
    return NextResponse.json({
      result: null,
    });
  }

 
  return NextResponse.json({

    result: {
      status: 'success',
      message: 'Wallet created successfully',
      tronWalletAddress: tronWalletAddress,
    }
    
  });
  
}

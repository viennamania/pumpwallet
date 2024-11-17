import { NextResponse, type NextRequest } from "next/server";


import { TronWeb, utils as TronWebUtils, Trx, TransactionBuilder, Contract, Event, Plugin } from 'tronweb';


export async function POST(request: NextRequest) {

  const body = await request.json();

  const { lang, chain, tronWalletAddress } = body;

  
  try {

    const tronWeb = new TronWeb({
      fullHost: 'https://api.trongrid.io',
      /*
      headers: {
        'TRON-PRO-API-KEY': process.env.TRONGRID_API_KEY,
      },
      */
    });

    const balance = await tronWeb.trx.getBalance(tronWalletAddress);

    console.log("balance", balance);

    const tronBalance = tronWeb.fromSun(balance);

    console.log("tronBalance", tronBalance);

    return NextResponse.json({
      result: {
        tronBalance: tronBalance,
      }
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json({
      result: null,
    });

  }



}

import { NextResponse, type NextRequest } from "next/server";


import { TronWeb, utils as TronWebUtils, Trx, TransactionBuilder, Contract, Event, Plugin } from 'tronweb';


export async function POST(request: NextRequest) {

  const body = await request.json();

  const { lang, chain, tronWalletAddress } = body;

  console.log("tronWalletAddress", tronWalletAddress);

  
  // USDT contract address
  const contractAddress = 'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t';


  // USDT balanceOf function signature


  /*
    try {
    const contract = await tronWeb.contract().at(tokenContractAddress);
    const balance = await contract.balanceOf(accountAddress).call();
    const normalizedBalance = tronWeb.fromSun(balance);
    console.log(`The TRC20 token balance is: ${normalizedBalance}`);
 } catch (error) {
    console.error(‘Error:’, error);
  }
  */


  try {

    const tronWeb = new TronWeb({
      fullHost: 'https://api.trongrid.io',
      
      headers: {

        //'TRON-PRO-API-KEY': process.env.TRONGRID_API_KEY,

        'TRON-PRO-API-KEY': '429a03b7-ef22-4723-867e-5dcfeef6f787',

      },

      privateKey: 'f4',
      
    });


    

    //const balance = await tronWeb.trx.getBalance(tronWalletAddress);

    const contract = await tronWeb.contract().at(contractAddress);

 
    const balance = await contract.balanceOf(tronWalletAddress).call();



    console.log("balance", balance);





    const usdtBalance = tronWeb.fromSun(balance);

    console.log("usdtBalance", usdtBalance);

    return NextResponse.json({
      result: {
        usdtBalance: usdtBalance,
      }
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json({
      result: null,
    });

  }



}

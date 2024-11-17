import { NextResponse, type NextRequest } from "next/server";

import {
  getAllAgents,
} from '@lib/api/user';

import {
  createThirdwebClient,
  getContract,
  sendTransaction,
  sendBatchTransaction,
  sendAndConfirmTransaction,
  SendBatchTransactionOptions,
  prepareContractCall,
} from "thirdweb";

import {
	mintTo,
	totalSupply,
	transfer,
	getBalance,
	balanceOf,
} from "thirdweb/extensions/erc20";

import { polygon } from "thirdweb/chains";


import {
  privateKeyToAccount,
  smartWallet,
  getWalletBalance,
 } from "thirdweb/wallets";

// Download the helper library from https://www.twilio.com/docs/node/install
import twilio from "twilio";


const client = createThirdwebClient({
  secretKey: process.env.THIRDWEB_SECRET_KEY || "",
});




export async function GET(request: NextRequest) {


  const result = await getAllAgents({
      limit: 1000,
      page: 1,
  });

  //console.log("result", result);
  /*
  result {
    totalCount: 60,
    users: [
      {
        walletAddress: '0xB14772C49cF09fCE035E1C092A5896044E87cC49',
        nickname: 'aaron',
        avatar: undefined,
        mobile: '+821032003963',
        email: null,
        tronWalletAddress: undefined,
        erc721ContractAddress: '0x1ADf35501D4Edde233C2e1D8b209417dEa4dDd8c'
      },
      {
        walletAddress: '0x7AB8091d4eDaD85BD38aCff1F744d59B56aC3E0E',
        nickname: 'ana01',
        avatar: 'https://vzrcy5vcsuuocnf3.public.blob.vercel-storage.com/tW5vLcU-OfYIUWiABDr7FWRNRyoU7G1HRFL2WK.png',
        mobile: '+821040948638',
        email: null,
        tronWalletAddress: 'TSQJtR2e3dX4kxUpqKusUvJHQ7M9cg6rP5',
        erc721ContractAddress: '0x1F57B863E0D8F6922097a071a643940916211aFC'
      },
    ]
  }
  */
  if (!result) {
    return NextResponse.json({
      result: [],
    });
    
  }

  /*

  const walletPrivateKey = "";

  const factoryAddress = "0x9Bb60d360932171292Ad2b80839080fb6F5aBD97";


  // smartwallet account
  const personalAccount = privateKeyToAccount({
    client,
    privateKey: walletPrivateKey
  }); // private key account

  const wallet = smartWallet({
    chain: polygon,
    factoryAddress: factoryAddress,
    sponsorGas: true,
  });



  // Connect the smart wallet
  const account = await wallet.connect({
    client: client,
    personalAccount: personalAccount,
  });


  console.log("address", account.address);
  // 0x0d547FA182Fdf2a5eb4E2D0f232A508d6E67fda8



  const contractAddressUSDT = "0xc2132D05D31c914a87C6611C10748AEb04B58e8F"; //USDT erc20 contract address for polygon


  const contractUSDT = getContract(
    {
      client,
      chain: polygon,
      address: contractAddressUSDT,
    }
  );


  
  let transactions = [] as any;

  result.users.map((user: any) => {
      
      const amount = 0.01;
  
      const transaction = transfer({
        contract: contractUSDT,
        to: user.walletAddress,
        amount: amount,
      });
  
      transactions.push(transaction);
  
  } );

  

  

  const batchOptions: SendBatchTransactionOptions = {
    account: account,
    transactions: transactions,
  };


  const batchResponse = await sendBatchTransaction(
    batchOptions
  );

  ///console.log("batchResponse", batchResponse);

  return NextResponse.json({
    result: batchResponse,
  });

  */

  return NextResponse.json({
    result,
  });
  
  
}

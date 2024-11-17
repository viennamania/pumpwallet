import { NextResponse, type NextRequest } from "next/server";

import { Network, Alchemy } from 'alchemy-sdk';




const settings = {
  apiKey: process.env.ALCHEMY_API_KEY,
  network: Network.MATIC_MAINNET,
};

const alchemy = new Alchemy(settings);



export async function POST(request: NextRequest) {

  const body = await request.json();

  const {
    erc721ContractAddress,
  } = body;


  /*
  const response = await alchemy.nft.getNftsForOwner(
    walletAddress, {
    omitMetadata: false, // // Flag to omit metadata
    contractAddresses: [erc721ContractAddress],
  });
  */
 
  const response = await alchemy.nft.getNftsForContract(
    erc721ContractAddress, {
    omitMetadata: false, // // Flag to omit metadata
  });




  

  if (!response) {
    return NextResponse.json({
      result: [],
    });
    
  }

 
  return NextResponse.json({

    result: response,
    
  });
  
}

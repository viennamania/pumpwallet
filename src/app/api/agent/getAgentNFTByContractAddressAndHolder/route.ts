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
    holderAddress
  } = body;

  console.log("erc721ContractAddress: ", erc721ContractAddress);
  console.log("holderAddress: ", holderAddress);

  const  owner  = holderAddress;
  //Define the optional `options` parameters
  const options = {
    //excludeFilters: "SPAM"
    contractAddresses: [erc721ContractAddress],

  };
  
  //Call the method to get the nfts owned by this address
  let response = await alchemy.nft.getNftsForOwner(owner, options);

  
  /*
  const response = await alchemy.nft.getNftsForOwner(
    holderAddress,{
    omitMetadata: false, // // Flag to omit metadata
    contractAddresses: [erc721ContractAddress],
  });
  */

  console.log("response: ", response);
  
 
  /*
  const response = await alchemy.nft.getNftsForContract(
    erc721ContractAddress, {
    omitMetadata: false, // // Flag to omit metadata
  });
  */




  

  if (!response) {
    return NextResponse.json({
      result: [],
    });
    
  }

 
  return NextResponse.json({

    result: response,
    
  });
  
}

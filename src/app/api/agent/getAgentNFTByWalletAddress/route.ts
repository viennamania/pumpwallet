import { NextResponse, type NextRequest } from "next/server";

import { Network, Alchemy } from 'alchemy-sdk';


import {
  getAllErc721ContractAddresses,
} from '@lib/api/user';


const settings = {
  apiKey: process.env.ALCHEMY_API_KEY,
  network: Network.MATIC_MAINNET,
};

const alchemy = new Alchemy(settings);



export async function POST(request: NextRequest) {

  const body = await request.json();

  const {
    walletAddress,
    ///erc721ContractAddress,
  } = body;


  console.log("walletAddress", walletAddress);

  // get erc721ContractAddress array from the database

  //const erc721ContractAddresses = await getAllErc721ContractAddresses();

  //console.log("erc721ContractAddresses", erc721ContractAddresses);


  /*
  // {"error":{"message":"Contract address filter size of: 58 is greater than the maximum allowed of: 45!"}}

  // 45 of erc721ContractAddresses is the maximum allowed
  // so we need to limit the erc721ContractAddresses to 45


  let finalResult: any = [];



  let contractAddresses = erc721ContractAddresses.slice(0, 45);

  const response = await alchemy.nft.getNftsForOwner(
    walletAddress, {
    omitMetadata: false, // // Flag to omit metadata
    ////contractAddresses: [erc721ContractAddress],

    contractAddresses: contractAddresses,
  });

  response?.ownedNfts?.map((nft) => {
    finalResult.push(nft);
  });

  //console.log("finalResult", finalResult);

  if (erc721ContractAddresses.length <= 45) {
    return NextResponse.json({
      result: {
        ownedNfts: finalResult,
      }
    });
  }


  

  contractAddresses = erc721ContractAddresses.slice(45, 90);
  const response2 = await alchemy.nft.getNftsForOwner(
    walletAddress, {
    omitMetadata: false, // // Flag to omit metadata
    ////contractAddresses: [erc721ContractAddress],

    contractAddresses: contractAddresses,
  });

  response2?.ownedNfts?.map((nft) => {
    finalResult.push(nft);
  });


  //console.log("finalResult", finalResult);
  

  if (!response) {
    return NextResponse.json({
      result: {
        ownedNfts: [],
      }
    });
    
  }

  */

  let finalResult: any = [];

  const response = await alchemy.nft.getNftsForOwner(
    walletAddress, {
    omitMetadata: false, // // Flag to omit metadata
  });

  ///console.log("response?.ownedNfts", response?.ownedNfts);



  response?.ownedNfts?.map((nft) => {

    //console.log("nft", nft);

    const agentContractAddress = nft.contract.address;
    const agentNumber = nft.tokenId;

    // api call to get application count for the agent

    finalResult.push(nft);
  });


 
  return NextResponse.json({

    result: {
      ownedNfts: finalResult,
    }
    
  });
  
}

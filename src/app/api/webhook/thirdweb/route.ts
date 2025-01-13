import { NextResponse, type NextRequest } from "next/server";

/*
import {
  UserProps,
	acceptBuyOrder,
  updateBuyOrderByQueueId,
} from '@lib/api/order';
*/

import {
  getOneByWalletAddress
} from '@lib/api/user';

import {
  insertOne,
} from '@lib/api/transfer';



export async function POST(request: NextRequest) {

  const body = await request.json();


  ////console.log("body", body);


  /*
  const {
    queueId,
    status,
    chainId,
    fromAddress,
    toAddress,
    data,
    value,
    nonce,
    deployedContractAddress,
    deployedContractType,
    functionName,
    functionArgs,
    extension,
    gasLimit,
    gasPrice,
    maxFeePerGas,
    maxPriorityFeePerGas,
    transactionType,
    transactionHash,
    queuedAt,
    sentAt,
    minedAt,
    cancelledAt,
    errorMessage,
    sentAtBlockNumber,
    blockNumber,
    retryCount,
    onChainTxStatus,
    onchainStatus,
    effectiveGasPrice,
    cumulativeGasUsed,
    signerAddress,
    accountAddress,
    target,
    sender,
    initCode,
    callData,
    callGasLimit,
    verificationGasLimit,
    preVerificationGas,
    paymasterAndData,
    userOpHash,
    retryGasValues,
    retryMaxFeePerGas,
    retryMaxPriorityFeePerGas,
  } = body;
  */

  /*
  body {
    type: 'event-log',
    data: {
      chainId: 137,
      contractAddress: '0xc2132d05d31c914a87c6611c10748aeb04b58e8f',
      blockNumber: 66572232,
      transactionHash: '0x4bb6866dee52a97254b73bcbf0e4ba1a3964c88efa4f72d37c6016dbf18eb382',
      topics: [
        '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
        '0x00000000000000000000000076d9553f9910c5cf1f5dbbb210dc95bc5a63ee68',
        '0x0000000000000000000000006a34bc58416381ad92aaae770256ed09ce2b2ec9'
      ],
      data: '0x000000000000000000000000000000000000000000000000000000000661ea89',
      eventName: 'Transfer',
      decodedLog: { to: [Object], from: [Object], value: [Object] },
      timestamp: 1736605148000,
      transactionIndex: 3,
      logIndex: 15
    }
  }
  */


  //console.log("status", status);

  /*
  if (status === "mined") {

    
    const result = await updateBuyOrderByQueueId({
      queueId,
      transactionHash,
      minedAt,
    });

    console.log("updateBuyOrderByQueueId", result);

    if (result) {
      return NextResponse.json({
        result: "ok",
      });
    } else {
      return NextResponse.json({
        result: "error",
      });
    }
    

  }
  */

  const {
    data,
  } = body;

  const {
    chainId,
    contractAddress,
    blockNumber,
    transactionHash,
    topics,
    eventName,
    decodedLog,
    timestamp,
    transactionIndex,
    logIndex,
  } = data;


  //console.log("to", decodedLog.to, "from", decodedLog.from, "value", decodedLog.value);



  const toAddress = decodedLog.to.value;
  const fromAddress = decodedLog.from.value;
  const value = decodedLog.value.value;

  /*
  console.log("transactionHash", transactionHash, "transactionIndex", transactionIndex,
    "fromAddress", fromAddress, "toAddress", toAddress, "value", value,
    "timestamp", timestamp);
  */


  /*
  const userToAddress = await getOneByWalletAddress(toAddress);
  if (userToAddress) {
    console.log("userToAddress", userToAddress);
  }

  const userFromAddress = await getOneByWalletAddress(fromAddress);

  if (userFromAddress) {
    console.log("userFromAddress", userFromAddress);
  }
  */

  const result = insertOne({
    transactionHash,
    transactionIndex,
    fromAddress,
    toAddress,
    value,
    timestamp,
  });

  ///console.log("insertOne", result);

  

  return NextResponse.json({
    result: "ok",
  });

  

  /*
  Content-Type: application/json
  X-Engine-Signature: <payload signature>
  X-Engine-Timestamp: <Unix timestamp in seconds>
  */

  /*
body {
  queueId: '0215d127-7d9c-48ba-b5d6-c78f0bbecbeb',
  status: 'mined',
  chainId: '137',
  fromAddress: '0x865D4529EF3a262a7C63145C8906AeD9a1b522bD',
  toAddress: '0xc2132D05D31c914a87C6611C10748AEb04B58e8F',
  data: '0xa9059cbb0000000000000000000000005202a5853c338a38485fa11eda67ca95cb9fce99000000000000000000000000000000000000000000000000000000000015d1f0',
  value: '0',
  nonce: 34,
  deployedContractAddress: null,
  deployedContractType: null,
  functionName: 'transfer',
  functionArgs: '["0x5202a5853c338A38485Fa11eda67ca95cb9fce99","1.43","0xc2132d05d31c914a87c6611c10748aeb04b58e8f"]',
  extension: 'erc20',
  gasLimit: '530000',
  gasPrice: null,
  maxFeePerGas: '61908001546',
  maxPriorityFeePerGas: '61908001454',
  transactionType: 2,
  transactionHash: '0xec8fb837702f845c64bfe2e69d28095f450457b4ac31491122729bb8113f1783',
  queuedAt: '2024-09-08T03:52:17.828Z',
  sentAt: '2024-09-08T03:52:52.212Z',
  minedAt: '2024-09-08T03:53:23.705Z',
  cancelledAt: null,
  errorMessage: null,
  sentAtBlockNumber: 61559147,
  blockNumber: 61559150,
  retryCount: 0,
  onChainTxStatus: 1,
  onchainStatus: 'success',
  effectiveGasPrice: '61908001478',
  cumulativeGasUsed: '2178297',
  signerAddress: '0x865D4529EF3a262a7C63145C8906AeD9a1b522bD',
  accountAddress: null,
  target: null,
  sender: null,
  initCode: null,
  callData: null,
  callGasLimit: null,
  verificationGasLimit: null,
  preVerificationGas: null,
  paymasterAndData: null,
  userOpHash: null,
  retryGasValues: null,
  retryMaxFeePerGas: null,
  retryMaxPriorityFeePerGas: null
}

  */


  ///console.log("body", body);


  
}

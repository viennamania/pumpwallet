import { NextResponse, type NextRequest } from "next/server";

import {
  UserProps,
	acceptBuyOrder,
  updateBuyOrderByQueueId,
} from '@lib/api/order';

// Download the helper library from https://www.twilio.com/docs/node/install
import twilio from "twilio";
import { idCounter } from "thirdweb/extensions/farcaster/idRegistry";


export async function POST(request: NextRequest) {

  const body = await request.json();

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

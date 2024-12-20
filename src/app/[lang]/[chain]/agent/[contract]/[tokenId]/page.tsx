// send USDT
'use client';


import React, { use, useEffect, useState } from 'react';

import { toast } from 'react-hot-toast';
import { client } from '../../../../../client';

import {
    //ThirdwebProvider,
    ConnectButton,
  
    useConnect,
  
    useReadContract,
  
    useActiveWallet,

    useActiveAccount,
    useSendBatchTransaction,

    useConnectedWallets,

    useSetActiveWallet,
    
} from "thirdweb/react";

import {
    polygon,
    arbitrum,
} from "thirdweb/chains";

import {
    getContract,
    //readContract,
    sendTransaction,
    sendAndConfirmTransaction,
} from "thirdweb";

import { balanceOf, transfer } from "thirdweb/extensions/erc20";
 

 
import {
  getOwnedNFTs,
  transferFrom,
} from "thirdweb/extensions/erc721";


import {
  createWallet,
  inAppWallet,
} from "thirdweb/wallets";

import Image from 'next/image';

import AppBarComponent from "@/components/Appbar/AppBar";
import { getDictionary } from "../../../../../dictionaries";

import { useQRCode } from 'next-qrcode';




const wallets = [
  inAppWallet({
    auth: {
      options: ["phone"],
    },
  }),
];




const contractAddress = "0xc2132D05D31c914a87C6611C10748AEb04B58e8F"; // USDT on Polygon
const contractAddressArbitrum = "0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9"; // USDT on Arbitrum

const contractAddressTron = "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t"; // USDT on Tron




/*
const smartWallet = new smartWallet(config);
const smartAccount = await smartWallet.connect({
  client,
  personalAccount,
});
*/

import {
  useRouter,
  useSearchParams
} from "next//navigation";

import { Select } from '@mui/material';
import { Sen } from 'next/font/google';
import { Router } from 'next/router';
import path from 'path';

import { TronWeb, utils as TronWebUtils, Trx, TransactionBuilder, Contract, Event, Plugin } from 'tronweb';
import { stat } from 'fs';






export default function AgentPage({ params }: any) {

  const agentContractAddress = params.contract;
  const agentTokenId = params.tokenId;

  console.log("agentContractAddress", agentContractAddress);
  console.log("agentTokenId", agentTokenId);

  //console.log("params", params);

  const searchParams = useSearchParams();
 
 

  console.log("agentContractAddress", agentContractAddress);

  
  const [agent, setAgent] = useState({} as any);
  const [ownerWalletAddress, setOwnerWalletAddress] = useState("");
  const [ownerInfo, setOwnerInfo] = useState({} as any);

  const [loadingAgent, setLoadingAgent] = useState(false);
  useEffect(() => {
      
      const getAgent = async () => {

        setLoadingAgent(true);
  
        const response = await fetch('/api/agent/getAgentNFTByContractAddressAndTokenId', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            erc721ContractAddress: agentContractAddress,
            tokenId: agentTokenId,
          }),
        });

        if (!response) {
          setLoadingAgent(false);
          return;
        }
  
        const data = await response.json();

        //console.log("getAgentNFTByContractAddressAndTokenId data", data);

  
        setAgent(data.result);

        setOwnerWalletAddress(data?.ownerWalletAddress);

        setOwnerInfo(data?.ownerInfo);

        ////console.log("agent======", data.result);

        setLoadingAgent(false);
  
      };
  
      if (agentContractAddress && agentTokenId) getAgent();
  
  }, [agentContractAddress, agentTokenId]);

   
  ///console.log("agent", agent);

  ///console.log("loadingAgent", loadingAgent);
  
  
  const contract = getContract({
    // the client you have created via `createThirdwebClient()`
    client,
    // the chain the contract is deployed on
    
    
    chain: params.chain === "arbitrum" ? arbitrum : polygon,
  
  
  
    // the contract's address
    ///address: contractAddress,

    address: params.chain === "arbitrum" ? contractAddressArbitrum : contractAddress,


    // OPTIONAL: the contract's abi
    //abi: [...],
  });





  const [data, setData] = useState({
    title: "",
    description: "",

    menu : {
      buy: "",
      sell: "",
      trade: "",
      chat: "",
      history: "",
      settings: "",
    },

    Go_Home: "",
    My_Balance: "",
    My_Nickname: "",
    My_Buy_Trades: "",
    My_Sell_Trades: "",
    Buy: "",
    Sell: "",
    Buy_USDT: "",
    Sell_USDT: "",
    Contact_Us: "",
    Buy_Description: "",
    Sell_Description: "",
    Send_USDT: "",
    Pay_USDT: "",
    Coming_Soon: "",
    Please_connect_your_wallet_first: "",

    USDT_sent_successfully: "",
    Failed_to_send_USDT: "",

    Go_Buy_USDT: "",
    Enter_Wallet_Address: "",
    Enter_the_amount_and_recipient_address: "",
    Select_a_user: "",
    User_wallet_address: "",
    This_address_is_not_white_listed: "",
    If_you_are_sure_please_click_the_send_button: "",

    Sending: "",

    Anonymous: "",

    My_Wallet_Address: "",

  } );

  useEffect(() => {
      async function fetchData() {
          const dictionary = await getDictionary(params.lang);
          setData(dictionary);
      }
      fetchData();
  }, [params.lang]);

  const {
    title,
    description,
    menu,
    Go_Home,
    My_Balance,
    My_Nickname,
    My_Buy_Trades,
    My_Sell_Trades,
    Buy,
    Sell,
    Buy_USDT,
    Sell_USDT,
    Contact_Us,
    Buy_Description,
    Sell_Description,
    Send_USDT,
    Pay_USDT,
    Coming_Soon,
    Please_connect_your_wallet_first,

    USDT_sent_successfully,
    Failed_to_send_USDT,

    Go_Buy_USDT,
    Enter_Wallet_Address,
    Enter_the_amount_and_recipient_address,
    Select_a_user,
    User_wallet_address,
    This_address_is_not_white_listed,
    If_you_are_sure_please_click_the_send_button,

    Sending,

    Anonymous,

    My_Wallet_Address,

  } = data;



  const router = useRouter();



  const activeAccount = useActiveAccount();

  const address = activeAccount?.address;





  const [nickname, setNickname] = useState("");
  const [userCode, setUserCode] = useState("");
  const [avatar, setAvatar] = useState("/profile-default.png");

  useEffect(() => {
    const fetchData = async () => {
        const response = await fetch("/api/user/getUser", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                walletAddress: address,
            }),
        });

        const data = await response.json();

        if (data.result) {
            setNickname(data.result.nickname);
            
            data.result.avatar && setAvatar(data.result.avatar);
            

            setUserCode(data.result.id);


        } else {
            setNickname('');
            setAvatar('/profile-default.png');
            setUserCode('');
        }

    };

    if (address) fetchData();
    
  }, [address]);
 



  // get all applications
  const [applications, setApplications] = useState([] as any[]);
  const [loadingApplications, setLoadingApplications] = useState(false);
  useEffect(() => {
      const fetchData = async () => {

          setLoadingApplications(true);

          const response = await fetch("/api/agent/getReferApplications", {

              method: "POST",
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify({
                  page: 1,
                  limit: 10,
                  agentBot: agentContractAddress,
                  agentBotNumber: agentTokenId,
              }),
          });

          if (!response.ok) {
              console.error("Error fetching agents");
              setLoadingApplications(false);
              return;
          }

          const data = await response.json();

          console.log("getReferApplications data", data);



          const total = data.result.totalCount;

          setApplications(data.result.applications);

          setLoadingApplications(false);

      };

      if (agentContractAddress && agentTokenId) fetchData();

  }, [agentContractAddress, agentTokenId]);





  // transferFrom

  const [transferToAddress, setTransferToAddress] = useState("");

  const [loadingTransfer, setLoadingTransfer] = useState(false);

  const nftTransfer = async (to: string) => {

    if (!address) {
      toast.error("Please connect your wallet first");
      return
    }
    if (!to) {
      toast.error("Please enter the recipient's wallet address");
      return
    }

    setLoadingTransfer(true);

    const contract = getContract({
      client,
      chain: polygon,
      address: agentContractAddress,
    });

    const transaction = transferFrom({
      contract,
      from: address,
      to: to,
      tokenId: agentTokenId,
    });

    const { transactionHash } = await sendTransaction({
      account: activeAccount as any,
      transaction,
    });

    
    if (transactionHash) {

      setTransferToAddress("");

      // getAgent
      const response = await fetch('/api/agent/getAgentNFTByContractAddressAndTokenId', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          erc721ContractAddress: agentContractAddress,
          tokenId: agentTokenId,
        }),
      });
      if (response) {
        const data = await response.json();
        setAgent(data.result);
        setOwnerInfo(data.ownerInfo);
      }

      toast.success("NFT transferred successfully");

    } else {
        
      toast.error("Failed to transfer NFT");

    }

    setLoadingTransfer(false);

  }




    // check htx asset valuation for each applicationId
    const [checkingHtxAssetValuationForAgent, setCheckingHtxAssetValuationForAgent] = useState([] as any[]);
    const [htxAssetValuationForAgent, setHtxAssetValuationForAgent] = useState([] as any[]);

    useEffect(() => {
        setCheckingHtxAssetValuationForAgent(
            applications.map((item) => {
                return {
                    applicationId: item.id,
                    checking: false,
                }
            })
        );

        setHtxAssetValuationForAgent(
            applications.map((item) => {
                return {
                    applicationId: item.id,
                    assetValuation: item.assetValuation,
                };
            })
        );
    } , [applications]);

    const checkHtxAssetValuation = async (
        applicationId: number,
        htxAccessKey: string,
        htxSecretKey: string,
    ) => {

        if (!htxAccessKey) {
            toast.error("HTX Access Key를 입력해 주세요.");
            return;
        }

        if (!htxSecretKey) {
            toast.error("HTX Secret Key를 입력해 주세요.");
            return;
        }

        if (!applicationId) {
            toast.error("신청 ID를 입력해 주세요.");
            return;
        }

        setCheckingHtxAssetValuationForAgent(
            checkingHtxAssetValuationForAgent.map((item) => {
                if (item.applicationId === applicationId) {
                    return {
                        applicationId: applicationId,
                        checking: true,
                    }
                } else {
                    return item;
                }
            }
        ));


        const response = await fetch("/api/agent/getAssetValuation", {
        ///const response = await fetch("/api/htx/copytrading_account_transfer", {



            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                htxAccessKey: htxAccessKey,
                htxSecretKey: htxSecretKey,
                applicationId: applicationId,
            }),
        });

        const data = await response.json();

        

        ///console.log("getAssetValuation data.result", data.result);


        if (data.result?.status === "ok") {

            setHtxAssetValuationForAgent(
                htxAssetValuationForAgent.map((item) => {
                    if (item.applicationId === applicationId) {
                        return {
                            applicationId: applicationId,
                            assetValuation: data.result?.assetValuation,
                        }
                    } else {
                        return item;
                    }
                })
            );

            toast.success("HTX 자산 가치가 확인되었습니다.");
        } else {
            toast.error("HTX 자산 가치를 확인할 수 없습니다.");
        }

        setCheckingHtxAssetValuationForAgent(
            checkingHtxAssetValuationForAgent.map((item) => {
                if (item.applicationId === applicationId) {
                    return {
                        applicationId: applicationId,
                        checking: false,
                    }
                } else {
                    return item;
                }
            }
        ));

    };




    // getPositionList
    const [checkingPositionList, setCheckingPositionList] = useState([] as any[]);
    const [positionList, setPositionList] = useState([] as any[]);
    /*
    {"positions":
        [
            {"lever":"5","position_side":"long","contract_code":"BCH-USDT","open_avg_price":"377.48","volume":"136","margin_mode":"cross","position_margin":"103.53408","margin_rate":"0.033641785791011462","unreal_profit":"4.2976","profit":"4.2976","profit_rate":"0.041856522199851645","liquidation_price":"19.61"},
            {"lever":"5","position_side":"long","contract_code":"ONDO-USDT","open_avg_price":"0.7358","volume":"327","margin_mode":"cross","position_margin":"48.31752","margin_rate":"0.033641785791011462","unreal_profit":"0.977100000000000051","profit":"0.977100000000000051","profit_rate":"0.020304600173309145","liquidation_price":null},
            {"lever":"5","position_side":"long","contract_code":"MEW-USDT","open_avg_price":"0.009241","volume":"32","margin_mode":"cross","position_margin":"58.4384","margin_rate":"0.033641785791011462","unreal_profit":"-3.545999999999968","profit":"-3.545999999999968","profit_rate":"-0.05995171401713626","liquidation_price":null}
        ]
    }
    */


    useEffect(() => {
        setCheckingPositionList(
            applications.map((item) => {
                return {
                    applicationId: item.id,
                    checking: false,
                }
            })
        );

        setPositionList(
            applications.map((item) => {
                return {
                    applicationId: item.id,
                    positions: item?.positionList?.positions || [],
                    timestamp: item?.positionList?.timestamp || 0,
                    status: item?.positionList?.status || false,
                };
            })
        );
    } , [applications]);

    const getPositionList = async (
        applicationId: number,
        htxAccessKey: string,
        htxSecretKey: string,
    ) => {

        if (!htxAccessKey) {
            toast.error("HTX Access Key를 입력해 주세요.");
            return;
        }

        if (!htxSecretKey) {
            toast.error("HTX Secret Key를 입력해 주세요.");
            return;
        }

        if (!applicationId) {
            toast.error("신청 ID를 입력해 주세요.");
            return;
        }

        setCheckingPositionList(
            checkingPositionList.map((item) => {
                if (item.applicationId === applicationId) {
                    return {
                        applicationId: applicationId,
                        checking: true,
                    }
                } else {
                    return item;
                }
            })
        );

        const response = await fetch("/api/htx/position_list", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                htxAccessKey: htxAccessKey,
                htxSecretKey: htxSecretKey,
                applicationId: applicationId,
            }),
        });

        const data = await response.json();

        ///console.log("data.result", data.result);

        if (data.result?.status === "ok") {

            setPositionList(
                positionList.map((item) => {
                    if (item.applicationId === applicationId) {
                        return {
                            applicationId: applicationId,
                            positions: data.result?.data?.positions,
                            timestamp: data.result?.timestamp,
                            status: data.result?.status,
                        }
                    } else {
                        return item;
                    }
                })
            );

            toast.success("HTX 포지션 리스트가 확인되었습니다.");
        } else {
            toast.error("HTX 포지션 리스트를 확인할 수 없습니다.");
        }

        setCheckingPositionList(
            checkingPositionList.map((item) => {
                if (item.applicationId === applicationId) {
                    return {
                        applicationId: applicationId,
                        checking: false,
                    }
                } else {
                    return item;
                }
            })
        );

    }






  return (

    <main className="p-4 pb-10 min-h-[100vh] flex items-start justify-center container max-w-screen-lg mx-auto">

      <div className="py-0 w-full ">

        {/* goto home button using go back icon
        history back
        */}
        <AppBarComponent />



        {/*
        <div className="mt-4 flex justify-start space-x-4 mb-10">
            <button
              
              onClick={() => router.push(
                
                //'/' + params.lang + '/' + params.chain

                wallet === "smart" ?
                '/' + params.lang + '/' + params.chain + '/?wallet=smart'
                :
                '/' + params.lang + '/' + params.chain

              )}

              className="text-gray-600 font-semibold underline">
              {Go_Home}
            </button>
        </div>
        */}
        

        {/* header */}
        <div className="w-full flex flex-col items-start justify-center space-y-4">
          <div className="flex flex-row items-center gap-2">
            {address && userCode && (

              <div className="flex flex-row items-center gap-2">
                <Image
                  src={avatar}
                  width={50}
                  height={50}
                  alt="Agent"
                  className="rounded-lg
                    object-cover
                  "
                />

                <div className="p-2 bg-zinc-800 rounded text-zinc-100 text-xl font-semibold">
                    {nickname}
                </div>
              </div>

            )}


            {agent?.image?.thumbnailUrl && (
              <Image
                src={agent?.image?.thumbnailUrl}
                width={50}
                height={50}
                alt="Agent"
                className="rounded-lg"
              />
            )}

            <div className='flex flex-col items-start justify-center'>

              {!address && (

                <ConnectButton
                client={client}
                wallets={wallets}
                accountAbstraction={{
                  chain: polygon,
                   
                  sponsorGas: true
                }}
                theme={"light"}
                connectButton={{
                  label: "Sign in with AGENT Wallet",
                }}
                connectModal={{
                  size: "wide", 
                  titleIcon: "https://ppump.me/icon-pump-bot.png",                           
                  showThirdwebBranding: false,

                }}
                locale={"ko_KR"}
                //locale={"en_US"}
                />

              )}

            </div>

          </div>
        </div>






        {/* history back */}
        <div className='mt-5 flex flex-row items-center gap-2'>
          <button
            onClick={() => router.back()}
            className="flex flex-row items-center gap-2 bg-gray-500 text-white p-2 rounded-lg
              hover:bg-gray-600
            "
          >
            <Image
              src="/icon-back.png"
              width={24}
              height={24}
              alt="Back"
            />
            <span className='text-sm text-white'>
              뒤로가기
            </span>
          </button>
        </div>



        <div className="mt-10 flex flex-col items-start justify-center space-y-4">


          <div className='flex flex-row items-center gap-2'>
              <Image
                src='/icon-nft.png'
                width={30}
                height={30}
                alt='Agent'
                className='rounded-lg'
              />
              <span className='text-lg font-semibold text-gray-800'>
                  AI 에이전트 NFT 정보
              </span>
          </div>


          {/* agent nft info */}
          <div className={`w-full flex flex-col gap-5 p-4 rounded-lg border bg-gray-100
            ${address && ownerWalletAddress && address === ownerWalletAddress ? 'border-green-500' : 'border-gray-300'}
          `}>


            {address && ownerWalletAddress && address === ownerWalletAddress && (
              <div className='flex flex-row items-center gap-2'>
                {/* dot */}
                <div className='w-3 h-3 bg-red-500 rounded-full'></div>
                <span className='text-lg text-green-500 font-semibold'>
                    당신은 이 AI 에이전트 NFT의 소유자입니다.
                </span>
              </div>
            )}




            {agent && (

              <div className='w-full flex flex-col gap-5'>


                <div className='w-full flex flex-row gap-2 items-center justify-between'>
                    
                    <button
                        onClick={() => {
                            navigator.clipboard.writeText(
                                'https://ppump.me/kr/polygon/tbot/?agent=' +
                                agentContractAddress + '&tokenId=' + agentTokenId
                            );
                            toast.success('레퍼럴 URL 복사 완료');
                        }}
                        className="w-full p-2 bg-blue-500 text-zinc-100 rounded hover:bg-blue-600"
                    >
                        레퍼럴 URL 복사
                    </button>

                    {/* opensea */}
                    <button
                        onClick={() => {
                            window.open('https://opensea.io/assets/matic/' + agentContractAddress + '/' + agentTokenId);
                        }}
                        className="p-2 rounded hover:bg-gray-300"
                    >
                        <Image
                            src="/logo-opensea.png"
                            alt="OpenSea"
                            width={30}
                            height={30}
                            className="rounded-lg"
                        />
                    </button>

                </div>


                <div className='w-full flex flex-row items-center justify-between gap-2
                 border-b border-gray-300 pb-2
                '>
                    <Image
                      src='/smart-contract.png'
                      width={60}
                      height={60}
                      alt='Agent'
                      className='rounded-lg'
                    />

                  <div className='w-full flex flex-col xl:flex-row items-start justify-start gap-2'>
                      <div className='flex flex-col items-center justify-between gap-2'>
                        <span className='text-sm text-yellow-500'>
                          AI 에이전트 NFT 계약주소
                        </span>
                        <span className='text-sm text-gray-800 font-semibold'>
                            {agentContractAddress.slice(0, 10) + '...' + agentContractAddress.slice(-10)}
                        </span>
                      </div>
                      <div className='flex flex-col items-center justify-between gap-2'>
                        <span className='text-sm text-yellow-500'>
                            AI 에이전트 NFT 계약번호
                        </span>
                        <span className='text-lg text-gray-800 font-semibold'>
                            #{agentTokenId}
                        </span>
                      </div>

                  </div>

                </div>


                <div className='w-full grid grid-cols-1 xl:grid-cols-2 items-start justify-start gap-5'>


                  <div className='w-full flex flex-col items-start justify-start gap-2'>

                    <div className='w-full flex flex-col items-start justify-between gap-2
                      border-b border-gray-300 pb-2
                    '>

                      <div className='flex flex-col items-start justify-between gap-2'>
                        <span className='text-sm text-yellow-500'>
                            AI 에이전트 NFT 이름
                        </span>
                        <span className='text-xl font-semibold text-gray-800'>
                            {agent.name}
                        </span>
                      </div>
            
                      <div className='flex flex-col items-start justify-between gap-2'>
                        <span className='text-sm text-yellow-500'>
                            AI 에이전트 NFT 설명
                        </span>
                        <span className='text-xs text-gray-800'>
                            {agent.description}
                        </span>
                      </div>

                    </div>

                    <div className='mt-5 w-full flex flex-col items-start justify-between gap-2
                      border-b border-gray-300 pb-2
                    '>
                      {/* owner info */}
                      <div className='w-full flex flex-col items-start justify-between gap-2'>
                        
                        <span className='text-sm text-yellow-500'>
                            AI 에이전트 NFT 소유자 정보
                        </span>
                        <span className='text-xs text-gray-800'>
                            소유자 지갑주소: {ownerWalletAddress.slice(0, 10) + '...' + ownerWalletAddress.slice(-10)}
                        </span>

                        <div className='w-full flex flex-row items-center justify-start gap-2
                          border-b border-gray-300 pb-2
                        '>

                          <Image
                            src={ownerInfo?.avatar || '/profile-default.png'}
                            width={60}
                            height={60}
                            alt={ownerInfo?.nickname}
                            className='rounded-lg object-cover w-10 h-10'
                          />
                          <div className='flex flex-col items-start justify-between gap-2'>
                            <span className='text-xs text-gray-800'>
                                {ownerInfo?.nickname}
                            </span>
                            <span className='text-xs text-gray-800'>
                                {ownerInfo?.mobile && ownerInfo?.mobile?.slice(0, 3) + '****' + ownerInfo?.mobile?.slice(-4)}
                            </span>
                          </div>
                        </div>

                        {/* button for transfer owner */}
                        {address && ownerInfo?.walletAddress && address === ownerInfo?.walletAddress && (
                          <div className='w-full flex flex-col items-center justify-between gap-2'>
                            
                            <div className='w-full flex flex-col items-start justify-between gap-2'>
                              <span className='text-sm text-yellow-500'>
                                  소유권 이전하기
                              </span>
                              <div className='flex flex-row items-center justify-start gap-2'>
                                <div className='w-3 h-3 bg-red-500 rounded-full'></div>
                                <span className='text-xs text-gray-800'>
                                    소유권을 이전하면 소유자 권리를 모두 이전하는 것에 동의하는 것입니다.
                                </span>
                              </div>
                            </div>

                            <input
                              value={transferToAddress}
                              onChange={(e) => setTransferToAddress(e.target.value)}
                              type='text'
                              placeholder='이전할 지갑주소를 입력하세요.'
                              className={`w-full p-2 rounded border border-gray-300
                                ${loadingTransfer ? 'bg-gray-100' : 'bg-white'}
                              `}
                              
                              disabled={loadingTransfer}
                            />
                            <button
                              onClick={() => {
                                //alert('준비중입니다.');
                                confirm('소유권을 이전하시겠습니까?') &&
                                nftTransfer(transferToAddress);
                              }}
                              className={`
                                ${!transferToAddress || loadingTransfer ? 'bg-gray-300' : 'bg-blue-500 hover:bg-blue-600'}
                                text-white p-2 rounded
                              `}
                              disabled={
                                !transferToAddress ||
                                loadingTransfer
                              }
                            >
                              {loadingTransfer ? '소유권 이전중...' : '소유권 이전하기'}
                            </button>
                          </div>
                        )}



                      </div>

                    </div>
                    
                  </div>


                  <div className='w-full flex flex-col items-start justify-start gap-2'>
                    <span className='text-sm text-yellow-500'>
                        에이전트 NFT 이미지
                    </span>
                    {agent.image && (
                      <Image
                        //src={agent?.image?.thumbnailUrl}
                        src={agent?.image?.pngUrl}
                        width={200}
                        height={200}
                        alt={agent.name}
                        className='rounded-lg object-cover w-full animate-pulse'
                      />
                    )}
                  </div>

                </div>



              </div>

            )}

          </div>





          {/* application list */}
          <div className='mt-10 w-full flex flex-col gap-5'>

            <div className='flex flex-row items-center gap-2'>
                <Image
                    src='/logo-exchange-okx.png'
                    width={60}
                    height={60}
                    alt='htx'
                    className='rounded-lg animate-pulse'
                />
                
                <div className='flex flex-col items-start justify-center gap-2'>
                  <span className='text-lg font-semibold text-gray-800'>
                      HTX 신청목록
                  </span>
                </div>

            </div>

            {loadingApplications && (
              <div className='w-full flex flex-col gap-5
                border border-gray-300 p-4 rounded-lg bg-gray-100
              '>
                <div className='w-full flex flex-row items-center justify-between gap-2'>
                  <span className='text-xl font-semibold text-gray-800'>
                    Loading...
                  </span>
                </div>
              </div>
            )}

              <div className='w-full flex flex-col gap-5'>
                  {/* total count */}
                  <span className='text-lg text-gray-800'>
                      총 {applications.length}개의 신청이 있습니다.
                  </span>
              </div>

              <div className='w-full grid grid-cols-1 xl:grid-cols-3 gap-5'>

                {applications.map((application) => (
                    <div
                        key={application._id}
                        className='w-full flex flex-col gap-2
                        border border-gray-300 p-4 rounded-lg bg-gray-100
                    '>
                        {/* 신청번호 */}
                        <div className='w-full flex flex-row items-center justify-between gap-2'>
                            <span className='text-xl font-semibold text-gray-800'>
                                신청번호: #{application.id}
                            </span>
                        </div>
                        {/* 신청일 */}
                        <div className='w-full flex flex-row items-center justify-between gap-2
                          border-b border-gray-300 pb-2
                        '>
                            <span className='text-sm text-gray-800'>
                                신청일: {
                                application.createdAt
                                ? new Date(application.createdAt).toLocaleString()
                                : ''}
                            </span>
                        </div>

                        {/* is startTrading exist, if exist, show startTrading */}
                        {application.startTrading ? (
                            <div className='w-full flex flex-col items-start justify-between gap-2
                              border-b border-gray-300 pb-2
                            '>
                                <div className='flex flex-row items-center justify-between gap-2'>
                                  <Image
                                    src='/icon-bot-live.gif'
                                    width={80}
                                    height={30}
                                    alt='Bot'
                                    className='rounded-lg'
                                  />
                                  <span className='text-lg text-green-500'>
                                    거래시작
                                  </span>
                                </div>
                                <span className='text-sm text-gray-800'>
                                    거래시작일: {
                                    application.startTrading
                                    ? new Date(application.startTrading.timestamp).toLocaleString()
                                    : ''}
                                </span>
                            </div>
                        ) : (
                            <div className='w-full flex flex-col items-start justify-between gap-2
                              border-b border-gray-300 pb-2
                            '>
                                <span className='text-lg text-red-500'>
                                  거래준비중...
                                </span>
                                <span className='text-sm text-gray-800'>
                                    거래시작일: N/A
                                </span>
                            </div>
                        )}

                        {/* is endTrading exist, if exist, show endTrading */}

                        <div className='w-full flex flex-col items-start justify-between gap-2
                          border-b border-gray-300 pb-2
                        '>
                          <div className='w-full flex flex-row items-center justify-between gap-2'>
                              <span className='text-sm text-gray-800'>
                                  HTX UID: {application.htxUid}
                              </span>
                          </div>

                          <div className='w-full flex flex-row items-center justify-between gap-2'>
                              <span className='text-sm text-gray-800'>
                                  닉네임: {application.userName}
                              </span>
                          </div>
                          <div className='w-full flex flex-row items-center justify-between gap-2'>
                              <span className='text-sm text-gray-800'>
                                  핸드폰번호: {application.userPhoneNumber.slice(0, 3) + '****' + application.userPhoneNumber.slice(-4)}
                              </span>

                          </div>

                          <div className='w-full flex flex-row items-center justify-between gap-2'>
                              <span className='text-sm text-gray-800'>
                                  이메일주소: {application.userEmail.slice(0, 3) + '****' + application.userEmail.slice(-4)}
                              </span>
                          </div>

                          <div className='w-full flex-row items-center justify-between gap-2'>
                              <span className='text-xs text-gray-800'>
                                  매직월렛 USDT 지갑주소: {application.walletAddress.slice(0, 5) + '****' + application.walletAddress.slice(-5)}
                              </span>
                          </div>


                          {/*
                          <div className='w-full hidden flex-row items-center justify-between gap-2'>
                              <span className='text-xs text-gray-800'>
                                  HTX USDT(TRON) 지갑주소: {application.htxUsdtWalletAddress}
                              </span>
                          </div>

                          <div className='w-full flex flex-row items-center justify-between gap-2'>
                              <span className='text-sm text-gray-800'>
                                  API Access Key: {application.apiAccessKey.slice(0, 3) + '****' + application.apiAccessKey.slice(-4)}
                              </span>
                          </div>

                          <div className='w-full flex flex-row items-center justify-between gap-2'>
                              <span className='text-sm text-gray-800'>
                                  API Secret Key: {application.apiSecretKey.slice(0, 3) + '****' + application.apiSecretKey.slice(-4)}
                              </span>
                          </div>

                          */}
                          
                        </div>
                        

                        {/* assetValuation */}

                        <div className='w-full flex flex-row items-center justify-between gap-2'>
                          <div className='flex flex-col gap-2'>
                              <span className='text-xs text-yellow-800'>
                                  HTX 자산 가치(SPOT)
                              </span>
                              <span className='text-sm text-gray-800'>
                                  {htxAssetValuationForAgent.find((item) => item.applicationId === application.id)?.assetValuation?.balance || 0} $(USD)
                              </span>
                              {/* convert timestamp to date */}
                              <span className='text-xs text-gray-800'>
                                  {htxAssetValuationForAgent.find((item) => item.applicationId === application.id)?.assetValuation?.timestamp
                                  ? new Date(htxAssetValuationForAgent.find((item) => item.applicationId === application.id)?.assetValuation?.timestamp).toLocaleString()
                                  : ""
                                  }
                              </span>
                          </div>
                          <button
                              onClick={() => {
                                  checkHtxAssetValuation(
                                      application.id,
                                      application.apiAccessKey,
                                      application.apiSecretKey,
                                  );
                              }}
                              disabled={
                                  checkingHtxAssetValuationForAgent.find((item) => item?.applicationId === application.id)?.checking
                              }
                              className={`${checkingHtxAssetValuationForAgent.find((item) => item?.applicationId === application.id)?.checking ? "bg-gray-500" : "bg-blue-500"} text-white p-2 rounded-lg
                                  hover:bg-blue-600
                              `}
                          >
                              {checkingHtxAssetValuationForAgent.find((item) => item?.applicationId === application.id)?.checking ? "Checking..." : "Check"}
                          </button>
                        </div>


                  
                        {/* getPositionList */}
                        <div className='w-full flex flex-col items-start justify-between gap-2'>
                            
                            <div className='w-full flex flex-row items-center justify-between gap-2'>
                                <span className='text-xs text-yellow-800'>
                                    HTX 포지션 리스트
                                </span>
                                <button
                                    onClick={() => {
                                        getPositionList(
                                            application.id,
                                            application.apiAccessKey,
                                            application.apiSecretKey,
                                        );
                                    }}
                                    disabled={
                                        checkingPositionList.find((item) => item.applicationId === application.id)?.checking
                                    }
                                    className={`${checkingPositionList.find((item) => item.applicationId === application.id)?.checking ? "bg-gray-500" : "bg-blue-500"} text-white p-2 rounded-lg
                                        hover:bg-blue-600
                                    `}
                                >
                                    {checkingPositionList.find((item) => item.applicationId === application.id)?.checking ? "Checking..." : "Check"}
                                </button>

                            </div>

                            {/* timestamp */}
                            <span className='text-xs text-gray-800'>
                                {positionList.find((item) => item.applicationId === application.id)?.timestamp
                                ? new Date(positionList.find((item) => item.applicationId === application.id)?.timestamp).toLocaleString()
                                : ""
                                }
                            </span>

                            {/* check status */}
                            {positionList.find((item) => item.applicationId === application.id)?.status
                            ? (

                                <table className='w-full text-xs text-gray-800
                                    border border-gray-300 rounded-lg p-2 shadow-md bg-white divide-y divide-gray-300
                                '>
                                    <thead
                                        className='bg-gray-200 text-xs
                                        w-full rounded-lg
                                        '
                                    >

                                        <tr className='bg-gray-200 
                                            border border-gray-300
                                        '>
                                            <th className='text-center
                                                border border-gray-300
                                            '>
                                                Contract<br/>Side
                                            </th>
                                            <th className='text-center
                                                border border-gray-300
                                            '>
                                                Volumn<br/>Margin<br/>Profit<br/>Rate
                                            </th>
                                            <th className='text-center
                                                border border-gray-300
                                            '>
                                                Price
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody
                                        className='divide-y divide-gray-300'
                                    >
                                        {positionList.find((item) => item.applicationId === application.id)?.positions.map((position : any) => (
                                            <tr key={position.contract_code}
                                                className='border border-gray-300 bg-white
                                                hover:bg-gray-100
                                                '
                                            >
                                                <td className='text-right
                                                    border border-gray-300
                                                    p-2
                                                '>
                                                    <span className='text-xs text-gray-800 font-semibold'>
                                                    {/// ETH-USDT  delete -USDT
                                                        position.contract_code.replace("-USDT", "")
                                                    }
                                                    </span><br/>

                                                    {
                                                        position.position_side === "long" ? (
                                                            <span className='text-green-500 font-semibold'>
                                                                Long
                                                            </span>
                                                        ) : (
                                                            <span className='text-red-500 font-semibold'>
                                                                Short
                                                            </span>
                                                        )
                                                    }
                                                    
                                                </td>
                                                <td className='text-right
                                                    border border-gray-300
                                                    p-2
                                                '>
                                                    {position.volume}<br/>

                                                    {Number(position.position_margin).toFixed(2)}<br/>
                                            
                                                    {Number(position.profit).toFixed(2)}<br/>

                                                    {Number(position.profit_rate).toFixed(2)}%
                                                </td>
                                                <td className='text-right
                                                    border border-gray-300
                                                    p-2
                                                '>
                                                    {position.liquidation_price}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

                            ) : (

                                <span className='text-lg text-red-500 font-semibold'>
                                    
                                </span>

                            )}

                        </div>
                                            

                        {/* masterBot */}
                        {application?.masterBotInfo ? (
                          <div className='w-full flex flex-row items-center justify-between gap-2
                          '>
                              <span className='text-sm text-gray-800'>
                                Master Bot
                              </span>
                              <Image
                                src={application?.masterBotInfo?.imageUrl}
                                width={100}
                                height={100}
                                alt="MasterBot"
                                className="rounded-lg animate-pulse object-cover
                                  w-full h-full"
                              />
                          </div>
                        ) : (
                          <div className='w-full flex flex-row items-center justify-between gap-2
                          '>
                              <span className='text-sm text-blue-500'>
                                Master Bot 민팅중...
                              </span>
                              <Image
                                src='/loading.png'
                                width={50}
                                height={50}
                                alt='MasterBot'
                                className='rounded-lg animate-spin object-cover
                                  w-10 h-10'
                              />
                          </div>
                        )}

                        {/* agentBot */}




                    </div>
                ))}

              </div>



            </div>




        </div>

       </div>

    </main>

  );

}

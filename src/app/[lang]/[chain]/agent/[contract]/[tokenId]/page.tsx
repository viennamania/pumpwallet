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

  //console.log("agentContractAddress", agentContractAddress);
  //console.log("agentTokenId", agentTokenId);

  //console.log("params", params);

  const searchParams = useSearchParams();
 
 

  //console.log("agentContractAddress", agentContractAddress);

  
  const [agent, setAgent] = useState({} as any);
  
 
  const [holderWalletAddress, setHolderWalletAddress] = useState("");


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

        console.log("getAgentNFTByContractAddressAndTokenId data", data);

  
        setAgent(data.result);

        setOwnerInfo(data?.ownerInfo);
        setHolderWalletAddress(data?.ownerInfo?.walletAddress);


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
 


    const [totalTradingAccountBalance, setTotalTradingAccountBalance] = useState(0);
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

          ///console.log("getReferApplications data", data);



          const total = data.result.totalCount;

          setApplications(data.result.applications);

          setTotalTradingAccountBalance( data.result.totalTradingAccountBalance );

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






    // check api access key and secret key for each application
    const [checkingApiAccessKeyList, setCheckingApiAccessKeyList] = useState([] as any[]);
    const [apiAccessKeyList, setApiAccessKeyList] = useState([] as any[]);

    useEffect(() => {
        setCheckingApiAccessKeyList(
            applications.map((item) => {
                return {
                    applicationId: item.id,
                    checking: false,
                }
            })
        );

        setApiAccessKeyList(
            applications.map((item) => {
                return {
                    applicationId: item.id,
                    apiAccessKey: item.apiAccessKey,
                    apiSecretKey: item.apiSecretKey,
                    apiPassword: item.apiPassword,
                };
            })
        );
    }

    , [applications]);


    const checkApiAccessKey = async (
        applicationId: number,
        apiAccessKey: string,
        apiSecretKey: string,
        apiPassword: string,
    ) => {

        if (!apiAccessKey) {
            toast.error("API Access Key를 입력해 주세요.");
            return;
        }

        if (!apiSecretKey) {
            toast.error("API Secret Key를 입력해 주세요.");
            return;
        }

        if (!apiPassword) {
            toast.error("API Password를 입력해 주세요.");
            return;
        }

        if (!applicationId) {
            toast.error("신청 ID를 입력해 주세요.");
            return;
        }

        setCheckingApiAccessKeyList(
            checkingApiAccessKeyList.map((item) => {
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


       // api updateUID
       const response = await fetch("/api/okx/updateUID", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                applicationId: applicationId,
                apiAccessKey: apiAccessKey,
                apiSecretKey: apiSecretKey,
                apiPassword: apiPassword,

            }),
        });

        if (!response.ok) {
            console.error("Error checking api access key");
            return;
        }

        const data = await response.json();

        //console.log("updateHtxUID data", data);

        if (data.result?.status === "ok") {

            if (data.result?.okxUid === "0") {
                toast.error("API Access Key를 확인할 수 없습니다.");
            } else {

                toast.success("API Access Key가 확인되었습니다.");
            }

            //console.log("data.result", data.result);

            // update application
            setApplications(
                applications.map((item) => {
                    if (item.id === applicationId) {
                        return {
                            ...item,
                            okxUid: data.result?.okxUid,
                            accountConfig: data.result?.accountConfig,
                        }
                    } else {
                        return item;
                    }
                })
            );

        } else {
            toast.error("API Access Key를 확인할 수 없습니다.");
        }
        

        setCheckingApiAccessKeyList(
            checkingApiAccessKeyList.map((item) => {
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


    }






    // check tradingAccountBalance for each application
    const [checkingTradingAccountBalanceList, setCheckingTradingAccountBalanceList] = useState([] as any[]);
    const [tradingAccountBalanceList, setTradingAccountBalanceList] = useState([] as any[]);

    useEffect(() => {
        setCheckingTradingAccountBalanceList(
            applications.map((item) => {
                return {
                    applicationId: item.id,
                    checking: false,
                }
            })
        );

        setTradingAccountBalanceList(
            applications.map((item) => {
                return {
                    applicationId: item.id,
                    tradingAccountBalance: item.tradingAccountBalance,
                };
            })
        );
    } , [applications]);

    const checkTradingAccountBalance = async (
        applicationId: number,
        apiAccessKey: string,
        apiSecretKey: string,
        apiPassword: string,
    ) => {

        if (!apiAccessKey) {
            toast.error("API Access Key를 입력해 주세요.");
            return;
        }

        if (!apiSecretKey) {
            toast.error("API Secret Key를 입력해 주세요.");
            return;
        }

        if (!apiPassword) {
            toast.error("API Password를 입력해 주세요.");
            return;
        }

        if (!applicationId) {
            toast.error("신청 ID를 입력해 주세요.");
            return;
        }

        setCheckingTradingAccountBalanceList(
            checkingTradingAccountBalanceList.map((item) => {
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

        const response = await fetch("/api/okx/getTradingAccountBalance", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                apiAccessKey: apiAccessKey,
                apiSecretKey: apiSecretKey,
                apiPassword: apiPassword,
                applicationId: applicationId,
            }),
        });

        const data = await response.json();

        //console.log("data.result", data.result);

        if (data.result?.status === "ok") {

            setTradingAccountBalanceList(
                tradingAccountBalanceList.map((item) => {
                    if (item.applicationId === applicationId) {
                        return {
                            applicationId: applicationId,
                            tradingAccountBalance: data.result?.tradingAccountBalance,
                        }
                    } else {
                        return item;
                    }
                })
            );

            toast.success("거래 계정 잔고가 확인되었습니다.");
        } else {
            toast.error("거래 계정 잔고를 확인할 수 없습니다.");
        }

        setCheckingTradingAccountBalanceList(
            checkingTradingAccountBalanceList.map((item) => {
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


















    // check htx asset valuation for each htxUid
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

    const checkOkxAssetValuation = async (
        applicationId: number,
        okxAccessKey: string,
        okxSecretKey: string,
        okxPassword: string,
    ) => {

        if (!okxAccessKey) {
            toast.error("OKXAccess Key를 입력해 주세요.");
            return;
        }

        if (!okxSecretKey) {
            toast.error("OKXSecret Key를 입력해 주세요.");
            return;
        }

        if (!okxPassword) {
            toast.error("OKXPassword를 입력해 주세요.");
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


        const response = await fetch("/api/okx/getAssetValuation", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                apiAccessKey: okxAccessKey,
                apiSecretKey: okxSecretKey,
                apiPassword: okxPassword,
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

            toast.success("OKX자산 가치가 확인되었습니다.");
        } else {
            toast.error("OKX자산 가치를 확인할 수 없습니다.");
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






  return (

    <main className="p-4 pb-10 min-h-[100vh] flex items-start justify-center container max-w-screen-lg mx-auto">

      <div className="py-0 w-full ">

        {/* goto home button using go back icon
        history back
        */}
        <AppBarComponent />



        {/* history back */}
        {/* sticky top-0 bg-white */}
        <div className='
            sticky top-0 bg-white z-50
            flex flex-row items-center justify-between gap-4
            p-4
            w-full
        '>
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
                    object-cover w-10 h-10
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
                  titleIcon: "https://ppump.me/logo-marketing-center.webp",                           
                  showThirdwebBranding: false,

                }}
                locale={"ko_KR"}
                //locale={"en_US"}
                />

              )}

            </div>

          </div>
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
            ${address && holderWalletAddress && address === holderWalletAddress ? 'border-green-500' : 'border-gray-300'}
          `}>


            {address && holderWalletAddress && address === holderWalletAddress && (
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



                <div className='w-full flex flex-row items-center justify-between gap-2
                 border-b border-gray-300 pb-2
                '>
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
                            width={50}
                            height={50}
                            className="rounded-lg"
                        />
                    </button>

                  <div className='w-full flex flex-col xl:flex-row items-start justify-start gap-2'>
                      <div className='flex flex-col items-start justify-between gap-2'>
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
                        
                        <div className='w-full flex flex-row items-center justify-start gap-2'>
                            <span className='text-xs text-gray-800'>
                                소유자 지갑주소: {holderWalletAddress?.slice(0, 5) + '...' + holderWalletAddress?.slice(-5)}
                            </span>
                            {/* copy button */}
                            <button
                              onClick={() => {
                                navigator.clipboard.writeText(holderWalletAddress);
                                toast.success("Copied");
                              }}
                              className='bg-gray-500 text-white p-2 rounded-lg
                                hover:bg-gray-600
                              '
                            >
                                Copy
                            </button>
                        </div>
                        

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
                        {/*
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
                        */}



                      </div>

                    </div>
                    
                  </div>


                  <div className='w-full flex flex-col items-start justify-start gap-2'>
                    <span className='text-sm text-yellow-500'>
                        AI 에이전트 NFT 이미지
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
          <div className='mt-5
            w-full flex flex-col gap-5'>


            <div className='flex flex-row items-center gap-2'>
                
                <Image
                    src="/logo-exchange-okx.png"
                    alt="OKX"
                    width={50}
                    height={50}
                />
                <span className='text-lg font-semibold text-gray-800'>
                    OKX 신청목록
                </span>

                {/* reload button */}
                <button
                    onClick={() => {
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

                            const total = data.result.totalCount;

                            setApplications(data.result.applications);

                            setTotalTradingAccountBalance( data.result.totalTradingAccountBalance );


                            setLoadingApplications(false);

                        };
                        fetchData();
                    }}
                    disabled={loadingApplications}
                    className={`${loadingApplications ? "bg-gray-500" : "bg-blue-500"} text-white p-2 rounded-lg
                        hover:bg-blue-600
                    `}
                >
                    {loadingApplications ? "Loading..." : "Reload"}
                </button>
            </div>

            {loadingApplications && (
                <div className='w-full flex flex-col items-center justify-center'>
                    <Image
                        src="/loading.png"
                        alt="Loading"
                        width={50}
                        height={50}
                        className='animate-spin'
                    />
                </div>
            )}

            {/* goto copy trading account */}
            {/* https://www.okx.com/copy-trading/account/BA5BC36A6EDAB9E1 */}
            <div className='w-full flex flex-col gap-2'>
                <span className='text-lg text-gray-800'>
                    <a
                        href="https://www.okx.com/copy-trading/account/BA5BC36A6EDAB9E1"
                        target="_blank"
                        className='text-blue-500'
                    >
                        Copy Trading Account 바로가기
                    </a>
                </span>
            </div>


            {/* totalTradingAccountBalance */}
            {totalTradingAccountBalance > 0 && (
                <div className='w-full flex flex-col xl:flex-row items-start justify-between gap-5'>
                    {/* startTrading is exist count */}
                    <div className='w-full flex flex-row items-center gap-2'>
                        <span className='text-lg text-gray-800 font-semibold'>
                            시작된 Bot:
                        </span>
                        <span className='text-4xl text-green-500 font-semibold'>
                            {
                                applications.filter((item) => item.accountConfig?.data.roleType === "2").length
                            }
                        </span>
                    </div>
                    <div className='w-full flex flex-row items-center gap-2'>
                        <span className='text-lg text-gray-800 font-semibold'>
                            총 거래 계정 잔고:
                        </span>
                        <span className='text-4xl text-green-500 font-semibold'>
                            {
                            Number(totalTradingAccountBalance).toLocaleString('en-US', {
                                style: 'currency',
                                currency: 'USD'
                            })
                            }
                        </span>
                    </div>
                </div>
            )}


              <div className='w-full grid grid-cols-1 xl:grid-cols-3 gap-5'>

                {applications.map((application) => (

                    <div
                        key={application._id}
                        className={`w-full flex flex-col gap-5
                        border border-gray-300 p-4 rounded-lg bg-gray-100

                        ${application?.accountConfig?.data.roleType === "2" ? "border-2 border-green-500" : ""}

                        `}
                    >

                        {/* 신청번호, 신청일자 */}
                        <div className='w-full flex flex-col items-start justify-between gap-2
                            border-b border-gray-300 pb-2
                        '>
                            <div className='w-full flex flex-row items-center justify-between gap-2'>
                                <span className='text-lg font-semibold text-gray-800'>
                                    신청번호: #{application.id}
                                </span>

                                {application?.accountConfig?.data.roleType === "2" && (
                                    <Image
                                        src="/icon-trading-live.gif"
                                        alt="Trading"
                                        width={80}
                                        height={30}
                                    />
                                )}


                            </div>
                            {/*
                            <span className='text-sm text-gray-800'>
                                신청일자: {
                                    new Date(application.createdAt).toLocaleString()
                                }
                            </span>  
                            */}

                            {/* time ago */}
                            <span className='text-xs text-gray-800'>
                            {
                                new Date().getTime() - new Date(application.createdAt).getTime() < 1000 * 60 ? (
                                ' ' + Math.floor((new Date().getTime() - new Date(application.createdAt).getTime()) / 1000) + ' ' + '초 전'
                                ) :
                                new Date().getTime() - new Date(application.createdAt).getTime() < 1000 * 60 * 60 ? (
                                ' ' + Math.floor((new Date().getTime() - new Date(application.createdAt).getTime()) / 1000 / 60) + ' ' + '분 전'
                                ) : (
                                ' ' + Math.floor((new Date().getTime() - new Date(application.createdAt).getTime()) / 1000 / 60 / 60) + ' ' + '시간 전'
                                )
                            }
                            </span>                                              

                        </div>


                        {/* application?.center */}
                        <div className='w-full flex flex-row items-center justify-between gap-2'>
                            {/* 'https://t.me/' */}
                            <button
                                onClick={() => {
                                    window.open('https://t.me/' + application.center, '_blank');
                                }}
                                className="p-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                            >
                                <div className='flex flex-row items-center gap-2'>
                                    <Image
                                        src="/logo-telegram.webp"
                                        alt="Telegram"
                                        width={30}
                                        height={30}
                                        className='rounded-lg'
                                    />
                                    <span className='text-sm font-semibold'>
                                        {application.center}
                                    </span>
                                </div>
                            </button>

                        </div>




                        <div className='w-full flex flex-row items-center justify-between gap-2'>
                            <div className='flex flex-col gap-2'>
                                <span className='text-xs text-yellow-800'>
                                    OKX UID
                                </span>

                                {
                                    application?.okxUid === "0"
                                    ? (
                                        <span className='text-lg text-red-800 font-semibold'>
                                            API Access Key 오류
                                        </span>
                                    )
                                    : (
                                        <span className='text-sm text-gray-800'>
                                            {application.okxUid}
                                        </span>
                                    )
    
                                    
                                }

                            </div>

                            {/* checkApiAccessKey */}
                            {
                            (!application.okxUid || application.okxUid === "0") ? (
                                <button
                                    onClick={() => {
                                        checkApiAccessKey(
                                            application.id,
                                            application.apiAccessKey,
                                            application.apiSecretKey,
                                            application.apiPassword,
                                        );
                                    }}
                                    disabled={checkingApiAccessKeyList.find((item) => item.applicationId === application.id)?.checking}
                                    className={`${checkingApiAccessKeyList.find((item) => item.applicationId === application.id)?.checking ? "bg-gray-500" : "bg-blue-500"} text-white p-2 rounded-lg
                                        hover:bg-blue-600
                                    `}
                                >
                                    {checkingApiAccessKeyList.find((item) => item.applicationId === application.id)?.checking ? "Updating..." : "Update UID"}
                                </button>
                            )
                            :
                            (
                                <div className='flex flex-col gap-2'>
                                    <button
                                        onClick={() => {
                                            navigator.clipboard.writeText(application?.okxUid);
                                            toast.success("Copied to clipboard");
                                        }}
                                        className="bg-gray-500 text-white p-2 rounded-lg
                                            hover:bg-gray-600
                                        "
                                    >
                                        Copy
                                    </button>
                                    <button
                                        onClick={() => {
                                            checkApiAccessKey(
                                                application.id,
                                                application.apiAccessKey,
                                                application.apiSecretKey,
                                                application.apiPassword,
                                            );
                                        }}
                                        disabled={checkingApiAccessKeyList.find((item) => item.applicationId === application.id)?.checking}
                                        className={`${checkingApiAccessKeyList.find((item) => item.applicationId === application.id)?.checking ? "bg-gray-500" : "bg-blue-500"} text-white p-2 rounded-lg
                                            hover:bg-blue-600
                                        `}
                                    >
                                        {checkingApiAccessKeyList.find((item) => item.applicationId === application.id)?.checking ? "Updating..." : "Update UID"}
                                    </button>


                                </div>
                            )}
                        </div>


                        {/* accountConfig */}
                        {application?.accountConfig && (
                            <div className='w-full flex flex-col items-start justify-between gap-2'>
                                <div className='flex flex-col gap-2'>
                                    <span className='text-xs text-yellow-800'>
                                        KYC Level
                                    </span>
                                    <div className='flex flex-row items-center gap-2'>
                                        <span className='text-sm text-gray-800'>
                                            {application.accountConfig.data.kycLv}
                                        </span>
                                        {application.accountConfig.data.kycLv === "0" ? (
                                            <span className='text-lg text-red-800 font-semibold'>
                                                본인 인증 필요
                                            </span>
                                        ) : (
                                            <div className='flex flex-row items-center gap-2'>
                                                <span className='text-lg text-green-800 font-semibold'>
                                                    본인 인증 완료
                                                </span>
                                                <Image
                                                    src="/verified.png"
                                                    alt="Verified"
                                                    width={20}
                                                    height={20}
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* acctLv */}
                                {/*
                                1: Spot mode
                                2: Spot and futures mode
                                3: Multi-currency margin
                                4: Portfolio margin
                                */}
                                <div className='flex flex-col gap-2'>
                                    <span className='text-xs text-yellow-800'>
                                        Account mode
                                    </span>
                                    <div className='flex flex-row items-center gap-2'>
                                        <span className='text-sm text-gray-800'>
                                            {application.accountConfig.data.acctLv}
                                        </span>
                                        {application.accountConfig.data.acctLv === "1" ? (
                                            <span className='text-lg text-red-800 font-semibold'>
                                                Spot mode
                                            </span>
                                        ) : application.accountConfig.data.acctLv === "2" ? (
                                            <div className='flex flex-row items-center gap-2'>
                                                <span className='text-lg text-green-800 font-semibold'>
                                                    Spot and futures mode
                                                </span>
                                                <Image
                                                    src="/verified.png"
                                                    alt="Verified"
                                                    width={20}
                                                    height={20}
                                                />
                                            </div>
                                        ) : application.accountConfig.data.acctLv === "3" ? (
                                            <span className='text-lg text-red-800 font-semibold'>
                                                Multi-currency margin
                                            </span>
                                        ) : application.accountConfig.data.acctLv === "4" ? (
                                            <span className='text-lg text-red-800 font-semibold'>
                                                Portfolio margin
                                            </span>
                                        ) : (
                                            <span className='text-lg text-red-800 font-semibold'>
                                                Unknown
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/*
                                roleType
                                0: General user
                                1: Leading trader
                                2: Copy trader
                                3: API trader
                                */}
                                <div className='flex flex-col gap-2'>
                                    <span className='text-xs text-yellow-800'>
                                        Role type
                                    </span>
                                    <div className='flex flex-row items-center gap-2'>
                                        <span className='text-sm text-gray-800'>
                                            {application.accountConfig.data.roleType}
                                        </span>
                                        {application.accountConfig.data.roleType === "0" ? (
                                            <span className='text-lg text-red-800 font-semibold'>
                                                General user
                                            </span>
                                        ) : application.accountConfig.data.roleType === "1" ? (
                                            <span className='text-lg text-red-800 font-semibold'>
                                                Leading trader
                                            </span>
                                        ) : application.accountConfig.data.roleType === "2" ? (
                                            <div className='flex flex-row items-center gap-2'>
                                                <span className='text-lg text-green-800 font-semibold'>
                                                    Copy trader
                                                </span>
                                                <Image
                                                    src="/verified.png"
                                                    alt="Verified"
                                                    width={20}
                                                    height={20}
                                                />
                                            </div>
                                        ) : application.accountConfig.data.roleType === "3" ? (
                                            <span className='text-lg text-red-800 font-semibold'>
                                                API trader
                                            </span>
                                        ) : (
                                            <span className='text-lg text-red-800 font-semibold'>
                                                Unknown
                                            </span>
                                        )}
                                    </div>
                                </div>




                            </div>
                        )}



                        {/* tradingAccountBalance */}
                        <div className='w-full flex flex-row items-center justify-between gap-2'>
                            <div className='flex flex-col gap-2'>
                                <span className='text-xs text-yellow-800'>
                                    OKX 거래 계정 잔고
                                </span>
                                <span className='text-4xl text-green-800 font-semibold'>
                                    {
                                        Number(tradingAccountBalanceList.find((item) => item.applicationId === application.id)?.tradingAccountBalance?.balance)
                                        .toLocaleString('en-US', {
                                            style: 'currency',
                                            currency: 'USD'
                                        })
                                    }
                                </span>
                                {/* convert timestamp to date */}
                                <span className='text-xs text-gray-800'>
                                    {tradingAccountBalanceList.find((item) => item.applicationId === application.id)?.tradingAccountBalance?.timestamp
                                    ? new Date(tradingAccountBalanceList.find((item) => item.applicationId === application.id)?.tradingAccountBalance?.timestamp).toLocaleString()
                                    : ""
                                    }
                                </span>
                            </div>
                            <button
                                onClick={() => {
                                    checkTradingAccountBalance(
                                        application.id,
                                        application.apiAccessKey,
                                        application.apiSecretKey,
                                        application.apiPassword,
                                    );
                                }}
                                disabled={
                                    checkingTradingAccountBalanceList.find((item) => item.applicationId === application.id)?.checking
                                }
                                className={`${checkingTradingAccountBalanceList.find((item) => item.applicationId === application.id)?.checking ? "bg-gray-500" : "bg-blue-500"} text-white p-2 rounded-lg
                                    hover:bg-blue-600
                                `}
                            >
                                {checkingTradingAccountBalanceList.find((item) => item.applicationId === application.id)?.checking ? "Updating..." : "Update"}
                            </button>
                        </div>



                        {/* asset valuation */}
                        <div className='w-full flex flex-row items-center justify-between gap-2'>
                            <div className='flex flex-col gap-2'>
                                <span className='text-xs text-yellow-800'>
                                    OKX Funding Balance
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
                                    checkOkxAssetValuation(
                                        application.id,
                                        application.apiAccessKey,
                                        application.apiSecretKey,
                                        application.apiPassword,
                                    );
                                }}
                                disabled={
                                    checkingHtxAssetValuationForAgent.find((item) => item?.applicationId === application.id)?.checking
                                }
                                className={`${checkingHtxAssetValuationForAgent.find((item) => item?.applicationId === application.id)?.checking ? "bg-gray-500" : "bg-blue-500"} text-white p-2 rounded-lg
                                    hover:bg-blue-600
                                `}
                            >
                                {checkingHtxAssetValuationForAgent.find((item) => item?.applicationId === application.id)?.checking ? "Updating..." : "Update"}
                            </button>
                        </div>



                        <div className='w-full flex flex-col items-center justify-between gap-2
                            border-b border-gray-300 pb-2
                        '>

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
                        



                        {/* getPositionList */}
                        {/*
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

                            <span className='text-xs text-gray-800'>
                                {positionList.find((item) => item.applicationId === application.id)?.timestamp
                                ? new Date(positionList.find((item) => item.applicationId === application.id)?.timestamp).toLocaleString()
                                : ""
                                }
                            </span>

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
                        */}
                                            

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

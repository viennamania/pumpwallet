// nickname settings
'use client';
import React, { use, useEffect, useState } from 'react';



import { toast } from 'react-hot-toast';

import { client } from "../../../client";


import {
    getContract,
    //readContract,
    sendTransaction,
    sendAndConfirmTransaction,
} from "thirdweb";

import { balanceOf, transfer } from "thirdweb/extensions/erc20";
 


import {
    polygon,
    arbitrum,
} from "thirdweb/chains";

import {
    ConnectButton,
    useActiveAccount,
    useActiveWallet,
    useConnectModal,
} from "thirdweb/react";

import { inAppWallet } from "thirdweb/wallets";



import { getUserPhoneNumber } from "thirdweb/wallets/in-app";


import Image from 'next/image';

//import GearSetupIcon from "@/components/gearSetupIcon";

//import Uploader from '@/components/uploader';
//import { add } from 'thirdweb/extensions/farcaster/keyGateway';




import {
    useRouter,
    useSearchParams
  }from "next//navigation";

import AppBarComponent from "@/components/Appbar/AppBar";
import { getDictionary } from "../../../dictionaries";


import { deployERC721Contract } from 'thirdweb/deploys';





import {
    
    getNFT,
    getOwnedNFTs,
    mintTo
} from "thirdweb/extensions/erc721";


import { getContractMetadata } from "thirdweb/extensions/common";


import { Alert, useForkRef } from '@mui/material';


import thirdwebIcon from "@public/thirdweb.svg";
import { time } from 'console';
import { min } from 'moment';


const wallets = [
    inAppWallet({
      auth: {
        options: ["phone"],
      },
    }),
];


const contractAddress = "0xc2132D05D31c914a87C6611C10748AEb04B58e8F"; // USDT on Polygon
const contractAddressArbitrum = "0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9"; // USDT on Arbitrum



const erc1155ContractAddress = "0xd782447a0762966714a150dBC0E5a16fE488d566"; // Polygon

/*
const contractErc1155 = getContract({
    client,
    chain: polygon,
    address: erc1155ContractAddress,
});


const nftInfoTbot100 = await getNFT({
    contract: contractErc1155,
    tokenId: 0n,
});

console.log("nftInfoTbot100", nftInfoTbot100);

const nftInfoTbot1000 = await getNFT({
    contract: erc1155ContractAddress,
    tokenId: 1n,
});

const nftInfoTbot10000 = await getNFT({
    contract: erc1155ContractAddress,
    tokenId: 2n,
});
*/


const contractErc1155 = getContract({
    client,
    chain: polygon,
    address: erc1155ContractAddress,
});


export default function AIPage({ params }: any) {


    console.log("SettingsPage params", params);
    
    
    // get params from the URL

    const searchParams = useSearchParams();

    const wallet = searchParams.get('wallet');

    const agent = searchParams.get('agent');

    const agentNumber = searchParams.get('tokenId');
    
    
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

        Wallet_Settings: "",
        Profile_Settings: "",


        My_Wallet_Address: "",
        My_Phone_Number: "",
    
        Wallet_Address_Description1: "",
        Wallet_Address_Description2: "",
    
        I_understand_that_I_should_never_deposit_any_other_tokens: "",

        Copy: "",

        Disconnect_Wallet: "",


        Prompt_input_placeholder: "",

        Real_prompt: "",

        Generate_prompt: "",
    
        Reset_prompt: "",

        Generating_prompt: "",

        Download_Image: "",

        Downloading_Image: "",

        Alert_download_image_success: "",
    
        Make_OpenSea_Collection: "",

        Alert_OpenSea_Collection_made: "",

        If_you_make_an_OpenSea_collection: "",

        Making_OpenSea_Collection: "",

        OpenSea_Collection_Address: "",

        OpenSea_Collection: "",

        Mint_NFT: "",

        Alert_NFT_minted: "",

        Minting_NFT: "",

        Loading_my_images: "",
    
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

        Wallet_Settings,
        Profile_Settings,

        My_Wallet_Address,
        My_Phone_Number,

        Wallet_Address_Description1,
        Wallet_Address_Description2,

        I_understand_that_I_should_never_deposit_any_other_tokens,

        Copy,

        Disconnect_Wallet,


        Prompt_input_placeholder,

        Real_prompt,

        Generate_prompt,

        Reset_prompt,

        Generating_prompt,

        Download_Image,

        Downloading_Image,

        Alert_download_image_success,

        Make_OpenSea_Collection,

        If_you_make_an_OpenSea_collection,

        Making_OpenSea_Collection,

        Alert_OpenSea_Collection_made,

        OpenSea_Collection_Address,

        OpenSea_Collection,

        Mint_NFT,

        Alert_NFT_minted,

        Minting_NFT,

        Loading_my_images,

    } = data;
    
    
    






    const router = useRouter();

    // get the active wallet
    const activeWallet = useActiveWallet();



    const activeAccount = useActiveAccount();

    const address = activeAccount?.address || "";






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





    const [balance, setBalance] = useState(0);

    useEffect(() => {
  
      if (!address) return;
      // get the balance
  
  
      if (!contract) {
        return;
      }
  
      const getBalance = async () => {
  
        try {
          const result = await balanceOf({
            contract,
            address: address,
          });
      
          //console.log(result);
      
          setBalance( Number(result) / 10 ** 6 );
  
        } catch (error) {
          console.error("Error getting balance", error);
        }
  
      };
  
      if (address) getBalance();
  
      // get the balance in the interval
      /*
      const interval = setInterval(() => {
        getBalance();
      }, 1000);
  
  
      return () => clearInterval(interval);
        */
  
    } , [address, contract]);



    

    const [phoneNumber, setPhoneNumber] = useState("");

    useEffect(() => {
  
  
      if (activeAccount) {
  
        //const phoneNumber = await getUserPhoneNumber({ client });
        //setPhoneNumber(phoneNumber);
  
  
        getUserPhoneNumber({ client }).then((phoneNumber) => {
          setPhoneNumber(phoneNumber || "");
        });
  
  
  
      }
  
    } , [activeAccount]);


    const { connect, isConnecting } = useConnectModal();

    const handleConnect = async () => {
      await connect({
        chain: params.chain === "arbitrum" ? arbitrum : polygon,
        client,
        wallets,
  
        accountAbstraction: {
            chain: params.chain === "arbitrum" ? arbitrum : polygon,
              
            sponsorGas: true
        },

  
  
        showThirdwebBranding: false,
        theme: 'light',
        
        /*
        appMetadata: {
          name: "GoodTether",
          description: "GoodTether",
          url: "https://gold.goodtether.com",
          //icons: ["https://gold.goodtether.com/logo.png"],
        },
        */
  
        size: 'compact',
  
        /*
        size: 'wide',
  
        welcomeScreen: {
          title: "Custom Title",
          subtitle: "Custom Subtitle",
          img: {
            src: "https://example.com/image.png",
            width: 100,
            height: 100,
          },
        },
        */
      
       locale: 'en_US',
        
      });
    };
  

    
    const [nickname, setNickname] = useState("");


    const [nicknameEdit, setNicknameEdit] = useState(false);

    const [editedNickname, setEditedNickname] = useState("");


    const [userCode, setUserCode] = useState("");

    const [userAvatar, setUserAvatar] = useState("");


    const [userMasterBotContractAddress, setUserMasterBotContractAddress] = useState("");



    console.log("address", address);

    useEffect(() => {
        const fetchData = async () => {

            if (!address) {
                return;
            }

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

            console.log("data", data);


            if (data.result) {
                setNickname(data.result.nickname);
                setUserCode(data.result.id);
                setUserAvatar(data.result.avatar);
                setUserMasterBotContractAddress(data.result.masterBotContractAddress);

            }
        };

        fetchData();
    }, [address]);






    // get all applications
    const [isAdmin, setIsAdmin] = useState(false);

    const [applications, setApplications] = useState([] as any[]);
    const [loadingApplications, setLoadingApplications] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            setLoadingApplications(true);
            const response = await fetch("/api/agent/getApplicationsCenter", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    walletAddress: address,
                    center: 'ppump',
                }),
            });

            if (!response.ok) {
                console.error("Error fetching agents");
                setLoadingApplications(false);
                return;
            }

            const data = await response.json();

            ///const total = data.result.totalCount;


            setApplications(data.result.applications);

            setLoadingApplications(false);

            setIsAdmin(true);

        };

        if (address) {
            fetchData();
        }
    }, [address]);


    //console.log("applications", applications);





    // agentBot
    const [agentBot, setAgentBot] = useState(agent || "");



    // getNFt721 for agentBot (ERC721 contract address)

    const [agentBotErc721, setAgentBotErc721] = useState({} as any);

    const [agentBotImage, setAgentBotImage] = useState("/logo-masterbot100.png");

 
    useEffect(() => {

        const fetchData = async () => {

            if (agentBot === "") {
                return;
            }


            const contract = getContract({
                client,
                chain: polygon,
                address: agentBot,
            });

            const nft721 = await getNFT({
                contract: contract,
                tokenId: 0n,
            });

            /////console.log("nft721======", nft721);


            const metadata = await getContractMetadata({ contract });

            console.log("metadata======", metadata);
                

            //setAgentBotErc721(nft721);
            
            if (agentBot === "0x54DE6C9a312EB4e2240036f503e92b7Bab27B068") {
                setAgentBotImage("/logo-masterbot100.png");
            } else {
                setAgentBotImage("/logo-masterbot100.png");
            }

        };

        fetchData();

    } , [agentBot]);


    console.log("agentBotErc721", agentBotErc721);





    const [myAgent, setMyAgent] = useState({} as any);
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch("/api/agent/getMyAgent", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    walletAddress: address,
                }),
            });

            if (!response.ok) {
                console.error("Error fetching my agent");
                return;
            }

            const data = await response.json();

            console.log("data", data);

            setMyAgent(data.result);

        };
        fetchData();
    } , [address]);




    // get agentBot NFT for application
    const [checkingAgentBotNftList, setCheckingAgentBotNftList] = useState([] as any[]);
    const [agentBotNftList, setAgentBotNftList] = useState([] as any[]);

    useEffect(() => {
        setCheckingAgentBotNftList(
            applications.map((item) => {
                return {
                    applicationId: item.id,
                    checking: false,
                }
            })
        );

        setAgentBotNftList(
            applications.map((item) => {
                return {
                    applicationId: item.id,
                    agentBotNft: item.agentBotNft,
                };
            })
        );
    } , [applications]);

    const checkAgentBotNft = async (
        applicationId: number,
        agentBot: string,
        agentBotNumber: number,
    ) => {

        if (!agentBot) {
            toast.error("Agent Bot을 선택해 주세요.");
            return;
        }

        /*
        if (!agentBotNumber) {
            toast.error("Agent Bot Number를 입력해 주세요.");
            return;
        }
        */

        if (!applicationId) {
            toast.error("신청 ID를 입력해 주세요.");
            return;
        }

        setCheckingAgentBotNftList(
            checkingAgentBotNftList.map((item) => {
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

        /*
        const contract = getContract({
            client,
            chain: polygon,
            address: agentBot,
        });

        const nft721 = await getNFT721({
            contract: contract,
            tokenId: BigInt(agentBotNumber),
        });

        ///console.log("nft721", nft721);
        */
        
        

        // updateApplicationAgentBotNft
        const response = await fetch("/api/agent/updateApplicationAgentBotNft", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                applicationId: applicationId,

                agentBot: agentBot,
                agentBotNumber: agentBotNumber,

                //agentBotNft: nft721?.metadata
            }),
        });

        if (!response.ok) {
            console.error("Error updating agent bot NFT");
            return;
        }

        const data = await response.json();

        console.log("data", data);

        setAgentBotNftList(
            agentBotNftList.map((item) => {
                if (item.applicationId === applicationId) {
                    return {
                        applicationId: applicationId,
                        agentBotNft: data.result,
                    }
                } else {
                    return item;
                }
            })
        );





        setCheckingAgentBotNftList(
            checkingAgentBotNftList.map((item) => {
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
                };
            })
        );
    }

    , [applications]);


    const checkApiAccessKey = async (
        applicationId: number,
        apiAccessKey: string,
        apiSecretKey: string,
    ) => {

        if (!apiAccessKey) {
            toast.error("API Access Key를 입력해 주세요.");
            return;
        }

        if (!apiSecretKey) {
            toast.error("API Secret Key를 입력해 주세요.");
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

        /*
        // api getAccount
        const response = await fetch("/api/agent/getAccountAndUpdateApplication", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                applicationId: applicationId,
                htxAccessKey: apiAccessKey,
                htxSecretKey: apiSecretKey,
            }),
        });
        */
       // api updateHtxUID
       const response = await fetch("/api/agent/updateHtxUID", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                applicationId: applicationId,
                htxAccessKey: apiAccessKey,
                htxSecretKey: apiSecretKey,
            }),
        });

        if (!response.ok) {
            console.error("Error checking api access key");
            return;
        }

        const data = await response.json();

        //console.log("updateHtxUID data", data);

        if (data.result?.status === "ok") {
            toast.success("API Access Key가 확인되었습니다.");


            // update application
            setApplications(
                applications.map((item) => {
                    if (item.id === applicationId) {
                        return {
                            ...item,
                            htxUid: data.result?.htxUid,
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





    //console.log("applications=====", applications);


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








    // check account balance for each accountId

    //const [accountBalanceList, setAccountBalanceList] = useState([] as any[]);

    const [accountBalanceListForAgent, setAccountBalanceListForAgent] = useState([] as any[]);

    //const [checkingAccountBalance, setCheckingAccountBalance] = useState(false);


    const [checkingAccountBalanceForAgent, setCheckingAccountBalanceForAgent] = useState([] as any[]);


    const checkAccountBalance = async (
        htxAccessKey: string,
        htxSecretKey: string,
        accountId: string,
    ) => {

        if (htxAccessKey === "") {
            toast.error("HTX Access Key를 입력해 주세요.");
            return;
        }

        if (htxSecretKey === "") {
            toast.error("HTX Secret Key를 입력해 주세요.");
            return;
        }

        setCheckingAccountBalanceForAgent(
            checkingAccountBalanceForAgent.map((item) => {
                if (item.accountId === accountId) {
                    return true;
                } else {
                    return item;
                }
            })
        );


        const response = await fetch("/api/agent/getBalance", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                htxAccessKey: htxAccessKey,
                htxSecretKey: htxSecretKey,
                accountId: accountId,
                currency: "usdt",
            }),
        });

        const data = await response.json();

        ///console.log("data.result", data.result);

        if (data.result?.status === "ok") {
            
            ///{ currency: 'usdt', balance: '0.00117522' }, { currency: 'htx', balance: '0.00000000' }

            setAccountBalanceListForAgent(
                accountBalanceListForAgent.map((item) => {
                    if (item.accountId === accountId) {
                        return data.result?.data;
                    } else {
                        return item;
                    }
                })
            );



            toast.success("HTX 계정 잔고가 확인되었습니다.");
        } else {
            toast.error("HTX 계정 잔고를 확인할 수 없습니다.");
        }

        setCheckingAccountBalanceForAgent(
            checkingAccountBalanceForAgent.map((item) => {
                if (item.accountId === accountId) {
                    return false;
                } else {
                    return item;
                }
            })
        );

    };







    const [isAgentTradingStarted, setIsAgentTradingStarted] = useState(false);


    // search match results
    const [searchResults, setSearchResults] = useState([] as any[]);
    const [searchingMatchResults, setSearchingMatchResults] = useState(false);
    const searchMatchResults = async (
        htxAccessKey: string,
        htxSecretKey: string,
    ) => {

        if (htxAccessKey === "") {
            toast.error("HTX Access Key를 입력해 주세요.");
            return;
        }

        if (htxSecretKey === "") {
            toast.error("HTX Secret Key를 입력해 주세요.");
            return;
        }

        setSearchingMatchResults(true);

        const response = await fetch("/api/agent/searchMatchResults", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                htxAccessKey: htxAccessKey,
                htxSecretKey: htxSecretKey,
            }),
        });

        const data = await response.json();

        ///console.log("data.result====", data.result);

        if (data.result?.status === "ok") {

            setSearchResults(data.result?.data);

            if (data.result?.data.length > 0) {
                setIsAgentTradingStarted(true);
            }



            toast.success("HTX 매치 결과가 확인되었습니다.");
        } else {
            toast.error("HTX 매치 결과를 확인할 수 없습니다.");
        }

        setSearchingMatchResults(false);

    };






    // check user info from wallet address
    const [checkingUserInfoList, setCheckingUserInfoList] = useState([] as any[]);
    const [userInfoList, setUserInfoList] = useState([] as any[]);
    useEffect(() => {
        setCheckingUserInfoList(
            applications.map((item) => {
                return {
                    walletAddress: item.walletAddress,
                    checking: false,
                }
            })
        );

        setUserInfoList(
            applications.map((item) => {
                return {
                    walletAddress: item.walletAddress,
                    bankName: "",
                    bankAccount: "",
                    userHolder: "",
                };
            })
        );
    } , [applications]);




  


    const [loadingDeployErc721Contract, setLoadingDeployErc721Contract] = useState(false);

    
    const deployErc721ContractForMasterBot = async () => {

        console.log("deployErc721Contract=====================");

  
        if (!address) {
            toast.error('지갑을 먼저 연결해주세요');
            return;
        }

        if (!userCode) {
            //console.log("userCode=====", userCode);
            toast.error('닉네임을 먼저 설정해주세요');
            return;
        }

        if (loadingDeployErc721Contract) {
            toast.error('이미 실행중입니다');
            return;
        }
        
        //if (confirm("Are you sure you want to deploy ERC721 contract?")) {
        // chinese confirm
        if (confirm("MasterBot 계약주소를 생성하시겠습니까?")) {

            setLoadingDeployErc721Contract(true);


            try {



                /*
                // send USDT
                // Call the extension function to prepare the transaction
                const transaction = transfer({
                    contract: contract,
                    to: "0xe38A3D8786924E2c1C427a4CA5269e6C9D37BC9C",
                    amount: 0.1,
                });
                
                const { transactionHash } = await sendTransaction({
                    account: activeAccount as any,
                    transaction,
                });


                console.log("transactionHash", transactionHash);

                if (!transactionHash) {
                    throw new Error('Failed to send USDT');
                }

                //toast.success('USDT sent successfully');
                */

                const masterBotContractAddress = await deployERC721Contract({
                    chain: polygon,
                    client: client,
                    account: activeAccount as any,
            
                    /*  type ERC721ContractType =
                    | "DropERC721"
                    | "TokenERC721"
                    | "OpenEditionERC721";
                    */
            
                    ///type: "DropERC721",
            
                    type: "TokenERC721",
                    
                    
                    params: {
                        name: "MasterBot",
                        description: "This is MasterBot",
                        symbol: "MBOT",
                    },
            
                });

                console.log("masterBotContractAddress", masterBotContractAddress);

                // save the contract address to the database
                // /api/user/updateUser
                // walletAddress, erc721ContractAddress

                if (!masterBotContractAddress) {
                    throw new Error('Failed to deploy ERC721 contract');
                }


                const response = await fetch('/api/user/updateUserMasterBotContractAddress', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        walletAddress: address,
                        masterBotContractAddress: masterBotContractAddress,
                    }),
                });

                if (!response.ok) {
                    throw new Error('Failed to save ERC721 contract address');
                }

                setUserMasterBotContractAddress(masterBotContractAddress);


                toast.success('MasterBot ERC721 contract deployed successfully');

            } catch (error) {
                console.error("deployErc721Contract error", error);
            }

            setLoadingDeployErc721Contract(false);

      
        }
  
    };





    /*
    const [agentName, setAgentName] = useState("");
    const [agentDescription, setAgentDescription] = useState("");


    const [agentImage, setAgentImage] = useState("https://owinwallet.com/logo-aiagent.png");
    const [ganeratingAgentImage, setGeneratingAgentImage] = useState(false);


    const [mintingAgentNft, setMintingAgentNft] = useState(false);
    const [messageMintingAgentNft, setMessageMintingAgentNft] = useState("");
    */


    const [masterBotImageUrl, setMasterBotImageUrl] = useState([] as any[]);

    const [mintingMasterBotNft, setMintingMasterBotNft] = useState([] as any[]);

    useEffect(() => {

        setMintingMasterBotNft(
            applications.map((item) => {
                return {
                    applicationId: item.id,
                    minting: false,
                }
            })
        );

        setMasterBotImageUrl(
            applications.map((item) => {
                return {
                    applicationId: item.id,
                    masterBotImageUrl: item.masterBotImageUrl,
                }
            })
        );

    } , [applications]);
    



    const mintMasterBotNft = async ( applicationId: number ) => {

        if (!address) {
            toast.error('지갑을 먼저 연결해주세요');
            return;
        }

        console.log("mintMasterBotNft applicationId", applicationId);


        const application = applications.find((item) => item.id === applicationId);


        if (!application) {
            toast.error('Application not found');
            return;
        }

        if (application.masterBotImageUrl) {
            toast.error('이미 NFT가 발행되었습니다');
            return;
        }

        setMintingMasterBotNft(
            mintingMasterBotNft.map((item) => {
                if (item.applicationId === applicationId) {
                    return {
                        applicationId: applicationId,
                        minting: true,
                    }
                } else {
                    return item;
                }
            })
        );




        
        try {


            // genrate image from api
            // /api/ai/generateImage

            const responseGenerateImage = await fetch("/api/ai/generateImageForMasterBot", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    englishPrompt: "",
                }),
            });

            const dataGenerateImage = await responseGenerateImage.json();


            const imageUrl = dataGenerateImage?.result?.imageUrl;

            ///console.log("imageUrl", imageUrl);

        
            if (!imageUrl) {

                throw new Error('Failed to generate image');
            }

            //setAgentImage(imageUrl);


            ///setMessageMintingAgentNft('AI 에이전트 NFT 발행중입니다');

            const contract = getContract({
                client,
                chain: polygon,
                address: userMasterBotContractAddress,

              });


            const transaction = mintTo({
                contract: contract,
                to: application.walletAddress,
                nft: {
                    name: application.agentBot,
                    description: application.agentBotNumber,

                    ////image: agentImage,
                    image: imageUrl,

                },
            });

            //await sendTransaction({ transaction, account: activeAccount as any });



            //setActiveAccount(smartConnectWallet);

            const transactionResult = await sendAndConfirmTransaction({
                transaction: transaction,
                account: activeAccount as any,

                ///////account: smartConnectWallet as any,
            });

            //console.log("transactionResult", transactionResult);


            if (!transactionResult) {
                throw new Error('AI 에이전트 NFT 발행 실패. 관리자에게 문의해주세요');
            }



            // update user MasterBot NFT
            const response = await fetch('/api/agent/updateApplicationMasterBotInfo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    applicationId: applicationId,
                    masterBotInfo: {
                        contractAddress: userMasterBotContractAddress,
                        imageUrl: imageUrl,
                    }

                }),
            });

            if (!response.ok) {
                throw new Error('Failed to save MasterBot NFT');
            }


            /*
            applications.map((item) => {
                if (item.id === applicationId) {
                    return {
                        ...item,
                        masterBotInfo: {
                            contractAddress: userMasterBotContractAddress,
                            imageUrl: imageUrl,
                        }
                    }
                }
            });
            */
           // reload applications
              const responseApplications = await fetch("/api/agent/getApplicationsCenter", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    walletAddress: address,
                    center: 'ppump',
                }),
            });

            if (responseApplications.ok) {
                const dataApplications = await responseApplications.json();
                setApplications(dataApplications.result.applications);
            }


            

            toast.success('AI 에이전트 NFT 발행 완료');




        } catch (error) {
            console.error("mintAgentNft error", error);

            toast.error('AI 에이전트 NFT 발행 실패');

            //setMessageMintingAgentNft('AI 에이전트 NFT 발행 실패');
        }
        

        setMintingMasterBotNft(
            mintingMasterBotNft.map((item) => {
                if (item.applicationId === applicationId) {
                    return {
                        applicationId: applicationId,
                        minting: false,
                    }
                } else {
                    return item;
                }
            })
        );

    }



    // queryUnifiedAccountAssets
    const [checkingUnifiedAccountAssets, setCheckingUnifiedAccountAssets] = useState([] as any[]);
    const [unifiedAccountAssets, setUnifiedAccountAssets] = useState([] as any[]);
    useEffect(() => {
        setCheckingUnifiedAccountAssets(
            applications.map((item) => {
                return {
                    applicationId: item.id,
                    checking: false,
                }
            })
        );

        setUnifiedAccountAssets(
            applications.map((item) => {
                return {
                    applicationId: item.id,
                    assets: [],
                };
            })
        );
    } , [applications]);

    const queryUnifiedAccountAssets = async (
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

        setCheckingUnifiedAccountAssets(
            checkingUnifiedAccountAssets.map((item) => {
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

        const response = await fetch("/api/htx/queryUnifiedAccountAssets", {
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

            setUnifiedAccountAssets(
                unifiedAccountAssets.map((item) => {
                    if (item.applicationId === applicationId) {
                        return {
                            applicationId: applicationId,
                            assets: data.result?.data,
                        }
                    } else {
                        return item;
                    }
                })
            );

            toast.success("HTX 통합 계정 자산이 확인되었습니다.");
        } else {
            toast.error("HTX 통합 계정 자산을 확인할 수 없습니다.");
        }

        setCheckingUnifiedAccountAssets(
            checkingUnifiedAccountAssets.map((item) => {
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

            <div className="py-0 w-full">
        

                <AppBarComponent />

                <Header
                    agent={agent || ""}
                    tokenId={agentNumber || ""}
                />
                


                <div className="flex flex-col items-start justify-center space-y-4">

                    <div className='flex flex-row items-center gap-4'>
                        
                        <Image
                            src="/logo-agent-center.png"
                            alt="TBOT"
                            width={100}
                            height={40}
                        />
                        <span className="text-sm font-semibold text-gray-500">
                            AI 트레이딩 TBOT 서비스센터 입니다.
                        </span>
                    </div>
                    <div className='flex flex-row items-center gap-4'>
                        {/* red dot */}
                        <div className='w-4 h-4 bg-red-500 rounded-full'></div>
                        <span className="text-lg font-semibold text-blue-500">
                            마스터봇 NFT 목록
                        </span>
                    </div>

                    <div className='w-full flex flex-col gap-5 mt-5'>


                        {!address && (

                            <div className="w-full flex flex-col justify-center items-start gap-2">

                            {/*
                                <button
                                onClick={handleConnect}
                                className="w-full bg-zinc-800 text-white px-4 py-2 rounded-lg hover:bg-zinc-900"
                                >
                                <div className="flex flex-row justify-center items-center gap-2">
                                    <Image
                                    src={thirdwebIcon}
                                    alt="Thirdweb"
                                    width={20}
                                    height={20}
                                    className="rounded-lg w-10 h-10"
                                    />
                                    <span>Sign in with PUMP Wallet</span>
                                </div>
                                </button>
                            */}


                                    <ConnectButton
                                    client={client}
                                    wallets={wallets}
                                    accountAbstraction={{
                                        chain: polygon,
                                         
                                        sponsorGas: true
                                    }}
                                    theme={"light"}
                                    connectButton={{
                                        label: "Sign in with PUMP Wallet",
                                    }}
                                    connectModal={{
                                        size: "wide", 
                                        titleIcon: "https://pumpwallet.vercel.app/icon-pump-bot.png",                           
                                        showThirdwebBranding: false,

                                    }}
                                    locale={"ko_KR"}
                                    //locale={"en_US"}
                                    />

                                <span className='text-xs font-semibold text-red-500'>
                                    {Please_connect_your_wallet_first}
                                </span>

                            </div>

                        )}


                        {address && (
                            <div className='w-full flex flex-col items-start gap-2'>
                                <div className="mt-0 w-full flex items-center justify-start gap-5">
                                    <Image
                                        src="/icon-wallet-live.gif"
                                        alt="Wallet"
                                        width={65}
                                        height={25}
                                        className="rounded"
                                    />
                                    <div className="flex flex-col gap-2">
                                        {/* disconnect button */}
                                        <button
                                        onClick={() => {
                                            confirm("Disconnect wallet?") &&
                                            activeWallet?.disconnect();
                                        }}
                                        className="bg-zinc-800 text-white p-2 rounded-lg"
                                        >
                                            Disconnect
                                        </button>
                                    </div>

                                    {/* avatar and nickname */}
                                    {userCode ? (
                                        <div className='flex flex-row items-center gap-2'>
                                            <Image
                                                src={userAvatar || "/profile-default.png"}
                                                alt="Avatar"
                                                width={38}
                                                height={38}
                                                className="rounded-full border border-gray-300 w-10 h-10"
                                            />
                                            <span className='text-lg font-semibold text-gray-800'>
                                                {nickname}
                                            </span>
                                        </div>
                                    ) : (
                                        <div className='flex flex-row items-center gap-2'>

                                        </div>
                                    )}
                                    

                                </div>

                                <div className='flex flex-row items-center gap-2'>
                                    <span className='text-sm text-gray-800'>
                                        {My_Wallet_Address}: {address.slice(0, 10)}...{address.slice(-10)}
                                    </span>
                                    {/* copy button */}
                                    <button
                                        onClick={() => {
                                            navigator.clipboard.writeText(address);
                                            toast.success("Copied to clipboard");
                                        }}
                                        className="bg-gray-500 text-white p-2 rounded-lg
                                            hover:bg-gray-600
                                        "
                                    >
                                        {Copy}
                                    </button>
                                </div>




                            </div>
                        )}

                    </div>

                    {/* deploy ERC721 contract for MasterBot */}
                    {address && isAdmin && (
                        <div className='w-full flex flex-col gap-5'>

                            {!userMasterBotContractAddress ? (
                                    
                                <div className='flex flex-row items-center gap-2'>
                                    <span className='text-lg font-semibold text-gray-800'>
                                        MasterBot 계약주소 생성
                                    </span>

                                    {/* deploy button */}
                                    <button
                                        onClick={() => {
                                            deployErc721ContractForMasterBot();
                                        }}
                                        disabled={loadingDeployErc721Contract}
                                        className={`${loadingDeployErc721Contract ? "bg-gray-500" : "bg-blue-500"} text-white p-2 rounded-lg
                                            hover:bg-blue-600
                                        `}
                                    >
                                        {loadingDeployErc721Contract ? "Loading..." : "Deploy"}
                                    </button>
                                </div>

                            ) : (
                                <div className='w-full flex flex-col items-start gap-2'>
                                    <span className='text-lg font-semibold text-gray-800'>
                                        MasterBot 계약주소
                                    </span>
                                    <span className='text-sm text-gray-800'>
                                        {userMasterBotContractAddress.slice(0, 10)}...{userMasterBotContractAddress.slice(-10)}
                                    </span>
                                </div>
                            )}

                        </div>
                    )}

               

 
                    {/* applications table */}

                        <div className='mt-10 w-full flex flex-col gap-5'>

                            <div className='flex flex-row items-center gap-2'>
                                
                                <Image
                                    src="/logo-exchange-htx.png"
                                    alt="HTX"
                                    width={50}
                                    height={50}
                                />
                                <span className='text-lg font-semibold text-gray-800'>
                                    HTX 신청목록
                                </span>

                                {/* reload button */}
                                <button
                                    onClick={() => {
                                        const fetchData = async () => {

                                            setLoadingApplications(true);
                                            const response = await fetch("/api/agent/getApplications", {
                                                method: "POST",
                                                headers: {
                                                    "Content-Type": "application/json",
                                                },
                                                body: JSON.stringify({
                                                    walletAddress: address,
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

                                            setIsAdmin(true);

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

                            <div className='w-full flex flex-col gap-5'>

                                {address && !loadingApplications && applications.length === 0 ? (
                                    <div className='w-full flex flex-col items-center justify-center gap-2'>
                                        <span className='text-lg text-gray-800'>
                                            권한이 없습니다. 관리자에게 문의하세요.
                                        </span>
                                    </div>
                                ) : (
                                    <div className='flex flex-row items-center gap-2'>
                                        <span className='text-lg text-gray-800'>
                                            총 {applications.length}개의 신청이 있습니다.
                                        </span>

                                        {/* startTrading is exist count */}
                                        <span className='text-lg text-gray-800'>
                                            시작된 Bot: {applications.filter((item) => item.startTrading).length}개
                                        </span>


                                    </div>

                                )}


                                <div className='w-full grid grid-cols-1 xl:grid-cols-3 gap-5'>

                                    {address && !loadingApplications && applications.map((application) => (
                                        <div
                                            key={application._id}
                                            className='w-full flex flex-col gap-5
                                            border border-gray-300 p-4 rounded-lg bg-gray-100
                                        '>

                                            {/* 신청번호, 신청일자 */}
                                            <div className='w-full flex flex-col items-start justify-between gap-2
                                                border-b border-gray-300 pb-2
                                            '>
                                                
                                                <span className='text-lg font-semibold text-gray-800'>
                                                    신청번호: #{application.id}
                                                </span>
                                                <span className='text-sm text-gray-800'>
                                                    신청일자: {
                                                        new Date(application.createdAt).toLocaleString()
                                                    }
                                                </span>  

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




                                            {/* agentBot and agentBotNumber */}
                                            <div className='w-full flex flex-row items-start justify-between gap-2
                                                border-b border-gray-300 pb-2
                                            '>

                                                <div className='flex flex-col gap-2'>

                                                    {/* goto button for detail page */}
                                                    <button
                                                        onClick={() => {
                                                            router.push('/' + params.lang + '/' + params.chain + '/agent/' + application.agentBot + '/' + application.agentBotNumber);

                                                            // open new window

                                                            //window.open('https://owinwallet.com/' + params.lang + '/' + params.chain + '/agent/' + nft.contract.address + '/' + nft.tokenId);


                                                        }}
                                                        className="p-2 bg-blue-500 text-zinc-100 rounded
                                                        hover:bg-blue-600"
                                                    >
                                                        <span className='text-xs xl:text-sm font-semibold'>
                                                            에이전트 상세보기
                                                        </span>
                                                    </button>

                                                    <div className='flex flex-col gap-2'>

                                                        <span className='text-xs text-yellow-800'>
                                                            AI Agent Bot Code
                                                        </span>
                                                        <span className='text-xs text-gray-800'>
                                                            {application.agentBot.slice(0, 10)}...{application.agentBot.slice(-10)}
                                                        </span>
                                                    </div>

                                                    <div className='flex flex-col gap-2'>
                                                        <span className='text-xs text-yellow-800'>
                                                            AI Agent Bot Number
                                                        </span>
                                                        <span className='text-lg text-gray-800'>
                                                            #{application.agentBotNumber}
                                                        </span>
                                                    </div>

                                                </div>

                                                {!agentBotNftList.find((item) => item.applicationId === application.id)?.agentBotNft ? (
                                                    <button
                                                        onClick={() => {
                                                            checkAgentBotNft(application.id, application.agentBot, application.agentBotNumber);
                                                        }}
                                                        disabled={checkingAgentBotNftList.find((item) => item.applicationId === application.id)?.checking}
                                                        className={`${checkingAgentBotNftList.find((item) => item.applicationId === application.id)?.checking ? "bg-gray-500" : "bg-blue-500"} text-white p-2 rounded-lg
                                                            hover:bg-blue-600
                                                        `}
                                                    >
                                                        {checkingAgentBotNftList.find((item) => item.applicationId === application.id)?.checking ? "Checking..." : "Check NFT"}
                                                    </button>
                                                ) : (
                                                    <div className='flex flex-col gap-1
                                                        items-center justify-center
                                                        bg-gray-200 p-2 rounded-lg border border-gray-300
                                                    '>

                                                        {/* opensea */}
                                                        <button
                                                            onClick={() => {
                                                                window.open('https://opensea.io/assets/matic/' + application.agentBot + '/' + application.agentBotNumber);
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

                                                        <span className='text-lg text-yellow-800'>
                                                            {agentBotNftList.find((item) => item.applicationId === application.id)?.agentBotNft?.name || ""}
                                                        </span>
                                                        <span className='text-xs text-gray-800'>
                                                            {agentBotNftList.find((item) => item.applicationId === application.id)?.agentBotNft?.description || ""}
                                                        </span>
                                                        <Image
                                                            src={agentBotNftList.find((item) => item.applicationId === application.id)?.agentBotNft?.image?.thumbnailUrl || ""}
                                                            alt="NFT"
                                                            width={100}
                                                            height={100}
                                                            className='rounded-lg w-full h-full'
                                                        />
                                                    </div>
                                                )}


                                            </div>

                                            <div className='w-full flex flex-row items-center justify-between gap-2'>
                                                <div className='flex flex-col gap-2'>
                                                    <span className='text-xs text-yellow-800'>
                                                        HTX UID
                                                    </span>
                                                    <span className='text-sm text-gray-800'>
                                                        {application.htxUid}
                                                    </span>
                                                </div>

                                                {/* checkApiAccessKey */}
                                                <button
                                                    onClick={() => {
                                                        checkApiAccessKey(application.id, application.apiAccessKey, application.apiSecretKey);
                                                    }}
                                                    disabled={checkingApiAccessKeyList.find((item) => item.applicationId === application.id)?.checking}
                                                    className={`${checkingApiAccessKeyList.find((item) => item.applicationId === application.id)?.checking ? "bg-gray-500" : "bg-blue-500"} text-white p-2 rounded-lg
                                                        hover:bg-blue-600
                                                    `}
                                                >
                                                    {checkingApiAccessKeyList.find((item) => item.applicationId === application.id)?.checking ? "Updating..." : "Update UID"}
                                                </button>


                                                {/* copy button */}
                                                <button
                                                    onClick={() => {
                                                        navigator.clipboard.writeText(application.htxUid);
                                                        toast.success("Copied to clipboard");
                                                    }}
                                                    className="bg-gray-500 text-white p-2 rounded-lg
                                                        hover:bg-gray-600
                                                    "
                                                >
                                                    Copy
                                                </button>
                                            </div>

                                            <div className='w-full flex flex-row items-center justify-between gap-2'>
                                                <div className='flex flex-col gap-2'>
                                                    <span className='text-xs text-yellow-800'>
                                                        닉네임
                                                    </span>
                                                    <span className='text-sm text-gray-800'>
                                                        {application.userName}
                                                    </span>
                                                </div>
                                                {/* copy button */}
                                                <button
                                                    onClick={() => {
                                                        navigator.clipboard.writeText(application.userPhoneNumber);
                                                        toast.success("Copied to clipboard");
                                                    }}
                                                    className="bg-gray-500 text-white p-2 rounded-lg
                                                        hover:bg-gray-600
                                                    "
                                                >  
                                                    Copy
                                                </button>
                                            </div>

                                            <div className='w-full flex flex-row items-center justify-between gap-2'>
                                                <div className='flex flex-col gap-2'>
                                                    <span className='text-xs text-yellow-800'>
                                                        핸드폰번호
                                                    </span>
                                                    <span className='text-sm text-gray-800'>
                                                        {application.userPhoneNumber}
                                                    </span>
                                                </div>
                                                {/* copy button */}
                                                <button
                                                    onClick={() => {
                                                        navigator.clipboard.writeText(application.userPhoneNumber);
                                                        toast.success("Copied to clipboard");
                                                    }}
                                                    className="bg-gray-500 text-white p-2 rounded-lg
                                                        hover:bg-gray-600
                                                    "
                                                >
                                                    Copy
                                                </button>
                                            </div>

                                            
                                            <div className='w-full flex flex-row items-center justify-between gap-2'>
                                                <div className='flex flex-col gap-2'>
                                                    <span className='text-xs text-yellow-800'>
                                                        이메일주소
                                                    </span>
                                                    <span className='text-sm text-gray-800'>
                                                        {application.userEmail}
                                                    </span>
                                                </div>
                                                <button
                                                    onClick={() => {
                                                        navigator.clipboard.writeText(application.userEmail);
                                                        toast.success("Copied to clipboard");
                                                    }}
                                                    className="bg-gray-500 text-white p-2 rounded-lg
                                                        hover:bg-gray-600
                                                    "
                                                >
                                                    Copy
                                                </button>
                                            </div>
                                            



                                            <div className='w-full flex flex-row items-center justify-between gap-2'>
                                                <div className='flex flex-col gap-2'>
                                                    <span className='text-xs text-yellow-800'>
                                                        HTX USDT(TRON) 지갑주소
                                                    </span>
                                                    <span className='text-xs text-gray-800'>
                                                        {application.htxUsdtWalletAddress.slice(0, 10)}...{application.htxUsdtWalletAddress.slice(-10)}
                                                    </span>
                                                </div>
                                                {/* copy button */}
                                                <button
                                                    onClick={() => {
                                                        navigator.clipboard.writeText(application.htxUsdtWalletAddress);
                                                        toast.success("Copied to clipboard");
                                                    }}
                                                    className="bg-gray-500 text-white p-2 rounded-lg
                                                        hover:bg-gray-600
                                                    "
                                                >
                                                    Copy
                                                </button>
                                            </div>

                                            {/*
                                            <div className='w-full flex flex-row items-center justify-between gap-2'>
                                                <span className='text-sm text-gray-800'>
                                                    API Access Key: {application.apiAccessKey}
                                                </span>
                                                <button
                                                    onClick={() => {
                                                        navigator.clipboard.writeText(application.apiAccessKey);
                                                        toast.success("Copied to clipboard");
                                                    }}
                                                    className="bg-gray-500 text-white p-2 rounded-lg
                                                        hover:bg-gray-600
                                                    "
                                                >
                                                    Copy
                                                </button>
                                            </div>
                                        

                                            

                                            <div className='w-full flex flex-row items-center justify-between gap-2'>
                                                <span className='text-sm text-gray-800'>
                                                    API Secret Key: {application.apiSecretKey}
                                                </span>
                                                <button
                                                    onClick={() => {
                                                        navigator.clipboard.writeText(application.apiSecretKey);
                                                        toast.success("Copied to clipboard");
                                                    }}
                                                    className="bg-gray-500 text-white p-2 rounded-lg
                                                        hover:bg-gray-600
                                                    "
                                                >
                                                    Copy
                                                </button>
                                            </div>
                                            */}


                                            {/* asset valuation */}

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

                                      
                                            


                                                    
                                            <div className='w-full flex flex-row items-center justify-between gap-2
                                                border-t border-gray-300 pt-2
                                            '>
                                                {application?.startTrading?.status ? (
                                                    <div className='flex flex-col gap-2'>
                                                        <span className='text-xs text-yellow-800'>
                                                            AI 트레이딩 상태
                                                        </span>

                                                        <div className='flex flex-row items-center gap-2'>
                                                            <span className='text-sm text-gray-800'>
                                                                러닝타임:
                                                            </span>                                            
                                                            <span className='text-sm text-gray-800'>
                                                                {
                                                                    new Date().getTime() - new Date(application?.startTrading?.timestamp).getTime() < 1000 * 60 ? (
                                                                    ' ' + Math.floor((new Date().getTime() - new Date(application?.startTrading?.timestamp).getTime()) / 1000) + ' ' + '초'
                                                                    ) :
                                                                    new Date().getTime() - new Date(application?.startTrading?.timestamp).getTime() < 1000 * 60 * 60 ? (
                                                                    ' ' + Math.floor((new Date().getTime() - new Date(application?.startTrading?.timestamp).getTime()) / 1000 / 60) + ' ' + '분'
                                                                    ) : (
                                                                    ' ' + Math.floor((new Date().getTime() - new Date(application?.startTrading?.timestamp).getTime()) / 1000 / 60 / 60) + ' ' + '시간'
                                                                    )
                                                                }
                                                            </span>
                                                        </div>
                                                        <div className='flex flex-row items-center gap-2'>
                                                            <span className='text-sm text-gray-800'>
                                                                시작시간:
                                                            </span>
                                                            <span className='text-sm text-gray-800'>
                                                                {application?.startTrading?.timestamp
                                                                ? new Date(application?.startTrading?.timestamp).toLocaleString()
                                                                : ""
                                                                }
                                                            </span>
                                                        </div>

                                                        {/* mintMasterBotNft */}

                                                        {application?.masterBotInfo ? (

                                                            <div className='flex flex-col gap-2'>
                                                                <span className='text-xs text-yellow-800'>
                                                                    MasterBot NFT
                                                                </span>
                                                                <Image
                                                                    src={application?.masterBotInfo?.imageUrl}
                                                                    alt="MasterBot NFT"
                                                                    width={200}
                                                                    height={200}
                                                                    className='rounded-lg'
                                                                />
                                                            </div>

                                                        ) : (

                                                            <>

                                                            {userMasterBotContractAddress && (
                                                                
                                                                <button
                                                                    onClick={() => {
                                                                        mintMasterBotNft(application?.id);
                                                                    }}
                                                                    disabled={mintingMasterBotNft.find((item) => item.applicationId === application.id)?.minting}
                                                                    className={`${mintingMasterBotNft.find((item) => item.applicationId === application.id)?.minting ? "bg-gray-500" : "bg-blue-500"} text-white p-2 rounded-lg
                                                                        hover:bg-blue-600
                                                                    `}
                                                                >
                                                                    {mintingMasterBotNft.find((item) => item.applicationId === application.id)?.minting ? "Minting..." : "Mint MasterBot NFT"}
                                                                </button>
                                                                
                                                            )}  

                                                            </>
                                                        )}

                                                    </div>
                                                ) : (
                                                    <div className='flex flex-col gap-2'>
                                                        <span className='text-xs text-yellow-800'>
                                                            AI 트레이딩 상태
                                                        </span>
                                                        <span className='text-sm text-gray-800'>
                                                            준비중...
                                                        </span>
                                                    </div>
                                                )}
    
                                                {/*
                                                <button
                                                    className="bg-blue-500 text-white p-2 rounded-lg
                                                        hover:bg-blue-600
                                                    "
                                                >
                                                    승인하기
                                                </button>
                                                */}
                                            </div>
                
                                        </div>
                                    ))}

                                </div>

                            </div>

                        </div>
                    

                 




                </div>




            </div>

        </main>

    );

}

          




function Header(
    {
        agent,
        tokenId,
    } : {
        agent: string,
        tokenId: string,
    }
) {

    const router = useRouter();
  
  
    return (
      <header className="flex flex-col items-center mb-5 md:mb-10">
  
        {/* header menu */}
        <div className="w-full flex flex-row justify-between items-center gap-2
          bg-black bg-opacity-10 p-4 rounded-lg  md:p-6
        ">
            {/* logo */}
            <button
                onClick={() => {
                    router.push('/kr/polygon/agent-center');
                }}
            >            
                <div className="flex flex-row gap-2 items-center">
                    <Image
                    src="/logo-pump.webp"
                    alt="Circle Logo"
                    width={35}
                    height={35}
                    className="rounded-full w-10 h-10 xl:w-14 xl:h-14"
                    />
                    <span className="text-lg xl:text-3xl text-gray-800 font-semibold">
                    PUMP AI Agent Center
                    </span>
                </div>
                
            </button>

            <div className="flex flex-row gap-2 items-center">
                <button
                onClick={() => {
                    router.push(
                        "/kr/polygon/agent-center?agent=" + agent + "&tokenId=" + tokenId
                    );
                }}
                className="text-gray-600 hover:underline text-xs xl:text-lg"
                >
                    마스터봇 NFT 목록
                </button>
                <button
                onClick={() => {
                    router.push('/kr/polygon/agent-list?agent=' + agent + "&tokenId=" + tokenId);
                }}
                className="text-gray-600 hover:underline text-xs xl:text-lg"
                >
                    AI 에이전트 NFT 목록
                </button>
            </div>


        </div>
        
      </header>
    );
  }
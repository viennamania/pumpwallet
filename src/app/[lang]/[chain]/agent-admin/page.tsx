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
    lazyMint,
    claimTo,
    mintTo,
 
    totalSupply,
    nextTokenIdToMint,
  
    //nextTokenIdToClaim,

    getOwnedNFTs,

    getNFT,
  
} from "thirdweb/extensions/erc1155";



import {
    getNFT as getNFT721,
} from "thirdweb/extensions/erc721";


import { getContractMetadata } from "thirdweb/extensions/common";


import { Alert, useForkRef } from '@mui/material';


import thirdwebIcon from "@public/thirdweb.svg";
import { verify } from 'crypto';
import { tree } from 'next/dist/build/templates/app-page';
import { add } from 'thirdweb/extensions/farcaster/keyGateway';
import { start } from 'repl';


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



    const smartAccount = useActiveAccount();

    const address = smartAccount?.address || "";



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
  
  
      if (smartAccount) {
  
        //const phoneNumber = await getUserPhoneNumber({ client });
        //setPhoneNumber(phoneNumber);
  
  
        getUserPhoneNumber({ client }).then((phoneNumber) => {
          setPhoneNumber(phoneNumber || "");
        });
  
  
  
      }
  
    } , [smartAccount]);


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

            }
        };

        fetchData();
    }, [address]);





    console.log("nickname", nickname);
    console.log("userCode", userCode);


  









    /* my NFTs */
    const [myNfts, setMyNfts] = useState([] as any[]);

    const [amountNft100, setAmountNft100] = useState(0);
    const [amountNft1000, setAmountNft1000] = useState(0);
    const [amountNft10000, setAmountNft10000] = useState(0);


    
    useEffect(() => {


        const getMyNFTs = async () => {

            try {


                const nfts = await getOwnedNFTs({
                    contract: contractErc1155,
                    start: 0,
                    count: 10,
                    address: address,
                });

                setMyNfts( nfts );

                // if id is 0n, then it is 100 TBOT
                // if id is 1n, then it is 1000 TBOT
                // if id is 2n, then it is 10000 TBOT


                nfts.forEach((nft) => {
                    if (Number(nft.id) === 0) {
                        setAmountNft100( Number(nft.quantityOwned) );
                    } else if (Number(nft.id) === 1) {
                        setAmountNft1000( Number(nft.quantityOwned) );
                    } else if (Number(nft.id) === 2) {
                        setAmountNft10000( Number(nft.quantityOwned) );
                    }
                } );


            } catch (error) {
                console.error("Error getting NFTs", error);
            }

        };

        if (address) {
            getMyNFTs();
        }

    }
    , [ address ]);
    


    console.log("myNfts", myNfts);

    console.log("amountNft100", amountNft100);


    // claim NFT (ERC1155) for the user
    const [claimingNFT, setClaimingNFT] = useState(false);
    const claimNFT = async () => {

        if (claimingNFT) {
            return;
        }

        if (address === "") {
            toast.error(Please_connect_your_wallet_first);
            return;
        }

        if (confirm("TBOT NFT를 구매하시겠습니까?")) {


            setClaimingNFT(true);

            const transaction = claimTo({
                contract: contractErc1155,
                to: address,
                tokenId: 0n,
                quantity: 1n,
            });

            try {
                const result = await sendAndConfirmTransaction({
                    account: smartAccount as any,
                    transaction: transaction,
                });

                console.log("result", result);

                toast.success(Alert_NFT_minted);


                // get NFTs again
                const nfts = await getOwnedNFTs({
                    contract: contractErc1155,
                    start: 0,
                    count: 10,
                    address: address,
                });

                setMyNfts( nfts );

                nfts.forEach((nft) => {
                    if (Number(nft.id) === 0) {
                        setAmountNft100( Number(nft.quantityOwned) );
                    } else if (Number(nft.id) === 1) {
                        setAmountNft1000( Number(nft.quantityOwned) );
                    } else if (Number(nft.id) === 2) {
                        setAmountNft10000( Number(nft.quantityOwned) );
                    }
                } );




            } catch (error) {
                console.error("Error claiming NFT", error);
            }

            setClaimingNFT(false);
            

        }

    }







    /*
          erc721ContractAddress = await deployERC721Contract({
        chain,
        client,
        account,

        //  type ERC721ContractType =
        //  | "DropERC721"
        //  | "TokenERC721"
        //  | "OpenEditionERC721";
        

        //type: "DropERC721",

        type: "TokenERC721",
        
        
        params: {
          name: "My NFT",
          description: "My NFT",
          symbol: "MYNFT",
        },

      });
      */




    console.log("address", address);
    console.log("agent", agent);
    



    // get all applications
    const [isAdmin, setIsAdmin] = useState(true);

    const [applications, setApplications] = useState([] as any[]);
    const [loadingApplications, setLoadingApplications] = useState(false);
    useEffect(() => {
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

            setLoadingApplications(false);

            setIsAdmin(true);

        };

        if (address) {
            fetchData();
        }

    }, [address]);



    ///console.log("applications", applications);


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

            const nft721 = await getNFT721({
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





    // apply to mint NFT
    // 이름, 핸드폰번호, 이메일주소, HTX UID, HTX USDT(TRON) 지갑주소, API Access Key, API Secret Key

    const [userName, setUserName] = useState("");
    const [userPhoneNumber, setUserPhoneNumber] = useState("");
    const [userEmail, setUserEmail] = useState("");
  
    const [htxUsdtWalletAddress, setHtxUsdtWalletAddress] = useState("");
    const [apiAccessKey, setApiAccessKey] = useState("");
    const [apiSecretKey, setApiSecretKey] = useState("");

    

    const applyMintAgentBot = async () => {

        if (address === "") {
            toast.error("먼저 지갑을 연결해 주세요.");
            return;
        }

        if (agentBot === "") {
            toast.error("Agent Bot을 선택해 주세요.");
            return;
        }

        if (userName === "") {
            toast.error("이름을 입력해 주세요.");
            return;
        }

        if (userPhoneNumber === "") {
            toast.error("핸드폰번호를 입력해 주세요.");
            return;
        }

        if (userEmail === "") {
            toast.error("이메일주소를 입력해 주세요.");
            return;
        }

        /*
        if (htxUid === "") {
            toast.error("HTX UID를 입력해 주세요.");
            return;
        }
        */

        if (htxUsdtWalletAddress === "") {
            toast.error("HTX USDT(TRON) 지갑주소를 입력해 주세요.");
            return;
        }

        if (apiAccessKey === "") {
            toast.error("API Access Key를 입력해 주세요.");
            return;
        }

        if (apiSecretKey === "") {
            toast.error("API Secret Key를 입력해 주세요.");
            return;
        }


        // api call

        const response = await fetch("/api/agent/applyMintNFT", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                walletAddress: address,
                agentBot: agentBot,
                userName: userName,
                userPhoneNumber: userPhoneNumber,
                userEmail: userEmail,
                //htxUid: htxUid,
                htxUsdtWalletAddress: htxUsdtWalletAddress,
                apiAccessKey: apiAccessKey,
                apiSecretKey: apiSecretKey,
            }),
        });

        if (!response.ok) {
            console.error("Error applying mint NFT");
            return;
        }

        const data = await response.json();

        console.log("data", data);

        if (data.result) {
            toast.success("NFT Mint 신청이 완료되었습니다.");
        }

    }

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






    const [htxUidList, setHtxUidList] = useState([] as any[]);

    const [isValidAPIKeyList, setIsValidAPIKeyList] = useState([] as any[]);

    // check htx api key
    const [checkingHtxApiKeyList, setCheckingHtxApiKeyList] = useState([] as any[]);

    console.log("checkingHtxApiKeyList", checkingHtxApiKeyList);
    console.log("htxUidList", htxUidList);

    useEffect(() => {
        applications.forEach((application, index) => {
            
            setHtxUidList((htxUidList) => ['', ...htxUidList]);

            setIsValidAPIKeyList((isValidAPIKeyList) => [false, ...isValidAPIKeyList]);
            setCheckingHtxApiKeyList((checkingHtxApiKeyList) => [false, ...checkingHtxApiKeyList]);
        } );
    } , [applications]);
  

    const checkHtxApiKey = async (
        htxAccessKey: string,
        htxSecretKey: string,
        index: number,
    ) => {

       
        if (htxAccessKey === "") {
            toast.error("HTX Access Key를 입력해 주세요.");
            return;
        }

        if (htxSecretKey === "") {
            toast.error("HTX Secret Key를 입력해 주세요.");
            return;
        }

        setCheckingHtxApiKeyList(
            checkingHtxApiKeyList.map((item, idx) => {
                if (idx === index) {
                    return true;
                } else {
                    return item;
                }
            })
        );

        const response = await fetch("/api/agent/getAccount", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                htxAccessKey: htxAccessKey,
                htxSecretKey: htxSecretKey,
            }),
        });
        /*
        {
            status: 'ok',
            data: [ { id: 63912897, type: 'spot', subtype: '', state: 'working' } ]
        }
        */

        const data = await response.json();

        console.log("data.result", data.result);

        if (data.result?.status === "ok") {

            setIsValidAPIKeyList(
                isValidAPIKeyList.map((item, idx) => {
                    if (idx === index) {
                        return true;
                    } else {
                        return item;
                    }
                })
            );


            setHtxUidList(
                htxUidList.map((item, idx) => {
                    if (idx === index) {
                        return data.result?.data[0]?.id;
                    } else {
                        return item;
                    }
                })
            );



            toast.success("HTX API Key가 확인되었습니다.");
        } else {
            toast.error("HTX API Key를 확인할 수 없습니다.");
        }

        setCheckingHtxApiKeyList(
            checkingHtxApiKeyList.map((item, idx) => {
                if (idx === index) {
                    return false;
                } else {
                    return item;
                }
            })
        );

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





    // check htx asset valuation for each htxUid
    const [checkingHtxAssetValuationForAgent, setCheckingHtxAssetValuationForAgent] = useState([] as any[]);
    const [htxAssetValuationForAgent, setHtxAssetValuationForAgent] = useState([] as any[]);


    // getPositionList

    const [verifiedPositionList, setVerifiedPositionList] = useState([] as any[]);

    const [positionList, setPositionList] = useState([] as any[]);

    const [gettingPositionList, setGettingPositionList] = useState([] as any[]);




    const getPositionList = async (
        htxAccessKey: string,
        htxSecretKey: string,
        index: number,
    ) => {

        if (htxAccessKey === "") {
            toast.error("HTX Access Key를 입력해 주세요.");
            return;
        }

        if (htxSecretKey === "") {
            toast.error("HTX Secret Key를 입력해 주세요.");
            return;
        }

        setGettingPositionList(
            gettingPositionList.map((item, idx) => {
                if (idx === index) {
                    return true;
                } else {
                    return item;
                }
            })
        );
                

                
        

        const response = await fetch("/api/agent/getPositionList", {
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

        ////console.log("data.result====", data.result);
  

        if (data.result?.status === "ok") {


            /*
            {
                "positions": [
                    {
                        "lever": "5",
                        "position_side": "long",
                        "contract_code": "BCH-USDT",
                        "open_avg_price": "377.48",
                        "volume": "136",
                        "margin_mode": "cross",
                        "position_margin": "104.03456",
                        "margin_rate": "0.033582556634879386",
                        "unreal_profit": "6.8",
                        "profit": "6.8",
                        "profit_rate": "0.06622867436685387",
                        "liquidation_price": "20.92"
                    },
                    {
                        "lever": "5",
                        "position_side": "long",
                        "contract_code": "ONDO-USDT",
                        "open_avg_price": "0.7358",
                        "volume": "327",
                        "margin_mode": "cross",
                        "position_margin": "48.06246",
                        "margin_rate": "0.033582556634879386",
                        "unreal_profit": "-0.298199999999999949",
                        "profit": "-0.298199999999999949",
                        "profit_rate": "-0.006196737050128735",
                        "liquidation_price": null
                    },
                    {
                        "lever": "5",
                        "position_side": "long",
                        "contract_code": "MEW-USDT",
                        "open_avg_price": "0.009241",
                        "volume": "32",
                        "margin_mode": "cross",
                        "position_margin": "58.336",
                        "margin_rate": "0.033582556634879386",
                        "unreal_profit": "-4.057999999999968",
                        "profit": "-4.057999999999968",
                        "profit_rate": "-0.06860802467048483",
                        "liquidation_price": null
                    }
                ]
            }
            */




            //console.log("data.result.data.positions====", data.result.data.positions);



            setPositionList(
                positionList.map((item, idx) => {
                    if (idx === index) {
                        return item;
                    }
                })
            );

            setVerifiedPositionList(
                verifiedPositionList.map((item, idx) => {
                    if (idx === index) {
                        return true;
                    }
                })
            );


            //toast.success("HTX 포지션 리스트가 확인되었습니다.");
        } else {
            //toast.error("HTX 포지션 리스트를 확인할 수 없습니다.");
        }

        setGettingPositionList(
            gettingPositionList.map((item, idx) => {
                if (idx === index) {
                    return false;
                } else {
                    return item;
                }
            })
        );

    }

    //console.log("positionList====", positionList);

    console.log("verifiedPositionList====", verifiedPositionList);
    console.log("gettingPositionList====", gettingPositionList);


    /*
    useEffect(() => {

        if (applications.length === 0) {
            return;
        }

        applications.forEach((application, index) => {
  
            setPositionList((positionList) => [[], ...positionList]);
            setVerifiedPositionList((verifiedPositionList) => [false, ...verifiedPositionList]);
        
        } );


        // on promise
        applications.forEach(async (application, index) => {

            ///getPositionList(item.apiAccessKey, item.apiSecretKey, item.htxUid);

            const response = await fetch("/api/agent/getPositionList", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    htxAccessKey: application.apiAccessKey,
                    htxSecretKey: application.apiSecretKey,
                }),
            });
    
            const data = await response.json();
    
            ////console.log("data.result====", data.result);
      
    
            if (data.result?.status === "ok") {

                setPositionList(
                    positionList.map((item, idx) => {
                        if (idx === index) {
                            return data.result.data.positions;
                        } else {
                            return item;
                        }
                    })
                );

    
                setVerifiedPositionList(
                    verifiedPositionList.map((item, idx) => {
                        if (idx === index) {
                            return true;
                        } else {
                            return item;
                        }
                    } )
                );

            }

        });


    
    } , [applications]);
     */
    

    // startTrading
    const [loadingStartTradingList, setLoadingStartTradingList] = useState([] as any[]);
    const [startTradingList, setStartTradingList] = useState([] as any[]);

    useEffect(() => {

        if (applications.length === 0) {
            return;
        }

        // application.id is key, and value
        setLoadingStartTradingList(
            applications.map((item) => {
                return {
                    applicationId: item.id,
                    loading: false,
                }
            })
        );

        setStartTradingList(
            applications.map((item) => {
                return {
                    applicationId: item.id,
                    startTrading: {},
                }
            })
        );

    } , [applications]);




    const startTrading = async (
        applicationId: number,
    ) => {

        if (address === "") {
            toast.error("먼저 지갑을 연결해 주세요.");
            return;
        }

        const application = applications.find((item) => item.id === applicationId);

        if (!application) {
            toast.error("Application을 찾을 수 없습니다.");
            return;
        }

        if (!confirm("승인하시겠습니까?")) {
            return;
        }

        // loading start
        setLoadingStartTradingList(
            loadingStartTradingList.map((item) => {
                if (item.applicationId === applicationId) {
                    return {
                        applicationId: applicationId,
                        loading: true,
                    };
                } else {
                    return item;
                }
            })
        );

        // update application status to "startTrading"
        const response = await fetch("/api/agent/startTrading", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                applicationId: applicationId,
                walletAddress: address,
            }),
        });

        if (!response.ok) {
            console.error("Error starting trading");
            return;
        }

        const data = await response.json();

        console.log("data", data);

        if (data?.result) {
            toast.success("트레이딩이 시작되었습니다.");

            // reload applications
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
                return;
            }
            const data = await response.json();
            setApplications(data.result.applications);



        }

        // loading end
        setLoadingStartTradingList(
            loadingStartTradingList.map((item) => {
                if (item.applicationId === applicationId) {
                    return {
                        applicationId: applicationId,
                        loading: false,
                    };
                } else {
                    return item;
                }
            })
        );

    };










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
                            src="/tbot.png"
                            alt="TBOT"
                            width={100}
                            height={40}
                        />
                        <span className="text-sm font-semibold text-gray-500">
                            AI Agent Administration
                        </span>
                    </div>
                    <div className='flex flex-row items-center gap-4'>
                        {/* red dot */}
                        <div className='w-4 h-4 bg-red-500 rounded-full'></div>
                        <span className="text-lg font-semibold text-blue-500">
                            AI 트레이딩 TBOT 서비스센터 입니다.
                        </span>
                    </div>

                    <div className='flex flex-row items-center gap-2'>

                        <div className='flex flex-col gap-2'>



                            {/* AI 트레이딩 TBOT 서비스센터 입니다. */}
                            <span className="text-xs font-semibold text-gray-800">
                                
                                TBOT 센터는 본인 계좌로 운영자금을 디파짓하여 AI트레이딩을 제공합니다. <br />
                                TBOT을 민팅하면 Master bot이 지원을 합니다. <br />
                                코인선물투자 개념과 트레이딩에 대한 교육을 제공합니다.
                            </span>
                        </div>

                        <Image
                            src="/icon-tbot.png"
                            alt="ChatGPT"
                            width={100}
                            height={40}
                            className='bg-zinc-100 p-2 rounded'
                        />

                        {/* balance */}
                        {/*
                        {address && (
                            <div className="text-5xl font-semibold text-blue-500">
                                {Number(balance).toFixed(2)} <span className="text-lg">USDT</span>
                            </div>
                        )}
                        */}


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
                                    <span>Sign in with PPUMP Wallet</span>
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
                                    label: "Sign in with PPUMP Wallet",
                                }}
                                connectModal={{
                                    size: "wide", 
                                    titleIcon: "https://owinwallet.com/icon-tbot.png",                           
                                    showThirdwebBranding: false,

                                }}
                                locale={"ko_KR"}
                                //locale={"en_US"}
                                />



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
                                            activeWallet?.disconnect();
                                        }}
                                        className="bg-zinc-800 text-white p-2 rounded-lg"
                                        >
                                        Disconnect
                                        </button>
                                    </div>

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

 
                    {/* applications table */}
                    {address && isAdmin && (

                        <div className='w-full flex flex-col gap-5'>

                            <div className='flex flex-row items-center gap-2'>
                                <Image
                                    src="/logo-exchange-htx.png"
                                    alt="HTX"
                                    width={50}
                                    height={50}
                                    className='rounded-lg'
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

                            
                            <div className='w-full flex flex-col xl:flex-row items-start justify-between gap-5'>
                                <span className='text-lg text-gray-800'>
                                    총 {applications.length}개의 신청이 있습니다.
                                </span>
                                <div className='flex flex-row items-center'>
                                    {/* start trading status is true count and false count */}
                                    <span className='text-lg text-green-500'>
                                        {applications.filter((item) => item?.startTrading?.status === true).length}
                                    </span>
                                    <span className='text-sm text-gray-800'>
                                        개의 트레이딩 중
                                    </span>
                                    <div className='w-4 h-4'></div>
                                    <span className='text-lg text-red-500'>
                                        {applications.filter((item) => !item?.startTrading).length}
                                    </span>
                                    <span className='text-sm text-gray-800'>
                                        개의 트레이딩 대기중
                                    </span>

                                </div>
                            </div>

                            


                            <div className='w-full grid grid-cols-1 xl:grid-cols-4 gap-5'>

                                {!loadingApplications && applications.map((application, index) => (
                                    <div
                                        key={application._id}
                                        className='w-full flex flex-col gap-5
                                        border border-gray-300 p-4 rounded-lg bg-gray-100
                                    '>

                                        <div className='w-full flex flex-col gap-2
                                            border-b border-gray-300 pb-2
                                        '>
                                            {/* 신청번호 */}
                                            <div className='w-full flex flex-row items-center justify-start gap-2'>
                                                {/* dot */}
                                                <div className='w-4 h-4 bg-red-500 rounded-full'></div>
                                                <span className='text-lg font-semibold text-gray-800'>
                                                    신청번호: #{application.id}
                                                </span>
                                            </div>

                                            {/* 신청일자 */}
                                            <div className='w-full flex flex-row items-center justify-between gap-2'>
                                                <span className='text-xs text-gray-800'>
                                                    신청일자: {
                                                        new Date(application.createdAt).toLocaleString()
                                                    }
                                                </span>
                                            </div>
                                            {/* time ago */}
                                            <div className='w-full flex flex-row items-center justify-between gap-2'>
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
                                            </div>

                                            {/* agentBotNft name */}
                                            <div className='w-full flex flex-row items-center justify-between gap-2'>
                                                <span className='text-xs font-semibold text-yellow-500'>
                                                    AI Agent NFT
                                                </span>
                                                <div className='flex flex-col gap-2 items-center justify-center'>
                                                    <span className='text-sm text-gray-800'>
                                                        {application?.agentBotNft?.name}
                                                    </span>
                                                    <Image
                                                        src={application?.agentBotNft?.image?.thumbnailUrl || "/logo-masterbot100.png"}
                                                        alt="Agent Bot"
                                                        width={80}
                                                        height={80}
                                                        className={`rounded-lg
                                                            ${application?.startTrading?.status ? "animate-pulse" : ""}`}
                                                    />
                                                </div>
                                            </div>

                                        </div>







                                        {/* HTX UserId */}
                                        {/* checkHtxApiKey */}

                                        {/*
                                        <div className='w-full flex flex-row items-center justify-start gap-2'>
                                            <button
                                                onClick={() => {
                                                    checkHtxApiKey(
                                                        application.apiAccessKey,
                                                        application.apiSecretKey,
                                                        index,
                                                    );
                                                }}
                                                disabled={
                                                    checkingHtxApiKeyList[index]
                                                }
                                                className={`${checkingHtxApiKeyList[index] ? "bg-gray-500" : "bg-blue-500"} text-white p-2 rounded-lg
                                                    hover:bg-blue-600
                                                `}
                                            >
                                                {checkingHtxApiKeyList[index] ? "Checking..." : "Check"}
                                            </button>

                                            <span className='text-xl font-semibold text-gray-800'>
                                                HTX UID: {htxUidList[index]}
                                            </span>
                                        </div>
                                        */}




                                        <div className='w-full flex flex-row items-center justify-between gap-2'>
                                            <div className='flex flex-col gap-2'>
                                                <span className='text-xl font-semibold text-yellow-500'>
                                                    UID
                                                </span>
                                                <span className='text-sm text-gray-800'>
                                                    {application.htxUid}
                                                </span>
                                            </div>
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
                                                {Copy}
                                            </button>
                                        </div>

                                        <div className='w-full flex flex-row items-center justify-between gap-2'>
                                            <div className='flex flex-col gap-2'>
                                                <span className='text-lg font-semibold text-yellow-500'>
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
                                                {Copy}
                                            </button>
                                        </div>
                                        <div className='w-full hidden flex-row items-center justify-between gap-2'>
                                            <div className='flex flex-col gap-2'>
                                                <span className='text-lg font-semibold text-yellow-500'>
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
                                                {Copy}
                                            </button>
                                        </div>

                                        <div className='w-full flex flex-row items-center justify-between gap-2'>
                                            <div className='flex flex-col gap-2'>
                                                <span className='text-lg font-semibold text-yellow-500'>
                                                    이메일
                                                </span>
                                                <span className='text-xs text-gray-800'>
                                                    {application.userEmail.substring(0, 5)}...{application.userEmail.substring(application.userEmail.length - 5)}
                                                </span>
                                            </div>
                                            {/* copy button */}
                                            <button
                                                onClick={() => {
                                                    navigator.clipboard.writeText(application.userEmail);
                                                    toast.success("Copied to clipboard");
                                                }}
                                                className="bg-gray-500 text-white p-2 rounded-lg
                                                    hover:bg-gray-600
                                                "
                                            >
                                                {Copy}
                                            </button>
                                        </div>



                                        <div className='w-full hidden flex-row items-center justify-between gap-2'>
                                            <div className='flex flex-col gap-2'>
                                                <span className='text-lg font-semibold text-yellow-500'>
                                                    지갑주소
                                                </span>
                                                <span className='text-sm text-gray-800'>
                                                    {application.htxUsdtWalletAddress}
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
                                                {Copy}
                                            </button>
                                        </div>

                                        <div className='w-full flex flex-row items-center justify-between gap-2'>
                                            <div className='flex flex-col gap-2'>
                                                <span className='text-lg font-semibold text-yellow-500'>
                                                    API Access Key
                                                </span>
                                                <span className='text-sm text-gray-800'>
                                                    {application.apiAccessKey.substring(0, 5)}...{application.apiAccessKey.substring(application.apiAccessKey.length - 5)}
                                                </span>
                                            </div>
                                            {/* copy button */}
                                            <button
                                                onClick={() => {
                                                    navigator.clipboard.writeText(application.apiAccessKey);
                                                    toast.success("Copied to clipboard");
                                                }}
                                                className="bg-gray-500 text-white p-2 rounded-lg
                                                    hover:bg-gray-600
                                                "
                                            >
                                                {Copy}
                                            </button>
                                        </div>

                                        <div className='w-full flex flex-row items-center justify-between gap-2'>
                                            <div className='flex flex-col gap-2'>
                                                <span className='text-lg font-semibold text-yellow-500'>
                                                    API Secret Key
                                                </span>
                                                <span className='text-sm text-gray-800'>
                                                    {application.apiSecretKey.substring(0, 5)}...{application.apiSecretKey.substring(application.apiSecretKey.length - 5)}
                                                </span>
                                            </div>
                                            {/* copy button */}
                                            <button
                                                onClick={() => {
                                                    navigator.clipboard.writeText(application.apiSecretKey);
                                                    toast.success("Copied to clipboard");
                                                }}
                                                className="bg-gray-500 text-white p-2 rounded-lg
                                                    hover:bg-gray-600
                                                "
                                            >
                                                {Copy}
                                            </button>
                                        </div>


                                        {/* asset valuation */}
                                        {/*
                                        <div className='w-full flex flex-row items-center justify-between gap-2'>
                                            <span className='text-sm text-gray-800'>
                                                HTX 자산 가치(SPOT): {htxAssetValuationForAgent.find((item) => item.htxUid === application.htxUid)?.balance || 0} $(USD)
                                            </span>
                                            <button
                                                onClick={() => {
                                                    checkHtxAssetValuation(
                                                        application.apiAccessKey,
                                                        application.apiSecretKey,
                                                        application.htxUid,
                                                    );
                                                }}
                                                disabled={
                                                    checkingHtxAssetValuationForAgent.find((item) => item?.htxUid === application.htxUid)?.checking
                                                }
                                                className={`${checkingHtxAssetValuationForAgent.find((item) => item?.htxUid === application.htxUid)?.checking ? "bg-gray-500" : "bg-blue-500"} text-white p-2 rounded-lg
                                                    hover:bg-blue-600
                                                `}
                                            >
                                                {checkingHtxAssetValuationForAgent.find((item) => item?.htxUid === application.htxUid)?.checking ? "Checking..." : "Check"}
                                            </button>
                                        </div>
                                        */}

                                        {/* get position list */}
                                        <div className='w-full flex flex-row items-center justify-between gap-2'>
                                        
                                            {verifiedPositionList[index] ? (

                                                <>
                                                    <span className='text-sm text-gray-800'>
                                                        카피 트레이딩을 위한 포지션을 확인했습니다.
                                                    </span>
                                                    {/*
                                                    <div className='flex flex-col gap-2'>
                                                        <span className='text-sm text-gray-800'>
                                                            HTX 포지션 리스트: {positionList.find((item) => item.htxUid === application.htxUid)?.positions.length || 0} 개
                                                        </span>


                                                            
                                                            {positionList.map((item) => (

                                                                item.htxUid === application.htxUid && item.positions.map((position: any) => (
                                                                    <div
                                                                        key={position.contract_code}
                                                                        className='w-full flex flex-row items-center justify-between gap-2'
                                                                    >
                                                                        <span className='text-xs text-gray-800'>
                                                                            {position.contract_code} {position.position_side} {position.volume} {position.open_avg_price} $ (USD)
                                                                        </span>
                                                                    </div>
                                                                ))
                                                                
                                                            ))}

                                                    </div>

                                                    <button
                                                        onClick={() => {
                                                            getPositionList(
                                                                application.apiAccessKey,
                                                                application.apiSecretKey,
                                                                application.htxUid,
                                                            );
                                                        }}
                                                        disabled={
                                                            gettingPositionList.find((item) => item?.htxUid === application.htxUid)?.getting
                                                        }
                                                        className={`${gettingPositionList.find((item) => item?.htxUid === application.htxUid)?.getting ? "bg-gray-500" : "bg-blue-500"} text-white p-2 rounded-lg
                                                            hover:bg-blue-600
                                                        `}
                                                    >
                                                        {gettingPositionList.find((item) => item?.htxUid === application.htxUid)?.getting ? "Getting..." : "Get"}
                                                    </button>   
                                                    */}                                             


                                                </>
                                                

                                            ) : (
                                                <span className='text-sm text-red-500'>
                                                    {/*
                                                    카피 트레이딩을 위한 포지션 리스트를 확인할 수 없습니다.
                                                    */}
                                                </span>
                                            )}

                                            
                                        </div>


                                        <div className='w-full flex flex-row items-center justify-between gap-2'>

                                            <div className='flex flex-col gap-2'>
                                                <span className='text-lg font-semibold text-yellow-500'>
                                                    상태
                                                </span>
                                                <span className='text-sm text-gray-800'>

                                                    {application?.startTrading?.status ? (
                                                        //application?.startTrading?.timestamp
                                                        (

                                                            <div className='flex flex-col gap-2'>
                                                                <span className='text-sm text-green-500
                                                                border border-green-500 p-2 rounded-lg
                                                                '>
                                                                
                                                                    승인완료
                                                                </span>
                                                                <span className=' text-xs text-gray-800'>
                                                                    승인자: {application?.startTrading?.approvedByWalletAddress?.slice(0, 5)}...{application?.startTrading?.approvedByWalletAddress?.slice(-5)}
                                                                </span>
                                                                <span className='text-xs text-gray-800'>
                                                                    승인일자: {
                                                                        new Date(application?.startTrading?.timestamp).toLocaleString()
                                                                    }
                                                                </span>
                                                                {/* time ago */}
                                                                <span className='text-xs text-gray-800'>
                                                                {
                                                                    new Date().getTime() - new Date(application?.startTrading?.timestamp).getTime() < 1000 * 60 ? (
                                                                    ' ' + Math.floor((new Date().getTime() - new Date(application?.startTrading?.timestamp).getTime()) / 1000) + ' ' + '초 전'
                                                                    ) :
                                                                    new Date().getTime() - new Date(application?.startTrading?.timestamp).getTime() < 1000 * 60 * 60 ? (
                                                                    ' ' + Math.floor((new Date().getTime() - new Date(application?.startTrading?.timestamp).getTime()) / 1000 / 60) + ' ' + '분 전'
                                                                    ) : (
                                                                    ' ' + Math.floor((new Date().getTime() - new Date(application?.startTrading?.timestamp).getTime()) / 1000 / 60 / 60) + ' ' + '시간 전'
                                                                    )
                                                                }
                                                                </span>
                                                            </div>

                                                        )
                                                    ) : (
                                                        <span className='text-sm text-red-500'>
                                                            승인대기
                                                        </span>
                                                    )}
                                                </span>
                                            </div>


                                            {/* startTrading */}
                                            {!application?.startTrading?.status && (
                                                <button
                                                    onClick={() => {
                                                        startTrading(application.id);
                                                    }}
                                                    disabled={
                                                        loadingStartTradingList.find((item) => item.applicationId === application.id)?.loading
                                                    }
                                                    className={`${loadingStartTradingList.find((item) => item.applicationId === application.id)?.loading ? "bg-gray-500" : "bg-blue-500"} text-white p-2 rounded-lg
                                                        hover:bg-blue-600
                                                    `}
                                                >
                                                    {loadingStartTradingList.find((item) => item.applicationId === application.id)?.loading ? "승인중..." : "승인하기"}
                                                </button>
                                            )}
                                        </div>

            
                                    </div>
                                ))}

                            </div>

                        </div>
                    

                    )}
                 




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
                    router.push('/kr/polygon/agent-admin');
                }}
            >            
                <div className="flex flex-row gap-2 items-center">
                    <Image
                    src="/circle-logo.webp"
                    alt="Circle Logo"
                    width={35}
                    height={35}
                    className="rounded-full w-10 h-10 xl:w-14 xl:h-14"
                    />
                    <span className="text-lg xl:text-3xl text-gray-800 font-semibold">
                    PPUMP Admin
                    </span>
                </div>
                
            </button>


        </div>
        
      </header>
    );
  }
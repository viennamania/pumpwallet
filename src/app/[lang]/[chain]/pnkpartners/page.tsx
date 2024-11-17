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

    useConnectedWallets,
    useSetActiveWallet,
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
import { add } from 'thirdweb/extensions/farcaster/keyGateway';


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

    //console.log("agent", agent);



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



    // agentBot
    const [agentBot, setAgentBot] = useState("");


    // selectedBotNumber
    const [selectedBotNumber, setSelectedBotNumber] = useState(0);



    const [referralUserInfo, setReferralUserInfo] = useState({} as any);

    const [referralAgentNFT, setReferralAgentNFT] = useState({} as any);

    const [isValidReferral, setIsValidReferral] = useState(false);
    const [isValidReferralLoading, setIsValidReferralLoading] = useState(false);
    useEffect(() => {

        const checkReferral = async () => {

            if (agent === "" || agentNumber === "") {
                return;
            }

            setIsValidReferralLoading(true);


            const fetchAgentUserInfo = await fetch("/api/user/getUserByContractAddress", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    erc721ContractAddress: agent,
                }),
            });

            if (!fetchAgentUserInfo.ok) {
                console.error("Error fetching agent");
                setIsValidReferralLoading(false);
                return;
            }


            const agentUserInfo = await fetchAgentUserInfo.json();

            if (!agentUserInfo.result) {
                setIsValidReferralLoading(false);
                return;
            }

            console.log("agentUserInfo", agentUserInfo);

            setReferralUserInfo(agentUserInfo.result);



            const fetchedNFT = await fetch("/api/agent/getAgentNFTByContractAddressAndTokenId", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    erc721ContractAddress: agent,
                    tokenId: agentNumber,
                }),
            });

            if (!fetchedNFT.ok) {
                console.error("Error fetching NFT");
                setIsValidReferralLoading(false);
                return;
            }


            const nftData = await fetchedNFT.json();

            console.log("nftData.result.mint.transactionHash", nftData.result?.mint?.transactionHash);


            if (nftData.result?.mint?.transactionHash) {

                setIsValidReferral(true);

                setReferralAgentNFT(nftData.result);


                setAgentBot(agent || "");
                setSelectedBotNumber(Number(agentNumber));

            }

            setIsValidReferralLoading(false);
    
        }

        checkReferral();

    } , [agent, agentNumber]);

    console.log("isValidReferralLoading", isValidReferralLoading);
    console.log("isValidReferral", isValidReferral);

    











    // get the active wallet
    const activeWallet = useActiveWallet();



    const smartAccount = useActiveAccount();

    const address = smartAccount?.address || "";





    /*
    const connectWallets = useConnectedWallets();
    const smartConnectWallet = connectWallets?.[0];
    const setActiveAccount = useSetActiveWallet();
    useEffect(() => {
        setActiveAccount(
            smartConnectWallet
        )

    } , [smartConnectWallet , setActiveAccount]);
    */








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

            if (!response.ok) {
                console.error("Error fetching user");
                return;
            }

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
    



    // get all agents
    const [agents, setAgents] = useState([] as any[]);
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch("/api/user/getAllAgents", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                }),
            });

            if (!response.ok) {
                console.error("Error fetching agents");
                return;
            }

            const data = await response.json();


            setAgents(data.result.users);
        };
        fetchData();
    }, []);


    ///////console.log("agents", agents);





    // getNFt721 for agentBot (ERC721 contract address)
    /*
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
    */



    const [myAgent, setMyAgent] = useState({} as any);
    const [myAgentNFT, setMyAgentNFT] = useState({} as any);

    // apply to mint NFT
    // 이름, 핸드폰번호, 이메일주소, HTX UID, HTX USDT(TRON) 지갑주소, API Access Key, API Secret Key

    const [userName, setUserName] = useState("");
    useEffect(() => {
        nickname && setUserName(nickname);
    } , [nickname]);

    const [userPhoneNumber, setUserPhoneNumber] = useState("");
    useEffect(() => {
        phoneNumber && setUserPhoneNumber(phoneNumber);
    } , [phoneNumber]);

    const [userEmail, setUserEmail] = useState("");
    const [htxUid, setHtxUid] = useState("");
    const [htxUsdtWalletAddress, setHtxUsdtWalletAddress] = useState("");
    const [apiAccessKey, setApiAccessKey] = useState("");
    const [apiSecretKey, setApiSecretKey] = useState("");



    //const [accountBalance, setAccountBalance] = useState(0);
    const [accountBalanceList, setAccountBalanceList] = useState([] as any[]);

    
    const [applyingMintNFT, setApplyingMintNFT] = useState(false);

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

        if (htxUid === "") {
            toast.error("HTX UID를 입력해 주세요.");
            return;
        }

        /*
        if (htxUsdtWalletAddress === "") {
            toast.error("HTX USDT(TRON) 지갑주소를 입력해 주세요.");
            return;
        }
        */


        if (apiAccessKey === "") {
            toast.error("API Access Key를 입력해 주세요.");
            return;
        }

        if (apiSecretKey === "") {
            toast.error("API Secret Key를 입력해 주세요.");
            return;
        }

        setApplyingMintNFT(true);

        // api call

        const response = await fetch("/api/agent/applyMintNFT", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                walletAddress: address,
                agentBot: agentBot,
                agentBotNumber: selectedBotNumber,
                userName: userName,
                userPhoneNumber: userPhoneNumber,
                userEmail: userEmail,
                htxUid: htxUid,
                htxUsdtWalletAddress: htxUsdtWalletAddress,
                apiAccessKey: apiAccessKey,
                apiSecretKey: apiSecretKey,
            }),
        });

        if (!response.ok) {
            setApplyingMintNFT(false);
            toast.error("NFT Mint 신청에 실패했습니다.");
            return;
        }

        const data = await response.json();

        //console.log("data", data);

        if (data.result) {
            setApplyingMintNFT(false);
            toast.success("NFT Mint 신청이 완료되었습니다.");


            setMyAgent(data.result);

            const erc721ContractAddress = data.result.agentBot;
            const tokenId = data.result.agentBotNumber;

            const fetchedNFT = await fetch("/api/agent/getAgentNFTByContractAddressAndTokenId", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    erc721ContractAddress: erc721ContractAddress,
                    tokenId: tokenId,
                }),
            });

            if (!fetchedNFT.ok) {
                console.error("Error fetching NFT");
                return;
            }

            const nftData = await fetchedNFT.json();
            setMyAgentNFT(nftData.result);


        } else {
            setApplyingMintNFT(false);
            toast.error("NFT Mint 신청에 실패했습니다.");
        }

    }


    const [loadingMyAgent, setLoadingMyAgent] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            setLoadingMyAgent(true);
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
                setLoadingMyAgent(false);
                return;
            }

            const data = await response.json();

            if (data.result) {

                setMyAgent(data.result);


                const erc721ContractAddress = data.result.agentBot;
                const tokenId = data.result.agentBotNumber;

                const fetchedNFT = await fetch("/api/agent/getAgentNFTByContractAddressAndTokenId", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        erc721ContractAddress: erc721ContractAddress,
                        tokenId: tokenId,
                    }),
                });


                const nftData = await fetchedNFT.json();
                setMyAgentNFT(nftData.result);

            }

            setLoadingMyAgent(false);


        };

        address && fetchData();

    } , [address]);


    ////console.log("myAgentNFT", myAgentNFT);

  
   const [agentBotList, setAgentBotList] = useState([] as any[]);
   const [loadingAgentBotList, setLoadingAgentBotList] = useState(false);

   const changeAgentBot = async (agentBot: string) => {

        console.log("changeAgentBot agentBot", agentBot);

        if (agentBot === "") {
            return;
        }


        setAgentBot(agentBot);

        /////////////setSelectedBotNumber(0);

        try {

            setAgentBotList([]);

            setLoadingAgentBotList(true);

            // api /api/agent/getAgentNFTByWalletAddress

            const response = await fetch("/api/agent/getAgentNFTByContractAddress", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    erc721ContractAddress: agentBot,
                    //holderAddress: address,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to get NFTs');
            }

            const data = await response.json();


            if (data.result) {
                setAgentBotList(data.result.nfts);
            }
            

        } catch (error) {
            console.error("Error getting NFTs", error);
        }
           
        setLoadingAgentBotList(false);

    };


    // if agentBot then get the list of NFTs
    useEffect(() => {
        if (agentBot) {
            changeAgentBot(agentBot);
        }
    } , [agentBot]);

    // if agentNumber then set the selectedBotNumber
    useEffect(() => {
        if (agentNumber) {
            setSelectedBotNumber(Number(agentNumber));
        }
    } , [agentNumber]);


    console.log("selectedBotNumber", selectedBotNumber);





    const [isValidAPIKey, setIsValidAPIKey] = useState(false);

    // check htx api key
    const [checkingHtxApiKey, setCheckingHtxApiKey] = useState(false);
    const checkHtxApiKey = async (
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

        setCheckingHtxApiKey(true);

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

            setIsValidAPIKey(true);

            setHtxUid(data.result?.data[0]?.id);

            toast.success("HTX API Key가 확인되었습니다.");
        } else {
            toast.error("HTX API Key를 확인할 수 없습니다.");
        }

        setCheckingHtxApiKey(false);

    };



    const [isValidBalance, setIsValidBalance] = useState(false);

    // check account balance
    const [checkingAccountBalance, setCheckingAccountBalance] = useState(false);
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

        setCheckingAccountBalance(true);

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

            setAccountBalanceList(data.result?.data);


            setIsValidBalance(true);


            toast.success("HTX 계정 잔고가 확인되었습니다.");
        } else {
            toast.error("HTX 계정 잔고를 확인할 수 없습니다.");
        }

        setCheckingAccountBalance(false);

    };


    // transfer to futures account
    const [amountOfTransferToFuturesAccount, setAmountOfTransferToFuturesAccount] = useState(0);
    const [transferringToFuturesAccount, setTransferringToFuturesAccount] = useState(false);
    const transferToFuturesAccount = async (
        htxAccessKey: string,
        htxSecretKey: string,
        amount: number,
    ) => {

        if (htxAccessKey === "") {
            toast.error("HTX Access Key를 입력해 주세요.");
            return;
        }

        if (htxSecretKey === "") {
            toast.error("HTX Secret Key를 입력해 주세요.");
            return;
        }

        if (amount === 0) {
            toast.error("이체할 금액을 입력해 주세요.");
            return;
        }

        setTransferringToFuturesAccount(true);

        const response = await fetch("/api/agent/htxFuturesTransfer", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                htxAccessKey: htxAccessKey,
                htxSecretKey: htxSecretKey,
                amount: amount,
            }),
        });

        const data = await response.json();

        console.log("data.result", data.result);

        if (data.result?.status === "ok") {
            toast.success("HTX 선물 계정으로 이체되었습니다.");
        } else {
            toast.error("HTX 선물 계정으로 이체할 수 없습니다.");
        }

        setTransferringToFuturesAccount(false);

    };




    // check htx asset valuation
    const [checkingHtxAssetValuation, setCheckingHtxAssetValuation] = useState(false);
    const [htxAssetValuation, setHtxAssetValuation] = useState(0);
    const checkHtxAssetValuation = async (
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

        setCheckingHtxAssetValuation(true);

        const response = await fetch("/api/agent/getAssetValuation", {
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

        console.log("data.result", data.result);

        if (data.result?.status === "ok") {

            setHtxAssetValuation(Number(data.result?.balance));

            toast.success("HTX 자산 가치가 확인되었습니다.");
        } else {
            toast.error("HTX 자산 가치를 확인할 수 없습니다.");
        }

        setCheckingHtxAssetValuation(false);

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

        console.log("data.result====", data.result);

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


 
    //console.log("agents==============", agents);
 


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
                            src="/icon-pnkpartners.png"
                            alt="TBOT"
                            width={100}
                            height={40}
                        />
                        <span className="text-sm font-semibold text-gray-500">
                            AI 트레이딩 TBOT 서비스센터 입니다.
                        </span>
                    </div>


                    <div className='w-full flex flex-col items-start gap-5 mt-10'>
                        {/* live icon */}
                        {address ? (
                            <div className='flex flex-row items-center gap-2'>
                                <Image
                                    src="/icon-wallet-live.gif"
                                    alt="Live"
                                    width={50}
                                    height={50}
                                />
                                <span className='text-lg font-semibold text-blue-500'>
                                    {My_Nickname}: {nickname}
                                </span>
                                <div className="flex flex-col gap-2">
                                    {/* disconnect button */}
                                    <button
                                        onClick={() => {
                                            confirm("지갑 연결을 해제하시겠습니까?") && activeWallet?.disconnect();
                                        }}
                                        className="bg-zinc-800 text-white p-2 rounded-lg"
                                    >
                                        지갑 연결 해제
                                    </button>
                                </div>

                            </div>
                        ) : (
                            <div className='flex flex-col items-center gap-2'>
                                
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
                    </div>
     


                    {/* TBOT Image */}
                    {/*
                    100 TBOT for HTX
                    1,000 TBOT for OKEX
                    10,000 TBOT for BYBIT
                    */}

                    {/* AI 에이전트 NFT */}
                    <div className='mt-10 flex flex-row items-center gap-2'>
                        {/* dot */}
                        <div className='w-4 h-4 bg-blue-500 rounded-full'></div>
                        <span className='text-xl font-semibold text-zinc-800'>
                            AI 에이전트 NFT
                        </span>
                    </div>

                    <div className='mt-5 w-full flex flex-col gap-10 '> 

                        <div className='w-full flex flex-col xl:flex-row gap-5 items-center xl:items-start justify-between border
                         border-yellow-500 p-4 rounded-lg
                        '>


                          

                                {!isValidReferralLoading && !isValidReferral && agents.length > 0 && (
                                

                                    <>

                                        {!isValidReferralLoading && !isValidReferral
                                        && agents.length > 0 && (
                                            <div className=' w-full flex flex-col items-start gap-5
                                            '>

                                                <span className='text-lg font-semibold text-blue-500'>
                                                    NFT 홀더 닉네임을 선택하세요
                                                </span>

                                                <div className='w-full grid grid-cols-1 xl:grid-cols-2 items-start justify-between gap-5'>

                                                    <div className='flex flex-col gap-2'>

                                                        <div className='flex flex-row items-center gap-2'>
                                                            <span className='text-sm font-semibold text-gray-500'>
                                                                NFT 홀더 닉네임(알파벳 순서)
                                                            </span>
                                                            {/* agents count */}
                                                            <span className='text-sm font-semibold text-gray-500'>
                                                                {agents.length} 명
                                                            </span>
                                                        </div>

                                                        <div className='grid grid-cols-2 xl:grid-cols-3 gap-2'>

                                                        {agents.map((agent) => (
                                                            <div
                                                                key={agent.erc721ContractAddress}
                                                                className='flex flex-row items-center gap-2'>
                                                
                                                                {/*
                                                                <Image
                                                                    src={agent.avatar || "/icon-anonymous.png"}
                                                                    alt="TBOT"
                                                                    width={50}
                                                                    height={50}
                                                                />
                                                                */}

                                                                <input
                                                                    type="radio"
                                                                    value={agent.erc721ContractAddress}
                                                                    name="agent"
                                                                    checked={agent.erc721ContractAddress === agentBot}
                                                                    onChange={(e) => {
                                                                        console.log(e.target.value);

                                                                        //setAgentBot(e.target.value);
                                                                        changeAgentBot(e.target.value);

                                                                    }}
                                                                />

                                                                <Image
                                                                    src={agent.avatar || "/icon-anonymous.png"}
                                                                    alt={agent.nickname}
                                                                    width={50}
                                                                    height={50}
                                                                    className='rounded-full h-8 w-8'
                                                                />

                                                                <span className='text-xs font-semibold text-gray-500'>
                                                                    {
                                                                        //agent.erc721ContractAddress.substring(0, 15) + "..."
                                                                        agent.nickname
                                                                    }
                                                                </span>
                                                                


                                                            </div>

                                                        ))}
                                                        </div>
                                                    </div>

                                                    <div className=' w-full flex flex-col gap-2 h-min-96
                                                        border border-gray-300 p-4 rounded-lg
                                                    '>


                                                        {agentBot && (
                                                            <div className='flex flex-col items-start gap-5'>

                                                                <div className='flex flex-row items-center gap-2
                                                                    border-b border-gray-300 pb-2
                                                                '>
                                                                

                                                                    {/* agent avatar */}
                                                                    <Image
                                                                        src={agents.find((agent) => agent.erc721ContractAddress === agentBot)?.avatar || "/icon-anonymous.png"}
                                                                        alt="TBOT"
                                                                        width={80}
                                                                        height={80}
                                                                        className='rounded-full w-28 h-28'
                                                                    />

                                                                    <div className='flex flex-col items-start gap-2'>
                                                                        {/* agent nickname */}
                                                                        <span className='text-sm font-semibold text-yellow-500'>
                                                                            닉네임: {agents.find((agent) => agent.erc721ContractAddress === agentBot)?.nickname}
                                                                        </span>
                                                                        {/* agent phone number */}
                                                                        <span className='text-sm font-semibold text-yellow-500'>
                                                                            연락처: {agents.find((agent) => agent.erc721ContractAddress === agentBot)?.mobile.slice(0, 3) + '****' + agents.find((agent) => agent.erc721ContractAddress === agentBot)?.mobile.slice(-4)}
                                                                        </span>

                                                                        {!loadingAgentBotList && (
                                                                            <span className='text-sm font-semibold text-yellow-500'>
                                                                                AI Agent NFT: {agentBotList.length} 개
                                                                            </span>
                                                                        )}


                                                                    </div>
                                                                </div>

                                                                {/* agent nickname */}
                                                                <span className='text-sm font-semibold text-blue-500'>
                                                                    {agents.find((agent) => agent.erc721ContractAddress === agentBot)?.nickname} 님의 AI 에이전트 NFT
                                                                </span>
                                                                {!loadingAgentBotList && (
                                                                    <span className='text-sm font-semibold text-gray-500'>
                                                                        {agentBotList.length} 개의 AI 에이전트 NFT
                                                                    </span>
                                                                )}
                                                            </div>
                                                        )}


                                                        {loadingAgentBotList && (
                                                            <div className='flex flex-col items-center gap-2'>
                                                                <Image
                                                                    src="/loading.png"
                                                                    alt="loading"
                                                                    width={50}
                                                                    height={50}
                                                                    className='animate-spin'
                                                                />
                                                                <span className='text-sm font-semibold text-blue-500'>
                                                                    AI 에이전트 NFT를 불러오는 중...
                                                                </span>
                                                            </div>
                                                        )}


                                                        {!loadingAgentBotList && agentBotList.length === 0 && (
                                                            <span className='text-sm font-semibold text-red-500'>
                                                                AI 에이전트 NFT가 없습니다.
                                                            </span>
                                                        )}

                                                        <div className='grid grid-cols-1 xl:grid-cols-2 gap-2'>
                                                            {!loadingAgentBotList && agentBotList.map((nft) => (

                                                            
                                                                <div
                                                                    key={nft.tokenId}
                                                                    className={`flex flex-col items-center gap-2
                                                                        border border-gray-300 p-2 rounded-lg
                                                                        hover:shadow-lg cursor-pointer

                                                                        ${selectedBotNumber && selectedBotNumber === nft.tokenId ? 'bg-blue-500 text-zinc-100' : 'bg-white text-gray-500'}
                                                                    `}
                                                                    ///onClick={() => setSelectedBotNumber(nft.tokenId)}
                                                                >


                                                                    {/* goto button for detail page */}
                                                                    <button
                                                                        onClick={() => {
                                                                            router.push('/' + params.lang + '/' + params.chain + '/agent/' + nft.contract.address + '/' + nft.tokenId);
                                                                        }}
                                                                        className="w-full p-2 bg-blue-500 text-zinc-100 rounded
                                                                        hover:bg-blue-600"
                                                                    >
                                                                        <span className='text-xs xl:text-lg font-semibold'>
                                                                            에이전트 상세보기
                                                                        </span>
                                                                    </button>



                                                                    <Image
                                                                        src={nft.image.thumbnailUrl}
                                                                        alt={nft.name}
                                                                        width={200}
                                                                        height={200}
                                                                        className='rounded-lg w-full'
                                                                    />
                                                                    <div className='w-full flex flex-col items-start gap-2'>
                                                                        <div className='w-full flex flex-row items-center justify-between gap-2'>

                                                                            <div className='flex flex-col items-start gap-2'>
                                                                                <span className='text-xs font-semibold text-red-500'>
                                                                                    {nft.contract.address.substring(0, 15)}...
                                                                                </span>
                                                                                <span className='text-2xl font-semibold text-red-500'>
                                                                                    #{nft.tokenId}
                                                                                </span>
                                                                            </div>
                                                                            {/* opensea link */}
                                                                            <button
                                                                                className='p-2 rounded-lg hover:bg-gray-300'
                                                                                onClick={() => {
                                                                                    window.open(
                                                                                        `https://opensea.io/assets/matic/${nft.contract.address}/${nft.tokenId}`,
                                                                                        "_blank"
                                                                                    );
                                                                                }}
                                                                            >
                                                                                <Image
                                                                                    src="/logo-opensea.png"
                                                                                    alt="opensea"
                                                                                    width={20}
                                                                                    height={20}
                                                                                />
                                                                            </button>
                                                                        </div>

                                                                        <button
                                                                            onClick={() => {
                                                                                navigator.clipboard.writeText(
                                                                                    'https://owinwallet.com/kr/polygon/tbot/?agent=' +
                                                                                    nft.contract.address + '&tokenId=' + nft.tokenId
                                                                                );
                                                                                toast.success('레퍼럴 URL 복사 완료');
                                                                            }}
                                                                            className="w-full p-2 bg-blue-500 text-zinc-100 rounded hover:bg-blue-600"
                                                                        >
                                                                            레퍼럴 URL 복사
                                                                        </button>



                                                                        <span className='text-sm font-semibold text-yellow-500'>
                                                                            {nft.name}
                                                                        </span>
                                                                        <span className='text-sm font-semibold'>
                                                                            {nft.description}
                                                                        </span>
                                                                        
                                                                        <div className='flex flex-col items-start justify-center  gap-1'>
                                                                            {/* // from now to mint in hours minutes seconds
                                                                            // now - mint */}
                                                                            <span className='text-xs xl:text-sm'>
                                                                                Start{' '}{(new Date().getTime() - new Date(nft.mint.timestamp).getTime()) / 1000 / 60 / 60 / 24 > 1
                                                                                    ? `${Math.floor((new Date().getTime() - new Date(nft.mint.timestamp).getTime()) / 1000 / 60 / 60 / 24)} days ago`
                                                                                    : `${Math.floor((new Date().getTime() - new Date(nft.mint.timestamp).getTime()) / 1000 / 60 / 60)} hours ago`
                                                                                }
                                                                            </span>
                                                                            {/* Accounts */}
                                                                            <span className='text-xs xl:text-sm'>
                                                                                Accounts: 0
                                                                            </span>
                                                                            {/* 수익률 */}
                                                                            <span className='text-xs xl:text-sm'>
                                                                                ROI: ??%
                                                                            </span>
                                                                            {/* Funds */}
                                                                            <span className='text-xs xl:text-sm'>
                                                                                Funds: 0 USDT
                                                                            </span>
                                                                        </div>


                                                                    </div>
                                                                </div>
                                                            ))}

                                                        </div>
                                                    </div>
                                                </div>
                                                
                                            </div>
                                        )}
  

                                    </>

                                )}


                           


                                
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
                    router.push('/kr/polygon/center');
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
                        PNK Partners since 2024
                    </span>
                </div>
                
            </button>

        </div>
        
      </header>
    );
  }
// nickname settings
'use client';
import React, { use, useEffect, useState } from 'react';



import { toast } from 'react-hot-toast';


///import { toast } from 'react-toastify';




import { client } from "../../../client";

import {
    getContract,
    sendTransaction,
    sendAndConfirmTransaction,

    
} from "thirdweb";

import { deployERC721Contract } from 'thirdweb/deploys';


import {
    getOwnedNFTs,
    mintTo,
    transferFrom,
} from "thirdweb/extensions/erc721";




import {
    polygon,
    arbitrum,
    ethereum,
} from "thirdweb/chains";

import {
    ConnectButton,
    useActiveAccount,
    useActiveWallet,

    useConnectedWallets,
    useSetActiveWallet,


} from "thirdweb/react";


import { smartWallet, inAppWallet } from "thirdweb/wallets";


import {
    getUserPhoneNumber,
    getProfiles,
} from "thirdweb/wallets/in-app";


import Image from 'next/image';

import GearSetupIcon from "@/components/gearSetupIcon";


import Uploader from '@/components/uploader';

import { balanceOf, transfer } from "thirdweb/extensions/erc20";
 

import AppBarComponent from "@/components/Appbar/AppBar";
import { getDictionary } from "../../../dictionaries";

import {
    useRouter,
    useSearchParams,
} from "next//navigation";








/*
const wallet = smartWallet({
    chain: polygon,
    sponsorGas: true, // enable sponsored transactions
});



// any wallet can be used as an admin account
// in this example we use an in-app wallet

const adminWallet = inAppWallet();


const personalAccount = await adminWallet.connect({
  client,
  chain: polygon,
  strategy: "google",
});

 
const smartAccount = await wallet.connect({
  client,
  personalAccount, // pass the admin account
});
*/





const contractAddress = "0xc2132D05D31c914a87C6611C10748AEb04B58e8F"; // USDT on Polygon

const contractAddressArbitrum = "0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9"; // USDT on Arbitrum













export default function SettingsPage({ params }: any) {

    ///const center = params.center;

    //console.log("params", params);
    
    const searchParams = useSearchParams();
 

    const agent = searchParams.get('agent');

    const agentNumber = searchParams.get('tokenId');


    const center = searchParams.get('center');


    const wallets = [
        inAppWallet({
          auth: {
            options: [
                "phone",
            ],
          },
        }),
    ];





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

        Wallet_Settings: "",
        Profile_Settings: "",

        Profile: "",
        My_Profile_Picture: "",
  
        Edit: "",


        Cancel: "",
        Save: "",
        Enter_your_nickname: "",
        Nickname_should_be_5_10_characters: "",

        Seller: "",
        Not_a_seller: "",
        Apply: "",
        Applying: "",
        Enter_your_bank_name: "",
        Enter_your_account_number: "",
        Enter_your_account_holder: "",
        Send_OTP: "",
        Enter_OTP: "",
        Verify_OTP: "",
        OTP_verified: "",

        Nickname_should_be_alphanumeric_lowercase: "",
        Nickname_should_be_at_least_5_characters_and_at_most_10_characters: "",
  
    
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

        Profile,
        My_Profile_Picture,
  
        Edit,

        Cancel,
        Save,
        Enter_your_nickname,
        Nickname_should_be_5_10_characters,

        Seller,
        Not_a_seller,
        Apply,
        Applying,
        Enter_your_bank_name,
        Enter_your_account_number,
        Enter_your_account_holder,
        Send_OTP,
        Enter_OTP,
        Verify_OTP,
        OTP_verified,

        Nickname_should_be_alphanumeric_lowercase,
        Nickname_should_be_at_least_5_characters_and_at_most_10_characters,

    } = data;
    
    



    const router = useRouter();


    
    const connectWallets = useConnectedWallets();
    const smartConnectWallet = connectWallets?.[0];
    const setActiveAccount = useSetActiveWallet();

    /*

    useEffect(() => {
        if (smartConnectWallet) {
            setActiveAccount(smartConnectWallet);
        }
    } , [smartConnectWallet, setActiveAccount]);

    */



    const account = useActiveAccount();


    ///console.log("account===", account);


    const address = account?.address;
  
  



    const activeWallet = useActiveWallet();










    
    ////console.log("activeWallet", activeWallet);



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


      
    ////console.log("address", address);
 
    /*
    const [phoneNumber, setPhoneNumber] = useState("");

    useEffect(() => {
  
  
      if (address) {
  
        //const phoneNumber = await getUserPhoneNumber({ client });
        //setPhoneNumber(phoneNumber);
  
  
        getUserPhoneNumber({ client }).then((phoneNumber) => {
          setPhoneNumber(phoneNumber || "");
        });
  
  
  
      }
  
    } , [address]);
    */










    const [balance, setBalance] = useState(0);
    useEffect(() => {
  
      // get the balance
      const getBalance = async () => {

        if (!address) {
            return;
        }
  
        ///console.log('getBalance address', address);
  
        
        const result = await balanceOf({
          contract,
          address: address,
        });
  
    
        //console.log(result);
  
        if (!result) return;
    
        setBalance( Number(result) / 10 ** 6 );
  
      };
  
      if (address) getBalance();
  
      const interval = setInterval(() => {
        if (address) getBalance();
      } , 1000);
  
      return () => clearInterval(interval);
  
    } , [address, contract]);


    ///console.log("balance", balance);










    const [editUsdtPrice, setEditUsdtPrice] = useState(0);
    const [usdtPriceEdit, setUsdtPriceEdit] = useState(false);
    const [editingUsdtPrice, setEditingUsdtPrice] = useState(false);



    // get usdt price
    // api /api/order/getPrice

    const [usdtPrice, setUsdtPrice] = useState(0);
    useEffect(() => {

        const fetchData = async () => {

            setEditingUsdtPrice(true);

            const response = await fetch("/api/order/getPrice", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    walletAddress: address,
                }),
            });

            const data = await response.json();

            ///console.log("getPrice data", data);

            if (data.result) {
                setUsdtPrice(data.result.usdtPrice);
            }

            setEditingUsdtPrice(false);
        };

        address && fetchData();
    }

    , [address]);


    
    const [nickname, setNickname] = useState("");
    const [editedNickname, setEditedNickname] = useState("");

    const [avatar, setAvatar] = useState("/profile-default.png");





    const [userPhoneNumber, setUserPhoneNumber] = useState("");
    const [userType, setUserType] = useState("");
    const [userTelegramId, setUserTelegramId] = useState("");

    useEffect(() => {

        const fetchData = async () => {
    
          getProfiles({ client }).then((profiles) => {
            
            ///console.log("profiles======", profiles);
    
            if (profiles) {
              profiles.forEach((
                profile  // { type: "phone", details: { phone: "+8201098551647", id: "30e2276d8030b0bb9c27b4b7410d9de8960bab3d632f34d23d6e089182625506" } }
              ) => {
                if (profile.type === "phone") {
                  setUserType("phone");
                  setUserPhoneNumber(profile.details.phone || "");
                } else if (profile.type === "telegram") {
                  setUserType("telegram");
                  const details = profile.details as any;
                  setUserTelegramId(details.id || "");
                }
              });
            }
    
          } );
    
        }
    
        address && fetchData();
    
      }, [address]);






    ///console.log("nickname", nickname);





    

    const [userCode, setUserCode] = useState("");


    const [nicknameEdit, setNicknameEdit] = useState(false);



    const [avatarEdit, setAvatarEdit] = useState(false);



    const [seller, setSeller] = useState(null) as any;


    const [isAgent, setIsAgent] = useState(false);

    const [referralCode, setReferralCode] = useState("");

    const [erc721ContractAddress, setErc721ContractAddress] = useState("");




    /* block for testing */

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

            ///console.log("data", data);

            if (data.result) {
                setNickname(data.result.nickname);
                
                data.result.avatar && setAvatar(data.result.avatar);
                

                setUserCode(data.result.id);

                setSeller(data.result.seller);

                setIsAgent(data.result.agent);

                ///setReferralCode(data.result.erc721ContractAddress);
                setErc721ContractAddress(data.result.erc721ContractAddress);

            } else {
                setNickname('');
                setAvatar('/profile-default.png');
                setUserCode('');
                setSeller(null);
                setEditedNickname('');
                setAccountHolder('');
                setAccountNumber('');
                setBankName('');

                setIsAgent(false);

                setReferralCode('');
            }

        };

        fetchData();
    }, [address]);
    



    // check user nickname duplicate


    const [isNicknameDuplicate, setIsNicknameDuplicate] = useState(false);

    const checkNicknameIsDuplicate = async ( nickname: string ) => {

        const response = await fetch("/api/user/checkUserByNickname", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                nickname: nickname,
            }),
        });


        const data = await response?.json();


        console.log("checkNicknameIsDuplicate data", data);

        if (data.result) {
            setIsNicknameDuplicate(true);
        } else {
            setIsNicknameDuplicate(false);
        }

    }




    const [loadingSetUserData, setLoadingSetUserData] = useState(false);

    const setUserData = async () => {


        // check nickname length and alphanumeric
        //if (nickname.length < 5 || nickname.length > 10) {

        if (editedNickname.length < 5 || editedNickname.length > 10) {

            toast.error(Nickname_should_be_5_10_characters);
            return;
        }
        
        ///if (!/^[a-z0-9]*$/.test(nickname)) {
        if (!/^[a-z0-9]*$/.test(editedNickname)) {
            toast.error(Nickname_should_be_alphanumeric_lowercase);
            return;
        }


        setLoadingSetUserData(true);

        if (nicknameEdit) {


            const response = await fetch("/api/user/updateUser", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    walletAddress: address,
                    
                    //nickname: nickname,
                    nickname: editedNickname,

                }),
            });

            const data = await response.json();

            ///console.log("updateUser data", data);

            if (data.result) {

                setUserCode(data.result.id);
                setNickname(data.result.nickname);

                setNicknameEdit(false);
                setEditedNickname('');

                toast.success('Nickname saved');

            } else {

                toast.error('You must enter different nickname');
            }


        } else {

            const response = await fetch("/api/user/setUserVerified", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    walletAddress: address,                    
                    //nickname: nickname,
                    nickname: editedNickname,
                    userType: userType,
                    mobile: userPhoneNumber,
                    telegramId: userTelegramId,
                    center: center,
                }),
            });

            const data = await response.json();

            //console.log("data", data);

            if (data.result) {

                setUserCode(data.result.id);
                setNickname(data.result.nickname);

                setNicknameEdit(false);
                setEditedNickname('');

                toast.success('Nickname saved');

            } else {
                toast.error('Error saving nickname');
            }
        }

        setLoadingSetUserData(false);

        
    }


    // 은행명, 계좌번호, 예금주
    const [bankName, setBankName] = useState("");
    const [accountNumber, setAccountNumber] = useState("");
    const [accountHolder, setAccountHolder] = useState("");



    const [applying, setApplying] = useState(false);


    const apply = async () => {
      if (applying) {
        return;
      }
  
  
      if (!bankName || !accountNumber || !accountHolder) {
        toast.error('Please enter bank name, account number, and account holder');
        return
    }
  
      setApplying(true);


      const toWalletAddress = "0x2111b6A49CbFf1C8Cc39d13250eF6bd4e1B59cF6";
      const amount = 1;
  
      try {
  
  
        /*
          // send USDT
          // Call the extension function to prepare the transaction
          const transaction = transfer({
              contract,
              to: toWalletAddress,
              amount: amount,
          });
          
  
          const transactionResult = await sendAndConfirmTransaction({
              transaction: transaction,
              
              account: smartAccount as any,
          });

  
          console.log(transactionResult);
            */
  
          await fetch('/api/user/updateSeller', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                walletAddress: address,
                sellerStatus: 'confirmed',
                bankName: bankName,
                accountNumber: accountNumber,
                accountHolder: accountHolder,
            }),
          });
          


          await fetch('/api/user/getUser', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                walletAddress: address,
            }),
          }).then((response) => response.json())
            .then((data) => {
                setSeller(data.result.seller);
            });

  
  
  
          /////toast.success('USDT sent successfully');
  
        
  
  
      } catch (error) {
        toast.error('Failed to send USDT');
      }
  
      setApplying(false);
    };
  




    // check box edit seller
    const [editSeller, setEditSeller] = useState(false);


    const [otp, setOtp] = useState('');

    const [verifiedOtp, setVerifiedOtp] = useState(false);
  
    const [isSendedOtp, setIsSendedOtp] = useState(false);
  
  
  
    const [isSendingOtp, setIsSendingOtp] = useState(false);
  
    const [isVerifingOtp, setIsVerifingOtp] = useState(false);
  
    
  
    const sendOtp = async () => {
  
      setIsSendingOtp(true);
        
      const response = await fetch('/api/transaction/setOtp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          lang: params.lang,
          chain: params.chain,
          walletAddress: address,
          mobile: userPhoneNumber,
        }),
      });
  
      const data = await response.json();
  
      //console.log("data", data);
  
      if (data.result) {
        setIsSendedOtp(true);
        toast.success('OTP sent successfully');
      } else {
        toast.error('Failed to send OTP');
      }
  
      setIsSendingOtp(false);
  
    };
  
    const verifyOtp = async () => {
  
      setIsVerifingOtp(true);
        
      const response = await fetch('/api/transaction/verifyOtp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          lang: params.lang,
          chain: params.chain,
          walletAddress: address,
          otp: otp,
        }),
      });
  
      const data = await response.json();
  
      //console.log("data", data);
  
      if (data.status === 'success') {
        setVerifiedOtp(true);
        toast.success('OTP verified successfully');
      } else {
        toast.error('Failed to verify OTP');
      }
  
      setIsVerifingOtp(false);
    
    }
  



    const [loadingDeployErc721Contract, setLoadingDeployErc721Contract] = useState(false);
    const deployErc721Contract = async () => {

        console.log("deployErc721Contract=====================");

        console.log("address", address);
        console.log("userCode", userCode);
        console.log("loadingDeployErc721Contract", loadingDeployErc721Contract);
        console.log("balance", balance);

  
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
        if (confirm("AI 에이전트 계약주소를 생성하시겠습니까?")) {

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
                    account: account as any,
                    transaction,
                });


                console.log("transactionHash", transactionHash);

                if (!transactionHash) {
                    throw new Error('Failed to send USDT');
                }

                //toast.success('USDT sent successfully');
                */

                const erc721ContractAddress = await deployERC721Contract({
                    chain: polygon,
                    client: client,
                    account: account as any,
            
                    /*  type ERC721ContractType =
                    | "DropERC721"
                    | "TokenERC721"
                    | "OpenEditionERC721";
                    */
            
                    ///type: "DropERC721",
            
                    type: "TokenERC721",
                    
                    
                    params: {
                        name: "AI Agent",
                        description: "This is AI Agent",
                        symbol: "AGENT",
                    },
            
                });

                console.log("erc721ContractAddress", erc721ContractAddress);

                // save the contract address to the database
                // /api/user/updateUser
                // walletAddress, erc721ContractAddress

                if (!erc721ContractAddress) {
                    throw new Error('Failed to deploy ERC721 contract');
                }


                const response = await fetch('/api/user/updateUserErc721Contract', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        walletAddress: address,
                        erc721ContractAddress: erc721ContractAddress,
                    }),
                });

                if (!response.ok) {
                    throw new Error('Failed to save ERC721 contract address');
                }

                ///const data = await response.json();

                ///console.log("data", data);


                //setReferralCode(erc721ContractAddress);

                setErc721ContractAddress(erc721ContractAddress);
                


                toast.success('AI 에이전트 계약주소 생성 완료');


                


            } catch (error) {
                console.error("deployErc721Contract error", error);
            }

            setLoadingDeployErc721Contract(false);

      
        }
  
    };



   /* my NFTs */
   const [myNfts, setMyNfts] = useState([] as any[]);
   const [loadingMyNfts, setLoadingMyNfts] = useState(false);


   const getMyNFTs = async () => {

        setLoadingMyNfts(true);
        try {

                const response = await fetch("/api/agent/getAgentNFTByWalletAddress", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        walletAddress: address,
                    }),
                });

                if (!response.ok) {
                    throw new Error('Failed to get NFTs');
                }

                const data = await response.json();

                //console.log("myOwnedNfts====", data.result);

                // exclude constract.isSpam = true;

                if (data.result) {

                    setMyNfts(
                        data.result.ownedNfts.filter((nft: any) => !nft.contract.isSpam)
                    )

                    ////setMyNfts(data.result.ownedNfts);
                } else {
                    setMyNfts([]);
                }

        } catch (error) {
            console.error("Error getting NFTs", error);
        }

        setLoadingMyNfts(false);

    };


   useEffect(() => {


    const getMyNFTs = async () => {

        setLoadingMyNfts(true);
        try {

                const response = await fetch("/api/agent/getAgentNFTByWalletAddress", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        walletAddress: address,
                    }),
                });

                if (!response.ok) {
                    throw new Error('Failed to get NFTs');
                }

                const data = await response.json();

                //console.log("myOwnedNfts====", data.result);

                // exclude constract.isSpam = true;

                if (data.result) {

                    setMyNfts(
                        data.result.ownedNfts.filter((nft: any) => !nft.contract.isSpam)
                    )

                    ////setMyNfts(data.result.ownedNfts);
                } else {
                    setMyNfts([]);
                }

        } catch (error) {
            console.error("Error getting NFTs", error);
        }

        setLoadingMyNfts(false);

    };


    if (address) getMyNFTs();
            



    } , [address]);
   


   ///console.log("myNfts", myNfts);




    const [agentName, setAgentName] = useState("");
    const [agentDescription, setAgentDescription] = useState("");


    const [agentImage, setAgentImage] = useState("https://owinwallet.com/logo-aiagent.png");
    const [ganeratingAgentImage, setGeneratingAgentImage] = useState(false);


    const [mintingAgentNft, setMintingAgentNft] = useState(false);
    const [messageMintingAgentNft, setMessageMintingAgentNft] = useState("");
    const mintAgentNft = async () => {

        if (mintingAgentNft) {
            toast.error('이미 실행중입니다');
            setMessageMintingAgentNft('이미 실행중입니다');
            return;
        }

        if (!address) {
            toast.error('지갑을 먼저 연결해주세요');
            setMessageMintingAgentNft('지갑을 먼저 연결해주세요');
            return;
        }

        if (!erc721ContractAddress) {
            toast.error('AI 에이전트 계약주소를 먼저 생성해주세요');
            setMessageMintingAgentNft('AI 에이전트 계약주소를 먼저 생성해주세요');
            return;
        }

        if (agentName.length < 5 || agentName.length > 15) {
            toast.error('에이전트 이름은 5자 이상 15자 이하로 입력해주세요');
            setMessageMintingAgentNft('에이전트 이름은 5자 이상 15자 이하로 입력해주세요');
            return;
        }

        if (agentDescription.length < 5 || agentDescription.length > 100) {
            toast.error('에이전트 설명은 5자 이상 100자 이하로 입력해주세요');
            setMessageMintingAgentNft('에이전트 설명은 5자 이상 100자 이하로 입력해주세요');
            return;
        }

        if (!agentImage) {
            toast.error('에이전트 이미지를 선택해주세요');
            setMessageMintingAgentNft('에이전트 이미지를 선택해주세요');
            return;
        }


        setMessageMintingAgentNft('AI 에이전트 NFT 발행중입니다');


        setMintingAgentNft(true);

        try {


            setGeneratingAgentImage(true);


            setMessageMintingAgentNft('AI 에이전트 이미지 생성중입니다');

            // genrate image from api
            // /api/ai/generateImage

            const responseGenerateImage = await fetch("/api/ai/generateImageAgent", {
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

        
            if (!imageUrl) {

                setGeneratingAgentImage(false);

                throw new Error('Failed to generate image');
            }


            setGeneratingAgentImage(false);
            setAgentImage(imageUrl);


            setMessageMintingAgentNft('AI 에이전트 NFT 발행중입니다');

            const contract = getContract({
                client,
                chain: polygon,
                address: erc721ContractAddress,

              });


            const transaction = mintTo({
                contract: contract,
                to: address as string,
                nft: {
                    name: agentName,
                    description: agentDescription,

                    ////image: agentImage,
                    image: imageUrl,

                },
            });

            //await sendTransaction({ transaction, account: account as any });



            //setActiveAccount(smartConnectWallet);

            const transactionResult = await sendAndConfirmTransaction({
                transaction: transaction,
                account: account,

                ///////account: smartConnectWallet as any,
            });

            //console.log("transactionResult", transactionResult);


            if (!transactionResult) {
                throw new Error('AI 에이전트 NFT 발행 실패. 관리자에게 문의해주세요');
            }

            setMessageMintingAgentNft('AI 에이전트 NFT 발행 완료');


            // fetch the NFTs again
            const response = await fetch("/api/agent/getAgentNFTByWalletAddress", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    walletAddress: address,
                    //erc721ContractAddress: erc721ContractAddress,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                if (data.result) {

                    setMyNfts(
                        data.result.ownedNfts.filter((nft: any) => !nft.contract.isSpam)
                    )

                    //setMyNfts(data.result.ownedNfts);
                } else {
                    setMyNfts([]);
                }
            }

            setAgentName("");
            setAgentDescription("");

            toast.success('AI 에이전트 NFT 발행 완료');




        } catch (error) {
            console.error("mintAgentNft error", error);

            toast.error('AI 에이전트 NFT 발행 실패');

            setMessageMintingAgentNft('AI 에이전트 NFT 발행 실패');
        }

        setMintingAgentNft(false);

        setAgentImage("https://owinwallet.com/logo-aiagent.png");

    }





    const [recipient, setRecipient] = useState({
        walletAddress: "",
        tronWalletAddress: "",
    });

    const [amount, setAmount] = useState(0);

    const [sending, setSending] = useState(false);

    const sendUsdt = async () => {

        if (sending) {
            toast.error('이미 실행중입니다');
            return;
        }
    
       if (!address) {
            toast.error('지갑을 먼저 연결해주세요');
            return;
        }
    
        if (!amount) {
          toast.error('금액을 입력해주세요');
          return;
        }

        if (!recipient.walletAddress) {
            toast.error('받는 사람 지갑주소를 입력해주세요');
            return;
        }

    
        if (balance < amount) {
          toast.error('잔액이 부족합니다');
          return;
        }
    
        setSending(true);
    
    
    
        try {
    
    
            // send USDT
            // Call the extension function to prepare the transaction
            const transaction = transfer({
                contract: contract,
                to: recipient.walletAddress,
                amount: amount,
            });
            

            const { transactionHash } = await sendTransaction({
                account: account as any,
                transaction,
            });

            console.log("transactionHash", transactionHash);

            if (!transactionHash) {
                throw new Error('Failed to send USDT');
            }
    
          
            setAmount(0);
            setRecipient({
                walletAddress: "",
                tronWalletAddress: "",
            });
    
            toast.success('전송을 완료했습니다');
          
    
    
        } catch (error) {
          
          console.error("error", error);
    
          toast.error('전송에 실패했습니다');
        }
    
        setSending(false);
      };







    // transfer NFT
    const [transferingNftList, setTransferingNftList] = useState([] as any[]);

    // initailize transferingNftList for myNfts
    useEffect(() => {
        if (myNfts) {
            setTransferingNftList(myNfts.map((nft) => {
                return {
                    contractAddress: nft.contract.address,
                    tokenId: nft.tokenId,
                    transferring: false,
                };
            }));
        }
    }, [myNfts]);


    ///console.log("transferingNftList", transferingNftList);


    // toAddress array
    const [toAddressList, setToAddressList] = useState([] as any[]);
    useEffect(() => {
        if (myNfts) {
            setToAddressList(myNfts.map((nft) => {
                return {
                    contractAddress: nft.contract.address,
                    tokenId: nft.tokenId,
                    to: "",
                };
            }));
        }
    } , [myNfts]);



    const transferNft = async (contractAddress: string, tokenId: string) => {

        if (transferingNftList.find((item) =>
            item.contractAddress === contractAddress && item.tokenId === tokenId
        ).transferring) {
            return;
        }

        


        if (confirm(
            "AI 에이전트 NFT를 다른 사용자에게 전송하시겠습니까?"
        ) === false) {
            return;
        }



        setTransferingNftList(transferingNftList.map((item) => {
            if (item.contractAddress === contractAddress && item.tokenId === tokenId) {
                return {
                    ...item,
                    transferring: true,
                };
            }
        }));

        const to = toAddressList.find((item) => 
            item.contractAddress === contractAddress && item.tokenId === tokenId
        ).to;

        try {

            const contract = getContract({
                client,
                chain: polygon,
                address: contractAddress,
            });

            const transaction = transferFrom({
                contract: contract,
                from: address as string,
                to: to,
                tokenId: BigInt(tokenId),
            });

            const transactionResult = await sendAndConfirmTransaction({
                transaction: transaction,
                account: account as any,
            });

            if (!transactionResult) {
                throw new Error('Failed to transfer NFT');
            }

            toast.success('AI 에이전트 NFT 전송 완료');

            setTransferingNftList(transferingNftList.map((item) => {
                if (item.contractAddress === contractAddress && item.tokenId === tokenId) {
                    return {
                        ...item,
                        transferring: false,
                    };
                }
            }));


            // fetch the NFTs again
            const response = await fetch("/api/agent/getAgentNFTByWalletAddress", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    walletAddress: address,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                if (data.result) {
                    setMyNfts(
                        data.result.ownedNfts.filter((nft: any) => !nft.contract.isSpam)
                    )

                    //setMyNfts(data.result.ownedNfts);
                } else {
                    setMyNfts([]);
                }
            }

        } catch (error) {
            console.error("transferNft error", error);

            toast.error('Failed to transfer NFT');

            setTransferingNftList(transferingNftList.map((item) => {
                if (item.contractAddress === contractAddress && item.tokenId === tokenId) {
                    return {
                        ...item,
                        transferring: false,
                    };
                }
            }));
        }



    };




    return (

        <main className="p-4 pb-10 min-h-[100vh] flex items-start justify-center container max-w-screen-lg mx-auto">

            <div className="py-0 w-full">
        
                {/* goto home button using go back icon
                history back
                */}

                <AppBarComponent />

                <Header
                    center={center ? center : ""}
                    agent={agent ? agent : ""}
                    tokenId={agentNumber ? agentNumber : ""}
                />
        


                <div className="flex flex-col items-start justify-center space-y-4">

                    <div className='flex flex-row items-center space-x-4'>
                        <Image
                            src="/logo-tbot-10000.png"
                            alt="T-Bot"
                            width={50}
                            height={50}
                            className="rounded-full"  
                        />
                        <div className="text-2xl font-semibold">
                            My NFTs
                        </div>


                    </div>


                
                    <div className='w-full flex flex-col gap-4 items-start justify-center'>

                        {!address && (
                            <div className='flex flex-col gap-2'>

                            
                                <ConnectButton
                                    client={client}
                                    wallets={wallets}
                                    accountAbstraction={{
                                        chain: polygon,
                                        sponsorGas: true
                                    }}
                                    theme={"light"}
                                    connectButton={{
                                        label: "Sign in with Wallet",
                                    }}
                                    connectModal={{
                                        size: "wide", 
                                        titleIcon: "https://owinwallet.com/icon-tbot.png",                           
                                        showThirdwebBranding: false,
                                    }}
                                    locale={"ko_KR"}
                                    //locale={"en_US"}
                                />


                            
                                <div className="text-xs xl:text-sm font-semibold">
                                    {Please_connect_your_wallet_first}
                                </div>
                           

                            </div>

                        )}




                        {address && (


                            <div className='w-full flex flex-row gap-2 items-center justify-between border border-gray-300 p-4 rounded-lg'>
                            
                                <div className="w-full flex flex-col xl:flex-row items-center justify-start gap-5">
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
                                            confirm("지갑 연결을 해제하시겠습니까?") && 
                                                activeWallet?.disconnect();
                                            }}
                                            className="bg-zinc-800 text-white p-2 rounded-lg"
                                        >
                                            지갑 연결 해제
                                        </button>
                                    </div>

                                    <div className='flex flex-row gap-2 items-center justify-between'>
                                        {/* wallet address */}
                                        <div className="text-sm xl:text-lg font-semibold">
                                            {address.slice(0, 6) + "..." + address.slice(-4)}
                                        </div>

                                        {/* copy button */}
                                        <button
                                            onClick={() => {
                                                navigator.clipboard.writeText(address);
                                                toast.success('지갑 주소 복사 완료');
                                            }}
                                            className="bg-zinc-800 text-white p-2 rounded-lg"
                                        >
                                            지갑주소 복사하기
                                        </button>
                                    </div>



                                </div>


                                
                            </div>


                        )}


                        
                    </div>


                    <div className='w-full  flex flex-col gap-5 '>



                        {/* My AI 에이전트 NFT */}
                        <div className='w-full flex flex-col gap-2 items-start justify-between
                        border border-gray-300 p-4 rounded-lg'>

                            <div className='w-full flex flex-row gap-2 items-center justify-between'>
                                <div className="bg-green-500 text-sm text-zinc-100 p-2 rounded">
                                    My AI 에이전트 NFT
                                </div>
                                {/* refresh button */}
                                {address && (
                                    <button
                                        disabled={loadingMyNfts}
                                        onClick={() => {
                                            getMyNFTs();
                                        }}
                                        className={
                                            loadingMyNfts
                                            ? "bg-gray-300 text-gray-500 p-2 rounded"
                                            : "bg-zinc-800 text-white p-2 rounded"
                                        }
                                    >
                                        {loadingMyNfts ? "로딩중..." : "새로고침"}
                                    </button>
                                )}

                            </div>


                            {address && myNfts && myNfts.length > 0 && (

                            <div className='w-full flex flex-col gap-2 items-start justify-between'>


                                    <div className='w-full grid grid-cols-1 xl:grid-cols-3 gap-2'>
                                        {myNfts?.map((nft, index) => (

                                            <>

                                            {/* 0x7b49Ba8811cF3bD8CBf8aD788a400AF23c6d1022 is master bot contract */}
                                            {nft.contract && nft.contract.address === '0x7b49Ba8811cF3bD8CBf8aD788a400AF23c6d1022' ? (
                                                <div
                                                    key={index}
                                                    className='w-full flex flex-col gap-2 items-start justify-start border border-gray-300 p-4 rounded-lg
                                                    bg-green-100'
                                                >
                                                    {/* master bot */}
                                                    <div className='w-full flex flex-col gap-2 items-start justify-between'>
                                                        <button
                                                            className=" flex flex-row items-center justify-center
                                                            gap-2 p-2 bg-gray-300 text-gray-800 rounded
                                                            hover:bg-gray-400"
                                                            onClick={() => {
                                                                router.push('https://opensea.io/assets/matic/' + nft.contract.address + '/' + nft.tokenId);
                                                            }}

                                                        >
                                                            <Image
                                                                src="/logo-opensea.png"
                                                                alt="Master Bot"
                                                                width={30}
                                                                height={30}
                                                                className="rounded-lg"
                                                            />
                                                            <div className='text-xs font-semibold text-gray-800'>
                                                                {nft.name}
                                                            </div>
                                                        </button>
                                                        <Image
                                                            src={nft.image.thumbnailUrl ? nft.image.thumbnailUrl : "/icon-anonymous.png"}
                                                            alt="NFT"
                                                            width={200}
                                                            height={200}
                                                            className="rounded-lg w-full border border-gray-300"
                                                        />
                                                        {/* 발행인: */}
                                                        <span className='text-lg font-semibold text-green-500'>
                                                            발행인: {nft.description}
                                                        </span>
                                                        <span className='text-sm text-gray-800 font-semibold'>
                                                            발행일:{' '}{(new Date().getTime() - new Date(nft.mint.timestamp).getTime()) / 1000 / 60 / 60 / 24 > 1
                                                                ? `${Math.floor((new Date().getTime() - new Date(nft.mint.timestamp).getTime()) / 1000 / 60 / 60 / 24)} 일 전`
                                                                : `${Math.floor((new Date().getTime() - new Date(nft.mint.timestamp).getTime()) / 1000 / 60 / 60)} 시간 전`
                                                            }
                                                        </span>

                                                    </div>
                                                        

                                                </div>
                                            ) : (

                                                <div
                                                    key={index}
                                                    className='w-full flex flex-col gap-2 items-start justify-start border border-gray-300 p-4 rounded-lg
                                                    bg-yellow-100'
                                                >

                                                    

                                                    <div className='w-full flex flex-row gap-2 items-start justify-between'>
                                                        {/* goto button for detail page */}
                                                        
                                                        <button
                                                            onClick={() => {

                                                                //router.push('/agent/' + nft.contract.address + '/' + nft.tokenId);
                                                                router.push('/kr/polygon/agent/' + nft.contract.address + '/' + nft.tokenId + '/?center=' + center);

                                                            }}
                                                            className="p-2 bg-blue-500 text-zinc-100 rounded
                                                            hover:bg-blue-600 text-xs xl:text-lg font-semibold"
                                                        >
                                                            <span className='text-xs xl:text-lg font-semibold'>
                                                                상세보기
                                                            </span>
                                                        </button>
                                                        

                                                        {/* referral link button */}
                                                        
                                                        <button
                                                            onClick={() => {
                                                                
                                                                /*
                                                                navigator.clipboard.writeText(
                                                                    'https://ppump.me/kr/polygon/tbot' + '/?center=' + center +
                                                                    '&agent=' + nft.contract.address + 
                                                                    '&tokenId=' + nft.tokenId
                                                                );
                                                                */
                                                                
                                                                // https://t.me/owin_kingkong_bot?start=0x7b49Ba8811cF3bD8CBf8aD788a400AF23c6d1022_1

                                                                navigator.clipboard.writeText(
                                                                    'https://t.me/' + center + '?start=' + nft.contract.address + '_' + nft.tokenId
                                                                );
                                                                
                                                                toast.success('레퍼럴 URL 복사 완료');
                                                            }}
                                                            className="p-2 bg-blue-500 text-zinc-100 rounded
                                                            hover:bg-blue-600 text-xs xl:text-lg font-semibold"
                                                        >
                                                            레퍼럴 URL 복사하기
                                                        </button>
                                                        

                                                    </div>


                                                    <div className='w-full grid grid-cols-2 gap-2 items-start justify-between'>


                                                        <div className="flex flex-col gap-2 items-center justify-center">


                                                            {/*
                                                            <button
                                                                onClick={() => {
                                                                    window.open('https://opensea.io/assets/matic/' + erc721ContractAddress + '/' + nft.tokenId);
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
                                                            */}

                                                            <Image
                                                                src={nft.image.thumbnailUrl ? nft.image.thumbnailUrl : "/icon-anonymous.png"}
                                                                alt="NFT"
                                                                width={200}
                                                                height={200}
                                                                className="rounded-lg w-32 xl:w-40 border border-gray-300"
                                                                
                                                            />

                                                            {/* 누적 배당수익 */}
                                                            {/*
                                                            <div className='flex flex-col gap-2 items-start justify-between
                                                                border border-gray-300 p-4 rounded-lg'>
                                                                <span className='text-xs xl:text-lg font-semibold'>
                                                                    Total Dividend
                                                                </span>
                                                                <span className='text-xl xl:text-2xl font-semibold text-green-500'>
                                                                    0.00 USDT
                                                                </span>

                                                                
                                                                <button
                                                                    className="p-2 bg-blue-500 text-zinc-100 rounded
                                                                    hover:bg-blue-600"
                                                                >
                                                                    Claim Dividend
                                                                </button>
                                                                
                                                            </div>
                                                            */}


                                                        </div>

                                                        <div className='flex flex-col gap-2 items-start justify-between'>
                                                            {/* contract address */}
                                                            <div className='text-xs font-semibold'>
                                                                계약주소: {nft.contract.address.substring(0, 6) + '...' + nft.contract.address.substring(nft.contract.address.length - 4)}
                                                            </div>
                                                            <div className='text-lg font-semibold text-blue-500'>
                                                                계약번호: #{nft.tokenId}
                                                            </div>
                                                            <div className='text-sm font-semibold text-green-500'>
                                                                {nft.name}
                                                            </div>
                                                            <div className='text-xs font-semibold'>
                                                                {nft.description}
                                                            </div>

                                                            <div className='flex flex-col gap-2 items-start justify-between'>
                                                                {/* // from now to mint in hours minutes seconds
                                                                // now - mint */}
                                                                <span className='text-xs xl:text-sm text-gray-800 font-semibold'>
                                                                    발행:{' '}{(new Date().getTime() - new Date(nft.mint.timestamp).getTime()) / 1000 / 60 / 60 / 24 > 1
                                                                        ? `${Math.floor((new Date().getTime() - new Date(nft.mint.timestamp).getTime()) / 1000 / 60 / 60 / 24)} 일 전`
                                                                        : `${Math.floor((new Date().getTime() - new Date(nft.mint.timestamp).getTime()) / 1000 / 60 / 60)} 시간 전`
                                                                    }
                                                                </span>
                                                                
                                                               {/*
                                                                <span className='text-xs xl:text-sm font-semibold'>
                                                                    Accounts: 0
                                                                </span>

                                                                
                                                                <span className='text-xs xl:text-sm font-semibold'>
                                                                    Funds: 0 USDT
                                                                </span>

                                                               
                                                                <span className='text-xs xl:text-sm font-semibold'>
                                                                    ROI: ??%
                                                                </span>
                                                                */}



                                                            </div>



                                                        </div>

                                                    </div>


                                                    {/* transfer NFT */}
                                                    <div className='w-full flex flex-col gap-2 items-end justify-between'>

                                                        <div className='w-full flex flex-col gap-2 items-start justify-between'>
                                                            <span className='text-sm text-red-500 font-semibold'>
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
                                                            className="p-2 w-full text-zinc-100 bg-zinc-800 rounded text-lg font-semibold"
                                                            placeholder="받는 사람 지갑주소"
                                                            type='text'

                                                            value={toAddressList.find((item) =>
                                                                item?.contractAddress === nft.contract.address && item.tokenId === nft.tokenId
                                                            )?.to}

                                                            onChange={(e) => {
                                                                setToAddressList(toAddressList.map((item) => {

                                                                    if (item?.contractAddress === nft.contract.address && item.tokenId === nft.tokenId) {
                                                                        return {
                                                                            ...item,
                                                                            to: e.target.value,
                                                                        };
                                                                    } else {
                                                                        return item;
                                                                    }
                                                                }));
                                                            }}
                                                        />
                                                        <button
                                                            
                                                            disabled={transferingNftList.find((item) => 
                                                                item?.contractAddress === nft.contract.address && item.tokenId === nft.tokenId
                                                            )?.transferring}

                                                            onClick={() => {
                                                                transferNft(nft.contract.address, nft.tokenId);
                                                            }}
                                                            className={`p-2 bg-blue-500 text-zinc-100 rounded
                                                            ${transferingNftList.find((item) => 
                                                                item?.contractAddress === nft.contract.address && item.tokenId === nft.tokenId
                                                            )?.transferring ? 'opacity-50' : ''}
                                                            `}
                                                        >
                                                            <div className='flex flex-row gap-2 items-center justify-between'>
                                                                {transferingNftList.find((item) =>
                                                                    item?.contractAddress === nft.contract.address && item.tokenId === nft.tokenId
                                                                )?.transferring && (

                                                                    <Image
                                                                        src="/loading.png"
                                                                        alt="Send"
                                                                        width={25}
                                                                        height={25}
                                                                        className="animate-spin"
                                                                    />
                                                                )}
                                                                <span className='text-lg font-semibold'>
                                                                    NFT 전송하기
                                                                </span>
                                                            </div>
                                                        </button>

                                                    </div>



                                                </div>

                                            )}

                                            </>

                                        ))}
                                    </div>


                            </div>


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
        center,
        agent,
        tokenId,
    } : {
        center: string
        agent: string
        tokenId: string
    }
) {

    const router = useRouter();
  
  
    return (
      <header className="flex flex-col items-center mb-5 md:mb-10">
  
        {/* header menu */}
        <div className="w-full flex flex-row justify-between items-center gap-2
          bg-green-500 p-4 rounded-lg mb-5
        ">
            {/* logo */}
            <button
                onClick={() => {
                    router.push(
                        '/kr/polygon/?agent=' + agent + '&tokenId=' + tokenId + '&center=' + center
                    );
                }}
            >            
                <div className="flex flex-row gap-2 items-center">
                    <Image
                    src="/logo-marketing-center.webp"
                    alt="Circle Logo"
                    width={35}
                    height={35}
                    className="rounded-full w-10 h-10 xl:w-14 xl:h-14"
                    />
                    <span className="text-lg xl:text-3xl text-gray-800 font-semibold">
                        Home
                    </span>
                </div>
            </button>

            <div className="flex flex-row gap-2 items-center">

                <button
                onClick={() => {
                    router.push(
                        '/kr/polygon/my-nft?agent=' + agent + '&tokenId=' + tokenId + '&center=' + center
                    );
                }}
                className="text-gray-600 hover:underline text-xs xl:text-lg"
                >
                    NFT
                </button>
            </div>


        </div>
        
      </header>
    );
  }
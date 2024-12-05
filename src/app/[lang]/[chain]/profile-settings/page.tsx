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
    mintTo
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


    //console.log("params", params);
    
    const searchParams = useSearchParams();
 
    const wallet = searchParams.get('wallet');

    const agent = searchParams.get('agent');

    const agentNumber = searchParams.get('tokenId');

    const wallets = [
        inAppWallet({
          auth: {
            options: [
                "phone",
                "telegram",
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



    const activeAccount = useActiveAccount();


    ///console.log("activeAccount===", activeAccount);


    const address = activeAccount?.address;
  
  



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
                    account: activeAccount as any,
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
                    account: activeAccount as any,
            
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


   
   useEffect(() => {


       const getMyNFTs = async () => {

            
           try {

                /*
                const contract = getContract({
                     client,
                     chain: polygon,
                     address: erc721ContractAddress,
                });


                
                const nfts = await getOwnedNFTs({
                    contract: contract,
                    owner: address as string,
                });

                console.log("nfts=======", nfts);

                setMyNfts( nfts );
                */

                /*
                setMyNfts([
                    {
                         name: "AI Agent",
                         description: "This is AI Agent",
                         image: "https://owinwallet.com/logo-aiagent.png",
                    },
                ]);
                */


                // api /api/agent/getAgentNFTByWalletAddress

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

                ///console.log("myOwnedNfts====", data.result);

                if (data.result) {
                    setMyNfts(data.result.ownedNfts);
                } else {
                    setMyNfts([]);
                }
                
                   
   


           } catch (error) {
               console.error("Error getting NFTs", error);
           }
           

       };

       if (address ) {
           getMyNFTs();
       }

   }
   , [ address ]);
   


   console.log("myNfts", myNfts);




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

            //await sendTransaction({ transaction, account: activeAccount as any });



            //setActiveAccount(smartConnectWallet);

            const transactionResult = await sendAndConfirmTransaction({
                transaction: transaction,
                account: activeAccount,

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
                    setMyNfts(data.result.ownedNfts);
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
                account: activeAccount as any,
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






    return (

        <main className="p-4 pb-10 min-h-[100vh] flex items-start justify-center container max-w-screen-lg mx-auto">

            <div className="py-0 w-full">
        
                {/* goto home button using go back icon
                history back
                */}

                <AppBarComponent />

                <Header
                    agent={agent ? agent : ""}
                    tokenId={agentNumber ? agentNumber : ""}
                />
        


                <div className="flex flex-col items-start justify-center space-y-4">

                    <div className='flex flex-row items-center space-x-4'>
                        <Image
                            src="/logo-tbot.webp"
                            alt="Profile Picture"
                            width={50}
                            height={50}
                            className="rounded-full"  
                        />
                        <div className="text-2xl font-semibold">
                            {Profile_Settings}
                        </div>


                    </div>


                
                    <div className='w-full flex flex-col gap-4 items-start justify-center'>

                        <div className='flex flex-col gap-2'>

                            <div className='flex flex-row gap-2 items-center justify-between border border-gray-300 p-4 rounded-lg'>
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
                                        titleIcon: "https://aiagentbot.vercel.app/icon-pump-bot.png",                           
                                        showThirdwebBranding: false,

                                    }}
                                    locale={"ko_KR"}
                                    //locale={"en_US"}
                                />
                                {/* userType */}
                                {address && userType === "telegram" && (
                                    <button
                                        onClick={() => {
                                            window.open("https://t.me/ppump_bot", "_blank");
                                        }}
                                        className="p-2 bg-zinc-800 text-white rounded"
                                        >
                                        <div className="flex flex-row gap-2 items-center">
                                            <Image
                                            src="/logo-telegram.webp"
                                            alt="Telegram"
                                            width={50}
                                            height={50}
                                            className="rounded-lg w-10 h-10"
                                            />
                                            <span>Go to Telegram</span>
                                        </div>
                                    </button>
                                )}
                            </div>

                            {!address && (
                                <div className="text-xs xl:text-sm font-semibold">
                                    {Please_connect_your_wallet_first}
                                </div>
                            )}

                        </div>




                        {address && (

                            <div className='w-full flex flex-col gap-4 items-start justify-center'>

                                <div className='w-full flex flex-row gap-2 items-center justify-between border border-gray-300 p-4 rounded-lg'>
                                
                                    <div className=" flex flex-col xl:flex-row items-center justify-start gap-5">
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

                                    </div>
                                    
                                    <div className="p-2 bg-zinc-800 rounded text-zinc-100 text-xl font-semibold">
                                        {
                                            My_Balance
                                        }
                                    </div>
                                    <div className="p-2 bg-zinc-800 rounded text-zinc-100 text-xl font-semibold">
                                        {
                                            Number(balance).toFixed(2)
                                        } USDT
                                    </div>
                                </div>

                                {/* send USDT */}
                                <div className='w-full flex flex-col gap-2 items-start justify-between border border-gray-300 p-4 rounded-lg'>
                                    <div className="bg-green-500 text-sm text-zinc-100 p-2 rounded">
                                        {Send_USDT}
                                    </div>
                                    <div className='flex flex-col xl:flex-row gap-2 items-start justify-between'>
                                        <input
                                            className="p-2 w-64 text-zinc-100 bg-zinc-800 rounded text-lg font-semibold"
                                            placeholder="0.00"
                                            type='number'
                                            onChange={(e) => {
                                                setAmount(Number(e.target.value));
                                            }}
                                        />
                                        <input
                                            className="p-2 w-64 text-zinc-100 bg-zinc-800 rounded text-lg font-semibold"
                                            placeholder="받는 사람 지갑주소"
                                            type='text'
                                            onChange={(e) => {
                                                setRecipient({
                                                    ...recipient,
                                                    walletAddress: e.target.value,
                                                });
                                            }}
                                        />
                                        <button
                                            disabled={sending}
                                            onClick={() => {
                                                sendUsdt();
                                            }}
                                            className={`p-2 bg-blue-500 text-zinc-100 rounded ${sending ? 'opacity-50' : ''}`}
                                        >
                                            <div className='flex flex-row gap-2 items-center justify-between'>
                                                {sending && (
                                                    <Image
                                                        src="/loading.png"
                                                        alt="Send"
                                                        width={25}
                                                        height={25}
                                                        className="animate-spin"
                                                    />
                                                )}
                                                <span className='text-lg font-semibold'>
                                                    {Pay_USDT}
                                                </span>
                                            </div>
                                        </button>
                                    </div>
                                </div>

                                {/* wallet address and copy button */}
                                <div className='w-full flex flex-col gap-2 items-start justify-between border border-gray-300 p-4 rounded-lg'>
                                    <div className="bg-green-500 text-sm text-zinc-100 p-2 rounded">
                                        입금용 지갑주소(Polygon)
                                    </div>
                                    <div className='flex flex-row gap-2 items-center justify-between'>
                                        <div className="p-2 bg-zinc-800 rounded text-zinc-100 text-xl font-semibold">
                                            {address.substring(0, 6)}...{address.substring(address.length - 4, address.length)}
                                        </div>
                                        <button
                                            onClick={() => {
                                                navigator.clipboard.writeText(address);
                                                toast.success('지갑주소가 복사되었습니다');
                                            }}
                                            className="p-2 bg-blue-500 text-zinc-100 rounded"
                                        >
                                            Copy
                                        </button>
                                    </div>
                                </div>


                            </div>

                        )}


                        
                    </div>


                    <div className='w-full  flex flex-col gap-5 '>

                        {/* profile picture */}
                    



                        {address && userCode && (
                            <div className='flex flex-row gap-2 items-center justify-between border border-gray-300 p-4 rounded-lg'>

                                <div className="bg-green-500 text-sm text-zinc-100 p-2 rounded">
                                    {My_Nickname}
                                </div>

                                <div className="p-2 bg-zinc-800 rounded text-zinc-100 text-xl font-semibold">
                                    {nickname}
                                </div>

                                
                                <button
                                    onClick={() => {

                                        nicknameEdit ? setNicknameEdit(false) : setNicknameEdit(true);

                                    } }
                                    className="p-2 bg-blue-500 text-zinc-100 rounded"
                                >
                                    {nicknameEdit ? Cancel : Edit}
                                </button>

                                <Image
                                    src="/verified.png"
                                    alt="Verified"
                                    width={20}
                                    height={20}
                                    className="rounded-lg"
                                />


                                
                            </div>
                        )}


                        { (address && (nicknameEdit || !userCode)) && (
                            <div className=' flex flex-col xl:flex-row gap-2 items-start justify-between border border-gray-300 p-4 rounded-lg'>

                                <div
                                    className="bg-green-500 text-sm text-zinc-100 p-2 rounded"
                                >
                                    {!userCode ? Enter_your_nickname :
                                        nicknameEdit ? "수정할 내 닉네임" : Enter_your_nickname
                                    }
                                </div>

                                <div className='flex flex-col gap-2 items-start justify-between'>
                                    <input
                                        disabled={!address}
                                        className="p-2 w-64 text-zinc-100 bg-zinc-800 rounded text-2xl font-semibold"
                                        placeholder={Enter_your_nickname}
                                        
                                        //value={nickname}
                                        value={editedNickname}

                                        type='text'
                                        onChange={(e) => {
                                            // check if the value is a number
                                            // check if the value is alphanumeric and lowercase

                                            if (!/^[a-z0-9]*$/.test(e.target.value)) {
                                                toast.error(Nickname_should_be_alphanumeric_lowercase);
                                                return;
                                            }
                                            if ( e.target.value.length > 10) {
                                                toast.error(Nickname_should_be_at_least_5_characters_and_at_most_10_characters);
                                                return;
                                            }

                                            //setNickname(e.target.value);

                                            setEditedNickname(e.target.value);

                                            checkNicknameIsDuplicate(e.target.value);

                                        } }
                                    />

                                    {editedNickname && isNicknameDuplicate && (
                                        <div className='flex flex-row gap-2 items-center justify-between'>
                                            <span className='text-xs font-semibold text-red-500'>
                                                이미 사용중인 닉네임입니다.
                                            </span>
                                        </div>
                                    )}

                                    {editedNickname
                                    && !isNicknameDuplicate
                                    && editedNickname.length >= 5
                                    && (
                                        <div className='flex flex-row gap-2 items-center justify-between'>
                                            <span className='text-xs font-semibold text-green-500'>
                                                사용가능한 닉네임입니다.
                                            </span>
                                        </div>
                                    )}
                                </div>


                                <div className='flex flex-row gap-2 items-center justify-between'>
                                    <span className='text-xs font-semibold'>
                                        {Nickname_should_be_5_10_characters}
                                    </span>
                                </div>
                                <button
                                    disabled={
                                        !address
                                        || !editedNickname
                                        || editedNickname.length < 5
                                        || isNicknameDuplicate
                                        || loadingSetUserData
                                    }
                                    className={`
                                        ${!address
                                        || !editedNickname
                                        || editedNickname.length < 5
                                        || isNicknameDuplicate
                                        || loadingSetUserData
                                        ? 'bg-gray-300 text-gray-400'
                                        : 'bg-blue-500 text-zinc-100'}

                                        p-2 rounded-lg text-sm font-semibold
                                    `}
                                    onClick={() => {
                                        setUserData();
                                    }}
                                >
                                    {loadingSetUserData ? "저장중..." : Save}
                                    
                                </button>

                                

                            </div>
                        )}


                        {userCode && (
                            <div className='flex flex-row xl:flex-row gap-2 items-center justify-between border border-gray-300 p-4 rounded-lg'>

                                <div className="bg-green-500 text-sm text-zinc-100 p-2 rounded">
                                    {My_Profile_Picture}
                                </div>

                                <div className="p-2 bg-zinc-800 rounded text-zinc-100 text-xl font-semibold">
                                    <Uploader
                                        lang={params.lang}
                                        walletAddress={address as string}
                                    />
                                </div>

                            </div>
                        )}



                        {/*
                        {userCode && (

                            <div className='flex flex-row gap-2 items-center justify-between border border-gray-300 p-4 rounded-lg'>

                                <div className="bg-red-800 text-sm text-zinc-100 p-2 rounded">
                                    My Referral Code
                                </div>

                                <div className="p-2 bg-zinc-800 rounded text-zinc-100 text-xl font-semibold">
                                    {userCode}
                                </div>

 

                                <button
                                    onClick={() => {
                                        navigator.clipboard.writeText(userCode);
                                        toast.success('Referral code copied to clipboard');
                                    }}
                                    className="p-2 bg-blue-500 text-zinc-100 rounded"
                                >
                                    Copy
                                </button>

                                <Image
                                src="/verified.png"
                                alt="Verified"
                                width={20}
                                height={20}
                                className="rounded-lg"
                                />


                            </div>

                        )}
                        */}



                        {userCode && seller && (

                            <div className='flex flex-row gap-2 items-center justify-between border border-gray-300 p-4 rounded-lg'>

                                <div className="bg-green-500 text-sm text-zinc-100 p-2 rounded">
                                    {Seller}
                                </div>

                                <div className="flex flex-col p-2 bg-zinc-800 rounded text-zinc-100 text-xl font-semibold">
                                    
                                    <div className="text-lg font-semibold">
                                        {seller?.bankInfo?.bankName}
                                    </div>
                                    <div className="text-lg font-semibold">
                                        {seller?.bankInfo?.accountNumber}
                                    </div>
                                    <div className="text-lg font-semibold">
                                        {seller?.bankInfo?.accountHolder}
                                    </div>

                                </div>

                                {/*
                                <button
                                    onClick={() => {
                                        setEditSeller(!editSeller);
                                    }}
                                    className="p-2 bg-blue-500 text-zinc-100 rounded"
                                >
                                    {editSeller ? Cancel : Edit}
                                </button>
                                */}

                                {/* goto seller page /sell-usdt */}
                                
                                <button
                                    onClick={() => {
                                        router.push('/' + params.lang + '/' + params.chain + '/sell-usdt');

                                    }}
                                    className="p-2 bg-blue-500 text-zinc-100 rounded"
                                >
                                    {Sell_USDT}
                                </button>
                                


                                <Image
                                src="/verified.png"
                                alt="Verified"
                                width={20}
                                height={20}
                                className="rounded-lg"
                                />


                            </div>
                        )}

                        {
                            //(userCode && !seller) || (userCode && seller && editSeller) && (
                            address && (

                            <div className='flex flex-col gap-2 items-center justify-between border border-gray-300 p-4 rounded-lg'>
                                
                                <div className='w-full flex flex-row gap-2 items-center justify-between'>

                                    <div className="bg-green-500 text-sm text-zinc-100 p-2 rounded">
                                        {Seller}
                                    </div>

                                    {!seller && (
                                        <div className="p-2 bg-zinc-800 rounded text-zinc-100 text-sm font-semibold">
                                            {Not_a_seller}
                                        </div>
                                    )}

                                    {applying ? (
                                        <div className="p-2 bg-zinc-800 rounded text-zinc-100 text-xl font-semibold">
                                            {Applying}...
                                        </div>
                                    ) : (
                                        <button
                                            disabled={applying || !verifiedOtp}

                                            onClick={() => {
                                                // apply to be a seller
                                                // set seller to true
                                                // set seller to false
                                                // set seller to pending

                                                apply();

                                            }}
                                            className={`
                                                ${!verifiedOtp ? 'bg-gray-300 text-gray-400'
                                                : 'bg-green-500 text-zinc-100'}

                                                p-2 rounded-lg text-sm font-semibold
                                            `}
                                        >
                                            {Apply}
                                        </button>
                                    )}

                                </div>

                                {/* 은행명, 계좌번호, 예금주 */}
                                <div className='flex flex-col gap-2 items-start justify-between'>
                                                                        
                                    <input 
                                        disabled={applying}
                                        className="p-2 w-64 text-zinc-100 bg-zinc-800 rounded text-lg font-semibold"
                                        placeholder={Enter_your_bank_name}
                                        value={bankName}
                                        type='text'
                                        onChange={(e) => {
                                            setBankName(e.target.value);
                                        }}
                                    />
                                    <input 
                                        disabled={applying}
                                        className="p-2 w-64 text-zinc-100 bg-zinc-800 rounded text-lg font-semibold"
                                        placeholder={Enter_your_account_number}
                                        value={accountNumber}
                                        type='number'
                                        onChange={(e) => {

                                            // check if the value is a number

                                            e.target.value = e.target.value.replace(/[^0-9]/g, '');

                                            setAccountNumber(e.target.value);
                                        }}
                                    />
                                    <input 
                                        disabled={applying}
                                        className="p-2 w-64 text-zinc-100 bg-zinc-800 rounded text-lg font-semibold"
                                        placeholder={Enter_your_account_holder}
                                        value={accountHolder}
                                        type='text'
                                        onChange={(e) => {
                                            setAccountHolder(e.target.value);
                                        }}
                                    />
                                </div>
                                {/*
                                <div className="text-xs font-semibold">
                                    To become a seller, you need to send 1 USDT to the contract address
                                </div>
                                */}



                            

                                {/* otp verification */}

                                {verifiedOtp ? (
                                    <div className="w-full flex flex-row gap-2 items-center justify-center">
                                    <Image
                                        src="/verified.png"
                                        alt="check"
                                        width={30}
                                        height={30}
                                    />
                                    <div className="text-white">
                                        {OTP_verified}
                                    </div>
                                    </div>
                                ) : (
                                
                            
                                    <div className="w-full flex flex-row gap-2 items-start">

                                    <button
                                        disabled={!address || isSendingOtp}
                                        onClick={sendOtp}
                                        className={`
                                        
                                        ${isSendedOtp && 'hidden'}

                                        w-32 p-2 rounded-md text-sm font-semibold

                                            ${
                                            !address || isSendingOtp
                                            ?'bg-gray-300 text-gray-400'
                                            : 'bg-blue-500 text-white'
                                            }
                                        
                                        `}
                                    >
                                        {Send_OTP}
                                    </button>

                                    <div className={`flex flex-row gap-2 items-center justify-center ${!isSendedOtp && 'hidden'}`}>
                                        <input
                                        type="text"
                                        placeholder={Enter_OTP}
                                        className=" w-40 p-2 border border-gray-300 rounded text-black text-sm font-semibold"
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value)}
                                        />

                                        <button
                                        disabled={!otp || isVerifingOtp}
                                        onClick={verifyOtp}
                                        className={`w-32 p-2 rounded-lg text-sm font-semibold

                                            ${
                                            !otp || isVerifingOtp
                                            ?'bg-gray-300 text-gray-400'
                                            : 'bg-green-500 text-white'
                                            }
                                            
                                            `}
                                        >
                                            {Verify_OTP}
                                        </button>
                                    </div>

                                    </div>

                                )}




                            </div>
                        )}


                        {/* update USDT Price */}
                        {address && (
                            address === '0x68B4F181d97AF97d8b111Ad50A79AfeB33CF6be6'
                            || address === '0x91CA2566C3345026647aBbACB56093144eAA4c16'
                        )
                            && (
                            <div className='flex flex-col gap-2 items-center justify-between border border-gray-300 p-4 rounded-lg'>
                                <div className='flex flex-row gap-2 items-center justify-between'>

                                    <div className="bg-green-500 text-sm text-zinc-100 p-2 rounded">
                                        Update USDT Price
                                    </div>

                                    <div className="p-2 bg-zinc-800 rounded text-zinc-100 text-xl font-semibold">
                                        1 USDT = {usdtPrice} KRW
                                    </div>

                                    <button
                                        onClick={() => {
                                            setUsdtPriceEdit(!usdtPriceEdit);
                                        }}
                                        className="p-2 bg-blue-500 text-zinc-100 rounded"
                                    >
                                        {usdtPriceEdit ? Cancel : Edit}
                                    </button>


                                </div>

                                {usdtPriceEdit && (
                                    <div className='flex flex-col gap-2 items-center justify-between'>

                                        <input 
                                            className="p-2 w-64 text-zinc-100 bg-zinc-800 rounded text-lg font-semibold"
                                            placeholder="Enter USDT Price"
                                            type='number'
                                            value={editUsdtPrice}
                                            onChange={(e) => {
                                                setEditUsdtPrice(e.target.value as any);
                                            }}
                                        />
                                        <button
                                            disabled={editingUsdtPrice}

                                            className={`
                                                ${editingUsdtPrice ? 'bg-gray-300 text-gray-400' : 'bg-green-500 text-zinc-100'}
                                                p-2 rounded-lg text-sm font-semibold
                                            `}

                                            onClick={async () => {
                                                // api call /api/order/updatePrice

                                                const response = await fetch("/api/order/updatePrice", {
                                                    method: "POST",
                                                    headers: {
                                                        "Content-Type": "application/json",
                                                    },
                                                    body: JSON.stringify({
                                                        walletAddress: address,
                                                        price: editUsdtPrice,
                                                    }),
                                                })
                                                .then((response) => (

                                                    toast.success('USDT price updated successfully'),
                                                    
                                                    setUsdtPrice(editUsdtPrice)
                                                
                                                ))

                                            } }
                                                
                                        >
                                            Save
                                        </button>
                                    </div>
                                )}

                            </div>
                        )}

                    

                    </div>


                    {/* 새로고침 버튼 */}
                    {address && userCode && (
                        <div className='w-full flex flex-row items-center justify-start gap-2'>
                            <button
                                onClick={() => {
                                    window.location.reload();
                                }}
                                className="p-2 bg-blue-500 text-zinc-100 rounded"
                            >
                                새로고침
                            </button>

                            <span className="text-xs font-semibold text-red-500">
                                민팅에 되지않을 경우 새로고침 해주세요.
                            </span>

                        </div>
                    )}


                    {address && userCode && !erc721ContractAddress && (

 
                        <button
                            disabled={loadingDeployErc721Contract}
                            onClick={deployErc721Contract}
                            className={`
                                ${loadingDeployErc721Contract ? 'bg-gray-300 text-gray-400' : 'bg-green-500 text-zinc-100'}
                                p-2 rounded-lg text-sm font-semibold
                            `}
                        >
                            <div className='flex flex-row gap-2 items-center justify-center'>
                                {/* rotating icon */}
                                {address && loadingDeployErc721Contract && (
                                    <Image
                                        src="/loading.png"
                                        alt="loding"
                                        width={30}
                                        height={30}
                                        className='animate-spin'
                                    />
                                )}
                                {address && loadingDeployErc721Contract && 'AI 에이전트 계약주소 생성중...'}
                                {address && !erc721ContractAddress && !loadingDeployErc721Contract && 'AI 에이전트 계약주소 생성하기'}
 
                            </div>

                        </button>

                    )}



                        {/* My Referral Code */}
                        {/* address */}
                        {address && erc721ContractAddress && (

                            <div className='w-full flex flex-col gap-2 items-center justify-between border border-gray-300 p-4 rounded-lg'>

                                <div className='w-full flex flex-row gap-2 items-center justify-between'>
                                    <div className="bg-green-500 text-sm text-zinc-100 p-2 rounded">
                                        AI 에이전트 계약주소
                                    </div>

                                    <span className='text-xs xl:text-lg font-semibold'>
                                        {erc721ContractAddress.substring(0, 6) + '...' + erc721ContractAddress.substring(erc721ContractAddress.length - 4)}
                                    </span>




                                    {/* https://opensea.io/assets/matic/0xC1F501331E5d471230189E4A57E5268f10d0072A */}
                                    {/* open new window */}
                                    
                                    <button
                                        onClick={() => {
                                            window.open('https://opensea.io/assets/matic/' + erc721ContractAddress);
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
                                    


                                    {/* verified icon */}

                                    <Image
                                        src="/verified.png"
                                        alt="Verified"
                                        width={20}
                                        height={20}
                                        className="rounded-lg"
                                    />


                                </div>

                                

                                {/* mint AI Agent NFT */}
                                <div className='w-full flex flex-col gap-2 items-start justify-between border border-gray-300 p-4 rounded-lg'>
                                    
                                    <span className="bg-green-500 text-sm text-zinc-100 p-2 rounded">
                                        AI 에이전트 NFT 발행
                                    </span>

                                    <div className='flex flex-col xl:flex-row gap-2 items-start justify-between'>
                                        <input 
                                            className="p-2 w-64 text-zinc-100 bg-zinc-800 rounded text-lg font-semibold"
                                            placeholder="에이전트 이름"
                                            type='text'
                                            onChange={(e) => {
                                                setAgentName(e.target.value);
                                            }}
                                            value={agentName}
                                        />
                                        <input 
                                            className="p-2 w-64 text-zinc-100 bg-zinc-800 rounded text-lg font-semibold"
                                            placeholder="에이전트 설명"
                                            type='text'
                                            onChange={(e) => {
                                                setAgentDescription(e.target.value);
                                            }}
                                            value={agentDescription}
                                        />
                                    </div>

                                    <button
                                        disabled={mintingAgentNft}
                                        onClick={mintAgentNft}
                                        className={`
                                            ${mintingAgentNft ? 'bg-gray-300 text-gray-400' : 'bg-blue-500 text-zinc-100'}
                                            p-2 rounded-sm text-sm font-semibold
                                        `}
                                    >
                                        <div className='flex flex-row gap-2 items-center justify-center'>
                                            {/* rotating icon */}
                                            {mintingAgentNft && (
                                                <Image
                                                    src="/loading.png"
                                                    alt="loding"
                                                    width={30}
                                                    height={30}
                                                    className='animate-spin'
                                                />
                                            )}
                                            {mintingAgentNft && 'AI 에이전트 NFT 발행중...'}
                                            {!mintingAgentNft && 'AI 에이전트 NFT 발행하기'}
                                        </div>
                                    </button>

                                    {messageMintingAgentNft && (
                                        <span className='text-lg font-semibold text-red-500
                                            border border-gray-300 p-4 rounded-lg'>
                                            {messageMintingAgentNft}
                                        </span>
                                    )}

                                    {ganeratingAgentImage && (
                                        <div className='flex flex-row gap-2 items-center justify-center'>
                                            <Image
                                                src="/loading.png"
                                                alt="loding"
                                                width={30}
                                                height={30}
                                                className='animate-spin'
                                            />
                                            <span className='text-xs font-semibold'>
                                                AI 에이전트 이미지 생성중...
                                            </span>
                                        </div>
                                    )}

                                    {agentImage && (
                                        <Image
                                            src={agentImage}
                                            alt="AI Agent"
                                            width={200}
                                            height={200}
                                            className="rounded-lg"
                                        />
                                    )}
                               




                                </div>


                            </div>

                        )}



                        {address && myNfts && myNfts.length > 0 && (

                            <div className='w-full flex flex-col gap-2 items-start justify-between'>

                                    {/* my NFTs */}
                                    <div className='mt-10 flex flex-col gap-2 items-start justify-between'>
                                        <span className="bg-green-500 text-sm text-zinc-100 p-2 rounded">
                                            My AI 에이전트 NFT
                                        </span>
                                    </div>
                                    <div className='w-full grid grid-cols-1 xl:grid-cols-3 gap-2'>
                                        {myNfts?.map((nft, index) => (
                                            <div
                                                key={index}
                                                className='w-full flex flex-col gap-2 items-center justify-between border border-gray-300 p-4 rounded-lg
                                                bg-yellow-100'
                                            >

                                                <div className='w-full flex flex-row gap-2 items-center justify-between'>
                                                    {/* goto button for detail page */}
                                                    <button
                                                        onClick={() => {
                                                            router.push('/' + params.lang + '/' + params.chain + '/agent/' + nft.contract.address + '/' + nft.tokenId);

                                                            // open new window

                                                            //window.open('https://owinwallet.com/' + params.lang + '/' + params.chain + '/agent/' + nft.contract.address + '/' + nft.tokenId);


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
                                                            navigator.clipboard.writeText(
                                                                'https://aiagentbot.vercel.app/kr/polygon/tbot/?agent=' +
                                                                nft.contract.address + '&tokenId=' + nft.tokenId
                                                            );
                                                            toast.success('레퍼럴 URL 복사 완료');
                                                        }}
                                                        className="p-2 bg-blue-500 text-zinc-100 rounded
                                                        hover:bg-blue-600 text-xs xl:text-lg font-semibold"
                                                    >
                                                        레퍼럴 URL 복사
                                                    </button>

                                                </div>


                                                <div className='w-full grid grid-cols-2 gap-2 items-center justify-between'>


                                                    <div className="flex flex-col gap-2 items-center justify-center">


                                                        {/*}
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
                                                            src={nft.image.thumbnailUrl}
                                                            alt="NFT"
                                                            width={200}
                                                            height={200}
                                                            className="rounded-lg w-32 xl:w-40 border border-gray-300"
                                                            
                                                        />

                                                        {/* 누적 배당수익 */}
                                                        <div className='flex flex-col gap-2 items-start justify-between
                                                            border border-gray-300 p-4 rounded-lg'>
                                                            <span className='text-xs xl:text-lg font-semibold'>
                                                                Total Dividend
                                                            </span>
                                                            <span className='text-xl xl:text-2xl font-semibold text-green-500'>
                                                                0.00 USDT
                                                            </span>
                                                            {/* 배당 수령 */}
                                                            {/*
                                                            <button
                                                                className="p-2 bg-blue-500 text-zinc-100 rounded
                                                                hover:bg-blue-600"
                                                            >
                                                                Claim Dividend
                                                            </button>
                                                            */}
                                                        </div>


                                                    </div>

                                                    <div className='flex flex-col gap-2 items-start justify-between'>
                                                        {/* contract address */}
                                                        <div className='text-xs font-semibold'>
                                                            계약주소: {nft.contract.address.substring(0, 6) + '...' + nft.contract.address.substring(nft.contract.address.length - 4)}
                                                        </div>
                                                        <div className='text-2xl font-semibold text-blue-500'>
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
                                                            <span className='text-xs xl:text-sm font-semibold'>
                                                                Start{' '}{(new Date().getTime() - new Date(nft.mint.timestamp).getTime()) / 1000 / 60 / 60 / 24 > 1
                                                                    ? `${Math.floor((new Date().getTime() - new Date(nft.mint.timestamp).getTime()) / 1000 / 60 / 60 / 24)} days ago`
                                                                    : `${Math.floor((new Date().getTime() - new Date(nft.mint.timestamp).getTime()) / 1000 / 60 / 60)} hours ago`
                                                                }
                                                            </span>
                                                            
                                                            {/* Accounts */}
                                                            <span className='text-xs xl:text-sm font-semibold'>
                                                                Accounts: 0
                                                            </span>

                                                            {/* Funds */}
                                                            <span className='text-xs xl:text-sm font-semibold'>
                                                                Funds: 0 USDT
                                                            </span>

                                                            {/* 수익률 */}
                                                            <span className='text-xs xl:text-sm font-semibold'>
                                                                ROI: ??%
                                                            </span>

 

                                                        </div>



                                                    </div>

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
                    router.push('/kr/polygon/?agent=' + agent + '&tokenId=' + tokenId);
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
                    AGENT
                    </span>
                </div>
            </button>

            <div className="flex flex-row gap-2 items-center">
                <button
                onClick={() => {
                    router.push(
                        "/kr/polygon/tbot?agent=" + agent + "&tokenId=" + tokenId
                    );
                }}
                className="text-gray-600 hover:underline text-xs xl:text-lg"
                >
                TBOT
                </button>
                <button
                onClick={() => {
                    router.push('/kr/polygon/profile-settings?agent=' + agent + '&tokenId=' + tokenId);
                }}
                className="text-gray-600 hover:underline text-xs xl:text-lg"
                >
                SETTINGS
                </button>
            </div>


        </div>
        
      </header>
    );
  }
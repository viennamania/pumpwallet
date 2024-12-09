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


import { getUserPhoneNumber } from "thirdweb/wallets/in-app";


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

    const agentNumber = searchParams.get('agentNumber');



    const wallets = [
        inAppWallet({
          auth: {
            options: ["phone"],
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

        if (!address) {
            return;
        }

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

        fetchData();
    }

    , [address]);


    
    const [nickname, setNickname] = useState("");
    const [avatar, setAvatar] = useState("/profile-default.png");
    const [userCode, setUserCode] = useState("");


    const [nicknameEdit, setNicknameEdit] = useState(false);

    const [editedNickname, setEditedNickname] = useState("");


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

                    mobile: phoneNumber,
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
          mobile: phoneNumber,
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
        if (confirm("AI 에이전트 코드를 생성하시겠습니까?")) {

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
                        //erc721ContractAddress: erc721ContractAddress,
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

       if (address && erc721ContractAddress) {
           getMyNFTs();
       }

   }
   , [ address, erc721ContractAddress ]);
   


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
            toast.error('AI 에이전트 코드를 먼저 생성해주세요');
            setMessageMintingAgentNft('AI 에이전트 코드를 먼저 생성해주세요');
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

            const responseGenerateImage = await fetch("/api/ai/generateImage", {
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
                    agent={agent || ""}
                    tokenId={agentNumber || ""}
                />
        


                <div className="flex flex-col items-start justify-center space-y-4">

                    <div className='flex flex-row items-center space-x-4'>
                        <Image
                            src="/icon-nft.png"
                            alt="Profile Picture"
                            width={50}
                            height={50}
                            className="rounded-full"  
                        />
                        <div className="text-2xl font-semibold">
                            나의 에이전트 NFT 관리
                        </div>


                    </div>


                
                    <div className='w-full flex flex-col gap-4 items-start justify-center'>

                        <div className='w-full flex flex-row gap-2'>

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

                            {/* button for connect smart wallet */}
                            {/*
                            <button
                                onClick={() => {
                                    setActiveAccount(smartConnectWallet);
                                    
                                }}
                                className="p-2 bg-blue-500 text-zinc-100 rounded"
                            >
                                Connect Smart Wallet
                            </button>
                            */}

                        </div>

                        
                    </div>


                    {/* 새로고침 버튼 */}
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
                                {address && loadingDeployErc721Contract && 'AI 에이전트 코드 생성중...'}
                                {address && !erc721ContractAddress && !loadingDeployErc721Contract && 'AI 에이전트 코드 생성하기'}
 
                            </div>

                        </button>

                        )}

                        {/* My Referral Code */}
                        {/* address */}
                        {address && erc721ContractAddress && (

                            <div className='w-full flex flex-col gap-2 items-center justify-between border border-gray-300 p-4 rounded-lg'>

                                <div className='w-full flex flex-row gap-2 items-center justify-between'>
                                    <div className="bg-green-500 text-sm text-zinc-100 p-2 rounded">
                                        AI 에이전트 코드
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
                               


                                    {/* my NFTs */}
                                    <div className='mt-10 flex flex-col gap-2 items-start justify-between'>
                                        <span className="bg-green-500 text-sm text-zinc-100 p-2 rounded">
                                            My AI 에이전트 NFT
                                        </span>
                                    </div>
                                    <div className='w-full grid grid-cols-1 xl:grid-cols-3 gap-2'>
                                        {myNfts?.map((nft, index) => (
                                            <div key={index} className='w-full flex flex-col gap-2 items-center justify-between border border-gray-300 p-4 rounded-lg'>

                                                {/* goto button for detail page */}
                                                <button
                                                    onClick={() => {
                                                        router.push('/' + params.lang + '/' + params.chain + '/agent/' + nft.contract.address + '/' + nft.tokenId);

                                                        // open new window

                                                        //window.open('https://owinwallet.com/' + params.lang + '/' + params.chain + '/agent/' + nft.contract.address + '/' + nft.tokenId);


                                                    }}
                                                    className="w-full p-2 bg-blue-500 text-zinc-100 rounded
                                                    hover:bg-blue-600"
                                                >
                                                    <span className='text-xs xl:text-lg font-semibold'>
                                                        상세보기
                                                    </span>
                                                </button>


                                                <div className='w-full grid grid-cols-2 gap-2 items-center justify-between'>





                                                    <div className="flex flex-col gap-2 items-center justify-center">



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
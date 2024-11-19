// send USDT
'use client';


import React, { use, useEffect, useState } from 'react';

import { toast } from 'react-hot-toast';
import { client } from '../../../client';

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
    ethereum,
} from "thirdweb/chains";

import {
    getContract,
    //readContract,
    sendTransaction,
    sendAndConfirmTransaction,
} from "thirdweb";

import { balanceOf, transfer } from "thirdweb/extensions/erc20";
 


import {
  createWallet,
  inAppWallet,
} from "thirdweb/wallets";

import Image from 'next/image';

import AppBarComponent from "@/components/Appbar/AppBar";
import { getDictionary } from "../../../dictionaries";

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
const contractAddressEthereum = "0xdac17f958d2ee523a2206206994597c13d831ec7"; // USDT on Ethereum



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






export default function SendUsdt({ params }: any) {


  //console.log("params", params);

  const searchParams = useSearchParams();
 
  const wallet = searchParams.get('wallet');

  const token = searchParams.get('token');


  const agent = searchParams.get('agent');
  const agentNumber = searchParams.get('tokenId');

  

  //console.log("token", token);

  const tokenImage = "/token-" + String(token).toLowerCase() + "-icon.png";
  
  
  const contract = getContract({
    // the client you have created via `createThirdwebClient()`
    client,
    // the chain the contract is deployed on
    
    
    chain: params.chain === "arbitrum" ? arbitrum : params.chain === "polygon" ? polygon : params.chain === "ethereum" ? ethereum : polygon,
  
  
  
    // the contract's address
    ///address: contractAddress,

    address: params.chain === "arbitrum" ? contractAddressArbitrum : params.chain === "polygon" ? contractAddress : params.chain === "ethereum" ? contractAddressEthereum : contractAddress,


    // OPTIONAL: the contract's abi
    //abi: [...],
  });



  const { Canvas } = useQRCode();





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



  const [amount, setAmount] = useState(0);




  const [nativeBalance, setNativeBalance] = useState(0);

  const [balance, setBalance] = useState(0);
  useEffect(() => {

    // get the balance
    const getBalance = async () => {

      ///console.log('getBalance address', address);

      
      const result = await balanceOf({
        contract,
        address: address || "",
      });

      if (!result) return;
  
      setBalance( Number(result) / 10 ** 6 );

      /*
      await fetch('/api/user/getBalanceByWalletAddress', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chain: params.chain,
          walletAddress: address,
        }),
      })

      .then(response => response.json())

      .then(data => {
          setNativeBalance(data.result?.displayValue);
      });
      */

    };

    if (address) getBalance();

    const interval = setInterval(() => {
      if (address) getBalance();
    } , 1000);

    return () => clearInterval(interval);

  } , [address, contract, params.chain]);











  const [user, setUser] = useState(
    {
      _id: '',
      id: 0,
      email: '',
      nickname: '',
      avatar: '',
      mobile: '',
      walletAddress: '',
      createdAt: '',
      settlementAmountOfFee: '',
      tronWalletAddress: '',
      tronWalletPrivateKey: '',
    }
  );

  useEffect(() => {

    if (!address) return;

    const getUser = async () => {

      const response = await fetch('/api/user/getUserByWalletAddress', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          walletAddress: address,
        }),
      });

      if (!response) return;

      const data = await response.json();


      setUser(data.result);

    };

    getUser();

  }, [address]);








  // get list of user wallets from api
  const [users, setUsers] = useState([
    {
      _id: '',
      id: 0,
      email: '',
      avatar: '',
      nickname: '',
      mobile: '',
      walletAddress: '',
      createdAt: '',
      settlementAmountOfFee: '',
    }
  ]);

  const [totalCountOfUsers, setTotalCountOfUsers] = useState(0);

  useEffect(() => {

    if (!address) return;

    const getUsers = async () => {

      const response = await fetch('/api/user/getAllUsers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({

        }),
      });

      const data = await response.json();

      console.log("getUsers", data);


      ///setUsers(data.result.users);
      // set users except the current user

      setUsers(data.result.users.filter((user: any) => user.walletAddress !== address));



      setTotalCountOfUsers(data.result.totalCount);

    };

    getUsers();


  }, [address]);






  const [recipient, setRecipient] = useState({
    _id: '',
    id: 0,
    email: '',
    nickname: '',
    avatar: '',
    mobile: '',
    walletAddress: '',
    tronWalletAddress: '',
    createdAt: '',
    settlementAmountOfFee: '',
  });



  ///console.log("recipient", recipient);

  //console.log("recipient.walletAddress", recipient.walletAddress);
  //console.log("amount", amount);



  const [otp, setOtp] = useState('');

  
  
  /////const [verifiedOtp, setVerifiedOtp] = useState(false);
  const [verifiedOtp, setVerifiedOtp] = useState(true); // for testing


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
        mobile: user.mobile,
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


  const [wantToReceiveWalletAddress, setWantToReceiveWalletAddress] = useState(false);


  const [sending, setSending] = useState(false);



  const sendUsdt = async () => {
    if (sending) {
      return;
    }

    if (!address) {
      toast.error('Please connect your wallet first');
      return;
    }

    if (!amount) {
      toast.error('Please enter a valid amount');
      return;
    }

 

    setSending(true);



    try {





        // send USDT
        // Call the extension function to prepare the transaction
        const transaction = transfer({
            //contract,

            contract: contract,

            to: recipient.walletAddress,
            amount: amount,
        });
        

        const { transactionHash } = await sendTransaction({
          
          account: activeAccount as any,

          transaction,
        });

        
        if (transactionHash) {


          await fetch('/api/transaction/setTransfer', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              lang: params.lang,
              chain: params.chain,
              walletAddress: address,
              amount: amount,
              toWalletAddress: recipient.walletAddress,
            }),
          });



          toast.success(USDT_sent_successfully);

          setAmount(0); // reset amount

          // refresh balance

          // get the balance

          const result = await balanceOf({
            contract,
            address: address,
          });

          //console.log(result);

          setBalance( Number(result) / 10 ** 6 );

        } else {

          toast.error(Failed_to_send_USDT);

        }

    

      


    } catch (error) {
      
      console.error("error", error);

      toast.error(Failed_to_send_USDT);
    }

    setSending(false);
  };



  // get user by wallet address
  const getUserByWalletAddress = async (walletAddress: string) => {

    const response = await fetch('/api/user/getUserByWalletAddress', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        walletAddress: walletAddress,
      }),
    });

    const data = await response.json();

    //console.log("getUserByWalletAddress", data);

    return data.result;

  };

  const [isWhateListedUser, setIsWhateListedUser] = useState(false);





  // usdt balance
  const [usdtBalance, setUsdtBalance] = useState(0);
  useEffect(() => {
    
      const getUsdtBalance = async () => {



        
        if (address) {
          


          if (contract) {
  
            const balance = await balanceOf({
              contract: contract,
              address: address,
            });

            console.log("balance==========", balance);

            setUsdtBalance(Number(balance) / 10 ** 6);
          }

        }
          



      };

      getUsdtBalance();

  } , [address, params.chain, contract]);




  return (

    <main className="p-4 pb-10 min-h-[100vh] flex items-start justify-center container max-w-screen-lg mx-auto">

      <div className="py-0 w-full ">

        {/* goto home button using go back icon
        history back
        */}
        <AppBarComponent />


        <Header
            agent={agent || ""}
            tokenId={agentNumber || ""}
          />

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
        


        <div className="flex flex-col items-start justify-center space-y-4">

            <div className='flex flex-row items-center space-x-4'>

              <div className='flex flex-row items-center space-x-2'>
               
                <Image
                  src={tokenImage}
                  alt="token"
                  width={35}
                  height={35}
                />
        
                
                <Image
                  src={`/logo-${params.chain}.png`}
                  alt="chain"
                  width={32}
                  height={32}
                  className="rounded-lg"
                />
                
              </div>

              <div className="text-2xl font-semibold">
                {token} 보내기
              </div>

            </div>

            {/* my usdt balance */}
            <div className="w-full flex flex-col gap-2 items-start">


              <div className="w-full flex flex-col xl:flex-row items-start justify-between gap-3">

                {/* my usdt balance */}
                <div className="flex flex-row items-start gap-3">
                  
                  <div className="flex flex-col gap-2 items-start">
                    
                    <div className='flex flex-row items-center gap-2'>
                      {/* dot icon */}
                      <div className="w-4 h-4 bg-green-500 rounded-full mr-2"></div>
                      <div className="text-sm">{My_Balance}</div>
                    </div>

                    <div className="flex flex-row items-end justify-center  gap-2">
                      <span className="text-4xl font-semibold text-gray-800">
                        
                        {/*
                        {Number(balance).toFixed(2)}
                        */}
                       
                        {Number(usdtBalance).toFixed(2)}


                      </span>
                      <span className="text-lg">{token}</span>
                    </div>
                  </div>


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
                      label: "Sign in with PPUMP Wallet",
                    }}
                    connectModal={{
                      size: "wide", 
                      titleIcon: "https://pumpwallet.vercel.app/icon-pump-bot.png",                           
                      showThirdwebBranding: false,

                    }}
                    locale={"ko_KR"}
                    //locale={"en_US"}
                    />


                  )}


                  {/*address && (

                    <div className="flex flex-col gap-2 items-center
                      border border-zinc-400 rounded-md p-2">
                  
                      <div className="flex flex-row items-center gap-2">
                        <button
                          className="text-sm text-zinc-400 underline"
                          onClick={() => {
                            navigator.clipboard.writeText(address);
                            toast.success('Copied wallet address');
                          } }
                        >
                          {address.substring(0, 6)}...{address.substring(address.length - 4)}
                        </button>

                        <div className="flex flex-row items-center gap-2">
                    
                          <Image
                            src={user?.avatar || "/profile-default.png"}
                            alt="Avatar"
                            width={20}
                            height={20}
                            priority={true} // Added priority property
                            className="rounded-full"
                            style={{
                                objectFit: 'cover',
                                width: '20px',
                                height: '20px',
                            }}
                          />
                          
                          <div className="text-lg font-semibold text-white ">
                            {
                              user && user.nickname ? user.nickname : Anonymous
                            }
                          </div>

                   
                          {address && !user && (
                            <button
                              onClick={() => {
                                router.push('/' + params.lang + '/' + params.chain + '/profiles?wallet=' + wallet);
                              }}
                              className="text-sm text-zinc-400 underline"
                            >
                              Go to profile
                            </button>
                          )}

                        </div>




                      </div>
                    

                    </div>

                  )*/}



                  {/* evm wallet address */}
                  {address && params.chain !== "tron" && (
                    <div className="flex flex-row items-center gap-2">
                      <div className="text-sm text-gray-800">
                        {My_Wallet_Address}
                      </div>
                      <div className="text-lg font-semibold text-gray-800">
                        <button
                          className="text-sm text-zinc-400 underline"
                          onClick={() => {
                            navigator.clipboard.writeText(address);
                            toast.success('Copied wallet address');
                          } }
                        >
                          {address.substring(0, 6)}...{address.substring(address.length - 4)}
                        </button>
                      </div>
                    </div>
                  )}

                    







                </div>

              </div>



            </div>


            <div className='w-full  flex flex-col gap-5 border
              bg-zinc-800 text-white
              p-4 rounded-lg

              '>


              <div className='flex flex-row gap-5 items-center justify-start'>
                {/* dot icon */}
                <div className="w-4 h-4 bg-red-500 rounded-full mr-2"></div>
                <div className="text-lg
                  font-semibold
                  text-white

                ">
                  {Enter_the_amount_and_recipient_address}
                </div>
              </div>


              <div className='mb-5 flex flex-col xl:flex-row gap-5 items-start justify-between'>

                <input
                  disabled={sending}
                  type="number"
                  //placeholder="Enter amount"
                  className=" w-64 p-2 border border-gray-300 rounded text-black text-5xl font-semibold "
                  
                  value={amount}

                  onChange={(e) => (

                    // check if the value is a number


                    // check if start 0, if so remove it

                    e.target.value = e.target.value.replace(/^0+/, ''),



                    // check balance

                    setAmount(e.target.value as any)

                  )}
                />
           
       

                {/* check box for want to receive wallet address */}
                <div className="flex flex-row items-center gap-2">
                  <input
                    type="checkbox"
                    className="w-6 h-6"
                    checked={wantToReceiveWalletAddress}
                    onChange={(e) => setWantToReceiveWalletAddress(e.target.checked)}
                  />
                  <div className="text-white">{Enter_Wallet_Address}</div>
                </div>
            
            
                {!wantToReceiveWalletAddress ? (
                  <>
                    <div className='w-full flex flex-col gap-5 items-start justify-between'>




                      <select
                        disabled={sending}

                        className="
                          
                          w-56 p-2 border border-gray-300 rounded text-black text-2xl font-semibold "
                          
                        value={
                          recipient?.nickname
                        }


                        onChange={(e) => {

                          const selectedUser = users.find((user) => user.nickname === e.target.value) as any;

                          console.log("selectedUser", selectedUser);

                          setRecipient(selectedUser);

                        } } 

                      >
                        <option value="">{Select_a_user}</option>
                        

                        {users.map((user) => (
                          <option key={user.id} value={user.nickname}>{user.nickname}</option>
                        ))}
                      </select>

                      {/* select user profile image */}

                      <div className=" w-full flex flex-row gap-2 items-center justify-center">
                        <Image
                          src={recipient?.avatar || '/profile-default.png'}
                          alt="profile"
                          width={38}
                          height={38}
                          className="rounded-full"
                          style={{
                            objectFit: 'cover',
                            width: '38px',
                            height: '38px',
                          }}
                        />

                        {recipient?.walletAddress && (
                          <Image
                            src="/verified.png"
                            alt="check"
                            width={28}
                            height={28}
                          />
                        )}

                      </div>

                    </div>

             
                    {/* input wallet address */}
                    
                    <input
                      disabled={true}
                      type="text"
                      placeholder={User_wallet_address}
                      className=" w-80  xl:w-full p-2 border border-gray-300 rounded text-white text-xs xl:text-lg font-semibold"
                      value={
                        params.chain === "tron" ?
                        recipient?.walletAddress
                        :
                        recipient?.walletAddress
                      }
                      onChange={(e) => {
      
                        setRecipient({
                          ...recipient,
                          walletAddress: e.target.value,
                        });

                      } }

                    />

               


          


                  </>

                ) : (

                  <div className='flex flex-col gap-5 items-center justify-between'>
                    <input
                      disabled={sending}
                      type="text"
                      placeholder={User_wallet_address}
                      className=" w-80 xl:w-96 p-2 border border-gray-300 rounded text-white bg-black text-sm xl:text-sm font-semibold"

                      value={recipient.walletAddress}

                      onChange={(e) => setRecipient({
                        ...recipient,
                        walletAddress: e.target.value,
                      })}
                    />

                    {isWhateListedUser ? (
                      <div className="flex flex-row gap-2 items-center justify-center">


                        <Image
                          src={recipient.avatar || '/profile-default.png'}
                          alt="profile"
                          width={30}
                          height={30}
                          className="rounded-full"
                          style={{
                            objectFit: 'cover',
                            width: '38px',
                            height: '38px',
                          }}
                        />
                        <div className="text-white">{recipient?.nickname}</div>
                        <Image
                          src="/verified.png"
                          alt="check"
                          width={30}
                          height={30}
                        />
                        
                      </div>
                    ) : (
                      <>

                      {recipient?.walletAddress && (
                        <div className='flex flex-row gap-2 items-center justify-center'>
                          {/* dot icon */}
                          <div className="w-4 h-4 bg-green-500 rounded-full mr-2"></div>

                          <div className="text-red-500">
                            {This_address_is_not_white_listed}<br />
                            {If_you_are_sure_please_click_the_send_button}
                          </div>
                        </div>

                      )}

                      </>
                    )}



                  </div>

                )}

                

              </div>

              {/* otp verification */}

              {verifiedOtp ? (
                <div className="w-full flex flex-row gap-2 items-center justify-center">
                  <Image
                    src="/verified.png"
                    alt="check"
                    width={30}
                    height={30}
                  />
                  <div className="text-white">OTP verified</div>
                </div>
              ) : (
             
        
                <div className="w-full flex flex-row gap-2 items-start">

                  <button
                    disabled={!address || !recipient?.walletAddress || !amount || isSendingOtp}
                    onClick={sendOtp}
                    className={`
                      
                      ${isSendedOtp && 'hidden'}

                      w-32 p-2 rounded-lg text-sm font-semibold

                        ${
                        !address || !recipient?.walletAddress || !amount || isSendingOtp
                        ?'bg-gray-300 text-gray-400'
                        : 'bg-green-500 text-white'
                        }
                      
                      `}
                  >
                      Send OTP
                  </button>

                  <div className={`flex flex-row gap-2 items-center justify-center ${!isSendedOtp && 'hidden'}`}>
                    <input
                      type="text"
                      placeholder="Enter OTP"
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
                        Verify OTP
                    </button>
                  </div>

                </div>

              )}

              



              <button
                
                disabled={!address || !recipient?.walletAddress || !amount || sending || !verifiedOtp}

                onClick={sendUsdt}

                className={`mt-10 w-full p-2 rounded-lg text-xl font-semibold

                    ${
                    !address || !recipient?.walletAddress || !amount || sending || !verifiedOtp
                    ?'bg-gray-300 text-gray-400'
                    : 'bg-green-500 text-white'
                    }
                   
                   `}
              >
                  {token} 보내기
              </button>

              <div className="w-full flex flex-row gap-2 text-xl font-semibold">

                {/* sending rotate animation with white color*/}
                {sending && (
                  <div className="
                    w-6 h-6
                    border-2 border-zinc-800
                    rounded-full
                    animate-spin
                  ">
                    <Image
                      src="/loading.png"
                      alt="loading"
                      width={24}
                      height={24}
                    />
                  </div>
                )}
                <div className="text-white">
                  {sending ? Sending : ''}
                </div>

              </div>

            </div>


            {/* transaction history table */}
            {/*
            <div className="w-full flex flex-col gap-5 items-start justify-start
              border border-gray-300 rounded-lg p-4
            ">
              <table className="w-full border border-gray-300 rounded-lg">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-2 border border-gray-300">Date</th>
                    <th className="p-2 border border-gray-300">Amount</th>
                    <th className="p-2 border border-gray-300">Recipient</th>
                    <th className="p-2 border border-gray-300">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-2 border border-gray-300">2024-08-01</td>
                    <td className="p-2 border border-gray-300">100.24</td>
                    <td className="p-2 border border-gray-300">0x1234567890</td>
                    <td className="p-2 border border-gray-300">Success</td>
                  </tr>
                  <tr>
                    <td className="p-2 border border-gray-300">2024-08-01</td>
                    <td className="p-2 border border-gray-300">100.24</td>
                    <td className="p-2 border border-gray-300">0x1234567890</td>
                    <td className="p-2 border border-gray-300">Success</td>
                  </tr>
                  <tr>
                    <td className="p-2 border border-gray-300">2024-08-01</td>
                    <td className="p-2 border border-gray-300">100.24</td>
                    <td className="p-2 border border-gray-300">0x1234567890</td>
                    <td className="p-2 border border-gray-300">Success</td>
                  </tr>

                </tbody>
              </table>

              <div className="w-full flex flex-row gap-2 items-center justify-center">
                <button className="p-2 rounded-lg bg-gray-300 text-gray-400">Prev</button>
                <button className="p-2 rounded-lg bg-gray-300 text-gray-400">Next</button>
              </div>
            </div>
            */}





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
                  PPUMP
                  </span>
              </div>
          </button>

        {/* menu */}
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
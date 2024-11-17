'use client';

//import { Session, Chatbox } from "@talkjs/react";


import dynamic from "next/dynamic";

import '@sendbird/uikit-react/dist/index.css';




import { toast } from 'react-hot-toast';

import { client } from "../../../client";

import {
    getContract,
    sendAndConfirmTransaction,
} from "thirdweb";


import {
  polygon,
} from "thirdweb/chains";


import {
  ConnectButton,
  useActiveAccount,
  useActiveWallet,
} from "thirdweb/react";
import { inAppWallet } from "thirdweb/wallets";



import { balanceOf, transfer } from "thirdweb/extensions/erc20";
 

import { useSearchParams } from 'next/navigation'

import Image from 'next/image';


// parameters for dynamic import
// userId parameter is required

/*
const DynamicAppWithNoSSR = dynamic(() => import("../../components/Chat"), {
  ssr: false,
  loading: () => <p>...</p>
});
*/

/*
const DynamicAppWithNoSSR = dynamic(() => import("../../components/Chat"), {

  ssr: false,

  loading: (

  ) => <p>...</p>

});
*/

import Chat from "@/components/Chat";



import React, { useEffect, useState, Suspense } from 'react';


import AppBarComponent from "@/components/Appbar/AppBar";
import { getDictionary } from "../../../dictionaries";

import { useRouter }from "next//navigation";



const wallets = [
  inAppWallet({
    auth: {
      options: ["phone"],
    },
  }),
];



const contractAddress = "0xc2132D05D31c914a87C6611C10748AEb04B58e8F"; // USDT on Polygon


// get a contract
const contract = getContract({
  // the client you have created via `createThirdwebClient()`
  client,
  // the chain the contract is deployed on
  chain: polygon,
  // the contract's address
  address: contractAddress,
  // OPTIONAL: the contract's abi
  //abi: [...],
});





// /chat?tradeId=
// get parameter from url

/*
export default function ChatPage(
*/


//export default function ChatPage() {

export default function ChatPage({ params }: any) {



  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ChatPageContent
        params={params}
      />
    </Suspense>
  );
}


function ChatPageContent(
  {
    params
  }: any
) {


  console.log("ChatPageContent params", params);
  

  /*
  const searchParams = useSearchParams()
 
  const channel = searchParams.get('channel')
 

  console.log("ChatPageContent channel", channel);
  */

  const channel = params.channel;




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
    Buy: "",
    Total: "",
    Orders: "",
    Trades: "",
    Search_my_trades: "",

    Seller: "",
    Buyer: "",
    Me: "",

    Price: "",
    Amount: "",
    Rate: "",

    Go_Buy_USDT: "",
    Go_Sell_USDT: "",

    Disconnect_Wallet: "",

    My_Order: "",

    Payment: "",
    Bank_Transfer: "",


    hours: "",
    minutes: "",
    seconds: "",

    hours_ago: "",
    minutes_ago: "",
    seconds_ago: "",

    Waiting_for_seller_to_deposit: "",
    to_escrow: "",

    If_you_request_payment: "",
    I_agree_to_escrow_USDT: "",



    Bank_Name: "",
    Account_Number: "",
    Account_Holder: "",
    Deposit_Name: "",
    Deposit_Amount: "",
    Deposit_Deadline: "",

    Waiting_for_seller_to_confirm_payment: "",

    Confirm_Payment: "",

    Connect_Wallet_Description_For_Buyers: "",

    I_agree_to_the_terms_of_trade: "",

    Requesting_Payment: "",

    Deposit_Information: "",

    Request_Payment: "",

    Checking_the_bank_transfer_from_the_buyer: "",

    I_agree_to_check_the_bank_transfer_of: "",

    Transfering_USDT_to_the_buyer_wallet_address: "",

    Anonymous: "",

    TID: "",

    Escrow: "",

    Profile: "",
    My_Profile_Picture: "",

    Edit: "",


    Cancel: "",
    Save: "",
    Enter_your_nickname: "",

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
    Buy,
    Total,
    Orders,
    Trades,
    Price,
    Amount,
    Rate,

    Search_my_trades,
    Seller,
    Buyer,
    Me,
    Go_Buy_USDT,
    Go_Sell_USDT,

    Disconnect_Wallet,

    My_Order,

    Payment,
    Bank_Transfer,

    hours,
    minutes,
    seconds,

    hours_ago,
    minutes_ago,
    seconds_ago,

    Waiting_for_seller_to_deposit,
    to_escrow,

    If_you_request_payment,
    I_agree_to_escrow_USDT,

    Bank_Name,
    Account_Number,
    Account_Holder,
    Deposit_Name,
    Deposit_Amount,
    Deposit_Deadline,

    Waiting_for_seller_to_confirm_payment,

    Confirm_Payment,

    Connect_Wallet_Description_For_Buyers,

    I_agree_to_the_terms_of_trade,

    Requesting_Payment,

    Deposit_Information,

    Request_Payment,

    Checking_the_bank_transfer_from_the_buyer,

    I_agree_to_check_the_bank_transfer_of,

    Transfering_USDT_to_the_buyer_wallet_address,

    Anonymous,

    TID,

    Escrow,

    Profile,
    My_Profile_Picture,

    Edit,

    Cancel,
    Save,
    Enter_your_nickname,

  } = data;
 



  const router = useRouter();



  // get the active wallet
  const activeWallet = useActiveWallet();


  //console.log("activeWallet", activeWallet);

  console.log("activeWallet", activeWallet);


  // get wallet address

  const address = activeWallet?.getAccount()?.address;
  


  console.log('address', address);



  const [balance, setBalance] = useState(0);
  useEffect(() => {


    if (!address) return;
    // get the balance
    const getBalance = async () => {
      const result = await balanceOf({
        contract,
        address: address,
      });
  
      //console.log(result);
  
      setBalance( Number(result) / 10 ** 6 );

    };

    if (address) getBalance();

    const interval = setInterval(() => {
      if (address) getBalance();
    } , 1000);

    return () => clearInterval(interval);

  } , [address]);


      

  const [nickname, setNickname] = useState("");
  const [avatar, setAvatar] = useState("/profile-default.png");
  const [userCode, setUserCode] = useState("");


  const [user, setUser] = useState<any>(null);


  const [seller, setSeller] = useState(null) as any;


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

          //console.log("data", data);

          if (data.result) {
              setNickname(data.result.nickname);
              data.result.avatar && setAvatar(data.result.avatar);
              setUserCode(data.result.id);

              setUser(data.result);

              setSeller(data.result.seller);

          }
      };

      fetchData();

  }, [address]);






  return (

    <main className="p-4 pb-10 min-h-[100vh] flex items-center justify-center mx-auto">




        <div className="py-0 w-full h-full">

 
            <AppBarComponent />

    
  




          <div className="mt-4 flex flex-col xl:flex-row items-center justify-center space-y-4 xl:space-y-0 xl:space-x-4">





              <div className="flex flex-col items-center space-y-4 mb-4">




                {/* goto home button using go back icon
                history back
                */}
                {/*
                <div className="flex justify-start space-x-4 mb-10">
                    <button onClick={() => window.history.back()} className="text-zinc-100 font-semibold underline">Go Back</button>
                </div>
                */}
                {/*
                <div className="mt-4 flex flex-row xl:flex-col gap-2 justify-center space-x-4 mb-10">

                    <button
                        onClick={() =>
                            router.push('/' + params.lang)
                        }
                        className="text-zinc-100 font-semibold underline"
                    >
                      {Go_Home}
                    </button>
                    <button
                      onClick={() => router.push('/' + params.lang + '/buy-usdt')}
                      className="text-zinc-100 font-semibold underline"
                    >
              
                      {Go_Buy_USDT}
                    </button>
                    <button
                        onClick={() => router.push('/' + params.lang + '/sell-usdt')}
                        className="text-zinc-100 font-semibold underline"
                    >
                      {Go_Sell_USDT}
                    </button>
                </div>
                */}




                {address ? (
                  <div className="flex flex-col items-center space-y-4 mb-4">
                    {/* disconnect button */}
                    {/*
                    <button
                      onClick={() => {

                        activeWallet?.disconnect();

                          
                          
                        window.location.reload();

                      }}
                      className="text-lg bg-red-500 text-white px-4 py-2 rounded-md"
                    >
                      {Disconnect_Wallet}
                    </button>
                    */}
                  </div>

                ) : (
                  <div className="flex flex-col items-center space-y-4 mb-4">
                      <ConnectButton
                          

                          client={client}

                          wallets={wallets}
                          
                          accountAbstraction={{        
                          chain: polygon,
                          //chain: arbitrum,
                          factoryAddress: "0x9Bb60d360932171292Ad2b80839080fb6F5aBD97", // polygon, arbitrum
                          sponsorGas: true
                          }}
                          
                          theme={"light"}
                          connectModal={{
                          size: "wide",


                          }}


                          
                          appMetadata={
                          {
                              logoUrl: "https://gold.goodtether.com/logo.png",
                              name: "Next App",
                              url: "https://gold.goodtether.com",
                              description: "This is a Next App.",

                          }
                          }

                      />

                      <span className="text-lg text-zinc-400 xl:w-1/2 text-center">
                        {Connect_Wallet_Description_For_Buyers}
                      </span>



                  </div>

                )}




                {address && (
                  <div className="w-full flex flex-col items-start justify-between gap-2">
                    {/* my usdt balance */}
                    <div className="flex flex-col gap-2 items-start">
                      <div className="text-xl font-semibold text-white">
                        {Number(balance).toFixed(2)} <span className="text-lg">USDT</span>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 items-start justify-end">
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
                        <div className="text-lg font-semibold text-white ">{
                          user?.nickname ? user.nickname : Anonymous
                        }</div>
                      </div>
                    </div>

                  </div>
                )}

              

            </div>



            {/*
            <DynamicAppWithNoSSR
            />
            */}

            {channel && address && nickname && avatar && (
              <Chat

                channel={channel}

                userId={ nickname }

                nickname={  nickname }

                profileUrl={ avatar }
              />
            )}


          </div>


            {/*true && (


                <Session
                    appId="tPgv5UF1"
                    userId="sample_user_alice"
                >


                    <Chatbox
                        conversationId="sample_conversation"
                        style={{ width: "100%", height: "800px" }}
                    />

                </Session>




            )*/}

        </div>

    </main>


  );
}
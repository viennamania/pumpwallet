'use client';

//import { Session, Chatbox } from "@talkjs/react";


import dynamic from "next/dynamic";

import '@sendbird/uikit-react/dist/index.css';

import {

  useActiveWallet,
  
} from "thirdweb/react";

import { balanceOf, transfer } from "thirdweb/extensions/erc20";
 

import { useSearchParams } from 'next/navigation'


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

import Chat from "../../components/Chat";



import React, { useEffect, useState, Suspense } from 'react';

// /chat?tradeId=
// get parameter from url

/*
export default function ChatPage(
*/

export default function ChatPage() {


  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ChatPageContent />
    </Suspense>
  );
}


function ChatPageContent() {
  
  const searchParams = useSearchParams()
 
  const channel = searchParams.get('channel')
 

  console.log("ChatPageContent channel", channel);







  // get the active wallet
  const activeWallet = useActiveWallet();


  //console.log("activeWallet", activeWallet);

  console.log("activeWallet", activeWallet);


  // get wallet address

  const address = activeWallet?.getAccount()?.address;
  


  console.log('address', address);

  const [balance, setBalance] = useState(0);

  /*
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
  */


      

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



        <div className="py-20 w-full h-full">
  
          {/* goto home button using go back icon
          history back
          */}
  
          <div className="flex justify-start space-x-4 mb-10">
              <button onClick={() => window.history.back()} className="text-zinc-100 font-semibold underline">Go Back</button>
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
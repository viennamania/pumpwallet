// nickname settings
'use client';
import React, { use, useEffect, useState } from 'react';



import { toast } from 'react-hot-toast';

import { client } from "../client";

import {
    polygon,
} from "thirdweb/chains";

import {
    ConnectButton,
    useActiveAccount,
    useActiveWallet,
} from "thirdweb/react";
import { inAppWallet } from "thirdweb/wallets";


import { getUserPhoneNumber } from "thirdweb/wallets/in-app";


import Image from 'next/image';

import GearSetupIcon from "@/components/gearSetupIcon";


import Uploader from '@/components/uploader';
import { add } from 'thirdweb/extensions/farcaster/keyGateway';


const wallets = [
    inAppWallet({
      auth: {
        options: ["phone"],
      },
    }),
];


import { useRouter }from "next//navigation";






export default function SettingsPage() {

    const router = useRouter();

    // get the active wallet
    const activeWallet = useActiveWallet();



    const smartAccount = useActiveAccount();

    const address = smartAccount?.address || "";



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




    
    const [nickname, setNickname] = useState("");


    const [nicknameEdit, setNicknameEdit] = useState(false);

    const [editedNickname, setEditedNickname] = useState("");


    const [userCode, setUserCode] = useState("");






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

            console.log("data", data);

            if (data.result) {
                setNickname(data.result.nickname);
                setUserCode(data.result.id);
            }
        };

        fetchData();
    }, [address]);






    const setUserData = async () => {


        // check nickname length and alphanumeric
        //if (nickname.length < 5 || nickname.length > 10) {

        if (editedNickname.length < 5 || editedNickname.length > 10) {

            toast.error('Nickname should be at least 5 characters and at most 10 characters');
            return;
        }
        
        ///if (!/^[a-z0-9]*$/.test(nickname)) {
        if (!/^[a-z0-9]*$/.test(editedNickname)) {
            toast.error('Nickname should be alphanumeric and lowercase');
            return;
        }

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

            console.log("updateUser data", data);

            if (data.result) {

                setUserCode(data.result.id);
                setNickname(data.result.nickname);

                setNicknameEdit(false);
                setEditedNickname('');

                toast.success('Nickname saved');

            } else {
                toast.error('Error saving nickname');
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

            console.log("data", data);

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


        

        
    }


    console.log("nickname", nickname);
    console.log("userCode", userCode);


    const [agreementCopy, setAgreementCopy] = useState(false);


    return (

        <main className="p-4 pb-10 min-h-[100vh] flex items-start justify-center container max-w-screen-lg mx-auto">

            <div className="py-20 w-full">
        
                {/* goto home button using go back icon
                history back
                */}
        
                <div className="flex justify-start space-x-4 mb-10">
                    <button onClick={() => router.push('/')} className="text-zinc-100 font-semibold underline">Go Home</button>
                </div>


                <div className="flex flex-col items-start justify-center space-y-4">

                    <div className='flex flex-row items-center space-x-4'>
                        <GearSetupIcon />
                        <div className="text-2xl font-semibold">Wallet Settings</div>

                        {!address && (
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

                        )}

                    </div>


                    <div className='w-full  flex flex-col gap-5 '>





                        {/* My Wallet */}
                        <div className='flex flex-col xl:flex-row gap-2 items-center justify-between border border-gray-300 p-4 rounded-lg'>

                            <div className='flex flex-col items-start gap-2'>

                                <div className='flex flex-row items-center gap-2'>    
                                    <div className="bg-green-500 text-sm text-zinc-100 p-2 rounded">
                                        My Wallet Address
                                    </div>
                                    {/* button for polygon explorer */}
                                    {address ? (
                                        <button
                                            onClick={() => {
                                                window.open(`
                                                    https://polygonscan.com/address/${address}#tokentxns
                                                    `, "_blank");
                                            }}
                                            className="p-2 bg-zinc-200 text-zinc-800 rounded"
                                        >
                                            <Image
                                                src="/logo-polygon.png"
                                                alt="Polygon"
                                                width={20}
                                                height={20}
                                            />
                                        </button>
                                    ) : (
                                        <Image
                                            src="/logo-polygon.png"
                                            alt="Polygon"
                                            width={20}
                                            height={20}
                                            className='animate-spin'
                                        />

                                    )}

                                </div>

                                <div className="p-2 bg-zinc-800 rounded text-zinc-100 text-xs xl:text-xl font-semibold">
                                    {address}
                                </div>


                                <div className='flex flex-col items-start gap-2'>
                                    <div className='text-sm text-red-500'>
                                        The address of this wallet is USDT Tether compatible on Polygon blockchain only.
                                        You should never deposit any other tokens (e.g. Ethereum) to this address.
                                    </div>
                                </div>


                                {/* agreement checkbox */}
                                <div className='flex flex-row items-center gap-2'>
                                    <input
                                        type="checkbox"
                                        checked={agreementCopy}
                                        onChange={() => setAgreementCopy(!agreementCopy)}
                                        className='w-6 h-6'
                                    />
                                    <div className='text-lg text-zinc-100 font-semibold'>
                                        I understand that I should never deposit any other tokens (e.g. Ethereum) to this address.
                                    </div>
                                </div>




                                <button
                                    disabled={!address || !agreementCopy}
                                    onClick={() => {
                                    navigator.clipboard.writeText(address);
                                    toast.success('Address copied to clipboard');
                                    }}
                                    className={`
                                        p-2 text-zinc-100 rounded
                                        ${!address || !agreementCopy ? 'bg-gray-300 text-gray-500' : 'bg-blue-500'}
                                    `}
                                    >
                                    Copy
                                </button>

                            </div>

                            





                        </div>

                        {/* My Phone Number */}
                        <div className='flex flex-col xl:flex-row gap-2 items-center justify-between border border-gray-300 p-4 rounded-lg'>
                                
                            <div className="bg-green-500 text-sm text-zinc-100 p-2 rounded">
                                My Phone Number
                            </div>

                            <div className="p-2 bg-zinc-800 rounded text-zinc-100 text-2xl font-semibold">
                                {phoneNumber}
                            </div>

                            <button
                                disabled={!phoneNumber}
                                onClick={() => {
                                    navigator.clipboard.writeText(phoneNumber);
                                    toast.success('Phone number copied to clipboard');
                                }}
                                className="p-2 bg-blue-500 text-zinc-100 rounded"
                            >
                                Copy
                            </button>
                        
                        </div>

                        {/* Disconnect Wallet */}

                        {address && (
                            <div className='flex flex-col items-center justify-center gap-2'>
                                <button
                                    disabled={!activeWallet}
                                    onClick={() => {
                                        activeWallet?.disconnect();

                                        window.location.reload();
                                    }}
                                    className="p-2 bg-red-500 text-zinc-100 rounded"
                                >
                                    Disconnect Wallet
                                </button>


                                {/*
                                <iframe
                                    src='https://withpaper.com/sdk/2022-08-12/embedded-wallet/export?clientId=fbef5750f91259d17fc33469695bd744'


                                    width='100%'
                                    height='600px'
                                />
                                */}



                            </div>
                        )}









                    </div>


                </div>

            </div>

        </main>

    );

}

          

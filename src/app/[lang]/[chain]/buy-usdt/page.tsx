'use client';

import { useState, useEffect, use, act } from "react";

import Image from "next/image";



// open modal

import Modal from '@/components/modal';

import {
  useRouter,
  useSearchParams
}from "next//navigation";


import { toast } from 'react-hot-toast';

import { client } from "../../../client";



import {
  getContract,
  sendAndConfirmTransaction,
} from "thirdweb";



import {
  polygon,
  arbitrum,
} from "thirdweb/chains";

import {
  ConnectButton,
  useActiveAccount,
  useActiveWallet,
  useConnectedWallets,
  useSetActiveWallet,
} from "thirdweb/react";
import { inAppWallet } from "thirdweb/wallets";


import { getUserPhoneNumber } from "thirdweb/wallets/in-app";


import { balanceOf, transfer } from "thirdweb/extensions/erc20";
import { add } from "thirdweb/extensions/farcaster/keyGateway";
 


import AppBarComponent from "@/components/Appbar/AppBar";
import { getDictionary } from "../../../dictionaries";
import Chat from "@/components/Chat";




interface SellOrder {
  _id: string;
  createdAt: string;
  walletAddress: string;
  nickname: string;
  avatar: string;
  trades: number;
  price: number;
  available: number;
  limit: string;
  paymentMethods: string[];

  usdtAmount: number;
  krwAmount: number;
  rate: number;



  seller: any;

  tradeId: string;
  status: string;
  acceptedAt: string;
  paymentRequestedAt: string;
  paymentConfirmedAt: string;
  cancelledAt: string;


  buyer: any;

  canceller: string;

  escrowTransactionHash: string;
  transactionHash: string;
}



const wallets = [
  inAppWallet({
    auth: {
      options: ["phone"],
    },
  }),
];



const contractAddress = "0xc2132D05D31c914a87C6611C10748AEb04B58e8F"; // USDT on Polygon
const contractAddressArbitrum = "0x2f2a2543B76A4166549F7aab2e75Bef0aefC5B0f"; // USDT on Arbitrum




export default function Index({ params }: any) {

  const searchParams = useSearchParams();
 
  const wallet = searchParams.get('wallet');

  const agent = searchParams.get('agent');

  const agentNumber = searchParams.get('tokenId');


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
    Buy: "",
    Sell: "",
    Amount: "",
    Price: "",
    Total: "",
    Orders: "",
    Trades: "",
    Search_my_trades: "",

    Seller: "",
    Buyer: "",
    Me: "",

    Buy_USDT: "",
    Rate: "",
    Payment: "",
    Bank_Transfer: "",

    I_agree_to_the_terms_of_trade: "",
    I_agree_to_cancel_the_trade: "",

    Opened_at: "",
    Cancelled_at: "",
    Completed_at: "",

    Waiting_for_seller_to_deposit: "",

    to_escrow: "",
    If_the_seller_does_not_deposit_the_USDT_to_escrow: "",
    this_trade_will_be_cancelled_in: "",

    Cancel_My_Trade: "",


    Order_accepted_successfully: "",
    Order_has_been_cancelled: "",
    My_Order: "",

    hours: "",
    minutes: "",
    seconds: "",

    hours_ago: "",
    minutes_ago: "",
    seconds_ago: "",

    Order_Opened: "",
    Trade_Started: "",
    Expires_in: "",

    Accepting_Order: "",

    Escrow: "",

    Chat_with_Seller: "",
    Chat_with_Buyer: "",

    Table_View: "",

    TID: "",

    Status: "",

    My_Balance: "",

    Anonymous: "",
  

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
    Sell,
    Amount,
    Price,
    Total,
    Orders,
    Trades,
    Search_my_trades,

    Seller,
    Buyer,
    Me,

    Buy_USDT,
    Rate,
    Payment,
    Bank_Transfer,
    I_agree_to_the_terms_of_trade,
    I_agree_to_cancel_the_trade,

    Opened_at,
    Cancelled_at,
    Completed_at,

    Waiting_for_seller_to_deposit,

    to_escrow,

    If_the_seller_does_not_deposit_the_USDT_to_escrow,
    this_trade_will_be_cancelled_in,

    Cancel_My_Trade,

    Order_accepted_successfully,
    Order_has_been_cancelled,
    My_Order,

    hours,
    minutes,
    seconds,

    hours_ago,
    minutes_ago,
    seconds_ago,

    Order_Opened,
    Trade_Started,
    Expires_in,

    Accepting_Order,

    Escrow,

    Chat_with_Seller,
    Chat_with_Buyer,

    Table_View,

    TID,

    Status,

    My_Balance,

    Anonymous,


  } = data;




  const router = useRouter();





  const activeAccount = useActiveAccount();

  const address = activeAccount?.address;






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

  
      //console.log(result);
  
      setBalance( Number(result) / 10 ** 6 );


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



    };

    if (address) getBalance();

    const interval = setInterval(() => {
      if (address) getBalance();
    } , 1000);

    return () => clearInterval(interval);

  } , [address, contract, params.chain]);



  const [escrowWalletAddress, setEscrowWalletAddress] = useState('');
  const [makeingEscrowWallet, setMakeingEscrowWallet] = useState(false);

  const makeEscrowWallet = async () => {
      
    if (!address) {
      toast.error('Please connect your wallet');
      return;
    }


    setMakeingEscrowWallet(true);

    fetch('/api/order/getEscrowWalletAddress', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        lang: params.lang,
        chain: params.chain,
        walletAddress: address,
        isSmartAccount: false
      }),
    })
    .then(response => response.json())
    .then(data => {
        
        //console.log('getEscrowWalletAddress data.result', data.result);


        if (data.result) {
          setEscrowWalletAddress(data.result.escrowWalletAddress);
        } else {
          toast.error('Escrow wallet address has been failed');
        }
    })
    .finally(() => {
      setMakeingEscrowWallet(false);
    });

  }

 
  
  const [escrowBalance, setEscrowBalance] = useState(0);
  const [escrowNativeBalance, setEscrowNativeBalance] = useState(0);
  useEffect(() => {

    const getEscrowBalance = async () => {

      if (!address) {
        setEscrowBalance(0);
        return;
      }

      if (!escrowWalletAddress || escrowWalletAddress === '') return;


      const result = await balanceOf({
        contract,
        address: escrowWalletAddress,
      });

  
      setEscrowBalance( Number(result) / 10 ** 6 );




      await fetch('/api/user/getBalanceByWalletAddress', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chain: params.chain,
          walletAddress: escrowWalletAddress,
        }),
      })
      .then(response => response.json())
      .then(data => {
          setEscrowNativeBalance(data.result?.displayValue);
      });

    };

    getEscrowBalance();

    const interval = setInterval(() => {
      getEscrowBalance();
    } , 1000);

    return () => clearInterval(interval);

  } , [address, escrowWalletAddress, contract, params.chain]);
  



  // get User by wallet address

  const [user, setUser] = useState<any>(null);
  useEffect(() => {

    if (!address) {
        return;
    }

    fetch('/api/user/getUser', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            walletAddress: address,
        }),
    })
    .then(response => response.json())
    .then(data => {
        ///console.log('data', data);
        setUser(data.result);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
  } , [address]);










    const [isModalOpen, setModalOpen] = useState(false);

    const closeModal = () => setModalOpen(false);
    const openModal = () => setModalOpen(true);

    


    const [searchMyTrades, setSearchMyTrades] = useState(false);


    
    const [sellOrders, setSellOrders] = useState<SellOrder[]>([]);

    useEffect(() => {

        /*
        fetch('/api/order/getAllSellOrdersForBuyer', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              
            }),
        })
        .then(response => response.json())
        .then(data => {
            ///console.log('data', data);
            setSellOrders(data.result.orders);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
        */

        const fetchSellOrders = async () => {


            const response = await fetch('/api/order/getAllSellOrdersForBuyer', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(

                  {
                    walletAddress: address,
                    searchMyTrades: searchMyTrades,
                  }

              ),
            });




            const data = await response.json();
            setSellOrders(data.result.orders);
        }

        fetchSellOrders();

        /*
        const interval = setInterval(() => {
            fetchSellOrders();
        }, 10000);


        return () => clearInterval(interval);
        */



    } , [address, searchMyTrades]);


    


    /* agreement for trade */
    const [agreementForTrade, setAgreementForTrade] = useState([] as boolean[]);
    useEffect(() => {
        setAgreementForTrade (
            sellOrders.map((item, idx) => {
                return false;
            })
        );
    } , [sellOrders]);
    
    
    //const [acceptingSellOrder, setAcceptingSellOrder] = useState(false);

    const [acceptingSellOrder, setAcceptingSellOrder] = useState([] as boolean[]);

    useEffect(() => {
        setAcceptingSellOrder (
            sellOrders.map((item, idx) => {
                return false;
            })
        );
    } , [sellOrders]);


    /*
    // sms receiver mobile number array
    const [smsReceiverMobileNumbers, setSmsReceiverMobileNumbers] = useState([] as string[]);
    useEffect(() => {
        setSmsReceiverMobileNumbers(
            sellOrders.map((item, idx) => {
                return user?.mobile || '';
            })
        );
    } , [sellOrders, user]);
    */

    const [smsReceiverMobileNumber, setSmsReceiverMobileNumber] = useState('');
    useEffect(() => {
        setSmsReceiverMobileNumber(phoneNumber);
    } , [phoneNumber]);



    const acceptSellOrder = (
      index: number,
      orderId: string,
      smsNumber: string,
    ) => {

        if (!address) {

            toast.error('Please connect your wallet');

            return;
        }

        setAcceptingSellOrder (
            sellOrders.map((item, idx) => {
                if (idx === index) {
                    return true;
                } else {
                    return false;
                }
            })
        );


        fetch('/api/order/acceptSellOrder', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                lang: params.lang,
                chain: params.chain,
                orderId: orderId,
                buyerWalletAddress: address,
                buyerNickname: user ? user.nickname : '',
                buyerAvatar: user ? user.avatar : '',

                //buyerMobile: user.mobile,
                buyerMobile: smsNumber,

            }),
        })
        .then(response => response.json())
        .then(data => {

            console.log('data', data);

            //setSellOrders(data.result.orders);
            //openModal();

            toast.success(Order_accepted_successfully);



            fetch('/api/order/getAllSellOrdersForBuyer', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                }),
            })
            .then(response => response.json())
            .then(data => {
                ///console.log('data', data);
                setSellOrders(data.result.orders);
            })

        })
        .catch((error) => {
            console.error('Error:', error);
        })
        .finally(() => {
            setAcceptingSellOrder (
                sellOrders.map((item, idx) => {
                    return false;
                })
            );
        } );


    }



  // agreement for cancel trade
  const [agreementForCancelTrade, setAgreementForCancelTrade] = useState([] as boolean[]);
  useEffect(() => {
    setAgreementForCancelTrade(
      sellOrders.map(() => false)
    );
  } , [sellOrders]);





    // cancel sell order state
    const [cancellings, setCancellings] = useState([] as boolean[]);
    useEffect(() => {
      setCancellings(sellOrders.map(() => false));
    }, [sellOrders]);



    const cancelTrade = async (orderId: string, index: number) => {



      if (cancellings[index]) {
        return;
      }



      setCancellings(cancellings.map((item, i) => i === index ? true : item));

      const response = await fetch('/api/order/cancelTradeByBuyer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          orderId: orderId,
          walletAddress: address
        })
      });

      const data = await response.json();

      ///console.log('data', data);

      if (data.result) {
        toast.success(Order_has_been_cancelled);

        await fetch('/api/order/getAllSellOrdersForBuyer', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
          })
        }).then(async (response) => {
          const data = await response.json();
          //console.log('data', data);
          if (data.result) {
            setSellOrders(data.result.orders);
          }
        });

      } else {
        toast.error('Order has been failed');
      }

      setCancellings(cancellings.map((item, i) => i === index ? false : item));

    }


  


    // check table view or card view
    const [tableView, setTableView] = useState(false);







    return (

      <main className="p-4 pb-10 min-h-[100vh] flex items-start justify-center container max-w-screen-lg mx-auto">

        

        <div className="py-0 w-full">

          <AppBarComponent />

          <Header
              agent={agent || ""}
              tokenId={agentNumber || ""}
          />

          {/*
          <div className="mt-4 flex justify-start space-x-4 mb-10">
              <button
                onClick={() => router.push(
                  '/' + params.lang + '/' + params.chain + '?wallet=' + wallet
                )}
                className="text-gray-500 font-semibold underline"
              >
                {Go_Home}
              </button>
          </div>
          */}


          <div className="flex flex-col items-start justify-center space-y-4">

              <div className='flex flex-row items-center space-x-4'>
                  <Image
                    src="/logo-tether.png"
                    alt="USDT"
                    width={35}
                    height={35}
                    className="rounded-lg"
                  />

                  <Image
                    src={
                      `/logo-${params.chain}.png`
                    }
                    alt="Chain"
                    width={32}
                    height={32}
                    className="rounded-lg"
                  />

                  <div className="text-2xl font-semibold">{Buy_USDT}</div>

              </div>


                <div className="w-full flex flex-row items-start justify-between gap-2">


                  {/* my usdt balance */}
                  <div className="flex flex-row items-start gap-3">
                    
                    <div className="flex flex-col gap-2 items-start">
                      <div className="text-sm">{My_Balance}</div>
                      <div className="flex flex-row items-end justify-center  gap-2">
                        <span className="text-4xl font-semibold text-gray-800">
                          {Number(balance).toFixed(2)}
                        </span>
                        <span className="text-lg">USDT</span>
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
                        titleIcon: "https://aiagentbot.vercel.app/icon-pump-bot.png",                           
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

                  </div>


                </div>





                <div className="w-full flex flex-row items-between justify-start gap-2">

                  <div className="flex flex-row items-center  gap-2">

                    <div className="flex flex-col gap-2 items-center">
                      <div className="text-sm">{Total}</div>
                      <div className="text-xl font-semibold text-gray-800">
                        {sellOrders.length} 
                      </div>
                      
                    </div>

                    <div className="flex flex-col gap-2 items-center">
                      <div className="text-sm">{Sell}</div>
                      <div className="text-xl font-semibold text-gray-800">
                        {sellOrders.filter((item) => item.status === 'ordered').length}
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 items-center">
                      <div className="text-sm">{Trades}</div>
                      <div className="text-xl font-semibold text-gray-800">

                        {
                          //sellOrders.filter((item) => item.status === 'accepted').length
                          sellOrders.filter((item) => item.status === 'accepted' || item.status === 'paymentRequested').length

                        }

                      </div>
                    </div>



                    <div className="ml-5 flex flex-col gap-2 items-start justify-end">
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
                      </div>
                      {/* checkbox for search my trades */}
                      <div className="flex flex-row items-center gap-2">
                        <input
                          disabled={!address}
                          type="checkbox"
                          checked={searchMyTrades}
                          onChange={(e) => setSearchMyTrades(e.target.checked)}
                          className="w-5 h-5"
                        />
                        <label className="text-sm text-zinc-400">{Search_my_trades}</label>
                      </div>
                    </div>

                  </div>


                  <div className=" ml-10 flex flex-col items-end gap-2">
                    {/* reload button */}
                    <button
                      className="text-sm bg-zinc-800 px-2 py-1 rounded-md text-white hover:bg-zinc-700"
                      onClick={() => {
                        fetch('/api/order/getAllSellOrdersForBuyer', {
                          method: 'POST',
                          headers: {
                            'Content-Type': 'application/json',
                          },
                          body: JSON.stringify({
                          }),
                        })
                        .then(response => response.json())
                        .then(data => {
                            ///console.log('data', data);
                            setSellOrders(data.result.orders);
                        })
                      }}
                    >
                      Reload
                    </button>

                    {/* select table view or card view */}
                    <div className="flex flex-row items-center space-x-4">
                        <div className="text-sm">{Table_View}</div>
                        <input
                          type="checkbox"
                          checked={tableView}
                          onChange={(e) => setTableView(e.target.checked)}
                          className="w-5 h-5 rounded-full"
                        />
                    </div>

                  </div>





                </div>



                {/* table view is horizontal scroll */}
                {tableView ? (


                  <div className="w-full overflow-x-auto">

                    <table className=" w-full table-auto border-collapse border border-zinc-800 rounded-md">

                      <thead
                        className="bg-zinc-800 text-white"
                      >
                        <tr>
                          <th className="p-2">{Order_Opened}</th>
                          <th className="p-2">{Seller}</th>
                          <th className="p-2">{Price}</th>
                          <th className="p-2">{Amount}</th>
                          <th className="p-2">{Payment}</th>
                          <th className="p-2">{Status}</th>
                          <th className="p-2">{Trades}</th>
                        </tr>
                      </thead>

                      <tbody>
                        {sellOrders.map((item, index) => (
                          <tr key={index} className={`
                            ${index % 2 === 0 ? 'bg-zinc-700' : 'bg-zinc-800'}
                          `}>

                            <td className="p-2">
                              <div className="text-sm text-zinc-400">
                                {params.lang === 'kr' ? (
                                  <p>{
                                    new Date().getTime() - new Date(item.createdAt).getTime() < 1000 * 60 ? (
                                      ' ' + Math.floor((new Date().getTime() - new Date(item.createdAt).getTime()) / 1000) + ' ' + seconds_ago
                                    ) :
                                    new Date().getTime() - new Date(item.createdAt).getTime() < 1000 * 60 * 60 ? (
                                    ' ' + Math.floor((new Date().getTime() - new Date(item.createdAt).getTime()) / 1000 / 60) + ' ' + minutes_ago
                                    ) : (
                                      ' ' + Math.floor((new Date().getTime() - new Date(item.createdAt).getTime()) / 1000 / 60 / 60) + ' ' + hours_ago
                                    )
                                  }{' '}{Order_Opened}</p>
                                ) : (
                                  <p>{Order_Opened} {
                                    new Date().getTime() - new Date(item.createdAt).getTime() < 1000 * 60 ? (
                                      ' ' + Math.floor((new Date().getTime() - new Date(item.createdAt).getTime()) / 1000) + ' ' + seconds_ago
                                    ) :
                                    new Date().getTime() - new Date(item.createdAt).getTime() < 1000 * 60 * 60 ? (
                                    ' ' + Math.floor((new Date().getTime() - new Date(item.createdAt).getTime()) / 1000 / 60) + ' ' + minutes_ago
                                    ) : (
                                      ' ' + Math.floor((new Date().getTime() - new Date(item.createdAt).getTime()) / 1000 / 60 / 60) + ' ' + hours_ago
                                    )
                                  }</p>
                                )}
                              </div>
                            </td>
                            
                            <td className="p-2">
                              <div className="flex flex-row items-center gap-2">
                                <Image
                                  src={item.avatar || "/profile-default.png"}
                                  alt="Avatar"
                                  width={32}
                                  height={32}
                                  priority={true} // Added priority property
                                  className="rounded-full"
                                  style={{
                                      objectFit: 'cover',
                                      width: '32px',
                                      height: '32px',
                                  }}
                                />
                                <div className="flex flex-col gap-2 items-start">
                                  <div className="text-lg font-semibold text-white">
                                    {item.walletAddress === address ? 'Me' : item.nickname}
                                  </div>
                                  <div className="text-sm text-zinc-400">
                                    {item.walletAddress === address ? 'Me' : item.tradeId ? item.tradeId : ''}
                                  </div>
                                </div>
                              </div>
                            </td>

                            <td className="p-2">
                              <div className="text-sm font-semibold text-white">
                                {
                                  // currency
                                  Number(item.krwAmount).toLocaleString('ko-KR', {
                                    style: 'currency',
                                    currency: 'KRW',
                                  })
                                }
                              </div>
                              <div className="text-sm font-semibold text-white">
                              {Rate}{' '}{Number(item.krwAmount / item.usdtAmount).toFixed(2)}
                              </div>
                            </td>

                            <td className="p-2">
                              <div className="text-sm font-semibold text-white">
                                {item.usdtAmount} USDT
                              </div>
                            </td>

                            <td className="p-2">
                              <div className="text-sm font-semibold text-white">
                                {item.seller?.bankInfo.bankName}
                              </div>
                            </td>

                            <td className="p-2">
                              <div className="flex flex-row items-center gap-2">
                                {/* status */}
                                {item.status === 'ordered' && (
                                  <div className="text-sm text-zinc-400">
                                    {Order_Opened}
                                  </div>
                                )}


                                {item.status === 'accepted' && (
                                  <div className="text-sm text-green-500">

                                    {params.lang === 'kr' ? (
                                      <p>{
                                        new Date().getTime() - new Date(item.acceptedAt).getTime() < 1000 * 60 ? (
                                          ' ' + Math.floor((new Date().getTime() - new Date(item.acceptedAt).getTime()) / 1000) + ' ' + seconds_ago
                                        ) :
                                        new Date().getTime() - new Date(item.acceptedAt).getTime() < 1000 * 60 * 60 ? (
                                        ' ' + Math.floor((new Date().getTime() - new Date(item.acceptedAt).getTime()) / 1000 / 60) + ' ' + minutes_ago
                                        ) : (
                                          ' ' + Math.floor((new Date().getTime() - new Date(item.acceptedAt).getTime()) / 1000 / 60 / 60) + ' ' + hours_ago
                                        )
                                      }{' '}{Trade_Started}</p>
                                    ) : (
                                      <p>{Trade_Started} {
                                        new Date().getTime() - new Date(item.acceptedAt).getTime() < 1000 * 60 ? (
                                          ' ' + Math.floor((new Date().getTime() - new Date(item.acceptedAt).getTime()) / 1000) + ' ' + seconds_ago
                                        ) :
                                        new Date().getTime() - new Date(item.acceptedAt).getTime() < 1000 * 60 * 60 ? (
                                        ' ' + Math.floor((new Date().getTime() - new Date(item.acceptedAt).getTime()) / 1000 / 60) + ' ' + minutes_ago
                                        ) : (
                                          ' ' + Math.floor((new Date().getTime() - new Date(item.acceptedAt).getTime()) / 1000 / 60 / 60) + ' ' + hours_ago
                                        )
                                      }</p>
                                    )}


                                  </div>
                                )}

                                {item.status === 'paymentRequested' && (
                                  <div className="text-sm text-green-500">
                                    {Waiting_for_seller_to_deposit}
                                  </div>
                                )}

                                {item.status === 'cancelled' && (
                                  <div className="text-sm text-red-600">
                                    {Cancelled_at}
                                  </div>
                                )}

                                {item.status === 'completed' && (
                                  <div className="text-sm text-green-500">
                                    {Completed_at}
                                  </div>
                                )}

                              </div>
                            </td>

                            <td className="p-2">

                              {item.status === 'accepted' && item.buyer && item.buyer.walletAddress === address && (
                                <div className="flex flex-row items-center gap-2">
                                  <input
                                    type="checkbox"
                                    checked={agreementForCancelTrade[index]}
                                    onChange={(e) => {
                                      setAgreementForCancelTrade(
                                        agreementForCancelTrade.map((item, idx) => idx === index ? e.target.checked : item)
                                      );
                                    }}
                                  />
                                  <button
                                    disabled={cancellings[index] || !agreementForCancelTrade[index]}
                                    className={`
                                      ${cancellings[index] || !agreementForCancelTrade[index] ?
                                        'bg-zinc-800 text-zinc-400' : 'bg-red-500 text-white'}
                                      px-2 py-1 rounded-md hover:bg-red-600
                                    `}
                                      
                                    onClick={() => {
                                      cancelTrade(item._id, index);
                                    }}
                                  >
                                    {cancellings[index] && (
                                      <Image
                                        src="/loading.png"
                                        alt="Loading"
                                        width={20}
                                        height={20}
                                        className="animate-spin"
                                      />
                                    )}
                                    {!cancellings[index] && 
                                      Cancel_My_Trade
                                    }
                                  </button>
                                </div>
                              )}

                              {item.status === 'ordered' && item.walletAddress !== address && (
                                <div className="flex flex-row items-center gap-2">
                                  <input
                                    type="checkbox"
                                    checked={agreementForTrade[index]}
                                    onChange={(e) => {
                                      setAgreementForTrade(
                                        agreementForTrade.map((item, idx) => idx === index ? e.target.checked : item)
                                      );
                                    }}
                                  />
                                  <button
                                    disabled={acceptingSellOrder[index] || !agreementForTrade[index]}
                                    className={`
                                      ${acceptingSellOrder[index] || !agreementForTrade[index] ?
                                        'bg-zinc-800 text-zinc-400' : 'bg-green-500 text-white'}
                                      px-2 py-1 rounded-md hover:bg-green-600
                                    `}
                                    onClick={() => {
                                      acceptSellOrder(index, item._id, smsReceiverMobileNumber);
                                    }}
                                  >
                                    {acceptingSellOrder[index] && (
                                      <Image
                                        src="/loading.png"
                                        alt="Loading"
                                        width={20}
                                        height={20}
                                        className="animate-spin"
                                      />
                                    )}
                                    {!acceptingSellOrder[index] && 
                                      Buy
                                    }
                                    
                                  </button>
                                </div>
                              )}

                            </td>

                          </tr>

                        ))}

                      </tbody>

                    </table>

                  </div>


                ) : (

                  <div className="w-full grid gap-4 lg:grid-cols-2 xl:grid-cols-3 justify-center ">

                      {sellOrders.map((item, index) => (
          
                        <div
                          key={index}
                          className="relative flex flex-col items-center justify-center"
                        >


                          {item.status === 'ordered' && (new Date().getTime() - new Date(item.createdAt).getTime() > 1000 * 60 * 60 * 24) && (
                            <div className="absolute inset-0 flex justify-center items-center z-10
                              bg-black bg-opacity-50
                              
                            ">
                              <Image
                                src="/icon-expired.png"
                                alt="Expired"
                                width={100}
                                height={100}
                                className="opacity-20"
                              />
                            </div>
                          )}

                          {item.status === 'cancelled' && (
                            <div className="absolute inset-0 flex justify-center items-center z-10
                              bg-black bg-opacity-50
                            ">
                              <Image
                                src="/icon-cancelled.png"
                                alt="Cancelled"
                                width={100}
                                height={100}
                                className="opacity-20"
                              />
                            </div>
                          )}


                          <article
                              //key={index}
                              className={` w-96 xl:w-full h-full relative
                                ${item.walletAddress === address ? 'border-green-500' : 'border-red-600'}

                                ${item.status === 'accepted' || item.status === 'paymentRequested' ? 'border-red-600' : 'border-gray-200'}

                                p-4 rounded-md border
                                 bg-yellow-500 bg-opacity-10
                            `}
                          >

                            {item.status === 'ordered' && (

    
                              <div className="w-full flex flex-col gpa-2 items-start justify-start">


                                  <div className="w-full flex flex-row items-center justify-between gap-2">

                                    <div className="flex flex-row items-center gap-2">

                                      {/* if createdAt is recent 1 hours, show new badge */}
                                      {new Date().getTime() - new Date(item.createdAt).getTime() < 1000 * 60 * 60 && (
                                        <Image
                                          src="/icon-new.png"
                                          alt="New"
                                          width={28}
                                          height={28}
                                        />
                                      )}

                                      <Image
                                        src="/icon-public-sale.png"
                                        alt="Public Sale"
                                        width={28}
                                        height={28}
                                      />

                                    

                                      {params.lang === 'kr' ? (

                                        <p className="text-sm text-zinc-400">

                                        
                                          {

                                            new Date().getTime() - new Date(item.createdAt).getTime() < 1000 * 60 ? (
                                              ' ' + Math.floor((new Date().getTime() - new Date(item.createdAt).getTime()) / 1000) + ' ' + seconds_ago
                                            ) :
                                            new Date().getTime() - new Date(item.createdAt).getTime() < 1000 * 60 * 60 ? (
                                            ' ' + Math.floor((new Date().getTime() - new Date(item.createdAt).getTime()) / 1000 / 60) + ' ' + minutes_ago
                                            ) : (
                                              ' ' + Math.floor((new Date().getTime() - new Date(item.createdAt).getTime()) / 1000 / 60 / 60) + ' ' + hours_ago
                                            )
                                          }{' '}{Order_Opened} 

                                        </p>
                                        
                                        ) : (

                                          <p className="text-sm text-zinc-400">


                                        
                                          {Order_Opened}{' '}{

                                            new Date().getTime() - new Date(item.createdAt).getTime() < 1000 * 60 ? (
                                              ' ' + Math.floor((new Date().getTime() - new Date(item.createdAt).getTime()) / 1000) + ' ' + seconds_ago
                                            ) :
                                            new Date().getTime() - new Date(item.createdAt).getTime() < 1000 * 60 * 60 ? (
                                            ' ' + Math.floor((new Date().getTime() - new Date(item.createdAt).getTime()) / 1000 / 60) + ' ' + minutes_ago
                                            ) : (
                                              ' ' + Math.floor((new Date().getTime() - new Date(item.createdAt).getTime()) / 1000 / 60 / 60) + ' ' + hours_ago
                                            )
                                          }



                                        </p>


                                      )}

                                    </div>



                                    {/* share button */}
                                    {/*
                                    <button
                                      className="text-sm bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-600"
                                      onClick={() => {

                                        window.open(`https://gold.goodtether.com/${params.lang}/sell-usdt/${item._id}`, '_blank');

                                      }}
                                    >
                                      <Image
                                        src="/icon-share.png"
                                        alt="Share"
                                        width={20}
                                        height={20}
                                      />
                                    </button>
                                    */}


                                  </div>


                                  {24 - Math.floor((new Date().getTime() - new Date(item.createdAt).getTime()) / 1000 / 60 / 60) > 0 ? (

                                    <div className="mt-2 flex flex-row items-center space-x-2">
                                      <Image
                                        src="/icon-timer.webp"
                                        alt="Timer"
                                        width={28}
                                        height={28}
                                      />
                                      <p className="text-sm text-zinc-400">{Expires_in} {
      
                                        24 - Math.floor((new Date().getTime() - new Date(item.createdAt).getTime()) / 1000 / 60 / 60) - 1

                                        } {hours} {
                                          60 - Math.floor((new Date().getTime() - new Date(item.createdAt).getTime()) / 1000 / 60) % 60
                                        } {minutes}

                                      </p>
                                    </div>

                                  ) : (
                                    <div className="mt-2 flex flex-row items-center space-x-2">
                                      {/*
                                      <Image
                                        src="/icon-timer.webp"
                                        alt="Expired"
                                        width={28}
                                        height={28}
                                      />
                                      <p className="text-sm text-zinc-400">Expired</p>
                                      */}
                                    </div>
                                  )}
      
                              </div>

                            )}



                            { (item.status === 'accepted' || item.status === 'paymentRequested' || item.status === 'cancelled') && (
                                
                              <div className={`
                                ${item.status !== 'cancelled' && 'h-16'}

                                mb-4 flex flex-row items-center bg-zinc-800 px-2 py-1 rounded-md`}>
                                  <Image
                                    src="/icon-trade.png"
                                    alt="Trade"
                                    width={32}
                                    height={32}
                                  />


                                  <p className="text-sm font-semibold text-green-500 ">
                                    {item.tradeId}
                                  </p>

                                  {item.status === 'cancelled' ? (
                                    <p className="ml-2 text-sm text-zinc-400">
                                      {new Date(item.acceptedAt).toLocaleString()}
                                    </p>
                                  ) : (
                                    
                                    <>
                                      {params.lang === 'kr' ? (

                                        <p className="ml-2 text-sm text-zinc-400">

                                        
                                          {new Date().getTime() - new Date(item.acceptedAt).getTime() < 1000 * 60 ? (
                                            ' ' + Math.floor((new Date().getTime() - new Date(item.acceptedAt).getTime()) / 1000) + ' ' + seconds_ago
                                          ) :
                                          new Date().getTime() - new Date(item.acceptedAt).getTime() < 1000 * 60 * 60 ? (
                                          ' ' + Math.floor((new Date().getTime() - new Date(item.acceptedAt).getTime()) / 1000 / 60) + ' ' + minutes_ago
                                          ) : (
                                            ' ' + Math.floor((new Date().getTime() - new Date(item.acceptedAt).getTime()) / 1000 / 60 / 60) + ' ' + hours_ago
                                          )
                                          }{' '}{Trade_Started}

                                        </p>



                                      ) : (

                                        <p className="ml-2 text-sm text-zinc-400">

                                          {Trade_Started} {
                                            new Date().getTime() - new Date(item.acceptedAt).getTime() < 1000 * 60 ? (
                                              ' ' + Math.floor((new Date().getTime() - new Date(item.acceptedAt).getTime()) / 1000) + ' ' + seconds_ago
                                            ) :
                                            new Date().getTime() - new Date(item.acceptedAt).getTime() < 1000 * 60 * 60 ? (
                                            ' ' + Math.floor((new Date().getTime() - new Date(item.acceptedAt).getTime()) / 1000 / 60) + ' ' + minutes_ago
                                            ) : (
                                              ' ' + Math.floor((new Date().getTime() - new Date(item.acceptedAt).getTime()) / 1000 / 60 / 60) + ' ' + hours_ago
                                            )
                                          }

                                        </p>

                                      )}




                                    </>
                                  
                                  )}



                                    {/* share button */}
                                    <button
                                      className="ml-5 text-sm bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-600"
                                      onClick={() => {

                                        //window.open(`https://gold.goodtether.com/${params.lang}/${params.chain}/sell-usdt/${item._id}`, '_blank');

                                        // copy to clipboard

                                        navigator.clipboard.writeText(`https://gold.goodtether.com/${params.lang}/${params.chain}/sell-usdt/${item._id}`);

                                        toast.success('Link copied to clipboard');

                                      }}
                                    >
                                      <Image
                                        src="/icon-share.png"
                                        alt="Share"
                                        width={20}
                                        height={20}
                                      />
                                    </button>



                                </div>
                            )}


                              {/*
                              
                              {item.acceptedAt && (
                                <p className="mb-2 text-sm text-zinc-400">
                                  Trade started at {new Date(item.acceptedAt).toLocaleDateString() + ' ' + new Date(item.acceptedAt).toLocaleTimeString()}
                                </p>
                              )}
                              */}




                            {item.status === 'cancelled' && (
                                <div className="mt-4 flex flex-row items-center gap-2">
                                  <Image
                                    src='/icon-cancelled.webp'
                                    alt='cancel'
                                    width={20}
                                    height={20}
                                  />
                                  <p className="text-sm text-red-500">
                                    {Cancelled_at} {
                                      new Date(item.cancelledAt).toLocaleDateString() + ' ' + new Date(item.cancelledAt).toLocaleTimeString()
                                    }
                                  </p>
                                </div>
                              )}




                    

                              <div className="mt-4 flex flex-col items-start">



                                <p className="text-2xl text-gray-800 font-semibold">
                                  {Price}: {
                                    // currency
                                  
                                    Number(item.krwAmount).toLocaleString('ko-KR', {
                                      style: 'currency',
                                      currency: 'KRW',
                                    })

                                  }
                                </p>

                                <div className="mt-2 flex flex-row items-start gap-2">

                                  <p className="text-xl font-semibold text-green-500">
                                    {item.usdtAmount}{' '}USDT
                                  </p>
                                  <p className="text-lg font-semibold text-gray-800">{Rate}: {

                                    Number(item.krwAmount / item.usdtAmount).toFixed(2)

                                    }</p>
                                </div>


                              </div>

                      

                              <div className="mb-4 flex flex-col items-start text-sm ">
                                {Payment}: {Bank_Transfer} ({item.seller?.bankInfo.bankName})
                              </div>



                              <div className="flex flex-col items-start justify-start gap-2">
                                <p className="mt-2 mb-2 flex items-center gap-2">

                                  <Image
                                      src={item.avatar || '/profile-default.png'}
                                      alt="Avatar"
                                      width={32}
                                      height={32}
                                      priority={true} // Added priority property
                                      className="rounded-full"
                                      style={{
                                          objectFit: 'cover',
                                          width: '32px',
                                          height: '32px',
                                      }}
                                  />

                                  <div className="flex items-center space-x-2">{Seller}:</div>

                                  <h2 className="text-lg font-semibold">
                                    {item.walletAddress === address ? 'Me' : item.nickname}
                                  
                                  </h2>

                                  <Image
                                    src="/verified.png"
                                    alt="Verified"
                                    width={20}
                                    height={20}
                                    className="rounded-lg"
                                  />

                                  <Image
                                    src="/best-seller.png"
                                    alt="Best Seller"
                                    width={20}
                                    height={20}
                                    className="rounded-lg"
                                  />

                                </p>


                                {address && item.walletAddress !== address && item.buyer && item.buyer.walletAddress === address && (
                                  <button
                                    className="bg-green-500 text-white px-4 py-2 rounded-lg"
                                    onClick={() => {
                                        //console.log('Buy USDT');
                                        // go to chat
                                        // close modal
                                        //closeModal();
                                        ///goChat(item._id, item.tradeId);

                                        router.push(`/${params.lang}/${params.chain}/sell-usdt/${item._id}`);

                                    }}
                                  >
                                    {Chat_with_Seller + ' ' + item.nickname}
                                  </button>
                                )}


                              </div>




                              {/* buyer cancelled the trade */}
                              {item.status === 'cancelled' && (
                                <div className="mt-4 flex flex-col gap-2 items-start justify-center">
                                  <div className="flex flex-row items-center gap-2">
                                    <Image
                                      src={item.buyer.avatar || "/profile-default.png"}
                                      alt="Profile Image"
                                      width={32}
                                      height={32}
                                      priority={true} // Added priority property
                                      className="rounded-full"
                                      style={{
                                          objectFit: 'cover',
                                          width: '32px',
                                          height: '32px',
                                      }}
                                    />
                                    <p className="text-sm text-red-500 font-semibold">
                                      {Buyer}: {
                                        address && item.buyer.walletAddress === address ? Me :
                                        address && item.buyer.nickname ? item.buyer.nickname : Anonymous
                                      }
                                    </p>
  
                                  </div>


                                </div>
                              )}



                              {(item.status === 'accepted' || item.status === 'paymentRequested') && (
                          
                                <div className="mt-4 flex flex-row items-center gap-2">
                                  <Image
                                    src={item.buyer.avatar || "/profile-default.png"}
                                    alt="Profile Image"
                                    width={32}
                                    height={32}
                                    priority={true} // Added priority property
                                    className="rounded-full"
                                    style={{
                                        objectFit: 'cover',
                                        width: '32px',
                                        height: '32px',
                                    }}
                                  />
                                  <p className="text-xl text-green-500 font-semibold">
                                    {Buyer}: {
                                      item.buyer.walletAddress === address ? Me :
                                      item.buyer.nickname.substring(0, 1) + '***'
                                    }
                                  </p>
                                  <Image
                                    src="/verified.png"
                                    alt="Verified"
                                    width={20}
                                    height={20}
                                    className="rounded-lg"
                                  />
                                </div>
                              
                              )}
                            

                              {/* waiting for escrow */}
                              {item.status === 'accepted' && (



                                <div className="mt-4 flex flex-col gap-2 items-center justify-start">


                                    
                                    
                                  <div className="mt-4 flex flex-row gap-2 items-center justify-start">
                                    <Image
                                      src="/loading.png"
                                      alt="Escrow"
                                      width={32}
                                      height={32}
                                      className="animate-spin"
                                    />

                                    <div className="flex flex-col gap-2 items-start">
                                      <span>
                                        {Waiting_for_seller_to_deposit} {item.usdtAmount} USDT {to_escrow}...
                                      </span>

                                      <span className="text-sm text-zinc-400">

                                        {If_the_seller_does_not_deposit_the_USDT_to_escrow},

                                        {this_trade_will_be_cancelled_in} {

                                          (1 - Math.floor((new Date().getTime() - new Date(item.acceptedAt).getTime()) / 1000 / 60 / 60) - 1) > 0
                                          ? (1 - Math.floor((new Date().getTime() - new Date(item.acceptedAt).getTime()) / 1000 / 60 / 60) - 1) + ' ' + hours
                                          : (60 - Math.floor((new Date().getTime() - new Date(item.acceptedAt).getTime()) / 1000 / 60) % 60) + ' ' + minutes

                                        } 

                                      </span>
                                    </div>
                                  </div>





                                  {item.buyer.walletAddress === address && (

                                    <div className="mt-4 flex flex-col items-center justify-center gap-2">



                                      <div className="flex flex-row items-center gap-2">
                                        <input
                                          type="checkbox"
                                          checked={agreementForCancelTrade[index]}
                                          onChange={(e) => {
                                            setAgreementForCancelTrade(
                                              sellOrders.map((item, idx) => {
                                                if (idx === index) {
                                                  return e.target.checked;
                                                } else {
                                                  return false;
                                                }
                                              })
                                            );
                                          }}
                                        />
                                        <label className="text-sm text-zinc-400">
                                          {I_agree_to_cancel_the_trade}
                                        </label>
                                      </div>


                                      <div className="mt-5 flex flex-row items-center gap-2">

                                        <button
                                          disabled={cancellings[index] || !agreementForCancelTrade[index]}
                                          className={`text-sm bg-red-500 text-white px-2 py-1 rounded-md ${cancellings[index] || !agreementForCancelTrade[index] ? 'opacity-50 cursor-not-allowed' : 'hover:bg-red-600'}`}
                                          onClick={() => {
                                            // api call
                                            // cancelSellOrder

                                            cancelTrade(item._id, index);

                                          }}
                                        >

                                          <div className="flex flex-row items-center gap-2 px-2 py-1">
                                            {cancellings[index] ? (
                                              <div className="
                                                w-4 h-4
                                                border-2 border-zinc-800
                                                rounded-full
                                                animate-spin
                                              ">
                                                <Image
                                                  src="/loading.png"
                                                  alt="loading"
                                                  width={16}
                                                  height={16}
                                                />
                                              </div>
                                            ) : (
                                              <Image
                                                src="/icon-cancelled.png"
                                                alt="Cancel"
                                                width={16}
                                                height={16}
                                              />
                                            )}
                                            {Cancel_My_Trade}
                                          </div>
                                            
                                        
                                        </button>
                                      </div>

                                    </div>

                                  )}


                                </div>
                              )}

                              {/* waiting for payment */}
                              {item.status === 'paymentRequested' && (

                                  <div className="mt-4 flex flex-col gap-2 items-start justify-start">

                                    <div className="flex flex-row items-center gap-2">

                                      <Image
                                        src="/smart-contract.png"
                                        alt="Smart Contract"
                                        width={32}
                                        height={32}
                                      />
                                      <div>{Escrow}: {item.usdtAmount} USDT</div>
                                      <button
                                        className="bg-white text-black px-2 py-2 rounded-md"
                                        onClick={() => {
                              
                                            params.chain === 'arbitrum' ? window.open(`https://arbiscan.io/tx/${item.escrowTransactionHash}`) : window.open(`https://polygonscan.com/tx/${item.escrowTransactionHash}`);
                                            


                                        }}
                                      >
                                        <Image
                                          src={params.chain === 'arbitrum' ? '/logo-arbitrum.png' : '/logo-polygon.png'}
                                          alt="Chain"
                                          width={20}
                                          height={20}
                                        />
                                      </button>
                                    </div>

                                    <div className="flex flex-row gap-2 items-center justify-start">

                                      {/* rotate loading icon */}
                                    
                                      <Image
                                        src="/loading.png"
                                        alt="Escrow"
                                        width={32}
                                        height={32}
                                        className="animate-spin"
                                      />

                                      <div>Waiting for buyer to send {
                                      item.krwAmount.toLocaleString('ko-KR', {
                                        style: 'currency',
                                        currency: 'KRW',
                                      })} to seller...</div>
                                    

                                    </div>


                                  </div>
                              )}



                            





                              {item.status === 'ordered' && (
                                <>

                                {acceptingSellOrder[index] ? (

                                  <div className="flex flex-row items-center gap-2">
                                    <Image
                                      src='/loading.png'
                                      alt='loading'
                                      width={35}
                                      height={35}
                                      className="animate-spin"
                                    />
                                    <div>{Accepting_Order}...</div>
                                  </div>


                                ) : (
                                  <>
                                    
                                    {item.walletAddress === address ? (
                                      <div className="flex flex-col space-y-4">
                                        {My_Order}
                                      </div>
                                    ) : (
                                      <div className="w-full flex items-center justify-center">

                                        {item.status === 'ordered' && (
                                          
                                          // check if the order is expired
                                          new Date().getTime() - new Date(item.createdAt).getTime() > 1000 * 60 * 60 * 24

                                        ) ? (

                                          <>
                                            {/*
                                            <Image
                                              src="/icon-expired.png"
                                              alt="Expired"
                                              width={80}
                                              height={80}
                                            />
                                            */}
                                        
                                        </>
                                        ) : (

                                          <div className="mt-4 flex flex-col items-center justify-center">






                                            {/* agreement for trade */}
                                            <div className="flex flex-row items-center space-x-2">
                                              <input
                                                disabled={!address}
                                                type="checkbox"
                                                checked={agreementForTrade[index]}
                                                onChange={(e) => {
                                                    setAgreementForTrade(
                                                        sellOrders.map((item, idx) => {
                                                            if (idx === index) {
                                                                return e.target.checked;
                                                            } else {
                                                                return false;
                                                            }
                                                        })
                                                    );
                                                }}
                                              />
                                              <label className="text-sm text-zinc-400">
                                                {I_agree_to_the_terms_of_trade}
                                              </label>
                                            </div>



                                            {/* input sms receiver mobile number */}

                                            {address && agreementForTrade[index] && (
                                              <div className="mt-8 flex flex-row items-center justify-start gap-2">

                                                <span className="text-sm text-zinc-400">SMS</span>

                                                <div className="flex flex-col items-start justify-start">
                                                  <input
                                                    disabled={!address || !agreementForTrade[index]}
                                                    type="text"
                                                    placeholder="SMS Receiver Mobile Number"
                                                    className={`w-full px-4 py-2 rounded-md text-black`}
                                                    value={smsReceiverMobileNumber}
                                                    onChange={(e) => {
                                                        setSmsReceiverMobileNumber(e.target.value);
                                                    }}
                                                  />
                                                </div>
                                              </div>
                                            )}





                                            <button
                                              disabled={!address || !agreementForTrade[index]}
                                              className={`m-10 text-lg text-white px-4 py-2 rounded-md
                                                ${!address || !agreementForTrade[index] ? 'bg-zinc-800' : 'bg-green-500 hover:bg-green-600'}
                                                `}
                                              onClick={() => {
    
                                                  acceptSellOrder(index, item._id, smsReceiverMobileNumber);
                                            

                                              }}
                                            >
                                              {Buy} {item.usdtAmount} USDT
                                            </button>


                                          </div>

                                        )}

                                      </div>



                                      )}

                                    </>

                                  )}

                                </>

                              )}



                          </article>




                          {/* status */}
                          {/*
                          <div className="absolute bottom-4 right-4 flex flex-row items-start justify-start">
                            <div className="text-xs text-zinc-400">
                              {item.status === 'ordered' ? 'Order opened at ' + new Date(item.createdAt).toLocaleString()
                              : item.status === 'accepted' ? 'Trade started at ' + new Date(item.acceptedAt).toLocaleString()
                              : item.status === 'paymentRequested' ? 'Payment requested at ' + new Date(item.paymentRequestedAt).toLocaleString()
                              : item.status === 'cancelled' ? 'Trade cancelled at ' + new Date(item.cancelledAt).toLocaleString()
                              : item.status === 'paymentConfirmed' ? 'Trade completed at ' + new Date(item.paymentConfirmedAt).toLocaleString()
                              : 'Unknown'}
                            </div>
                          </div>
                          */}






                        </div>
                  
                      ))}

                  </div>

                )}

            


            </div>

        

            
          </div>


          <Modal isOpen={isModalOpen} onClose={closeModal}>
              <TradeDetail
                  closeModal={closeModal}
                  //goChat={goChat}
              />
          </Modal>


        </main>

    );


};






// close modal

const TradeDetail = (
    {
        closeModal = () => {},
        goChat = () => {},
        
    }
) => {


    const [amount, setAmount] = useState(1000);
    const price = 91.17; // example price
    const receiveAmount = (amount / price).toFixed(2);
    const commission = 0.01; // example commission
  
    return (

      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <div className="flex items-center">
          <span className="inline-block w-4 h-4 rounded-full bg-green-500 mr-2"></span>
          <h2 className="text-lg font-semibold text-black ">Iskan9</h2>
          <span className="ml-2 text-blue-500 text-sm">318 trades</span>
        </div>
        <p className="text-gray-600 mt-2">The offer is taken from another source. You can only use chat if the trade is open.</p>
        
        <div className="mt-4">
          <div className="flex justify-between text-gray-700">
            <span>Price</span>
            <span>{price} KRW</span>
          </div>
          <div className="flex justify-between text-gray-700 mt-2">
            <span>Limit</span>
            <span>40680.00 KRW - 99002.9 KRW</span>
          </div>
          <div className="flex justify-between text-gray-700 mt-2">
            <span>Available</span>
            <span>1085.91 USDT</span>
          </div>
          <div className="flex justify-between text-gray-700 mt-2">
            <span>Seller&apos;s payment method</span>
            <span className="bg-yellow-100 text-yellow-800 px-2 rounded-full">Tinkoff</span>
          </div>
          <div className="mt-4 text-gray-700">
            <p>24/7</p>
          </div>
        </div>
  
        <div className="mt-6 border-t pt-4 text-gray-700">
          <div className="flex flex-col space-y-4">
            <div>
              <label className="block text-gray-700">I want to pay</label>
              <input 
                type="number"
                value={amount}
                onChange={(e) => setAmount(
                    e.target.value === '' ? 0 : parseInt(e.target.value)
                ) }

                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-gray-700">I will receive</label>
              <input 
                type="text"
                value={`${receiveAmount} USDT`}
                readOnly
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-gray-700">Commission</label>
              <input 
                type="text"
                value={`${commission} USDT`}
                readOnly
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>
          
          <div className="mt-6 flex space-x-4">
            <button
                className="bg-green-500 text-white px-4 py-2 rounded-lg"
                onClick={() => {
                    console.log('Buy USDT');
                    // go to chat
                    // close modal
                    closeModal();
                    goChat();

                }}
            >
                Buy USDT
            </button>
            <button
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg"
                onClick={() => {
                    console.log('Cancel');
                    // close modal
                    closeModal();
                }}
            >
                Cancel
            </button>
          </div>

        </div>


      </div>
    );
  };





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
          {/* COIN, NFT, DEFI */}
          <div className="flex flex-row gap-2 items-center">
            <button
                onClick={() => {
  
                  /*
                  router.push(
                    "/" + params.lang + "/" + params.chain + "/send-token/?wallet=" + wallet + "&token=CAMT"
                  );
                  */
  
                }}
              className="text-gray-600 hover:underline text-xs xl:text-lg"
            >
              WALLET
            </button>
            <button
              onClick={() => {
                //console.log("chat");
              }}
              className="text-gray-600 hover:underline text-xs xl:text-lg"
            >
              TRADE
            </button>
            <button
              onClick={() => {
                router.push(
                    "/kr/polygon/tbot?agent=" + agent
                  );
              }}
              className="text-gray-600 hover:underline text-xs xl:text-lg"
            >
              TBOT
            </button>
            <button
              onClick={() => {
                router.push('/kr/polygon/profile-settings?agent=' + agent);
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
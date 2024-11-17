'use client';

import type { GetStaticProps, InferGetStaticPropsType } from 'next';



import { useState, useEffect, use } from "react";



import { toast } from 'react-hot-toast';

import { client } from "../../../../client";

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
} from "thirdweb/react";
import { inAppWallet } from "thirdweb/wallets";


import { getUserPhoneNumber } from "thirdweb/wallets/in-app";


import Image from 'next/image';

import GearSetupIcon from "@/components/gearSetupIcon";


import Uploader from '@/components/uploader';

import { balanceOf, transfer } from "thirdweb/extensions/erc20";
 






// open modal

import Modal from '@/components/modal';

import { useRouter }from "next//navigation";

import AppBarComponent from "@/components/Appbar/AppBar";
import { getDictionary } from "../../../../dictionaries";
import { Pay } from 'twilio/lib/twiml/VoiceResponse';


import Chat from "@/components/Chat";





interface SellOrder {
  _id: string;
  createdAt: string;
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

  walletAddress: string;

  seller: any;


  status: string;

  acceptedAt: string;
  paymentRequestedAt: string;
  paymentConfirmedAt: string;

  tradeId: string;

  buyer: any;

  privateSale: boolean;


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
const contractAddressArbitrum = "0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9"; // USDT on Arbitrum







// [orderId].tsx

//function SellUsdt(orderId: string) {


/*
export async function getStaticProps(context: any) {
    const orderId = context.params.orderId;
    return {
      props: {
        orderId,
      },
    };
}


export default function SellUsdt({ orderId }: InferGetStaticPropsType<typeof getStaticProps>) {
*/

///export default function SellUsdt() {



//export default function SellUsdt({ params }: { params: { orderId: string } }) {

 
 
 


export default function Index({ params }: any) {

    //console.log('params', params);





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

      Reload: "",

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

      Reload,

    } = data;
   
 
 
 
 
  const router = useRouter();
    

  const orderId = params.orderId as string;

  
  console.log('orderId', orderId);





    // get the active wallet
    const activeWallet = useActiveWallet();




  const smartAccount = useActiveAccount();

  const address = smartAccount?.address || "";







    const [balance, setBalance] = useState(0);
    useEffect(() => {

      if (!address) {
        return;
      }
  
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
  
    } , [address, contract]);





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
            //console.log('data', data);
            setUser(data.result);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    } , [address]);








    

    
    const [sellOrders, setSellOrders] = useState<SellOrder[]>([]);

    const [loadingOneSellOrder, setLoadingOneSellOrder] = useState(false);


    const fetchOneSellOrder = async () => {

      setLoadingOneSellOrder(true);

      // api call
      const response = await fetch('/api/order/getOneSellOrder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            orderId: orderId,
        })
      });

      const data = await response.json();

      //console.log('data', data);

      if (data.result) {
        setSellOrders(data.result.orders);
      }

      setLoadingOneSellOrder(false);

    };


    useEffect(() => {

        if (!orderId) {
          return;
        }
        

        const fetchOneSellOrder = async () => {

          setLoadingOneSellOrder(true);


          // api call
          const response = await fetch('/api/order/getOneSellOrder', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                orderId: orderId,
            })
          });
    
          const data = await response.json();
    
          //console.log('data', data);
    
          if (data.result) {
            setSellOrders(data.result.orders);
          }

          setLoadingOneSellOrder(false);
    
        };

  
        fetchOneSellOrder();



        /*
        const interval = setInterval(() => {

          fetchSellOrders();
        }, 10000);
        
        return () => clearInterval(interval);
        */
        
  
    }, [orderId]);





    // array of escrowing
    const [escrowing, setEscrowing] = useState([] as boolean[]);

    useEffect(() => {
        
        setEscrowing(
          new Array(sellOrders.length).fill(false)
        );
  
    } , [sellOrders]);





    // array of requestingPayment
    const [requestingPayment, setRequestingPayment] = useState([] as boolean[]);

    useEffect(() => {

      setRequestingPayment(
        
        sellOrders.map((item) => {
          
          if (item.status === 'paymentRequested') {
            return true;
          }
          return false;
        } )

      );

    } , [sellOrders]);








    const [isModalOpen, setModalOpen] = useState(false);

    const closeModal = () => setModalOpen(false);
    const openModal = () => setModalOpen(true);



    const  goChat = async (

      orderId: string,
      tradeId: string
    ) => {


      const url = 'https://api-CC1B09FC-0FEF-4C9C-96D0-E5D464ADF155.sendbird.com/v3/open_channels';



      const result = await fetch(url, {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json',
          'Api-Token': 'd5e9911aa317c4ee9a3be4fce38b878941f11c68',
        },

        body: JSON.stringify({
          name: tradeId,
          channel_url: orderId,
          cover_url: 'https://gold.goodtether.com/icon-trade.png',
          custom_type: 'trade',

        }),
      });

      const data = await result.json();

      console.log('data', data);
          

      console.log('Go Chat');

      //router.push(`/chat?channel=${orderId}`);

      //router.push(`/${params.lang}/chat/${orderId}`);



    }


    useEffect(() => {


      if (sellOrders.length === 0) {
        return;
      }

 

        const  goChat = async ( ) => {
    
    
          const url = 'https://api-CC1B09FC-0FEF-4C9C-96D0-E5D464ADF155.sendbird.com/v3/open_channels';
    
    
          const result = await fetch(url, {
            method: 'POST',
    
            headers: {
              'Content-Type': 'application/json',
              'Api-Token': 'd5e9911aa317c4ee9a3be4fce38b878941f11c68',
            },
    
            body: JSON.stringify({
              name: sellOrders[0].tradeId,
              channel_url: sellOrders[0]._id,
              cover_url: 'https://gold.goodtether.com/icon-trade.png',
              custom_type: 'trade',
    
            }),
          });
    
          const data = await result.json();
    
          console.log('data', data);
              
    
          console.log('Go Chat');
    
          //router.push(`/chat?channel=${orderId}`);
    
          //router.push(`/${params.lang}/chat/${orderId}`);
    
    
    
        }

        
          goChat();
        


    } , [ sellOrders ]);



    const [usdtAmount, setUsdtAmount] = useState(0);

    const [defaultKrWAmount, setDefaultKrwAmount] = useState(0);

    const [krwAmount, setKrwAmount] = useState(0);

    console.log('usdtAmount', usdtAmount);



    const [rate, setRate] = useState(1350);




    useEffect(() => {

      if (usdtAmount === 0) {

        setDefaultKrwAmount(0);

        setKrwAmount(0);

        return;
      }
    
        
      setDefaultKrwAmount( Math.round(usdtAmount * rate) );


      setKrwAmount( Math.round(usdtAmount * rate) );

    } , [usdtAmount, rate]);








    /* agreement for trade */
    const [agreementForTrade, setAgreementForTrade] = useState([] as boolean[]);
    useEffect(() => {
        setAgreementForTrade (
            sellOrders.map((item, idx) => {
                return false;
            })
        );
    } , [sellOrders]);

    const [acceptingSellOrder, setAcceptingSellOrder] = useState([] as boolean[]);

    useEffect(() => {
        setAcceptingSellOrder (
            sellOrders.map((item, idx) => {
                return false;
            })
        );
    } , [sellOrders]);


    // request payment check box
    const [requestPaymentCheck, setRequestPaymentCheck] = useState([] as boolean[]);
    useEffect(() => {
        
        setRequestPaymentCheck(
          new Array(sellOrders.length).fill(false)
        );
  
    } , [sellOrders]);





    const acceptSellOrder = (index: number, orderId: string) => {

        if (!user) {
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
                buyerWalletAddress: user.walletAddress,
                buyerNickname: user.nickname,
                buyerAvatar: user.avatar,
                buyerMobile: user.mobile,
            }),
        })
        .then(response => response.json())
        .then(data => {

            console.log('data', data);

            //setSellOrders(data.result.orders);
            //openModal();

            toast.success('Order accepted successfully');


            setLoadingOneSellOrder(true);

            fetch('/api/order/getOneSellOrder', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  orderId: orderId,
                }),
            })
            .then(response => response.json())
            .then(data => {
                ///console.log('data', data);
                setSellOrders(data.result.orders);
            })
            .catch((error) => {
                console.error('Error:', error);
            })

            setLoadingOneSellOrder(false);


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





    const requstPayment = async (
      index: number,
      orderId: string,
      tradeId: string,
      amount: number,
    ) => {
      // check balance
      // send payment request

      if (balance < amount) {
        toast.error('Insufficient balance');
        return;
      }

      if (escrowing[index]) {
        toast.error('Escrowing');
        return;
      }


      if (requestingPayment[index]) {
        toast.error('Requesting payment');
        return;
      }



      setEscrowing(
        escrowing.map((item, idx) => {
          if (idx === index) {
            return true;
          }
          return item;
        })
      );

   

      const recipientWalletAddress = "0x2111b6A49CbFf1C8Cc39d13250eF6bd4e1B59cF6";

      // send USDT
      // Call the extension function to prepare the transaction
      const transaction = transfer({
        contract,
        to: recipientWalletAddress,
        amount: amount,
      });
      


      try {


        const transactionResult = await sendAndConfirmTransaction({
            transaction: transaction,
            
            account: smartAccount as any,
        });

        console.log("transactionResult===", transactionResult);


        setEscrowing(
          escrowing.map((item, idx) => {
            if (idx === index) {
              return false;
            }
            return item;
          })
        );



        // send payment request

        if (transactionResult) {

          /*
          setRequestingPayment(
            requestingPayment.map((item, idx) => {
              if (idx === index) {
                return true;
              }
              return item;
            })
          );
          */
          
          


        
          const response = await fetch('/api/order/requestPayment', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              lang: params.lang,
              chain: params.chain,
              orderId: orderId,
              transactionHash: transactionResult.transactionHash,
            })
          });

          const data = await response.json();

          console.log('/api/order/requestPayment data====', data);


          /*
          setRequestingPayment(
            requestingPayment.map((item, idx) => {
              if (idx === index) {
                return false;
              }
              return item;
            })
          );
          */
          


          if (data.result) {

            setLoadingOneSellOrder(true);

            const response = await fetch('/api/order/getOneSellOrder', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                orderId: orderId,
              })
            });
    
            const data = await response.json();
    
            ///console.log('data', data);
    
            if (data.result) {
              setSellOrders(data.result.orders);
            }
            
            setLoadingOneSellOrder(false);


            // refresh balance

            const result = await balanceOf({
              contract,
              address: address,
            });

            //console.log(result);

            setBalance( Number(result) / 10 ** 6 );


            toast.success('Payment request has been sent');
          } else {
            toast.error('Payment request has been failed');
          }

        }


      } catch (error) {
        console.error('Error:', error);

        toast.error('Payment request has been failed');

        setEscrowing(
          escrowing.map((item, idx) => {
            if (idx === index) {
              return false;
            }
            return item;
          })
        );

      }


    }










    const [privateSale, setprivateSale] = useState(false);


    const [sellOrdering, setSellOrdering] = useState(false);

    const sellOrder = async () => {
      // api call
      // set sell order

      if (sellOrdering) {
        return;
      }

      setSellOrdering(true);

      const response = await fetch('/api/order/setSellOrder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          walletAddress: address,
          usdtAmount: usdtAmount,
          krwAmount: krwAmount,
          rate: rate,
          privateSale: privateSale,
        })
      });

      const data = await response.json();

      //console.log('data', data);

      if (data.result) {
        toast.success('Sell order has been created');

        setUsdtAmount(0);
        setprivateSale(false);
     


        await fetch('/api/order/getOneSellOrder', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            walletAddress: address
          })
        }).then(async (response) => {
          const data = await response.json();
          //console.log('data', data);
          if (data.result) {
            setSellOrders(data.result.orders);
          }
        });




      } else {
        toast.error('Sell order has been failed');
      }

      setSellOrdering(false);

      

    };







  // array of confirmingPayment

  const [confirmingPayment, setConfirmingPayment] = useState([] as boolean[]);

  useEffect(() => {
      
      setConfirmingPayment(
        new Array(sellOrders.length).fill(false)
      );

  } , [sellOrders]);



  // confirm payment check box
  const [confirmPaymentCheck, setConfirmPaymentCheck] = useState([] as boolean[]);
  useEffect(() => {
      
      setConfirmPaymentCheck(
        new Array(sellOrders.length).fill(false)
      );

  } , [sellOrders]);



  const confirmPayment = async (

    index: number,
    orderId: string,

  ) => {
    // confirm payment
    // send usdt to buyer wallet address

    if (confirmingPayment[index]) {
      return;
    }

    setConfirmingPayment(
      confirmingPayment.map((item, idx) => {
        if (idx === index) {
          return true;
        }
        return item;
      })
    );



    const response = await fetch('/api/order/confirmPayment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        lang: params.lang,
        chain: params.chain,
        orderId: orderId,
      })
    });

    const data = await response.json();

    //console.log('data', data);

    if (data.result) {

      const response = await fetch('/api/order/getOneSellOrder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          orderId: orderId,
        })
      });

      const data = await response.json();

      ///console.log('data', data);

      if (data.result) {
        setSellOrders(data.result.orders);
      }

      toast.success('Payment has been confirmed');
    } else {
      toast.error('Payment has been failed');
    }

    setConfirmingPayment(
      confirmingPayment.map((item, idx) => {
        if (idx === index) {
          return false;
        }
        return item;
      })
    );



  }





    
    return (

      <main className="p-4 pb-10 min-h-[100vh] flex items-start justify-center container
        max-w-screen-lg
        mx-auto">

        <div className="py-0  w-full">
  
          {/* goto home button using go back icon
          history back
          */}

          <AppBarComponent />
  
          <div className="mt-4 w-full flex flex-row gap-5 justify-center mb-10">
              {/* history back */}
              {/* if you want to go back to the previous page */}

              <button
                  onClick={() =>
                      router.push('/' + params.lang + '/' + params.chain)
                  }
                  className="text-zinc-100 font-semibold underline"
              >
                {Go_Home}
              </button>
              <button
                onClick={() => router.push('/' + params.lang + '/' + params.chain + '/buy-usdt')}
                className="text-zinc-100 font-semibold underline"
              >
        
                {Go_Buy_USDT}
              </button>
              {/* Go to Sell USDT */}
              {/*
              <button
                  onClick={() => router.push('/' + params.lang + '/' + params.chain + '/sell-usdt')}
                  className="text-zinc-100 font-semibold underline"
              >
                {Go_Sell_USDT}
              </button>
              */}
          </div>

          {address ? (
            <div className="flex flex-col items-center space-y-4 mb-4">
              {/* disconnect button */}
              
              <button
                onClick={() => {

                  activeWallet?.disconnect();

                    
                    
                  window.location.reload();

                }}
                className="text-lg bg-red-500 text-white px-4 py-2 rounded-md"
              >
                {Disconnect_Wallet}
              </button>
              
            </div>

          ) : (
            <div className="flex flex-col items-center space-y-4 mb-4">


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


                <span className="text-lg text-zinc-400 xl:w-1/2 text-center">
                  {Connect_Wallet_Description_For_Buyers}
                </span>



            </div>

          )}



                {address && (
                  <div className="w-full flex flex-row items-start justify-between gap-2">
                    
                    {/* my usdt balance */}
                    <div className='w-full flex flex-row items-between justify-start gap-5'>

                      <div className=" flex flex-col gap-2 items-start">
                        <div className="text-5xl font-semibold text-white">
                          {Number(balance).toFixed(2)} <span className="text-lg">USDT</span>
                        </div>
                      </div>

                      <div className="flex flex-row gap-2 items-center justify-center">
                        
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

                      
                            {user?.seller && (
                              <div className="flex flex-row items-center gap-2">
                                <Image
                                  src="/verified.png"
                                  alt="Verified"
                                  width={24}
                                  height={24}
                                />
                                <Image
                                  src="/best-seller.png"
                                  alt="Best Seller"
                                  width={24}
                                  height={24}
                                />
                              </div>
                            )}

                       
                      </div>
                    </div>




                  </div>
                )}




              <div className="mt-4 w-full flex flex-col gap-5 xl:flex-row items-start justify-center ">


                <div className="w-full mb-10 grid grid-cols-1 gap-4  justify-center  ">

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



                        <div className=" w-full flex flex-col gap-2 items-center justify-start">


                          {address && item.buyer && item.buyer.walletAddress === address && (
                            <div className="w-full flex flex-row items-center justify-between">
                              
                              <div className='flex flex-row items-center gap-2'>

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


                                <h2 className="text-lg font-semibold">
                                    {Seller}: {

                                        item.walletAddress === address ? item.nickname ? item.nickname : Anonymous  + ' :' + Me :
                                        
                                        item.nickname ? item.nickname : Anonymous

                                    }
                                </h2>

                                <Image
                                    src="/verified.png"
                                    alt="Verified"
                                    width={24}
                                    height={24}
                                />

                                <Image
                                  src='/best-seller.png'
                                  alt='Best Seller'
                                  width={24}
                                  height={24}
                                />

                              </div>



                              {/* reload button */}
                              <button
                                disabled={loadingOneSellOrder}
                                className={`flex flex-row gap-1 text-sm text-white px-2 py-1 rounded-md ${loadingOneSellOrder ? 'bg-gray-500' : 'bg-green-500'}`}
                                onClick={
                                  () => {
                                    fetchOneSellOrder();
                                  }
                                }
                              >
                                <Image
                                  src="/loading.png"
                                  alt="loading"
                                  width={16}
                                  height={16}
                                  className={loadingOneSellOrder ? 'animate-spin' : 'hidden'}
                                />
                                <span>{Reload}</span>
                              </button>


                            </div>
                          )}

                          {/* byer information */}
                          {address && item.walletAddress === address && (
                            <div className="w-full flex flex-row items-center justify-start">
                              <div className='flex flex-row items-center gap-2'>

                                <Image
                                    src={item.buyer?.avatar || '/profile-default.png'}
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

                                <h2 className="text-lg font-semibold">
                                    {Buyer}: {
                                        item.buyer?.nickname ? item.buyer?.nickname : Anonymous
                                    }
                                </h2>

                                <Image
                                    src="/verified.png"
                                    alt="Verified"
                                    width={24}
                                    height={24}

                                />

                                <Image
                                  src='/icon-buyer.png'
                                  alt='Best Buyer'
                                  width={24}
                                  height={24}

                                />

                              </div>
       
                            </div>


                          )}




                          <article
                              className={`w-full bg-black p-4 rounded-md border
                                
                                ${item.walletAddress === address ? 'border-green-500' : 'border-gray-200'}

                                ${item.status === 'paymentConfirmed' ? 'bg-gray-900 border-gray-900' : ''}

                                w-96 `
                              }
                          >

                              {item.status === 'ordered' && (
                                <div className=" flex flex-col items-start justify-start gap-1">


                                  <div className="flex flex-row items-center gap-2">
                                    {/* new order icon */}
                                    {
                                      (new Date(item.createdAt).getTime() - new Date().getTime()) / 1000 / 60 / 60 < 24 && (
                                        <Image
                                          src="/icon-new.png"
                                          alt="New Order"
                                          width={32}
                                          height={32}
                                        />
                                      )
                                    } 



                                    {item.privateSale ? (
                                        <Image
                                          src="/icon-private-sale.png"
                                          alt="Private Sale"
                                          width={32}
                                          height={32}
                                        />
                                    ) : (
                                        <Image
                                          src="/icon-public-sale.png"
                                          alt="Public Sale"
                                          width={32}
                                          height={32}
                                        />
                                    )}

                                    
                                    {/* Expired in 24 hours */}
                                    <p className=" text-sm text-zinc-400">
                                      Expired in {24 - Math.floor((new Date().getTime() - new Date(item.createdAt).getTime()) / 1000 / 60 / 60)} {hours}
                                    </p>

                                  </div>

                                  <p className="mb-4 text-sm text-zinc-400">
                                    Opened at {
                                      new Date(item.createdAt).toLocaleDateString() + ' ' + new Date(item.createdAt).toLocaleTimeString()
                                    }
                                  </p>

                                </div>
                              )}


                              { (item.status === 'accepted' || item.status === 'paymentRequested' || item.status === 'paymentConfirmed') && (

                                <div className='flex flex-row items-center gap-2 bg-white px-2 py-3 rounded-md mb-4'>

                                  {item.status === 'accepted' || item.status === 'paymentRequested' && (
                                    <Image
                                      src='/icon-trade.png'
                                      alt='Trade'
                                      width={32}
                                      height={32}
                                    />
                                  )}

                                  <p className=" text-xl font-semibold text-green-500 ">
                                    {TID}: {item.tradeId}
                                  </p>



                                  {item.status === 'paymentConfirmed' && (

                                    <div className='flex flex-row items-end gap-2'>
                                      <Image
                                        src='/confirmed.png'
                                        alt='Confirmed'
                                        width={80}
                                        height={12}
                                      />
                                    </div>

                                  )}

                                  
                                </div>

                              )}

                              {item.acceptedAt && (

                                <div className='flex flex-col items-start gap-2 mb-2'>



                                  <div className='flex flex-row items-center gap-2'>
                                
                                    {item.privateSale ? (
                                      <Image
                                        src='/icon-private-sale.png'
                                        alt='Private Sale'
                                        width={32}
                                        height={32}
                                      />
                                    ) : (
                                      <Image
                                        src='/icon-public-sale.png'
                                        alt='Public Sale'
                                        width={32}
                                        height={32}
                                      /> 
                                    )}
                                    <p className="text-sm text-zinc-400">
                                      Order opened at {new Date(item.createdAt).toLocaleString()}
                                    </p>
                                  </div>


                                  <div className='flex flex-row items-center gap-2'>
                                    <div className={
                                      ` ml-4 mr-3 bg-green-500 w-1 h-[20px]
                                      rounded-full`
                                    }></div>

                                    {/* difference minutes between payment confirmed and trade started */}
                                    <div className='flex flex-row items-center gap-2'>

                                      <Image
                                        src='/timer.png'
                                        alt='Timer'
                                        width={32}
                                        height={32}
                                      />
                                      <div className="text-sm text-green-500">
                                        {
                                          ( (new Date(item.acceptedAt).getTime() - new Date(item.createdAt).getTime()) / 1000 / 60 ).toFixed(0)
                                        } {minutes}
                                      </div>
                                    </div>

                                  </div>


                                


                                  <div className='flex flex-row items-center gap-2'>

                                    <Image
                                      src='/icon-trade.png'
                                      alt='Trade'
                                      width={32}
                                      height={32}
                                    />

                                    <p className="text-sm text-zinc-400">
                                      Trade started at {new Date(item.acceptedAt).toLocaleDateString() + ' ' + new Date(item.acceptedAt).toLocaleTimeString()}
                                    </p>
                                  </div>

                                </div>

                              )}

                              {item.status === 'paymentConfirmed' && (

                                <div className='flex flex-col items-start gap-2 mb-4'>

                                  {/* vertical line of height for time between trade started  and payment confirmed */}

                                  <div className='flex flex-row items-center gap-2'>
                                    <div className={
                                      ` ml-4 mr-3 bg-green-500 w-1 h-[20px]
                                      rounded-full`
                                    }></div>

                                    {/* difference minutes between payment confirmed and trade started */}
                                    <div className='flex flex-row items-center gap-2'>

                                      <Image
                                        src='/timer.png'
                                        alt='Timer'
                                        width={32}
                                        height={32}
                                      />
                                      <div className="text-sm text-green-500">
                                        { ( (new Date(item.paymentConfirmedAt).getTime() - new Date(item.acceptedAt).getTime()) / 1000 / 60 ).toFixed(0) } {minutes}
                                      </div>
                                    </div>

                                  </div>

                                  <div className='flex flex-row items-center gap-2 mb-4'>
                                    

                                    <Image
                                      src='/icon-completed.png'
                                      alt='Completed'
                                      width={32}
                                      height={32}
                                    />
                                    <p className="text-sm text-zinc-400">
                                      Completed at {new Date(item.paymentConfirmedAt).toLocaleDateString() + ' ' + new Date(item.paymentConfirmedAt).toLocaleTimeString()}
                                    </p>
                                  </div>

                                </div>



                              )}


                              <div className="mt-4 flex flex-col items-start">

                                <p className="text-2xl text-zinc-400">
                                  {Price}: {
                                    // currency
                                  
                                    Number(item.krwAmount).toLocaleString('ko-KR', {
                                      style: 'currency',
                                      currency: 'KRW',
                                    })

                                  }
                                </p>


                                <div className="mt-2 flex flex-row items-between space-x-2">


                                  <p className="text-lg font-semibold text-white">{item.usdtAmount} USDT</p>
                                  <p className="text-lg font-semibold text-white">{Rate}: {

                                    Number(item.krwAmount / item.usdtAmount).toFixed(2)

                                  }</p>
                                </div>

                              </div>


                            


                              <p className="mt-4 text-sm text-zinc-400">{Payment}: {Bank_Transfer} ({item.seller?.bankInfo.bankName})</p>                         


                           


                              {/* share button */}
                              {/*

                                <div className='flex flex-row items-center justify-end gap-2'>
                                  <button
                                      className="flex text-sm bg-blue-500 text-white px-2 py-1 rounded-md"
                                      onClick={() => {
                                        
                                        //router.push(`/sell-usdt/${item._id}`);

                                        // copy link to clipboard
                                        navigator.clipboard.writeText(`https://gold.goodtether.com/${params.lang}/sell-usdt/${item._id}`);
                                        toast.success('Link has been copied');

                                      }}
                                  >
                                    <Image
                                      src="/icon-share.png"
                                      alt="Share"
                                      width={16}
                                      height={16}
                                      className='mr-2'
                                    />
                                    Share
                                  </button>
                                </div>
                                */}
                              



                              {/* waiting for escrow */}
                              {address && item.walletAddress !== address && item.status === 'accepted' && (
                                  <div className="mt-10 mb-10 flex flex-row gap-2 items-center justify-start">

                                    {/* rotate loading icon */}
                                  
                                    <Image
                                      src="/loading.png"
                                      alt="Escrow"
                                      width={32}
                                      height={32}
                                      className="animate-spin"
                                    />

                                    <span>
                                      {Waiting_for_seller_to_deposit}
                                      {' '}{item.usdtAmount} USDT
                                      {' '}{to_escrow}....
                                    </span>




                                  </div>

                              )}





                              {
                                address && item.walletAddress === address &&  item.status === 'accepted' && (

                                <div className="w-full mt-2 mb-2 flex flex-col items-start ">


                                {escrowing[index] && (

                                  <div className="flex flex-col gap-2">
                                    
                                    <div className="flex flex-row items-center gap-2">
                                      <Image
                                          src='/loading.png'
                                          alt='loading'
                                          width={32}
                                          height={32}
                                          className="animate-spin"
                                      />
                                      <div className="text-lg font-semibold text-white">
                                        Escrowing {item.usdtAmount} USDT...
                                      </div>
                                    </div>

                                  </div>

                                )}


                                {escrowing[index] === false && requestingPayment[index] === true && (
                                  <div className="flex flex-col gpa-2">
                                    {Escrow} {item.usdtAmount} USDT to the smart contract has been completed.
                                  </div>
                                )}


                                {requestingPayment[index] && (

                                  <div className="p-2 flex flex-col gap-2">
                                    
                                    <div className="flex flex-row items-center gap-2">
                                      <Image
                                          src='/loading.png'
                                          alt='loading'
                                          width={50}
                                          height={50}
                                          className="animate-spin"
                                      />
                                      <div className="text-lg font-semibold text-white">
                                        {Requesting_Payment}...
                                      </div>
                                    </div>

                                  </div>

                                )}


                                <div className="mt-5 flex flex-row items-center gap-2">
                                  {/* dot */}
                                  <div  className="w-2 h-2 rounded-full bg-green-500"></div>

                                  <div className="text-sm text-zinc-400">
                                    {/*
                                    If you request payment, the {item.usdtAmount} USDT will be escrowed to the smart contract and then the buyer ( {item.buyer.nickname} ) will be requested to pay.
                                    */}

                                    {If_you_request_payment}
                                  </div>
                                </div>

                                <div className="mt-5 flex flex-row items-center gap-2">
                                    
                                    <div className="flex flex-row items-center gap-2">
                                      <input
                                          type="checkbox"
                                          checked={requestPaymentCheck[index]}
                                          onChange={(e) => {
                                            setRequestPaymentCheck(
                                              requestPaymentCheck.map((item, idx) => {
                                                if (idx === index) {
                                                  return e.target.checked;
                                                }
                                                return item;
                                              })
                                            );
                                          }}
                                          className=" w-6 h-6 rounded-md border border-gray-200"
                                      />
                                    </div>
                                    <div className="text-sm text-zinc-400">
                                      {/*
                                      I agree to escrow {item.usdtAmount} USDT to the smart contract and request payment to the buyer ( {item.buyer.nickname} )
                                      */}

                                        {I_agree_to_escrow_USDT}

                                    </div>
                                </div>



                                <div className="mt-4 flex flex-col gap-2 text-sm text-left text-white">
                                  <div className='flex flex-row items-center gap-2'>
                                    {/* dot */}
                                    <div  className="w-2 h-2 rounded-full bg-green-500"></div>
                                    <span>
                                      {Bank_Transfer} {Deposit_Information}
                                    </span>
                                  </div>
                                  <ul>
                                    <li>
                                      {item.seller?.bankInfo.bankName} {item.seller?.bankInfo.accountNumber} {item.seller?.bankInfo.accountHolder}
                                    </li>
                                    <li>{Deposit_Amount} : {item.krwAmount} KRW</li>
                                    <li>{Deposit_Name} : {

                                      item.buyer?.depositName ? item.buyer?.depositName : item.tradeId
                                    
                                    }</li>
                                  </ul>
                                </div>


                                <button
                                    disabled={
                                      balance < item.usdtAmount || requestingPayment[index] || escrowing[index]
                                      || !requestPaymentCheck[index]
                                    }
                                    className={`w-full text-lg
                                      ${balance < item.usdtAmount ? 'bg-red-500' : 'bg-blue-500'}

                                      ${requestPaymentCheck[index] ? 'bg-green-500' : 'bg-gray-500'}
                                      
                                    text-white px-4 py-2 rounded-md mt-4`}

                                    onClick={() => {
                                        //console.log('request Payment');
                                        
                                        ///router.push(`/chat?tradeId=12345`);

                                        requstPayment(
                                          index,
                                          item._id,
                                          item.tradeId,
                                          item.usdtAmount,
                                        );

                                    }}
                                  >



                                  {balance < item.usdtAmount ? (

                                    <div className="flex flex-col gap-2">
                                      <div className="flex flex-row items-center gap-2">
                                        <GearSetupIcon />
                                        <div className="text-lg font-semibold">
                                        {Request_Payment}
                                        </div>
                                      </div>

                                      <div className="text-lg text-white">
                                        Insufficient Balance
                                      </div>
                                      <div className="text-lg text-white">
                                        You need {item.usdtAmount} USDT
                                      </div>
                                      <div className="text-lg text-white">
                                        You have {balance} USDT
                                      </div>
                                      <div className="text-lg text-white">
                                        Please top up your balance by depositing {item.usdtAmount - balance} USDT
                                      </div>
                                      <div className="text-lg text-white">
                                        Your wallet address is
                                      </div>
                                      <div className="text-xs text-white">
                                        {address.substring(0, 10)}...{address.substring(address.length - 10, address.length)}
                                        
                                      </div>
                                      <div className="text-xs text-white">
                                      
                                        <button
                                            onClick={() => {
                                                navigator.clipboard.writeText(address);
                                                toast.success('Address has been copied');
                                            }}
                                        className="text-xs bg-green-500 text-white px-2 py-1 rounded-md">Copy</button>
                                      </div>
                                    </div>

                                  ) : (

                                    <div className="flex flex-col gap-2">

                                      <div className="flex flex-row items-center gap-2">
                                        

                                        {requestingPayment[index] || escrowing[index] ? (
                                          <Image
                                            src='/loading.png'
                                            alt='loading'
                                            width={32}
                                            height={32}
                                            className="animate-spin"
                                          />
                                        ) : (
                                          <GearSetupIcon />
                                        )}


                                        <div className="text-lg font-semibold">
                                        {Request_Payment}
                                        </div>
                                      </div>


                                    </div>
                                  )}


                                </button>

                                </div>


                              )}


                              


                              {item.status === 'ordered' && (
                                <>

                                {acceptingSellOrder[index] ? (

                                  <div className="flex flex-row items-center gap-2">
                                    <Image
                                      src='/loading.png'
                                      alt='loading'
                                      width={38}
                                      height={38}
                                      className="animate-spin"
                                    />
                                    <div>Accepting...</div>
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
                                          
                                          <Image
                                            src="/icon-expired.png"
                                            alt="Expired"
                                            width={80}
                                            height={80}
                                          />
                                        
                                        ) : (

                                          <div className='mt-4 flex flex-col items-center gap-2'>


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



                                          
                                            <button
                                            disabled={!user || !agreementForTrade[index]}
                                            className={`text-lg text-white px-4 py-2 rounded-md
                                              ${!user || !agreementForTrade[index] ? 'bg-zinc-800' : 'bg-green-500 hover:bg-green-600'}
                                              `}

                                              onClick={() => {

                                                  acceptSellOrder(index, item._id);
                                            

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



                              {/* bank transfer infomation */}
                              {item.status === 'paymentRequested' && (

                                <div className="mt-4 mb-10 flex flex-col items-start gap-2">

                                  {/* escrow infomation */}
                                  <div className='flex flex-row items-center gap-2'>

                                    <Image
                                      src='/smart-contract.png'
                                      alt='Escrow'
                                      width={32}
                                      height={32}
                                    />

                                    <div className="text-lg font-semibold text-green-500">
                                      {Escrow}: {item.usdtAmount} USDT
                                    </div>

                                    {/* polygon icon to go to polygon scan */}
                                    <button
                                      className="text-sm bg-green-500 text-white px-2 py-1 rounded-md"
                                      onClick={() => {
                                        {
                                          params.chain === 'polygon' ?
                                          window.open(`https://polygonscan.com/token/${contractAddress}?a=${item.walletAddress}`, '_blank')

                                          : params.chain === 'arbitrum' ?

                                          window.open(`https://explorer.arbitrum.io/token/${contractAddressArbitrum}?a=${item.walletAddress}`, '_blank')

                                          : window.open(`https://polygonscan.com/token/${contractAddress}?a=${item.walletAddress}`, '_blank')

                                        }
                                      }}
                                    >
                                      <Image
                                        src={params.chain === 'polygon' ? '/logo-polygon.png' : '/logo-arbitrum.png'}
                                        alt="Chain"
                                        width={24}
                                        height={24}
                                      />
                                    </button>


                                  </div>


                                  <div className='flex flex-row items-center gap-2'>
                                    <Image
                                      src='/icon-bank.png'
                                      alt='Bank'
                                      width={32}
                                      height={32}
                                    />
                                    <div className="text-lg font-semibold text-green-500">
                                      {Bank_Transfer}
                                    </div>
                                  </div>

                                


                                  {address && (item.walletAddress === address || item.buyer?.walletAddress === address ) && (
                                    <>
                                      <div className='flex flex-row items-center gap-2'>
                                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                        <div className="text-sm ">
                                        {item.seller?.bankInfo.bankName}{' '}{item.seller?.bankInfo.accountNumber}{' '}{item.seller?.bankInfo.accountHolder}
                                        </div>
                                      </div>


                                      <div className='flex flex-row items-center gap-2'>
                                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                        <div className="text-sm">
                                          {Deposit_Name}: {
                                            item.buyer?.depositName ? item.buyer?.depositName : item.tradeId
                                          }
                                        </div>
                                      </div>

                                      <div className='flex flex-row items-center gap-2'>
                                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                        <div className="text-sm">
                                          {Deposit_Amount}: {
                                            item.krwAmount.toLocaleString('ko-KR', {
                                              style: 'currency',
                                              currency: 'KRW'
                                            })
                                          }
                                        </div>
                                      </div>

                                    </>

                                  )}




                                  <div className='flex flex-row items-center gap-2'>
                                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                    <div className="text-sm">
                                      {Deposit_Deadline}: {
                                      
                                        new Date(new Date(item.paymentRequestedAt).getTime() + 1000 * 60 * 60 * 1).toLocaleString()
                                      
                                      }
                                    </div>
                                  </div>


                                  {/* waiting for receive USDT */}

                                  {!address && (
                                
                                    <div className="mt-4 flex flex-row gap-2 items-center justify-start">

                                      {/* rotate loading icon */}
                                    
                                      <Image
                                        src="/loading.png"
                                        alt="Escrow"
                                        width={32}
                                        height={32}
                                        className="animate-spin"
                                      />

                                      <div>{Waiting_for_seller_to_confirm_payment}...</div>

                                    </div>
                                    
                                  )}  

                                </div>
                              )}








                              {address && item.walletAddress === address && item.status === 'paymentRequested' && (

                              <div className="w-full mt-4 mb-2 flex flex-col items-start ">


                                
                                
                                <div className="w-full flex flex-col items-start gap-2">

                                  {/*
                                  <div className="flex flex-row items-center gap-2">

                                    <Image
                                      src='/smart-contract.png'
                                      alt='smart-contract'
                                      width={32}
                                      height={32}
                                    />

                                    <span className="textlg text-white">
                                      Escrow: {item.usdtAmount} USDT
                                    </span>

                                    <button
                                        className="ml-5 text-sm bg-white text-white px-2 py-1 rounded-md"
                                        onClick={() => {
                                            //console.log('Cancel Payment Request');
                                            // new window

                                            window.open(`https://polygonscan.com/token/0xc2132d05d31c914a87c6611c10748aeb04b58e8f?a=0x2111b6A49CbFf1C8Cc39d13250eF6bd4e1B59cF6`, '_blank');
                                        }}
                                    >
                                      <Image
                                        src='/logo-polygon.png'
                                        alt='cancel'
                                        width={20}
                                        height={20}
                                      />
                                    </button>


                                  </div>
                                  */}




                                
                                  { 
                                    item.status === 'paymentRequested'
                                    && requestingPayment[index]
                                    && confirmingPayment[index] === false
                                    && (

                                    <div className="flex flex-col gap-2">
                                      
                                      <div className="flex flex-row items-center gap-2">
                                        <Image
                                            src='/loading.png'
                                            alt='loading'
                                            width={32}
                                            height={32}
                                            className="animate-spin"
                                        />
                                        <div className="text-lg font-semibold text-white">
                                          
                                          {Checking_the_bank_transfer_from_the_buyer} ( {
                                            item.buyer.nickname ? item.buyer.nickname : Anonymous
                                          } )...


                                        </div>
                                      </div>

                                    </div>

                                  )}


                                  {/*
                                  <div className="mt-5 flex flex-row items-center gap-2">
                                    <div  className="flex w-2 h-2 rounded-full bg-green-500"></div>

                                    <div className="text-sm text-zinc-400">
                                      If you confirm the payment, the escrowed {item.usdtAmount} USDT will be transferred to the buyer ( {item.buyer.nickname} ) wallet address.
                                    </div>
                                  </div>
                                  */}

                                  {/* check box for confirming payment */}

                                  <div className="flex flex-row items-center gap-2">

                                    <div className="flex flex-row items-center gap-2">
                                      <input
                                          type="checkbox"
                                          checked={confirmPaymentCheck[index]}
                                          onChange={(e) => {
                                            setConfirmPaymentCheck(
                                              confirmPaymentCheck.map((item, idx) => {
                                                if (idx === index) {
                                                  return e.target.checked;
                                                }
                                                return item;
                                              })
                                            );
                                          }}
                                          className=" w-6 h-6 rounded-md border border-gray-200"
                                      />
                                    </div>

                                    <span className="text-sm text-zinc-400">
                                      {/*
                                      I agree to check the bank transfer of {
                                      item.krwAmount.toLocaleString('ko-KR', {
                                        style: 'currency',
                                        currency: 'KRW',
                                      })} from buyer ( {item.buyer.nickname} ) and transfer {item.usdtAmount} USDT to the buyer wallet address.
                                      */}



                                      {I_agree_to_check_the_bank_transfer_of}


                                    </span>

                                  </div>




                                </div>
                                  


                                {confirmingPayment[index] ? (

                                  <div className="p-2 flex flex-row items-center gap-2">

                                    <Image
                                        src='/loading.png'
                                        alt='loading'
                                        width={32}
                                        height={32}
                                        className="animate-spin"
                                    />
                                    <div className="text-lg font-semibold text-white">

                                      {/*
                                      Transfering {item.usdtAmount} USDT to the buyer ( {item.buyer.nickname} ) wallet address...
                                      */}
                                      {Transfering_USDT_to_the_buyer_wallet_address}...
                                  
                                    </div>
                                  </div>

                                ) : (

                                    <button
                                        disabled={
                                          confirmingPayment[index]
                                          || !confirmPaymentCheck[index]
                                      }
                                        className={`w-full text-lg
                                          ${confirmPaymentCheck[index] ? 'bg-green-500' : 'bg-gray-500'}
                                          text-white px-4 py-2 rounded-md mt-4`}
                                        onClick={() => {
                                            console.log('Canfirm Payment');

                                            //toast.success('Payment has been confirmed');

                                            confirmPayment(index, item._id);
                                            
                                        }}
                                    >
                                      {Confirm_Payment}
                                    </button>
                                  
                                  )}


                              </div>


                              )}


                              {/* buyer mobile number */}
                              {address && item.buyer?.walletAddress === address && (
                                <div className="mt-4 flex flex-row items-center gap-2">
                                  <div className="text-lg font-semibold text-green-500">
                                    SMS: {item.buyer?.mobile}
                                  </div>
                                </div>
                              )}


                          </article>


                        </div>







                      
                      </div>


                    ))}

                </div>

                {orderId && address && user && user.nickname && user.avatar && (
                  <div className=' w-full '>
                    <Chat

                      channel={orderId}

                      userId={ user.nickname }

                      nickname={ user.nickname }

                      profileUrl={ user.avatar }
                    />
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



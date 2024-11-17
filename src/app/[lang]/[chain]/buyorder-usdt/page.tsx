'use client';

import { useState, useEffect, use } from "react";



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


import Image from 'next/image';

import GearSetupIcon from "@/components/gearSetupIcon";


import Uploader from '@/components/uploader';

import { balanceOf, transfer } from "thirdweb/extensions/erc20";
 






// open modal

import Modal from '@/components/modal';

import {
  useRouter,
  useSearchParams,
}from "next//navigation";

import { it } from "node:test";


import AppBarComponent from "@/components/Appbar/AppBar";
import { getDictionary } from "../../../dictionaries";
import { IncomingPhoneNumberContextImpl } from "twilio/lib/rest/api/v2010/account/incomingPhoneNumber";
import { add } from "thirdweb/extensions/farcaster/keyGateway";




interface SellOrder {
  _id: string;
  createdAt: string;
  nickname: string;
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

  cancelledAt: string;

  paymentConfirmedAt: string;
  escrowTransactionHash: string;

  tradeId: string;

  buyer: any;

  privateSale: boolean;
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




export default function Index({ params }: any) {

  //console.log('params', params);

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

    Order: "",
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
    Sell_USDT: "",  
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

    Sale: "",
    Private_Sale: "",

    Place_Order: "",

    Search_my_orders: "",

    Go_Sell_USDT: "",

    Cancel_My_Order: "",


    Order_has_been_placed: "",


    Placing_Order: "",

    hours_ago: "",
    minutes_ago: "",
    seconds_ago: "",

    SMS_will_be_sent_to_your_mobile_number: "",

    Profile : "",
    My_Profile_Picture : "",

    Edit : "",

    Escrow: "",

    TID: "",

    Chat_with_Buyer: "",

    Table_View: "",
    Started_at: "",
    Trading_Time_is: "",
    Memo: "",
    Buy_Amount: "",
    Status: "",
    Payment_Amount: "",

    hours: "",
    minutes: "",
    seconds: "",

    Opened: "",
    Completed: "",
    Cancelled: "",

    Deposit_Name: "",

    Request_Payment: "",

    Waiting_for_seller_to_confirm_payment: "",

    Confirm_Payment: "",

    Escrow_Completed: "",

    Payment_request_has_been_sent: "",

    Payment_has_been_confirmed: "",

    Reload: "",

    Insufficient_balance: "",


    Private_Buy_Order: "",

    Buy_Order_USDT: "",

    Buy_Order_SMS_will_be_sent_to_your_mobile_number: "",

    Buy_Orders: "",

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

    Order,
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
    Sell_USDT,
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

    Sale,
    Private_Sale,

    Place_Order,

    Search_my_orders,

    Go_Sell_USDT,

    Cancel_My_Order,

    Order_has_been_placed,

    Placing_Order,

    hours_ago,
    minutes_ago,
    seconds_ago,

    SMS_will_be_sent_to_your_mobile_number,

    Profile,
    My_Profile_Picture,

    Edit,

    Escrow,

    TID,

    Chat_with_Buyer,

    Table_View,
    Started_at,
    Trading_Time_is,
    Memo,
    Buy_Amount,
    Status,
    Payment_Amount,

    hours,
    minutes,
    seconds,

    Opened,
    Completed,
    Cancelled,

    Deposit_Name,

    Request_Payment,

    
    Waiting_for_seller_to_confirm_payment,

    Confirm_Payment,

    Escrow_Completed,

    Payment_request_has_been_sent,

    Payment_has_been_confirmed,

    Reload,

    Insufficient_balance,

    Private_Buy_Order,

    Buy_Order_USDT,

    Buy_Order_SMS_will_be_sent_to_your_mobile_number,

    Buy_Orders,

    My_Balance,

    Anonymous,

  } = data;






    const router = useRouter();

    const activeAccount = useActiveAccount();

    const address = activeAccount?.address;
  
  


    const [rate, setRate] = useState(1350);



    const [usdtPrice, setUsdtPrice] = useState(0);
    useEffect(() => {

        if (!address) {
            return;
        }

        const fetchData = async () => {

            const response = await fetch("/api/order/getPrice", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    walletAddress: "0x91CA2566C3345026647aBbACB56093144eAA4c16",
                }),
            });

            const data = await response.json();

            ///console.log("getPrice data", data);

            if (data.result) {
                setUsdtPrice(data.result.usdtPrice);

                setRate(data.result.usdtPrice);
            }

        };

        fetchData();
    }

    , []);






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
          isSmartAccount: false,
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










    
    const [buyOrders, setBuyOrders] = useState<SellOrder[]>([]);

    const [searchMyOrders, setSearchMyOrders] = useState(true);


    const [loadingFetchSellOrders, setLoadingFetchSellOrders] = useState(false);

    const fetchBuyOrders = async () => {

      if (!address) {
        return;
      }

      setLoadingFetchSellOrders(true);

      // api call
      const response = await fetch('/api/order/getAllBuyOrders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          lang: params.lang,
          chain: params.chain,
          walletAddress: address,
          searchMyOrders: searchMyOrders
        })
      });

      const data = await response.json();

      
      //console.log('data', data);



      if (data.result) {
        setBuyOrders(data.result.orders);
      }

      setLoadingFetchSellOrders(false);

    };




    useEffect(() => {

        /*
        if (!address) {
          return;
        }
          */
        

  
        fetchBuyOrders();

        // fetch sell orders every 10 seconds
        /*
        const interval = setInterval(() => {
          fetchBuyOrders();
        }, 10000);

        return () => clearInterval(interval);
        */
  
    }, [address, searchMyOrders, params.lang, params.chain]);





    const [isModalOpen, setModalOpen] = useState(false);

    const closeModal = () => setModalOpen(false);
    const openModal = () => setModalOpen(true);

    const goChat = () => {
        console.log('Go Chat');
        router.push(`/chat?tradeId=12345`);
    }


    const [usdtAmount, setUsdtAmount] = useState(0);

    const [defaultKrWAmount, setDefaultKrwAmount] = useState(0);

    const [krwAmount, setKrwAmount] = useState(0);

    console.log('usdtAmount', usdtAmount);


 

    useEffect(() => {

      if (usdtAmount === 0) {

        setDefaultKrwAmount(0);

        setKrwAmount(0);

        return;
      }
    
        
      setDefaultKrwAmount( Math.round(usdtAmount * rate) );


      setKrwAmount( Math.round(usdtAmount * rate) );

    } , [usdtAmount, rate]);



    const [privateBuyOrder, setprivateBuyOrder] = useState(false);


    const [buyOrdering, setBuyOrdering] = useState(false);

    const [agreementPlaceOrder, setAgreementPlaceOrder] = useState(false);




    // check input krw amount at sell order
    const [checkInputKrwAmount, setCheckInputKrwAmount] = useState(true);



    const buyOrder = async () => {
      // api call
      // set sell order

      if (buyOrdering) {
        return;
      }



      


      if (agreementPlaceOrder === false) {
        toast.error('You must agree to the terms and conditions');
        return;
      }


      setBuyOrdering(true);


      let orderUsdtAmount = usdtAmount;

      if (checkInputKrwAmount) {
        orderUsdtAmount = parseFloat(Number(krwAmount / rate).toFixed(2));
      }
      

      const response = await fetch('/api/order/setBuyOrder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          lang: params.lang,
          chain: params.chain,
          walletAddress: address,
          usdtAmount: orderUsdtAmount,
          krwAmount: krwAmount,
          rate: rate,
          privateSale: privateBuyOrder,
        })
      });

      const data = await response.json();

      //console.log('data', data);

      if (data.result) {
        toast.success(
          Order_has_been_placed
        );

        setUsdtAmount(0);
        setprivateBuyOrder(false);

        setAgreementPlaceOrder(false);
     


        await fetch('/api/order/getAllBuyOrders', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            lang: params.lang,
            chain: params.chain,
            walletAddress: address,
            searchMyOrders: searchMyOrders
          })
        }).then(async (response) => {
          const data = await response.json();
          //console.log('data', data);
          if (data.result) {
            setBuyOrders(data.result.orders);
          }
        });


  


      } else {
        toast.error('Order has been failed');
      }

      setBuyOrdering(false);

      

    };


    // cancel sell order state
    const [cancellings, setCancellings] = useState([] as boolean[]);
    useEffect(() => {
      setCancellings(buyOrders.map(() => false));
    }, [buyOrders]);



    const cancelBuyOrder = async (orderId: string, index: number) => {

      if (cancellings[index]) {
        return;
      }

      setCancellings(cancellings.map((item, i) => i === index ? true : item));

      const response = await fetch('/api/order/cancelBuyOrder', {
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


        fetchBuyOrders();


      } else {
        toast.error('Order has been failed');
      }

      setCancellings(cancellings.map((item, i) => i === index ? false : item));

    }







    // request payment check box
    const [requestPaymentCheck, setRequestPaymentCheck] = useState([] as boolean[]);
    useEffect(() => {
        
        setRequestPaymentCheck(
          new Array(buyOrders.length).fill(false)
        );
  
    } , [buyOrders]);
    




    // array of escrowing
    const [escrowing, setEscrowing] = useState([] as boolean[]);

    useEffect(() => {
        
        setEscrowing(
          new Array(buyOrders.length).fill(false)
        );
  
    } , [buyOrders]);





    // array of requestingPayment
    const [requestingPayment, setRequestingPayment] = useState([] as boolean[]);

    useEffect(() => {

      setRequestingPayment(

        new Array(buyOrders.length).fill(false)

      );

    } , [buyOrders]);




    const requestPayment = async (
      index: number,
      orderId: string,
      tradeId: string,
      amount: number,
    ) => {
      // check balance
      // send payment request

      if (balance < amount) {
        toast.error(Insufficient_balance);
        return;
      }


      // check all escrowing is false
      if (escrowing.some((item) => item === true)) {
        toast.error('Escrowing');
        return;
      }

      // check all requestingPayment is false
      if (requestingPayment.some((item) => item === true)) {
        toast.error('Requesting Payment');
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

   
      // get escrow wallet address

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
            
            account: activeAccount as any,
        });

        //console.log("transactionResult===", transactionResult);


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

          
          setRequestingPayment(
            requestingPayment.map((item, idx) => {
              if (idx === index) {
                return true;
              }
              return item;
            })
          );
          
          
          


        
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

            fetchBuyOrders();

            // refresh balance

            const result = await balanceOf({
              contract,
              address: address || "",
            });

            //console.log(result);

            setBalance( Number(result) / 10 ** 6 );


            toast.success(Payment_request_has_been_sent);

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






  // array of confirmingPayment

  const [confirmingPayment, setConfirmingPayment] = useState([] as boolean[]);

  useEffect(() => {
      
      setConfirmingPayment(
        new Array(buyOrders.length).fill(false)
      );

  } , [buyOrders]);



  // confirm payment check box
  const [confirmPaymentCheck, setConfirmPaymentCheck] = useState([] as boolean[]);
  useEffect(() => {
      
      setConfirmPaymentCheck(
        new Array(buyOrders.length).fill(false)
      );

  } , [buyOrders]);





  // payment amoount array
  const [paymentAmounts, setPaymentAmounts] = useState([] as number[]);
  useEffect(() => {

    // default payment amount is from buyOrders krwAmount
      
    setPaymentAmounts(
      buyOrders.map((item) => item.krwAmount)
      );

  } , [buyOrders]);



  const confirmPayment = async (

    index: number,
    orderId: string,
    paymentAmount: number,

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
        paymentAmount: paymentAmount,
      })
    });

    const data = await response.json();

    //console.log('data', data);

    if (data.result) {
      
      fetchBuyOrders();

      toast.success(Payment_has_been_confirmed);

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



    // check table view or card view
    const [tableView, setTableView] = useState(false);




    
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
  
          <div className="mt-4 flex justify-start space-x-4 mb-10">
              <button
                onClick={() => router.push(
                  wallet === "smart" ?
                  '/' + params.lang + '/' + params.chain + '?wallet=smart'
                  :
                  '/' + params.lang + '/' + params.chain
                ) }
                className="text-gray-500 font-semibold underline"
              >
                {Go_Home}
                </button>
          </div>


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
                  <div className="text-2xl font-semibold">
                    
                    {Buy_Order_USDT}

                  </div>

              </div>



                <div className="flex flex-row items-center justify-between gap-5">

 
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


                    )}

                    {address && (

                      <div className="flex flex-col gap-2 items-center
                        border border-zinc-400 rounded-md p-2">
                        {/* wallet address */}
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

                            {/* go to profile */}
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

                        {/*}
                        <div className="flex flex-row items-center gap-2 text-xs ">
                          {nativeBalance && Number(nativeBalance).toFixed(4)}{' '}POL
                        </div>
                        */}
                   

                      </div>

                    )}

                  </div>


                </div>


                  {/* check box for sell order */}
                  <div className="flex flex-row items-center gap-2">
                    <input
                      type="checkbox"
                      checked={checkInputKrwAmount}
                      onChange={(e) => setCheckInputKrwAmount(e.target.checked)}
                    />
                    <p className="text-sm text-zinc-400">
                      원화로 주문하기
                    </p>
                  </div>

                  <div className=" w-full grid gap-4  justify-center">

                    

                    {/* sell order is different border color
                    */}
                    <article
                      className={`
                        ${checkInputKrwAmount ? 'hidden' : 'block'}
                      bg-black p-4 rounded-md border-2 border-green-500`}
                    >

                      <div className="flex flex-col xl:flex-row gap-5 xl:gap-10 items-center">


                        <div className="flex flex-col gap-2 items-start">
                          
                          <div className=" flex flex-row items-center justify-between gap-4">
                  
                            {/* sell icon */}
                            <div className=" flex flex-row items-center gap-2">
                              <Image
                                src="/trade-buy.png"
                                alt="Buy"
                                width={40}
                                height={40}
                              />
                              <h2 className="text-lg font-semibold text-white">{Order}</h2>
                            </div>

                            {/* check box for private sale */}
                            <div className="flex flex-row items-center gap-2">

                              <Image
                                src="/icon-private-sale.png"
                                alt="Private Sale"
                                width={32}
                                height={32}
                              />

                              <div className="text-sm text-zinc-400">
                                {Private_Buy_Order}
                              </div>
                              <input
                                className="w-6 h-6"
                                type="checkbox"
                                checked={privateBuyOrder}
                                onChange={(e) => setprivateBuyOrder(e.target.checked)}
                              />
                            </div>

                          </div>


                          <p className="mt-4 text-xl font-bold text-zinc-400">1 USDT = {
                            // currency format
                            Number(rate).toLocaleString('ko-KR', {
                              style: 'currency',
                              currency: 'KRW'
                            })
                          }</p>
                          
                          <div className=" flex flex-row items-center gap-2">
                            <p className="text-xl text-blue-500 font-bold ">
                              <input 
                                type="number"
                                className=" w-28 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 "
                                placeholder="Amount"
                                value={usdtAmount}
                                onChange={(e) => {
                                  // check number
                                  e.target.value = e.target.value.replace(/[^0-9.]/g, '');

                                  // if the value is start with 0, then remove 0
                                  if (e.target.value.startsWith('0')) {
                                    e.target.value = e.target.value.substring(1);
                                  }

                                  
                                  if (e.target.value === '') {
                                    setUsdtAmount(0);
                                    return;
                                  }

                                  
                              


                                  parseFloat(e.target.value) < 0 ? setUsdtAmount(0) : setUsdtAmount(parseFloat(e.target.value));

                                  parseFloat(e.target.value) > 1000 ? setUsdtAmount(1000) : setUsdtAmount(parseFloat(e.target.value));

                                } }


                              />
                              <span className="ml-1 text-sm">USDT</span>
                            </p>

                            <p className=" text-xl text-zinc-400 font-bold">
                              = {
                              Number(defaultKrWAmount).toLocaleString('ko-KR', {
                                style: 'currency',
                                currency: 'KRW'
                              })
                              }
                            </p>
                          </div>


                          {seller && (
                            <p className=" text-sm text-zinc-400">
                              {Payment}: {Bank_Transfer} ({seller?.bankInfo.bankName} {seller?.bankInfo.accountNumber} {seller?.bankInfo.accountHolder})
                            </p>
                          )}

                        </div>


                        {/* input krw amount */}
                        {/* left side decrease button and center is input and  right side increase button */}
                        {/* -1, -10, -100, +1, +10, +100 */}
                        {/* if - button change bg color red */}
                        {/* if + button change bg color */}

                          <div className="mt-4  flex flex-row items-center justify-between gap-2">


                            <div className="flex flex-col gap-2">

                              <button
                                disabled={usdtAmount === 0}
                                className="bg-red-400 text-white px-2 py-2 rounded-md"
                                onClick={() => {
                                  krwAmount > 0 && setKrwAmount(krwAmount - 1);
                                }}
                              >
                                -1
                              </button>

                              <button
                                disabled={usdtAmount === 0}
                                className="bg-red-600 text-white px-2 py-2 rounded-md"
                                onClick={() => {
                                  krwAmount > 10 && setKrwAmount(krwAmount - 10);
                                }}
                              >
                                -10
                              </button>

                              <button
                                disabled={usdtAmount === 0}
                                className="bg-red-800 text-white px-2 py-2 rounded-md"
                                onClick={() => {
                                  krwAmount > 100 && setKrwAmount(krwAmount - 100);
                                }}
                              >
                                -100
                              </button>

                              <button
                                disabled={usdtAmount === 0}
                                className="bg-red-900 text-white px-2 py-2 rounded-md"
                                onClick={() => {
                                  krwAmount > 1000 && setKrwAmount(krwAmount - 1000);
                                }}
                              >
                                -1000
                              </button>

                            </div>

                            <div className="flex flex-col gap-2">
                              <div className="flex flex-row items-center gap-2"> 
    
                                <input 
                                  disabled
                                  type="number"
                                  className=" w-36  px-3 py-2 text-black bg-white text-xl font-bold border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 "
                                  value={krwAmount}
                                  onChange={(e) => {
                                    // check number
                                    e.target.value = e.target.value.replace(/[^0-9.]/g, '');

                                    if (e.target.value === '') {
                                      setKrwAmount(0);
                                      return;
                                    }

                                    parseFloat(e.target.value) < 0 ? setKrwAmount(0) : setKrwAmount(parseFloat(e.target.value));

                                    parseFloat(e.target.value) > 1000 ? setKrwAmount(1000) : setKrwAmount(parseFloat(e.target.value));

                                  } }
                                />
                              </div>

                              {krwAmount > 0 && (
                                <div className="text-lg font-semibold text-zinc-400">
                                  {Rate}: {

                                    // currency format
                                    Number((krwAmount / usdtAmount).toFixed(2)).toLocaleString('ko-KR', {
                                      style: 'currency',
                                      currency: 'KRW'
                                    })

                                  } 
                                </div>
                              )}
                            </div>

                            <div className="flex flex-col gap-2">
                              <button
                                disabled={usdtAmount === 0}
                                className="bg-green-400 text-white px-2 py-2 rounded-md"
                                onClick={() => {
                                  setKrwAmount(krwAmount + 1);
                                }}
                              >
                                +1
                              </button>
                              <button
                                disabled={usdtAmount === 0}
                                className="bg-green-600 text-white px-2 py-2 rounded-md"
                                onClick={() => {
                                  setKrwAmount(krwAmount + 10);
                                }}
                              >
                                +10
                              </button>

                              <button
                                disabled={usdtAmount === 0}
                                className="bg-green-800 text-white px-2 py-2 rounded-md"
                                onClick={() => {
                                  setKrwAmount(krwAmount + 100);
                                }}
                              >
                                +100
                              </button>

                              <button
                                disabled={usdtAmount === 0}
                                className="bg-green-900 text-white px-2 py-2 rounded-md"
                                onClick={() => {
                                  setKrwAmount(krwAmount + 1000);
                                }}
                              >
                                +1000
                              </button>

                            </div>


                          </div>

                        </div>




                        {/* sms mobile number */}
                        {address && phoneNumber && (
                          <div className="mt-4 flex flex-col gap-2 items-start">
                            <div className="flex flex-row items-center gap-2">
                              <div className="h-2 w-2 bg-zinc-400 rounded-full inline-block mr-2"></div>
                              <span className="text-sm text-zinc-400">
                                SMS: {phoneNumber}
                              </span>
                            </div>
                           
                            <div className="flex flex-row items-center gap-2">
                              <div className="h-2 w-2 bg-zinc-400 rounded-full inline-block mr-2"></div>
                              <span className="text-sm text-zinc-400">
                                 {Buy_Order_SMS_will_be_sent_to_your_mobile_number}
                              </span>
                            </div>
                            
                          </div>
                        )}



                        {/* aggremment */}
                        {/* After you place order and the buyer accepts the order, you can not cancel the order. */}


                        <div className="mt-4 flex flex-row items-center gap-2">
                          <input
                            disabled={!address || usdtAmount === 0 || buyOrdering}
                            type="checkbox"
                            checked={agreementPlaceOrder}
                            onChange={(e) => setAgreementPlaceOrder(e.target.checked)}
                          />
                          <p className="text-sm text-zinc-400">
                            
                            {I_agree_to_the_terms_of_trade}

                          </p>
                        </div>


                        {/* terms and conditions */}
                        {/* text area */}
                        {/*
                        <textarea
                          className="w-full h-32 p-2 border border-gray-300 rounded-md text-sm text-black"
                          placeholder="
                            After you place order, the buyer has 24 hours to accept the order.
                            If the buyer does not accept the order within 24 hours, the order will be expired.
                            After the buyer accepts the order, you can not cancel the order.
                            After the buyer accepts the order, you must deposit the USDT to escrow within 1 hour.
                            If you do not deposit the USDT to escrow within 1 hour, the order will be expired.
                            If you want to cancel the order, you must contact the buyer and request to cancel the order.
                            If the buyer agrees to cancel the order, the order will be cancelled.
                          "
                        ></textarea>
                        */}



                        {/*
                        <div className="mt-4 text-sm text-zinc-400">

                          <div className="h-2 w-2 bg-zinc-400 rounded-full inline-block mr-2"></div>
                          <span>After you place order, the buyer has 24 hours to accept the order.
                            If the buyer does not accept the order within 24 hours, the order will be expired.
                          </span>
                        </div>
                        <div className="mt-4 text-sm text-zinc-400">

                          <div className="h-2 w-2 bg-zinc-400 rounded-full inline-block mr-2"></div>
                          <span>After the buyer accepts the order, you can not cancel the order.</span>
                        </div>
                        <div className="mt-4 text-sm text-zinc-400">

                          <div className="h-2 w-2 bg-zinc-400 rounded-full inline-block mr-2"></div>
                          <span>After the buyer accepts the order, you must deposit the USDT to escrow within 1 hour.
                            If you do not deposit the USDT to escrow within 1 hour, the order will be expired.
                          </span>
                        </div>
                        <div className="mt-4 text-sm text-zinc-400">

                          <div className="h-2 w-2 bg-zinc-400 rounded-full inline-block mr-2"></div>
                          <span>If you want to cancel the order, you must contact the buyer and request to cancel the order.
                            If the buyer agrees to cancel the order, the order will be cancelled.
                          </span>
                        </div>
                        */}





                        <div className="mt-4 flex flex-col gap-2">
                  
                          {buyOrdering ? (

                            <div className="flex flex-row items-center gap-2">
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
                                <div className="text-white">
                                  {Placing_Order}...
                                </div>
                  
                            </div>


                          ) : (
                              <button
                                  disabled={usdtAmount === 0 || agreementPlaceOrder === false}
                                  className={`text-lg text-white px-4 py-2 rounded-md ${usdtAmount === 0 || agreementPlaceOrder === false ? 'bg-gray-500' : 'bg-green-500'}`}
                                  onClick={() => {
                                      console.log('Sell USDT');
                                      // open trade detail
                                      // open modal of trade detail
                                      ///openModal();

                                      buyOrder();
                                  }}
                              >
                                {Place_Order}
                              </button>
                          )}

                        </div>


                    </article>


                    {/* sell order card view */}
                    {/* input price and auto change usdt amount */}
                    <article
                      className={` ${checkInputKrwAmount ? 'block' : 'hidden'} bg-black p-4 rounded-md border-2 border-green-500`}
                    >
                        
                        <div className="flex flex-col xl:flex-row gap-5 xl:gap-5 items-center ">
                            
                            <div className="flex flex-col gap-2 items-start">
                              
                              <div className=" flex flex-row items-center justify-between gap-4">
                      
                                {/* sell icon */}
                                <div className=" flex flex-row items-center gap-2">
                                  <Image
                                    src="/trade-buy.png"
                                    alt="Buy"
                                    width={40}
                                    height={40}
                                  />
                                  <h2 className="text-lg font-semibold text-white">{Order}</h2>
                                </div>
  
                                {/* check box for private sale */}
                                <div className="flex flex-row items-center gap-2">
  
                                  <Image
                                    src="/icon-private-sale.png"
                                    alt="Private Sale"
                                    width={32}
                                    height={32}
                                  />
  
                                  <div className="text-sm text-zinc-400">
                                    {Private_Sale}
                                  </div>
                                  <input
                                    className="w-6 h-6"
                                    type="checkbox"
                                    checked={privateBuyOrder}
                                    onChange={(e) => setprivateBuyOrder(e.target.checked)}
                                  />
                                </div>
  
                              </div>

                              <p className="mt-4 text-xl font-bold text-zinc-400">1 USDT = {
                                // currency format
                                Number(rate).toLocaleString('ko-KR', {
                                  style: 'currency',
                                  currency: 'KRW'
                                })
                              }</p>

                              <div className=" flex flex-row items-center gap-2">
                                
                                <div className="flex flex-row gap-1 items-center text-xl text-blue-500 font-bold ">

                                  <input 
                                    type="number"
                                    className=" w-40 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 "
                                    placeholder={Price}
                                    value={krwAmount}
                                    onChange={(e) => {
                                      // check number
                                      e.target.value = e.target.value.replace(/[^0-9.]/g, '');
                                      
                                      // if prefix 0, then remove 0
                                      if (e.target.value.startsWith('0')) {
                                        e.target.value = e.target.value.substring(1);
                                      }


                                      /*
                                      if (e.target.value === '') {
                                        setKrwAmount(0);
                                        return;
                                      }
                                      */

  
                                      parseFloat(e.target.value) < 0 ? setKrwAmount(0) : setKrwAmount(parseFloat(e.target.value));
  
                                      parseFloat(e.target.value) > 100000000 ? setKrwAmount(1000) : setKrwAmount(parseFloat(e.target.value));
  
                                      //setUsdtAmount(Number((krwAmount / rate).toFixed(2)));
                                    
                                    
                                    } }
                                  />

                                  <div className=" text-sm">KRW</div>

                                </div>
  
                                <p className=" text-xl text-zinc-400 font-bold">
                                  = {
                                  krwAmount === 0 ? '0' :
                                  
                                  (krwAmount / rate).toFixed(2) === 'NaN' ? '0' : (krwAmount / rate).toFixed(2)

                                  }{' '}USDT
                                </p>

                              </div>

                            </div>


                          <div className="mt-4 flex flex-col gap-2 items-start">
                            <div className="flex flex-row items-center gap-2">
                              <div className="h-2 w-2 bg-zinc-400 rounded-full inline-block mr-2"></div>
                              <span className="text-sm text-zinc-400">
                                SMS: {phoneNumber}
                              </span>
                            </div>
                           
                            <div className="flex flex-row items-center gap-2">
                              <div className="h-2 w-2 bg-zinc-400 rounded-full inline-block mr-2"></div>
                              <span className="text-sm text-zinc-400">
                                 {Buy_Order_SMS_will_be_sent_to_your_mobile_number}
                              </span>
                            </div>

                          </div>


                          <div className="mt-4 flex flex-col gap-2">
                            <div className="flex flex-row items-center gap-2">
                              <input
                                disabled={!address || krwAmount === 0 || buyOrdering}
                                type="checkbox"
                                checked={agreementPlaceOrder}
                                onChange={(e) => setAgreementPlaceOrder(e.target.checked)}
                              />
                              <p className="text-sm text-zinc-400">
                                {I_agree_to_the_terms_of_trade}
                              </p>

                            </div>

                            <div className="flex flex-col gap-2">
                    
                              {buyOrdering ? (

                                <div className="flex flex-row items-center gap-2">
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
                                    <div className="text-white">
                                      {Placing_Order}...
                                    </div>
                      
                                </div>
                              ) : (
                                  <button
                                      disabled={krwAmount === 0 || agreementPlaceOrder === false}
                                      className={`text-lg text-white px-4 py-2 rounded-md ${krwAmount === 0 || agreementPlaceOrder === false ? 'bg-gray-500' : 'bg-green-500'}`}
                                      onClick={() => {
                                          console.log('Sell USDT');
                                          // open trade detail
                                          // open modal of trade detail
                                          ///openModal();
    
                                          buyOrder();
                                      }}
                                  >
                                    {Place_Order}
                                  </button>
                              )}

                            </div>

                          </div>

                        </div>

                    </article>









                    <article
                      className="hidden xl:block"
                    ></article>

                    <article
                      className="hidden xl:block"
                    ></article>


                  </div>

         
                  <div className="mt-10 w-full flex flex-row items-center justify-between gap-4">

                 
                  <div className="p-2 flex flex-row items-center justify-between gap-2">

                    {/*
                    <div className="flex flex-col gap-2 items-center">
                      <div className="text-sm">{Total}</div>
                      <div className="text-xl font-semibold text-white">
                        {buyOrders.length}
                      </div>
                    </div>
                    */}

                    <div className="flex flex-col gap-2 items-center">
                      <div className="text-sm">{Buy_Orders}</div>
                      <div className="text-xl font-semibold text-white">
                        {buyOrders.filter((item) => item.status === 'ordered').length}
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 items-center">
                      <div className="text-sm">{Trades}</div>
                      <div className="text-xl font-semibold text-white">

                        {
                          //buyOrders.filter((item) => item.status === 'accepted').length
                          buyOrders.filter((item) => item.status === 'accepted' || item.status === 'paymentRequested').length

                        }

                      </div>
                    </div>

                    {/* completed trades */}
                    <div className="flex flex-col gap-2 items-center">
                      <div className="text-sm">{Completed}</div>
                      <div className="text-xl font-semibold text-white">
                        {buyOrders.filter((item) => item.status === 'paymentConfirmed').length}
                      </div>
                    </div>

                    {/* cancelled trades */}
                    <div className="flex flex-col gap-2 items-center">
                      <div className="text-sm">{Cancelled}</div>
                      <div className="text-xl font-semibold text-white">
                        {buyOrders.filter((item) => item.status === 'cancelled').length}
                      </div>
                    </div>



                    <div className="hidden ml-5  flex-col gap-2 items-start justify-end">

                      {/* checkbox for search my trades */}
                      <div className="flex flex-row items-center gap-2">
                        <input
                          disabled={!address}
                          type="checkbox"
                          checked={searchMyOrders}
                          onChange={(e) => setSearchMyOrders(e.target.checked)}
                          className="w-5 h-5"
                        />
                        <label className="text-sm text-zinc-400">
                          {Search_my_trades}
                        </label>
                      </div>
                    </div>



                  </div>


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

                <div className="w-full flex flex-row items-center justify-between gap-4">
                  {/* escrow balance */}
                  <div className="mt-4 flex flex-row items-center gap-2">
                    <div className="text-sm text-zinc-400">
                      {Escrow}: {escrowBalance} USDT
                    </div>
                  </div>

                  {/* reload buyOrders button */}
                  <div className="mt-4 flex flex-row items-center gap-2">
                    <button
                      disabled={loadingFetchSellOrders || requestingPayment.some((item) => item === true) || escrowing.some((item) => item === true) || confirmingPayment.some((item) => item === true)}
                      className={`flex flex-row gap-1 text-sm text-white px-2 py-1 rounded-md ${loadingFetchSellOrders ? 'bg-gray-500' : 'bg-green-500'}`}
                      onClick={fetchBuyOrders}
                    >
                      <Image
                        src="/loading.png"
                        alt="loading"
                        width={16}
                        height={16}
                        className={loadingFetchSellOrders ? 'animate-spin' : 'hidden'}
                      />
                      <span>{Reload}</span>
                    </button>
                  </div>



                </div>


                {tableView ? (


           
                <table className=" w-full table-auto border-collapse border border-zinc-800 rounded-md">

                  <thead>
                      <tr
                          className="bg-gray-800 text-white text-xs h-10 "
                      >

                          <th className="text-left ">{Opened_at}</th>
                          <th className="text-left">{TID}</th>
                          <th className="text-left">{Started_at}</th>
                          <th className="text-left">{Trading_Time_is}</th>

                          <th className="text-left">
                            {Deposit_Name} / {Buyer}
                          </th>

                          <th className="text-left">{Price} / {Buy_Amount} / {Rate}</th>


                          <th className="text-left">{Payment}</th>
                          <th className="text-left">{Payment_Amount}</th>
                          
                          <th className="text-left">{Status}</th>

                          
                      </tr>
                  </thead>
                  <tbody>
                      {buyOrders.map((item, index) => (
                          <tr
                            key={index}
                            className="border-b border-gray-200 hover:bg-gray-800 hover:bg-opacity-10 text-xs h-10 ">
                              
                              <td>
                                {
                                  new Date().getTime() - new Date(item.createdAt).getTime() < 1000 * 60 ? (
                                    ' ' + Math.floor((new Date().getTime() - new Date(item.createdAt).getTime()) / 1000) + ' ' + seconds_ago
                                  ) :
                                  new Date().getTime() - new Date(item.createdAt).getTime() < 1000 * 60 * 60 ? (
                                    ' ' + Math.floor((new Date().getTime() - new Date(item.createdAt).getTime()) / 1000 / 60) + ' ' + minutes_ago
                                  ) : (
                                    ' ' + Math.floor((new Date().getTime() - new Date(item.createdAt).getTime()) / 1000 / 60 / 60) + ' ' + hours_ago
                                  )}
                              </td>
                              
                              <td className="text-blue-500 text-lg font-semibold">
                                {item.tradeId}
                              </td>
                              
                              <td>

                                {item.acceptedAt && (
                                  new Date().getTime() - new Date(item.acceptedAt).getTime() < 1000 * 60 ? (
                                    ' ' + Math.floor((new Date().getTime() - new Date(item.acceptedAt).getTime()) / 1000) + ' ' + seconds_ago
                                  ) : new Date().getTime() - new Date(item.acceptedAt).getTime() < 1000 * 60 * 60 ? (
                                    ' ' + Math.floor((new Date().getTime() - new Date(item.acceptedAt).getTime()) / 1000 / 60) + ' ' + minutes_ago
                                  ) : (
                                    ' ' + Math.floor((new Date().getTime() - new Date(item.acceptedAt).getTime()) / 1000 / 60 / 60) + ' ' + hours_ago
                                  )
                                )}
                                
                              </td>

                              <td>
                                {item.status === 'paymentConfirmed' &&
                                
                                ( ( (new Date(item.paymentConfirmedAt).getTime() - new Date(item.acceptedAt).getTime()) / 1000 / 60 ).toFixed(0) ) + ' ' + minutes
                                
                                }
                              </td>

                              <td className=" flex flex-col items-start justify-center gap-1 mt-2 ">

                                <div className="flex flex-row gap-1">
                                  <span className="text-lg text-yellow-500 font-semibold">
                                    {item.buyer?.depositBankName && item.buyer?.depositBankName}
                                  </span>
                                  <span className="text-lg text-yellow-500 font-semibold">
                                    {item.buyer?.depositName ? item.buyer?.depositName : item.tradeId}
                                  </span>
                                </div>

                                 <span>{item.buyer?.nickname}</span>
                              </td>


                              <td>
                                <div className="flex flex-col gap-1">
                                  <span className="text-lg text-yellow-500 font-semibold">
                                    {Number(item.krwAmount).toLocaleString('ko-KR', {
                                      style: 'currency',
                                      currency: 'KRW',
                                    })}
                                  </span>
                                
                                  <span>{item.usdtAmount}</span>
                                  <span>{Number(item.krwAmount / item.usdtAmount).toFixed(2)}</span>
                                </div>
                              </td>

                           
                              <td>
                                <div className="flex flex-col gap-1">
                                  <span>{item.seller?.bankInfo?.bankName}</span>
                                  <span>{item.seller?.bankInfo?.accountNumber}</span>
                                  <span>{item.seller?.bankInfo?.accountHolder}</span>
                                </div>
                              </td>

                              <td className="text-lg text-yellow-500 font-semibold">
                                {item.status === 'paymentConfirmed' && (
                                  Number(item.krwAmount).toLocaleString('ko-KR', {
                                    style: 'currency',
                                    currency: 'KRW',
                                  })
                                )}

                                {item.status === 'paymentRequested' && (

                                  <div className="flex flex-col gap-1">
                                    <input
                                      disabled={true}
                                      type="number"
                                      className="w-24 px-2 py-1 border border-gray-300 rounded-md text-lg text-black"
                                      placeholder="Amount"
                                      value={paymentAmounts[index]}
                                      onChange={(e) => {
                                        // check number
                                        e.target.value = e.target.value.replace(/[^0-9.]/g, '');


                                        parseFloat(e.target.value) < 0 ? setPaymentAmounts(
                                          paymentAmounts.map((item, idx) => {
                                            if (idx === index) {
                                              return 0;
                                            }
                                            return item;
                                          })
                                        ) : setPaymentAmounts(
                                          paymentAmounts.map((item, idx) => {
                                            if (idx === index) {
                                              return parseFloat(e.target.value);
                                            }
                                            return item;
                                          })
                                        );

                                      }
                                    }
                                    />
                                      
                                  </div>

                                )}
                              </td>
                              
                              <td>

                                {item.status === 'ordered' && (
                            
                                  <button
                                    disabled={cancellings[index]}
                                    className={`flex flex-row gap-1 text-xs text-white px-2 py-1 rounded-md ${cancellings[index] ? 'bg-gray-500' : 'bg-red-500'}`}
                                    onClick={() => cancelBuyOrder(item._id, index)}
                                  >
                                    <Image
                                      src="/loading.png"
                                      alt="loading"
                                      width={16}
                                      height={16}
                                      className={cancellings[index] ? 'animate-spin' : 'hidden'}
                                    />
                                    <span>{Cancel_My_Order}</span>
                                   
                                  </button>
                                )}


                                {item.status === 'paymentConfirmed' && (
                                  <div className="flex flex-col gap-1">
                                    <span className="text-lg font-semibold text-green-500">
                                      {Completed}
                                    </span>
                                    <span>{
                                      item.paymentConfirmedAt && new Date(item.paymentConfirmedAt).toLocaleString()
                                    }</span>
                                  </div>
                                )}

                                {item.status === 'accepted' && (
                                  <div className="flex flex-row gap-1">

                                    <span className="text-lg font-semibold text-yellow-500">
                                      주문접수
                                    </span>

                                    {/* check box for agreement */}
                                    {/*
                                    <input
                                      disabled={escrowing[index] || requestingPayment[index]}
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
                                    />

                                    <button
                                      disabled={escrowing[index] || requestingPayment[index] || !requestPaymentCheck[index]}
                                      
                                      className={`flex flex-row gap-1 text-xs text-white px-2 py-1 rounded-md ${escrowing[index] || requestingPayment[index] || !requestPaymentCheck[index] ? 'bg-gray-500' : 'bg-green-500'}`}
                                      onClick={() => {
         
                                        requestPayment(
                                          index,
                                          item._id,
                                          item.tradeId,
                                          item.usdtAmount
                                        );
                                      }}
                                    >
                                      <Image
                                        src="/loading.png"
                                        alt="loading"
                                        width={16}
                                        height={16}
                                        className={escrowing[index] || requestingPayment[index] ? 'animate-spin' : 'hidden'}
                                      />
                                      <span>{Request_Payment}</span>
                                    
                                    </button>
                                    */}

                                  </div>
                                )}

                                {item.status === 'paymentRequested' && (

                                  <div className="flex flex-col gap-1">

                                    <span className="text-lg font-semibold text-yellow-500">{Escrow_Completed}</span>

                                    {/*
                                    <div className="flex flex-row gap-1">

                                      <input
                                        disabled={confirmingPayment[index]}
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
                                      />

                                      <button
                                        disabled={confirmingPayment[index] || !confirmPaymentCheck[index]}
                                        className={`flex flex-row gap-1 text-xs text-white px-2 py-1 rounded-md ${confirmingPayment[index] || !confirmPaymentCheck[index] ? 'bg-gray-500' : 'bg-green-500'}`}
                                        onClick={() => {
                                          confirmPayment(
                                            index,
                                            item._id,
                                            paymentAmounts[index]
                                          );
                                        }}

                                      >

                                        <Image
                                          src="/loading.png"
                                          alt="loading"
                                          width={16}
                                          height={16}
                                          className={confirmingPayment[index] ? 'animate-spin' : 'hidden'}
                                        />
                                        <span>{Confirm_Payment}</span>

                                      </button>

                                    </div>
                                    */}

                                  </div>



                                )}
                                {item.status === 'cancelled' && (
                                  <span className="text-red-500">{Cancelled}</span>
                                )}
                              </td>

                          </tr>
                      ))}
                  </tbody>
                  </table>

                  ) : (



                  <div className=" w-full grid gap-4 xl:grid-cols-3 justify-center">

                    {buyOrders.map((item, index) => (

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
                            key={index}
                            className={`

                              w-96 xl:w-full h-full

                              bg-black p-4 rounded-md border
                              
                               ${item.walletAddress === address ? 'border-green-500' : 'border-gray-200'}
                               

                               ${item.status === 'paymentConfirmed' ? 'bg-gray-900 border-gray-900' : ''}

                            `}
                        >

                            {item.status === 'ordered' && (
                              <div className="flex flex-col items-start gap-1">


                                <div className="flex flex-row items-center gap-2">
                                  {/* new order icon 1 hour after created */}

            
                                  {
                                    (new Date().getTime() - new Date(item.createdAt).getTime()) / 1000 / 60 / 60 < 1 && (
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

                                  <p className="text-sm text-zinc-400">



                                    {params.lang === 'en' && Opened_at} {
                                    new Date().getTime() - new Date(item.createdAt).getTime() < 1000 * 60 ? (
                                      ' ' + Math.floor((new Date().getTime() - new Date(item.createdAt).getTime()) / 1000) + ' ' + seconds_ago
                                    ) :
                                    new Date().getTime() - new Date(item.createdAt).getTime() < 1000 * 60 * 60 ? (
                                      ' ' + Math.floor((new Date().getTime() - new Date(item.createdAt).getTime()) / 1000 / 60) + ' ' + minutes_ago
                                    ) : (
                                      ' ' + Math.floor((new Date().getTime() - new Date(item.createdAt).getTime()) / 1000 / 60 / 60) + ' ' + hours_ago
                                    )}{' '}{params.lang === 'kr' && Opened_at}


                                  </p>

                                </div>

                                {24 - Math.floor((new Date().getTime() - new Date(item.createdAt).getTime()) / 1000 / 60 / 60) > 0 ? (

                                  <div className="mt-2 flex flex-row items-center space-x-2">
                                    <Image
                                      src="/icon-timer.webp"
                                      alt="Timer"
                                      width={28}
                                      height={28}
                                    />
                                    <p className="text-sm text-zinc-400">Expires in {

                                      24 - Math.floor((new Date().getTime() - new Date(item.createdAt).getTime()) / 1000 / 60 / 60) - 1

                                    } hours {
                                      60 - Math.floor((new Date().getTime() - new Date(item.createdAt).getTime()) / 1000 / 60) % 60
                                    } minutes

                                    
                                    </p>
                                  </div>

                                  ) : (
                                  <div className="mt-2 flex flex-row items-center space-x-2">
                                    <Image
                                      src="/icon-timer.webp"
                                      alt="Expired"
                                      width={28}
                                      height={28}
                                    />
                                    <p className="text-sm text-zinc-400">Expired</p>
                                  </div>
                                )}

                              </div>
                            )}






                            { (item.status === 'accepted' || item.status === 'paymentRequested' || item.status === 'cancelled') && (

                              <div className="flex flex-row items-center gap-2  bg-white px-2 py-1 rounded-md mb-4  ">




                                {item.privateSale && (
                                    <Image
                                      src="/icon-private-sale.png"
                                      alt="Private Sale"
                                      width={32}
                                      height={32}
                                    />
                                ) }

                                { (item.status === 'accepted' || item.status === 'paymentRequested') && (
                                  <Image
                                    src="/icon-trade.png"
                                    alt="Trade"
                                    width={32}
                                    height={32}
                                  />
                                )}


                                <p className="text-xl font-semibold text-green-500 ">
                                  {TID}: {item.tradeId}
                                </p>

                              </div>

                            )}


                            { (item.status === 'paymentConfirmed') && (

                              <div className="flex flex-row items-center gap-2  bg-white px-2 py-1 rounded-md mb-4">

                                <Image
                                  src="/confirmed.png"
                                  alt="Payment Confirmed"
                                  width={50}
                                  height={50}
                                />

                                <p className="text-xl font-semibold text-green-500 ">
                                  {TID}: {item.tradeId}
                                </p>
                              </div>

                            )}


                            {item.acceptedAt && (
                              <p className="mb-2 text-sm text-zinc-400">
                                Trade started at {new Date(item.acceptedAt).toLocaleDateString() + ' ' + new Date(item.acceptedAt).toLocaleTimeString()}
                              </p>
                            )}



                            {item.status === 'cancelled' && (

                                <p className="text-sm text-zinc-400"> 
                                  Cancelled at {new Date(item?.cancelledAt).toLocaleString()}
                                </p>
                    
                            )}



                            {item.paymentConfirmedAt && (
                              <p className="mb-2 text-sm text-zinc-400">
                                
                                Completed at {new Date(item.paymentConfirmedAt).toLocaleDateString() + ' ' + new Date(item.paymentConfirmedAt).toLocaleTimeString()}
                            
                              </p>
                            )}



                            <div className="mt-4 flex flex-col items-start gap-2">


                              <p className="text-2xl text-zinc-400">
                                {Price}: {
                                  // currency
                                
                                  Number(item.krwAmount).toLocaleString('ko-KR', {
                                    style: 'currency',
                                    currency: 'KRW',
                                  })

                                }
                              </p>


                              <div className="flex flex-row items-start gap-2">

                                <p className="text-lg font-semibold text-white">{item.usdtAmount} USDT</p>

                                <p className="text-lg font-semibold text-white">{Rate}: {

                                  Number(item.krwAmount / item.usdtAmount).toFixed(2)

                                }</p>

                              </div>

                            </div>


                            {address && item.walletAddress === address && item.status !== 'cancelled' && (
                              <div className="mt-4 flex flex-col gap-2 items-start">
                                <p className="mt-2 text-sm text-zinc-400">
                                  {Payment}: {item.seller?.bankInfo?.bankName} {item.seller?.bankInfo?.accountNumber} {item.seller?.bankInfo?.accountHolder}
                                </p>
                                <p className="text-sm text-zinc-400">
                                  {Deposit_Name}: {
                                    item.buyer?.depositName ? item.buyer?.depositName : item.tradeId
                                  }
                                </p>  
                              </div>

                            )}



                       

                            
                            <div className="mt-4 flex text-lg font-semibold mb-2">
                              {
   

                                item.walletAddress === address &&
                                (item.status === 'accepted' || item.status === 'paymentRequested') ? (

                                  <div className="flex flex-row items-center gap-2">
                                    <span>{Seller}: {item.nickname}</span>
                                    <span className="text-green-500">:{Me}</span>
                                    
                                    {/* goto /sell-usdt/:id */}
                                    {/*
                                    <div
                                      className="text-sm
                                        bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-600 cursor-pointer"

                                      onClick={() => {
                                        router.push(
                                          "/" + params.lang + "/" + params.chain + `/sell-usdt/${item._id}`);
                                      }}
                                    >
                                      {Go_Sell_USDT}
                                    </div>
                                    */}
                                
                                  </div>

                                ) : (item.walletAddress === address && item.status === 'ordered') ? (

                                  <div className="flex flex-row items-center gap-2">
                                    <span>{Seller}: {item.nickname}</span>
                                    <span className="text-green-500">:{Me}</span>
                                           
                                    <button
                                        disabled={cancellings[index]}
                                        className={`text-sm bg-red-500 text-white px-3 py-2 rounded-md ${cancellings[index] ? 'bg-gray-500' : ''}`}
                                        onClick={() => {
                                          // api call
                                          // cancelBuyOrder
      
                                          cancelBuyOrder(item._id, index);
      
                                        }}
                                    >
      
                                      <div className="flex flex-row text-xs items-center gap-2 ">
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
                                              width={12}
                                              height={12}
                                            />
                                          </div>
                                        ) : (
                                          <Image
                                            src="/icon-cancelled.png"
                                            alt="Cancel"
                                            width={12}
                                            height={12}
                                          />
                                        )}
                                        <div className="flex flex-row xl:flex-col items-center gap-1">
                                          <span>{Cancel_My_Order}</span>
                                        </div>
                                      </div>
                                      
                                    </button>

                                  </div>
  

                                ) : (
                                
                                  <span>
                                    {Seller}: {item.nickname}
                                  </span>

                                )

                              }
                            </div>

   



                            {/* accept order button for seller */}

                            {(item.status === 'accepted' || item.status === 'paymentRequested' || item.status === 'paymentConfirmed' || item.status === 'cancelled') 
                              && (
                                <div className="w-full mt-4 mb-2 flex flex-col gap-2 items-start ">

                                  <p className="text-sm text-green-500 font-semibold">
                                    {Seller}: {
                                      item.seller.walletAddress === address ? item.seller.nickname + ' :' + Me :
                                    
                                      item.seller.nickname
                                    }
                                  </p>


                                  {item.status !== 'paymentConfirmed' && item.status !== 'cancelled'
                                  && address && item.walletAddress === address && (
                                    <>
                                    {/* chat with buyer */}

                                    {/*
                                    <button
                                      className="bg-blue-500 text-white px-2 py-1 rounded-md"
                                      onClick={() => {
                                        

                                        router.push("/" + params.lang + "/" + params.chain + `/sell-usdt/${item._id}`);

                                      }}
                                    >
                                      
                                      퍈매 진행하기


                                    </button>
                                    */}
                                    
                                    </>
                                  )}



                                </div>
                            )}





                            {/* share button */}
                           


                            <div className=" mt-4 flex flex-row gap-2 items-center justify-center">

                              {item.privateSale && (
                                <Image
                                  src="/icon-private-sale.png"
                                  alt="Private Sale"
                                  width={48}
                                  height={48}
                                />
                              )}
   

                              {item.walletAddress === address && item.privateSale && (
                                <button
                                    className=" flex flex-row text-sm bg-blue-500 text-white px-2 py-1 rounded-md"
                                    onClick={() => {
                                      
                                      ////router.push(`/sell-usdt/${item._id}`);

                                      // copy to clipboard
                                      navigator.clipboard.writeText(`https://gold.goodtether.com/${params.lang}/${params.chain}/sell-usdt/${item._id}`);
                                      toast.success('Link has been copied to clipboard');

                                    }}
                                >

                                  <Image
                                    src="/icon-share.png"
                                    alt="Share"
                                    width={16}
                                    height={16}
                                    className="mr-2"
                                  />
                                  Share
                                </button>
                              )}


                            </div>
                          




                            {/* waiting for escrow */}
                            {item.status === 'accepted' && (
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
                                      {Waiting_for_seller_to_deposit}
                                      {item.usdtAmount} USDT
                                      {to_escrow}....
                                    </span>

                                    <span className="text-sm text-zinc-400">

                                      {If_the_seller_does_not_deposit_the_USDT_to_escrow}

                                      {this_trade_will_be_cancelled_in}

                                      {
                                        (1 - Math.floor((new Date().getTime() - new Date(item.acceptedAt).getTime()) / 1000 / 60 / 60) - 1) > 0
                                        ? (1 - Math.floor((new Date().getTime() - new Date(item.acceptedAt).getTime()) / 1000 / 60 / 60) - 1) + ' hours'
                                        : (60 - Math.floor((new Date().getTime() - new Date(item.acceptedAt).getTime()) / 1000 / 60) % 60) + ' minutes'

                                      }

                                    </span>
                                  </div>
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
                                          // new window for smart contract
                                          ///window.open(`https://polygonscan.com/tx/${item.escrowTransactionHash}`);


                                          {
                                            params.chain === 'polygon' ? (
                                              window.open(`https://polygonscan.com/tx/${item.escrowTransactionHash}`)
                                            ) : (
                                              window.open(`https://etherscan.io/tx/${item.escrowTransactionHash}`)
                                            )
                                          }


                                      }}
                                    >
                                      <Image
                                        src="/logo-polygon.png"
                                        alt="Polygon"
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

                                    <div>
                                      {Waiting_for_seller_to_deposit} {item.krwAmount} KRW to {Seller}...
                                    </div>

                                  </div>

                                </div>
                            )}
                        </article>


                      </div>

                    ))}

                  </div>


                )}

            </div>

            
          </div>


          <Modal isOpen={isModalOpen} onClose={closeModal}>
              <TradeDetail
                  closeModal={closeModal}
                  goChat={goChat}
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
                    src="/logo-ppump.png"
                    alt="Circle Logo"
                    width={35}
                    height={35}
                    className="rounded-full w-10 h-10 xl:w-14 xl:h-14"
                    />
                    <span className="text-lg xl:text-3xl text-gray-800 font-semibold">
                    PUMP
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
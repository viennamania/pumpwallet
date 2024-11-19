'use client';

import { useState, useEffect, use, act } from "react";

import Image from "next/image";



// open modal

import Modal from '@/components/modal';

import { useRouter }from "next//navigation";


import { toast } from 'react-hot-toast';

import { client } from "../../../client";



import {
  getContract,
  sendAndConfirmTransaction,
  sendTransaction,
  waitForReceipt,
} from "thirdweb";



import {
  polygon,
  arbitrum,
} from "thirdweb/chains";

import {
  ConnectButton,
  useActiveAccount,
  useActiveWallet,
  useWalletBalance,

  useSetActiveWallet,

  useConnectedWallets,


} from "thirdweb/react";

import {
  inAppWallet

  
} from "thirdweb/wallets";





import { getUserPhoneNumber } from "thirdweb/wallets/in-app";


import { balanceOf, transfer } from "thirdweb/extensions/erc20";
import { add } from "thirdweb/extensions/farcaster/keyGateway";
 


import AppBarComponent from "@/components/Appbar/AppBar";
import { getDictionary } from "../../../dictionaries";
import Chat from "@/components/Chat";
import { ClassNames } from "@emotion/react";


import useSound from 'use-sound';
import { it } from "node:test";
import { get } from "http";


import { useSearchParams } from 'next/navigation';
import { N } from "ethers";




interface BuyOrder {
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


// get escrow wallet address

//const escrowWalletAddress = "0x2111b6A49CbFf1C8Cc39d13250eF6bd4e1B59cF6";



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

    Anonymous: "",

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


    Opened: "",
    Completed: "",
    Cancelled: "",


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

    Sell_USDT: "",

    Buy_Order_Opened: "",
  
    Insufficient_balance: "",


    Request_Payment: "",

    Payment_has_been_confirmed: "",

    Confirm_Payment: "",

    Escrow_Completed: "",

    Buy_Order_Accept: "",

    Payment_Amount: "",

    Buy_Amount: "",

    Deposit_Name: "",

    My_Balance: "",

    Make_Escrow_Wallet: "",
    Escrow_Wallet_Address_has_been_created: "",
    Failed_to_create_Escrow_Wallet_Address: "",

    Newest_order_has_been_arrived: "",
    Payment_request_has_been_sent: "",
    Escrow_balance_is_less_than_payment_amount: "",

    Copied_Wallet_Address: "",


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

    Anonymous,

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

    Opened,
    Completed,
    Cancelled,

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

    Sell_USDT,

    Buy_Order_Opened,

    Insufficient_balance,

    Request_Payment,

    Payment_has_been_confirmed,

    Confirm_Payment,

    Escrow_Completed,

    Buy_Order_Accept,

    Payment_Amount,

    Buy_Amount,

    Deposit_Name,

    My_Balance,

    Make_Escrow_Wallet,
    Escrow_Wallet_Address_has_been_created,
    Failed_to_create_Escrow_Wallet_Address,

    Newest_order_has_been_arrived,
    Payment_request_has_been_sent,
    Escrow_balance_is_less_than_payment_amount,

    Copied_Wallet_Address,

  } = data;




  const router = useRouter();



  /*
  const setActiveAccount = useSetActiveWallet();
 

  const connectWallets = useConnectedWallets();

  const smartConnectWallet = connectWallets?.[0];
  const inAppConnectWallet = connectWallets?.[1];
  */


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
        //isSmartAccount: activeWallet === inAppConnectWallet ? false : true,
        isSmartAccount: false,
      }),
    })
    .then(response => response.json())
    .then(data => {
        
        //console.log('getEscrowWalletAddress data.result', data.result);


        if (data.result) {
          setEscrowWalletAddress(data.result.escrowWalletAddress);
          toast.success(Escrow_Wallet_Address_has_been_created);
        } else {
          toast.error(Failed_to_create_Escrow_Wallet_Address);
        }
    })
    .finally(() => {
      setMakeingEscrowWallet(false);
    });

  }

  //console.log("escrowWalletAddress", escrowWalletAddress);




  // get escrow wallet address and balance
  
  const [escrowBalance, setEscrowBalance] = useState(0);
  const [escrowNativeBalance, setEscrowNativeBalance] = useState(0);

  
  useEffect(() => {

    const getEscrowBalance = async () => {

      if (!address) {
        setEscrowBalance(0);
        return;
      }

      if (!escrowWalletAddress || escrowWalletAddress === '') return;


      /*
      const result = await balanceOf({
        contract,
        address: escrowWalletAddress,
      });

      console.log('escrowWalletAddress balance', result);

  
      setEscrowBalance( Number(result) / 10 ** 6 );
      */

      await fetch('/api/user/getUSDTBalanceByWalletAddress', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chain: params.chain,
          walletAddress: escrowWalletAddress,
        }),
      })
      .then(response => response?.json())
      .then(data => {

        console.log('getUSDTBalanceByWalletAddress data.result.displayValue', data.result?.displayValue);

        setEscrowBalance(data.result?.displayValue);

      } );




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
      .then(response => response?.json())
      .then(data => {


        ///console.log('getBalanceByWalletAddress data', data);


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

      setUser(null);
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
        
        /////console.log('data.result', data.result);


        setUser(data.result);

        setEscrowWalletAddress(data.result.escrowWalletAddress);


    })
    .catch((error) => {
        console.error('Error:', error);
    });
  } , [address]);



  const [isPlaying, setIsPlaying] = useState(false);
  //const [play, { stop }] = useSound(galaxySfx);
  const [play, { stop }] = useSound('/ding.mp3');

  function playSong() {
    setIsPlaying(true);
    play();
  }

  function stopSong() {
    setIsPlaying(false);
    stop();
  }






    const [isModalOpen, setModalOpen] = useState(false);

    const closeModal = () => setModalOpen(false);
    const openModal = () => setModalOpen(true);

    


    const [searchMyTrades, setSearchMyTrades] = useState(false);


    
    const [buyOrders, setBuyOrders] = useState<BuyOrder[]>([]);






    /* agreement for trade */
    const [agreementForTrade, setAgreementForTrade] = useState([] as boolean[]);
    for (let i = 0; i < 100; i++) {
        agreementForTrade.push(false);
    }
    /*
    useEffect(() => {
        setAgreementForTrade (
            buyOrders.map((item, idx) => {
                return false;
            })
        );
    } , [buyOrders]);
     */
    
    
    // initialize false array of 100
    const [acceptingBuyOrder, setAcceptingBuyOrder] = useState([] as boolean[]);
    for (let i = 0; i < 100; i++) {
        acceptingBuyOrder.push(false);
    }

   



   
    /*
    useEffect(() => {
        setAcceptingBuyOrder (
            buyOrders.map((item, idx) => {
                return false;
            })
        );
    } , [buyOrders]);
     */


    /*
    // sms receiver mobile number array
    const [smsReceiverMobileNumbers, setSmsReceiverMobileNumbers] = useState([] as string[]);
    useEffect(() => {
        setSmsReceiverMobileNumbers(
            buyOrders.map((item, idx) => {
                return user?.mobile || '';
            })
        );
    } , [buyOrders, user]);
    */

    const [smsReceiverMobileNumber, setSmsReceiverMobileNumber] = useState('');
    useEffect(() => {
        setSmsReceiverMobileNumber(phoneNumber);
    } , [phoneNumber]);



    const acceptBuyOrder = (
      index: number,
      orderId: string,
      smsNumber: string,
    ) => {

        if (!address) {
            toast.error('Please connect your wallet');
            return;
        }

        if (!escrowWalletAddress || escrowWalletAddress === '') {
          toast.error('Escrow wallet address is empty');
          return;
        }

        setAcceptingBuyOrder (
          acceptingBuyOrder.map((item, idx) => idx === index ? true : item)
        );


        fetch('/api/order/acceptBuyOrder', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                lang: params.lang,
                chain: params.chain,
                orderId: orderId,
                sellerWalletAddress: address,
                sellerNickname: user ? user.nickname : '',
                sellerAvatar: user ? user.avatar : '',

                //buyerMobile: user.mobile,

                sellerMobile: smsNumber,



                seller: user?.seller,

            }),
        })
        .then(response => response.json())
        .then(data => {

            console.log('data', data);

            //setBuyOrders(data.result.orders);
            //openModal();

            toast.success(Order_accepted_successfully);

            playSong();



            fetch('/api/order/getAllBuyOrdersForSeller', {
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
            })
            .then(response => response.json())
            .then(data => {
                ///console.log('data', data);
                setBuyOrders(data.result.orders);
            })



        })
        .catch((error) => {
            console.error('Error:', error);
        })
        .finally(() => {


            setAgreementForTrade (
              agreementForTrade.map((item, idx) => idx === index ? false : item)
            );


            setAcceptingBuyOrder (
                acceptingBuyOrder.map((item, idx) => idx === index ? false : item)
            );

        } );


    }



  // agreement for cancel trade
  const [agreementForCancelTrade, setAgreementForCancelTrade] = useState([] as boolean[]);
  for (let i = 0; i < 100; i++) {
    agreementForCancelTrade.push(false);
  }
  /*
  useEffect(() => {
    setAgreementForCancelTrade(
      buyOrders.map(() => false)
    );
  } , [buyOrders]);
   */






    // cancel sell order state
    const [cancellings, setCancellings] = useState([] as boolean[]);
    for (let i = 0; i < 100; i++) {
      cancellings.push(false);
    }
    /*
    useEffect(() => {
      setCancellings(buyOrders.map(() => false));
    }, [buyOrders]);
    */



    const cancelTrade = async (orderId: string, index: number) => {



      if (cancellings[index]) {
        return;
      }



      setCancellings(
        cancellings.map((item, i) => i === index ? true : item)
      );


      const response = await fetch('/api/order/cancelTradeBySeller', {
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

        playSong();


        await fetch('/api/order/getAllBuyOrdersForSeller', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(
            {
              walletAddress: address,
              searchMyTrades: searchMyTrades,
            }
          )
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


      setAgreementForCancelTrade(
        agreementForCancelTrade.map((item, i) => i === index ? false : item)
      );

      setCancellings(
        cancellings.map((item, i) => i === index ? false : item)
      );

    }









    // request payment check box
    const [requestPaymentCheck, setRequestPaymentCheck] = useState([] as boolean[]);
    for (let i = 0; i < 100; i++) {
      requestPaymentCheck.push(false);
    }

    /*
    useEffect(() => {
        
        setRequestPaymentCheck(
          new Array(buyOrders.length).fill(false)
        );
  
    } , [buyOrders]);
     */
    




    // array of escrowing
    const [escrowing, setEscrowing] = useState([] as boolean[]);
    for (let i = 0; i < 100; i++) {
      escrowing.push(false);
    }

    /*
    useEffect(() => {
        
        setEscrowing(
          new Array(buyOrders.length).fill(false)
        );
  
    } , [buyOrders]);
     */

    // array of requestingPayment
    const [requestingPayment, setRequestingPayment] = useState([] as boolean[]);
    for (let i = 0; i < 100; i++) {
      requestingPayment.push(false);
    }


    /*
    useEffect(() => {

      setRequestingPayment(

        new Array(buyOrders.length).fill(false)

      );

    } , [buyOrders]);
      */




    const requestPayment = async (
      index: number,
      orderId: string,
      tradeId: string,
      amount: number,
    ) => {


      // check escrowWalletAddress

      if (escrowWalletAddress === '') {
        toast.error('Recipient wallet address is empty');
        return;
      }

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
        escrowing.map((item, idx) =>  idx === index ? true : item) 
      );

   


      // send USDT
      // Call the extension function to prepare the transaction
      const transaction = transfer({
        contract,
        to: escrowWalletAddress,
        amount: amount,
      });
      


      try {


        /*
        const transactionResult = await sendAndConfirmTransaction({
            account: smartAccount as any,
            transaction: transaction,
        });

        //console.log("transactionResult===", transactionResult);
        */

        const { transactionHash } = await sendTransaction({
          
          account: activeAccount as any,

          transaction,
        });

        //console.log("transactionHash===", transactionHash);


        /*
        const transactionResult = await waitForReceipt({
          client,
          chain: params.chain === "arbitrum" ? arbitrum : polygon,
          maxBlocksWaitTime: 1,
          transactionHash: transactionHash,
        });


        console.log("transactionResult===", transactionResult);
        */
   

        // send payment request

        //if (transactionResult) {
        if (transactionHash) {

          
          setRequestingPayment(
            requestingPayment.map((item, idx) => idx === index ? true : item)
          );
          
          
          


        
          const response = await fetch('/api/order/buyOrderRequestPayment', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              lang: params.lang,
              chain: params.chain,
              orderId: orderId,
              //transactionHash: transactionResult.transactionHash,
              transactionHash: transactionHash,
            })
          });

          const data = await response.json();

          //console.log('/api/order/buyOrderRequestPayment data====', data);


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

            toast.success(Payment_request_has_been_sent);

            //toast.success('Payment request has been sent');

            playSong();
            

            
            //fetchBuyOrders();
            // fetch Buy Orders
            await fetch('/api/order/getAllBuyOrdersForSeller', {
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
            })
            .then(response => response.json())
            .then(data => {
                ///console.log('data', data);
                setBuyOrders(data.result.orders);
            })


            // refresh balance

            const result = await balanceOf({
              contract,
              address: address || "",
            });

            //console.log(result);

            setBalance( Number(result) / 10 ** 6 );


           

          } else {
            toast.error('Payment request has been failed');
          }

        }


      } catch (error) {
        console.error('Error:', error);

        toast.error('Payment request has been failed');
      }

      setRequestingPayment(
        requestingPayment.map((item, idx) => idx === index ? false : item)
      );

      setEscrowing(
        escrowing.map((item, idx) =>  idx === index ? false : item)
      );



    }










  // array of confirmingPayment

  const [confirmingPayment, setConfirmingPayment] = useState([] as boolean[]);
  for (let i = 0; i < 100; i++) {
    confirmingPayment.push(false);
  }

  /*
  useEffect(() => {
      
      setConfirmingPayment(
        new Array(buyOrders.length).fill(false)
      );

  } , [buyOrders]);
   */


  // confirm payment check box
  const [confirmPaymentCheck, setConfirmPaymentCheck] = useState([] as boolean[]);
  for (let i = 0; i < 100; i++) {
    confirmPaymentCheck.push(false);
  }

  /*
  useEffect(() => {
      
      setConfirmPaymentCheck(
        new Array(buyOrders.length).fill(false)
      );

  } , [buyOrders]);
    */




  // payment amoount array
  const [paymentAmounts, setPaymentAmounts] = useState([] as number[]);
  useEffect(() => {

    // default payment amount is from sellOrders krwAmount
      
    setPaymentAmounts(
      buyOrders.map((item) => item.krwAmount)
      );

  } , [buyOrders]);

  const [paymentAmountsUsdt, setPaymentAmountsUsdt] = useState([] as number[]);
  useEffect(() => {

    // default payment amount is from sellOrders krwAmount
      
    setPaymentAmountsUsdt(
      buyOrders.map((item) => item.usdtAmount)
      );

  } , [buyOrders]);



  // confirm payment
  const confirmPayment = async (

    index: number,
    orderId: string,
    paymentAmount: number,
    paymentAmountUsdt: number,

  ) => {
    // confirm payment
    // send usdt to buyer wallet address


    // if escrowWalletAddress balance is less than paymentAmount, then return

    //console.log('escrowBalance', escrowBalance);
    //console.log('paymentAmountUsdt', paymentAmountUsdt);
    
    if (escrowBalance < paymentAmountUsdt) {
      toast.error(Escrow_balance_is_less_than_payment_amount);
      return;
    }
    
    // if escrowNativeBalance is less than 0.1, then return
    if (escrowNativeBalance < 0.1) {
      toast.error('POL balance is less than 0.1');
      return;
    }



    if (confirmingPayment[index]) {
      return;
    }

    setConfirmingPayment(
      confirmingPayment.map((item, idx) =>  idx === index ? true : item)
    );


    try {

      const response = await fetch('/api/order/buyOrderConfirmPayment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          lang: params.lang,
          chain: params.chain,
          orderId: orderId,
          paymentAmount: paymentAmount,
          ///isSmartAccount: activeWallet === inAppConnectWallet ? false : true,
          isSmartAccount: false,
        })
      });

      const data = await response.json();

      //console.log('data', data);

      if (data.result) {
        
        ///fetchBuyOrders();

        // fetch Buy Orders
        await fetch('/api/order/getAllBuyOrdersForSeller', {
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
        })
        .then(response => response.json())
        .then(data => {
            ///console.log('data', data);
            setBuyOrders(data.result.orders);
        })



        toast.success(Payment_has_been_confirmed);

        playSong();


      } else {
        toast.error('Payment has been failed');
      }

    } catch (error) {
      console.error('Error:', error);
      toast.error('Payment has been failed');
    }


    setConfirmingPayment(
      confirmingPayment.map((item, idx) => idx === index ? false : item)
    );

    setConfirmPaymentCheck(
      confirmPaymentCheck.map((item, idx) => idx === index ? false : item)
    );
  

  }



  
  // array of rollbackingPayment
  const [rollbackingPayment, setRollbackingPayment] = useState([] as boolean[]);
  for (let i = 0; i < 100; i++) {
    rollbackingPayment.push(false);
  }
  /*
  useEffect(() => {
      
      setRollbackingPayment(
        new Array(buyOrders.length).fill(false)
      );

  } , [buyOrders]);
   */

  // rollback payment check box
  const [rollbackPaymentCheck, setRollbackPaymentCheck] = useState([] as boolean[]);
  for (let i = 0; i < 100; i++) {
    rollbackPaymentCheck.push(false);
  }
  /*
  useEffect(() => {
      
      setRollbackPaymentCheck(
        new Array(buyOrders.length).fill(false)
      );

  } , [buyOrders]);
   */


  // rollback payment
  const rollbackPayment = async (

    index: number,
    orderId: string,
    paymentAmount: number,
    paymentAmountUsdt: number,

  ) => {
    // rollback payment
    // send usdt to seller wallet address

    if (rollbackingPayment[index]) {
      return;
    }


    // if escrowWalletAddress balance is less than paymentAmount, then return
    if (escrowBalance < paymentAmountUsdt) {
      toast.error(Escrow_balance_is_less_than_payment_amount);
      return;
    }

    // if escrowNativeBalance is less than 0.1, then return
    if (escrowNativeBalance < 0.1) {
      toast.error('POL balance is less than 0.1');
      return;
    }
    


    setRollbackingPayment(
      rollbackingPayment.map((item, idx) => idx === index ? true : item)
    );


    try {

      const response = await fetch('/api/order/buyOrderRollbackPayment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          lang: params.lang,
          chain: params.chain,
          orderId: orderId,
          paymentAmount: paymentAmount,
          ///isSmartAccount: activeWallet === inAppConnectWallet ? false : true,
          isSmartAccount: false,
        })
      });

      const data = await response.json();

      //console.log('data', data);

      if (data.result) {


        toast.success('Payment has been rollbacked');

        playSong();

        
        ///fetchBuyOrders();

        // fetch Buy Orders
        await fetch('/api/order/getAllBuyOrdersForSeller', {
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
        })
        .then(response => response.json())
        .then(data => {
            ///console.log('data', data);
            setBuyOrders(data.result.orders);
        })

      }

    } catch (error) {
      console.error('Error:', error);
      toast.error('Rollback payment has been failed');
    }



    setRollbackingPayment(
      rollbackingPayment.map((item, idx) => idx === index ? false : item)
    );

    setRollbackPaymentCheck(
      rollbackPaymentCheck.map((item, idx) => idx === index ? false : item)
    );


  }








  const [latestBuyOrder, setLatestBuyOrder] = useState<BuyOrder | null>(null);


  useEffect(() => {


    const fetchBuyOrders = async () => {

      //console.log('fetchBuyOrders===============>');
      //console.log("address=", address);
      //console.log("searchMyTrades=", searchMyTrades);


      //console.log('acceptingBuyOrder', acceptingBuyOrder);
      //console.log('escrowing', escrowing);
      //console.log('requestingPayment', requestingPayment);
      //console.log('confirmingPayment', confirmingPayment);



      // check all agreementForTrade is false

      if (
        //!address || !searchMyTrades
        agreementForTrade.some((item) => item === true)
        || acceptingBuyOrder.some((item) => item === true)
        || agreementForCancelTrade.some((item) => item === true)
        || confirmPaymentCheck.some((item) => item === true)
        || rollbackPaymentCheck.some((item) => item === true)
        || acceptingBuyOrder.some((item) => item === true)
        || escrowing.some((item) => item === true)
        || requestingPayment.some((item) => item === true)
        || confirmingPayment.some((item) => item === true)
        || rollbackingPayment.some((item) => item === true)
      ) {
        return;
      }


      

      const response = await fetch('/api/order/getAllBuyOrdersForSeller', {
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

      //console.log('data', data);


      // if data.result is different from buyOrders
      // check neweset order is different from buyOrders
      // then toasts message
      //console.log('data.result.orders[0]', data.result.orders?.[0]);
      //console.log('buyOrders[0]', buyOrders);


      //console.log('buyOrders[0]', buyOrders?.[0]);

      if (data.result.orders?.[0]?._id !== latestBuyOrder?._id) {

        setLatestBuyOrder(data.result.orders?.[0] || null);

   
        
        //toast.success(Newest_order_has_been_arrived);
        toast.success('Newest order has been arrived');




        // <audio src="/racing.mp3" typeof="audio/mpeg" autoPlay={soundStatus} muted={!soundStatus} />
        // audio play

        //setSoundStatus(true);

        // audio ding play

        playSong();

        // Uncaught (in promise) NotAllowedError: play() failed because the user didn't interact with the document first.


      }

      setBuyOrders(data.result.orders);
      


    }


    fetchBuyOrders();

    
    
    const interval = setInterval(() => {

      fetchBuyOrders();


    }, 3000);


    return () => clearInterval(interval);
    
    
    
    


  } , [address, searchMyTrades,
    agreementForTrade,
    acceptingBuyOrder,
    escrowing,
    requestingPayment,
    confirmingPayment,
    rollbackingPayment,
    agreementForCancelTrade,
    confirmPaymentCheck,
    rollbackPaymentCheck,

    latestBuyOrder,
    //playSong,
]);


///console.log('agreementForTrade', agreementForTrade);



  const reload = () => {

    console.log('agreementForTrade', agreementForTrade.some((item) => item === true));
    console.log('acceptingBuyOrder', acceptingBuyOrder.some((item) => item === true));
    console.log('escrowing', escrowing.some((item) => item === true));
    console.log('requestingPayment', requestingPayment.some((item) => item === true));
    console.log('confirmingPayment', confirmingPayment.some((item) => item === true));



    if (!address
      || agreementForTrade.some((item) => item === true)
      || acceptingBuyOrder.some((item) => item === true)
      || escrowing.some((item) => item === true)
      || requestingPayment.some((item) => item === true)
      || confirmingPayment.some((item) => item === true)
    ) {
      return;
    }


    fetch('/api/order/getAllBuyOrdersForSeller', {
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
    })
    .then(response => response.json())
    .then(data => {
        ///console.log('data', data);
        setBuyOrders(data.result.orders);
    })

  }






  


    // check table view or card view
    const [tableView, setTableView] = useState(false);




    const [storeCodeNumber, setStoreCodeNumber] = useState('');

    useEffect(() => {
  
      const fetchStoreCode = async () => {
  
        const response = await fetch('/api/order/getStoreCodeNumber', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });
  
        const data = await response.json();
  
        //console.log('getStoreCodeNumber data', data);
  
        setStoreCodeNumber(data?.storeCodeNumber);
  
      }
  
      fetchStoreCode();
  
    } , []);
    


    return (

      <main className="p-4 pb-10 min-h-[100vh] flex items-start justify-center container max-w-screen-lg mx-auto">


        <div className="py-0 w-full">

          <AppBarComponent />

          <Header
            agent={agent || ''}
            tokenId={agentNumber || ''}
          />

          {/* store code number */}
          {/*
          <div className="w-full flex flex-row gap-2 items-center justify-start text-zinc-300 text-lg font-se"
          >
            SC: {storeCodeNumber}
          </div>
          */}

  
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
                    USDT 구매 접수
                  </div>

              </div>


                {/* check box for Native Wallet */}
                {/*
                {address && (
                  <div className="flex flex-row items-center gap-2">
                    <input
                      disabled={true}
                      type="checkbox"
                      checked={
                        activeWallet === inAppConnectWallet
                      }
                      onChange={(e) => 
                        ///e.target.checked ? setActiveAccount(inAppConnectWallet) : setActiveAccount(smartConnectWallet)

                        e.target.checked ?
                        router.push( window.location.pathname )
                        :
                        router.push( window.location.pathname  + '?wallet=smart' )

                      } 
                      className="w-5 h-5"
                    />
                    <label className="text-sm text-zinc-400">Pro Wallet</label>
                  </div>
                )}
                */}



                <div className="w-full flex flex-col xl:flex-row items-start justify-between gap-3">

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
                              toast.success(Copied_Wallet_Address);
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

                        {/*
                        {activeWallet === inAppConnectWallet && (
                          <div className="flex flex-row items-center gap-2 text-xs ">
                            {nativeBalance && Number(nativeBalance).toFixed(4)}{' '}POL
                          </div>
                        )}
                        */}

                      </div>

                    )}

                  </div>

                  {/* escrow usdt balance */}
                  {escrowWalletAddress ? (

                    <div className="flex flex-row items-start gap-3">

                      <div className="flex flex-col gap-2 items-start">
                        
                        <div className="flex flex-col items-between gap-2">
                          <span className="text-sm">
                            {Escrow}
                          </span>
                          {/* my escrow count */}
                          
                          <span className="text-4xl text-zinc-400">
                            {
                              // get my escrow count from buyOrders
                              // walletAddress === address
                              // and status === 'paymentRequested'

                              buyOrders.filter((item) => item?.seller?.walletAddress === address && item.status === 'paymentRequested').length

                            }{' '}EA
                          </span>
                        </div>

                        <div className="hidden flex-row items-end justify-center  gap-2">
                          <span className="text-4xl font-semibold text-white">
                            {Number(escrowBalance).toFixed(2)}
                          </span>
                          <span className="text-lg">USDT</span>
                        </div>


                      </div>

                      <div className="flex flex-col gap-2 items-center
                        border border-zinc-400 rounded-md p-2">
                        {/* excrow wallet address */}
                        <div className="flex flex-row items-center gap-2">
                          <button
                            className="text-sm text-zinc-400 underline"
                            onClick={() => {
                              navigator.clipboard.writeText(escrowWalletAddress);
                              toast.success(Copied_Wallet_Address);
                            } }
                          >
                            {escrowWalletAddress.substring(0, 6)}...{escrowWalletAddress.substring(escrowWalletAddress.length - 4)}
                          </button>
                        </div>

                        {/*
                        {activeWallet === inAppConnectWallet && (
                          <div className="flex flex-row items-center gap-2 text-xs ">
                            {escrowNativeBalance && Number(escrowNativeBalance).toFixed(4)}{' '}POL
                          </div>
                        )}
                        */}

                      </div>

                    </div>
                  ) : (
                    <>
                      {user && (
                        <div className="text-xl font-semibold text-white">
                          {/* Get Escrow Wallet Address */}
                          {/*
                          <button
                            onClick={() => {
                              makeEscrowWallet();
                            }}

                            className={`
                              ${makeingEscrowWallet ? 'bg-zinc-600' : 'bg-green-500'}
                              px-2 py-1 rounded-md  
                            `}
                          >
                            <div className="flex flex-row items-center gap-2">
                              {makeingEscrowWallet ? (
                                <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-zinc-100"></div>
                              ) : (
                                <div className="text-sm">
                                  {Make_Escrow_Wallet}
                                </div>
                              )}
                            </div>
                          </button>
                          */}
                        </div>
                      )}
                    </>
                  )}

                </div>


                <div className="w-full flex flex-row items-start justify-between gap-2">

                  <div className=" flex flex-row items-start  gap-2">


                    <div className="flex flex-col gap-2 items-start justify-end">



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


                  <div className="ml-10 flex flex-col items-center gap-2">
                    {/* reload button */}
                    {/*
                    <button
                      className="text-sm bg-zinc-800 px-2 py-1 rounded-md"
                      onClick={() => {

                        reload();

                      }}
                    >
                      Reload
                    </button>
                    */}

                    {/* select table view or card view */}
                    {/*
                    <div className="flex flex-row items-center space-x-4">
                        <div className="text-sm">{Table_View}</div>
                        <input
                          type="checkbox"
                          checked={tableView}
                          onChange={(e) => setTableView(e.target.checked)}
                          className="w-5 h-5 rounded-full"
                        />
                    </div>
                    */}

                  </div>



                  <div className="flex flex-row items-start gap-5">


                    <div className="flex flex-col gap-2 items-center">
                      <div className="text-sm">{Total}</div>
                      <div className="text-xl font-semibold text-gray-800">
                        {buyOrders.length} 
                      </div>
                    </div>



                    {/*}
                    <div className="flex flex-col gap-2 items-center">
                      <div className="text-sm">
                        {Buy_Order_Accept}
                      </div>
                      <div className="text-xl font-semibold text-white">
                        {buyOrders.filter((item) => item.status === 'accepted').length}
                      </div>
                    </div>
                    */}

                    <div className="flex flex-col gap-2 items-center">
                      <div className="text-sm">{Trades}</div>
                      <div className="text-xl font-semibold text-gray-800">

                        {
                          buyOrders.filter((item) => item.status === 'accepted' || item.status === 'paymentRequested').length

                        }

                      </div>
                    </div>

                    {/* buy order status */}
                    <div className="flex flex-col gap-2 items-center">
                      <div className="text-sm">{Buy_Order_Opened}</div>
                      <div className="text-4xl font-semibold text-gray-800">
                        {buyOrders.filter((item) => item.status === 'ordered').length}
                      </div>
                    </div>





                  </div>







                </div>



                {/* table view is horizontal scroll */}
                {tableView ? (


                  <div className="w-full overflow-x-auto">

                    <table className=" w-full table-auto border-collapse border border-zinc-800 rounded-md">

                      <thead
                        className="bg-zinc-800 text-white text-xs"
                      >
                        <tr>
                          <th className="p-2">{Buy_Order_Opened}</th>
                          <th className="p-2">{Deposit_Name} / {Buyer}</th>
                          <th className="p-2">{TID}</th>
                          <th className="p-2">{Price} / {Buy_Amount} / {Rate}</th>
                          <th className="p-2">{Payment}</th>
                          <th className="p-2">{Payment_Amount}</th>
                          <th className="p-2">{Status}</th>
                          <th className="p-2">{Trades}</th>
                        </tr>
                      </thead>

                      <tbody>
                        {buyOrders.map((item, index) => (
                          <tr key={index} className={`
                            ${index % 2 === 0 ? 'bg-zinc-700' : 'bg-zinc-800'}
                          `}>

                            <td className="p-2">
                              <div className="text-sm text-white font-semibold ">
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
                                  }</p>
                                ) : (
                                  <p>{
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
                                {/*
                                <Image
                                  src={item.avatar || "/profile-default.png"}
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
                                */}
                                <div className="flex flex-col gap-2 items-start">

                                  <div className="text-lg text-yellow-500 font-semibold">
                                    {
                                      //item.walletAddress === address ? 'Me' : item.tradeId ? item.tradeId : ''

                                      item.walletAddress === address ? 'Me' :

                                      item?.buyer?.depositBankName + ' ' + item?.buyer?.depositName

                                    }
                                  </div>
                                  <div className="text-xs font-semibold text-white">
                                    {item.walletAddress === address ? 'Me' : item?.nickname}
                                  </div>

                                </div>
                              </div>
                            </td>

                            <td className="text-blue-500 text-lg font-semibold">
                              {item.status !== 'ordered' &&
                                item.tradeId
                              }
                            </td>

                            <td className="p-2">
                              <div className="flex flex-col gap-1">
                                <span className="text-lg text-yellow-500 font-semibold">
                                  {Number(item.krwAmount).toLocaleString('ko-KR', {
                                    style: 'currency',
                                    currency: 'KRW',
                                  })}
                                </span>
                                <span className="text-sm">{item.usdtAmount}{' '}USDT</span>
                                <span className="text-xs">
                                  {
                                    Number(item.rate).toFixed(2)
                                    //Number(item.krwAmount / item.usdtAmount).toFixed(2)
                                  }
                                </span>
                              </div>
                            </td>


                            <td className="p-2">
                              <div className="flex flex-col gap-2 items-start justify-start">
                                <div className="text-xs font-semibold text-white">
                                  {item.seller?.bankInfo?.bankName}
                                </div>
                                <div className="text-xs font-semibold text-white">
                                  {item.seller?.bankInfo?.accountNumber}
                                </div>
                                <div className="text-xs font-semibold text-white">
                                  {item.seller?.bankInfo?.accountHolder}
                                </div>
                              </div>
                            </td>


                            <td className="p-2">
                              <div className="flex mr-2 text-right">
                                {

                                  item.status === 'paymentConfirmed' ? (

                                    <div className=" text-green-500 text-xl font-semibold">
                                      {item.krwAmount}
                                    </div>

                                  ) : item.status === 'paymentRequested' ? (
                                    <input
                                      disabled={true}
                                      type="number"
                                      value={paymentAmounts[index]}
                                      onChange={(e) => {
                                        setPaymentAmounts(
                                          paymentAmounts.map((item, idx) => idx === index ? Number(e.target.value) : item)
                                        );
                                      }}
                                      className="w-20 h-8 rounded-md text-right text-white text-lg text-semibold"
                                    />
                                  ) : (
                                    <></>
                                  )

                                }
                              </div>
                            </td>

                            <td className="p-2">
                              <div className="flex flex-row items-center gap-2">
                                {/* status */}
                                {item.status === 'ordered' && (
                                  <div className="text-lg text-yellow-500 font-semibold">
                                    {Buy_Order_Opened}
                                  </div>
                                )}


                                {item.status === 'accepted' && (

                                  <div className="flex flex-col gap-1 items-start justify-start">
                                    <div className="text-lg text-green-500">
                                      {Trade_Started}
                                    </div>
                                    <div className="text-sm text-white">
                                      {item.seller?.nickname}
                                    </div>
                                    <div className="text-sm text-white">

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
                                        }</p>
                                      ) : (
                                        <p>{
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


                                  </div>
                                )}

                                {item.status === 'paymentRequested' && (
                                  <div className="flex flex-col gap-1 items-start justify-start">
                                    <div className="text-lg text-green-500">
                                      {/*Waiting_for_seller_to_deposit*/}

                                      {Escrow_Completed}


                                    </div>
                                    <div className="text-sm text-white">
                                      {item.seller?.nickname}
                                    </div>

                                    <div className="text-sm text-white">
                                      {/* from now */}
                                      {
                                        new Date().getTime() - new Date(item.paymentRequestedAt).getTime() < 1000 * 60 ? (
                                          ' ' + Math.floor((new Date().getTime() - new Date(item.paymentRequestedAt).getTime()) / 1000) + ' ' + seconds_ago
                                        ) : new Date().getTime() - new Date(item.paymentRequestedAt).getTime() < 1000 * 60 * 60 ? (
                                          ' ' + Math.floor((new Date().getTime() - new Date(item.paymentRequestedAt).getTime()) / 1000 / 60) + ' ' + minutes_ago
                                        ) : (
                                          ' ' + Math.floor((new Date().getTime() - new Date(item.paymentRequestedAt).getTime()) / 1000 / 60 / 60) + ' ' + hours_ago
                                        )
                                      }
                                    </div>


                                  </div>
                                )}

                                {item.status === 'cancelled' && (
                                  <div className="flex flex-col gap-1 items-start justify-start">
 
                                      <div className="text-lg text-red-600">
                                        {
                                          Cancelled_at
                                        }
                                      </div>
                                      <span className="text-sm text-white">
                                        {item.seller?.nickname}
                                      </span>

                                      <div className="text-sm text-white">
                                        {
                                          // from now
                                          new Date().getTime() - new Date(item.cancelledAt).getTime() < 1000 * 60 ? (
                                            ' ' + Math.floor((new Date().getTime() - new Date(item.cancelledAt).getTime()) / 1000) + ' ' + seconds_ago
                                          ) : new Date().getTime() - new Date(item.cancelledAt).getTime() < 1000 * 60 * 60 ? (
                                            ' ' + Math.floor((new Date().getTime() - new Date(item.cancelledAt).getTime()) / 1000 / 60) + ' ' + minutes_ago
                                          ) : (
                                            ' ' + Math.floor((new Date().getTime() - new Date(item.cancelledAt).getTime()) / 1000 / 60 / 60) + ' ' + hours_ago
                                          )
                                        }
                                      </div>

                                  </div>
                                )}


                                {/* if status is accepted, show payment request button */}
                                {item.status === 'paymentConfirmed' && (
                                  <div className="flex flex-col gap-1">

                                    <span className="text-lg font-semibold text-green-500">
                                      {Completed}
                                    </span>
                                    <span className="text-sm font-semibold text-white">
                                      {item.seller?.nickname}
                                    </span>

                                    <span
                                      className="text-sm text-white"
                                    >{
                                      //item.paymentConfirmedAt && new Date(item.paymentConfirmedAt).toLocaleString()
                                      // from now
                                      new Date().getTime() - new Date(item.paymentConfirmedAt).getTime() < 1000 * 60 ? (
                                        ' ' + Math.floor((new Date().getTime() - new Date(item.paymentConfirmedAt).getTime()) / 1000) + ' ' + seconds_ago
                                      ) : new Date().getTime() - new Date(item.paymentConfirmedAt).getTime() < 1000 * 60 * 60 ? (
                                        ' ' + Math.floor((new Date().getTime() - new Date(item.paymentConfirmedAt).getTime()) / 1000 / 60) + ' ' + minutes_ago
                                      ) : (
                                        ' ' + Math.floor((new Date().getTime() - new Date(item.paymentConfirmedAt).getTime()) / 1000 / 60 / 60) + ' ' + hours_ago
                                      )

                                    }</span>
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

                              <div className="flex flex-col gap-2 items-start justify-start">

                                {item.status === 'accepted' && item.seller && item.seller.walletAddress !== address && (
                                  <span className="text-sm text-white">
                                    {item.seller.nickname}
                                  </span>
                                )}

                                {item.status === 'accepted' && item.seller && item.seller.walletAddress === address && (
                                  
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
                   
                                      className={`flex flex-row gap-1 text-xs text-white px-2 py-1 rounded-md ${cancellings[index] || !agreementForCancelTrade[index] ? 'bg-gray-500' : 'bg-red-500'}`}
                                        
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
                                      
                                      <span className="text-xs">{Cancel_My_Trade}</span>
                                    
                                    </button>
                                  </div>

                                )}





                                {user && user.seller &&
                                item.status === 'ordered' && item.walletAddress !== address && (
                                  
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
                                      disabled={acceptingBuyOrder[index] || !agreementForTrade[index]}
                                      className={`
                                        flex flex-row gap-1 text-xs text-white px-2 py-1 rounded-md
                                        ${acceptingBuyOrder[index] || !agreementForTrade[index] ?
                                          'bg-zinc-500 text-white' : 'bg-green-500 text-white '}
                                      `}
                                      onClick={() => {
                                        acceptBuyOrder(index, item._id, smsReceiverMobileNumber);
                                      }}
                                    >
                                      {acceptingBuyOrder[index] && (
                                        <Image
                                          src="/loading.png"
                                          alt="Loading"
                                          width={20}
                                          height={20}
                                          className="animate-spin"
                                        />
                                      )}
                                      <span className="text-xs">{Buy_Order_Accept}</span>
                                      
                                    </button>
                                  </div>

                                )}






                                
                                {
                                  item.seller && item.seller.walletAddress === address &&
                                  item.status === 'accepted' && (
                                  <div className="flex flex-row gap-2">

                                    {/* check box for agreement */}
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
                                      <span className="text-xs">
                                        {Request_Payment}
                                      </span>
                                    
                                    </button>

                                  </div>
                                )}










                                {item.seller && item.seller.walletAddress === address &&   
                                item.status === 'paymentRequested' && (

                                  <div className="flex flex-col gap-2">

                               
                                    
                                    <div className="flex flex-row gap-2">

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
                                            paymentAmounts[index],
                                            paymentAmountsUsdt[index]
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
                                        <span className="text-xs">
                                          {Confirm_Payment}
                                        </span>

                                      </button>

                                    </div>



                                    <div className="flex flex-row gap-2">

                                      <input
                                        disabled={rollbackingPayment[index]}
                                        type="checkbox"
                                        checked={rollbackPaymentCheck[index]}
                                        onChange={(e) => {
                                          setRollbackPaymentCheck(
                                            rollbackPaymentCheck.map((item, idx) => {
                                              if (idx === index) {
                                                return e.target.checked;
                                              }
                                              return item;
                                            })
                                          );
                                        }}
                                      />

                                      <button
                                        disabled={rollbackingPayment[index] || !rollbackPaymentCheck[index]}
                                        className={`flex flex-row gap-1 text-xs text-white px-2 py-1 rounded-md ${rollbackingPayment[index] || !rollbackPaymentCheck[index] ? 'bg-gray-500' : 'bg-red-500'}`}
                                        onClick={() => {
                                          rollbackPayment(
                                            index,
                                            item._id,
                                            paymentAmounts[index],
                                            paymentAmountsUsdt[index]
                                          );
                                        }}

                                      >
                                          
                                          <Image
                                            src="/loading.png"
                                            alt="loading"
                                            width={16}
                                            height={16}
                                            className={rollbackingPayment[index] ? 'animate-spin' : 'hidden'}
                                          />
                                          <span className="text-xs">
                                            에스크로 취소
                                          </span>

                                      </button>

                                    </div>


                                  </div>

                                



                                )}

                                

                              </div>






                            </td>

                          </tr>

                        ))}

                      </tbody>

                    </table>

                  </div>


                ) : (

                  <div className="w-full grid gap-4 lg:grid-cols-2 xl:grid-cols-3 justify-center ">

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
                              //key={index}
                              className={` w-96 xl:w-full h-full relative
                                ${item.walletAddress === address ? 'border-green-500' : 'border-gray-200'}

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
                                          }{' '}{Buy_Order_Opened} 

                                        </p>
                                        
                                        ) : (

                                          <p className="text-sm text-zinc-400">


                                        
                                          {Buy_Order_Opened}{' '}{

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
                                {Payment}: {Bank_Transfer} ({item.seller?.bankInfo?.bankName})
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

                                  <div className="flex flex-col gap-2 items-start">
                                    <div className="flex items-center space-x-2">{Buyer}:</div>

                                    <div className="text-sm font-semibold">
                                      {item.walletAddress === address ? 'Me' : item.nickname}
                                    </div>
                                    <div className="text-lg text-green-500">
                                      {item.buyer?.depositName}
                                    </div>
                                  </div>

                                  <Image
                                    src="/verified.png"
                                    alt="Verified"
                                    width={20}
                                    height={20}
                                    className="rounded-lg"
                                  />

                                  <Image
                                    src="/best-buyer.png"
                                    alt="Best Buyer"
                                    width={20}
                                    height={20}
                                    className="rounded-lg"
                                  />

                                </p>


                                {address && item.walletAddress !== address && item?.buyer && item?.buyer?.walletAddress === address && (
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
                                    {Chat_with_Buyer + ' ' + item.nickname}
                                  </button>
                                )}


                              </div>




                              {/* buyer cancelled the trade */}
                              {item.status === 'cancelled' && (
                                <div className="mt-4 flex flex-col gap-2 items-start justify-center">
                                  <div className="flex flex-row items-center gap-2">
                                    <Image
                                      src={item?.buyer?.avatar || "/profile-default.png"}
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
                                        address && item?.buyer?.walletAddress === address ? Me :
                                        address && item?.buyer?.nickname ? item?.buyer?.nickname : Anonymous
                                      }
                                    </p>
  
                                  </div>


                                </div>
                              )}



                              {(item.status === 'accepted' || item.status === 'paymentRequested') && (
                          
                                <div className="mt-4 flex flex-row items-center gap-2">
                                  <Image
                                    src={item.seller?.avatar || "/profile-default.png"}
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
                                    {Seller}: {
                                      item.seller?.walletAddress === address ? Me :
                                      item.seller?.nickname.substring(0, 1) + '***'
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





                                  {item.buyer?.walletAddress === address && (

                                    <div className="mt-4 flex flex-col items-center justify-center gap-2">



                                      <div className="flex flex-row items-center gap-2">
                                        <input
                                          type="checkbox"
                                          checked={agreementForCancelTrade[index]}
                                          onChange={(e) => {
                                            setAgreementForCancelTrade(
                                              buyOrders.map((item, idx) => {
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



                              {/* if status is accepted, show payment request button */}
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

                              {
                              item.seller && item.seller.walletAddress === address &&
                              item.status === 'accepted' && (
                                <div className="flex flex-row gap-1">

                                  {/* check box for agreement */}
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

                                {acceptingBuyOrder[index] ? (

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
                                          <>

                                            {user?.seller && user?.seller?.bankInfo && (

                

                                              <div className="mt-4 flex flex-col items-center justify-center">

                                                {/* agreement for trade */}
                                                <div className="flex flex-row items-center space-x-2">
                                                  <input
                                                    disabled={!address}
                                                    type="checkbox"
                                                    checked={agreementForTrade[index]}
                                                    onChange={(e) => {
                                                        setAgreementForTrade(
                                                            buyOrders.map((item, idx) => {
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
        
                                                      acceptBuyOrder(index, item._id, smsReceiverMobileNumber);
                                                

                                                  }}
                                                >
                                                  {Buy_Order_Accept} {item.usdtAmount} USDT
                                                </button>


                                              </div>

                                            )}

                                          </>

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
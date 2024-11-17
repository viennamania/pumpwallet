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
import { add } from 'thirdweb/extensions/farcaster/keyGateway';


import { useSearchParams } from "next/navigation";



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

 
 
/*
// random deposit name
// korean your name
const randomDepositName = [
  '김철수', 
  '이영희',
  '박영수',
  '정미영',
  '오재원',
  '최지연',
  '강민수',
  '윤지원',
  '서동훈',
  '신미정',
  '조영호',
  '임지은',
  '한상훈',
  '황미정',
  '백성호',
  '전지은',
  '고상훈',
  '권미정',
  '문성호',
  '송지은',
  '류상훈',
  '안미정',
  '손성호',
  '홍지은',
  '이상훈',
  '김미정',
  '박성호',
  '이지은',
  '최상훈',
  '정미정',
  '오성호',
  '윤지은',
];

// random korea bank name
const koreanBankName = [
  '국민은행',
  '신한은행',
  '우리은행',
  '하나은행',
  '기업은행',
  '농협은행',
  '외환은행',
  'SC제일은행',
  '씨티은행',
  '대구은행',
  '부산은행',
  '경남은행',
  '광주은행',
  '전북은행',
  '제주은행',
  '새마을금고',
  '신협',
  '우체국',
  '카카오뱅크',
  '케이뱅크',
];

*/
  
 


export default function Index({ params }: any) {

    //console.log('params', params);

    // get params

    const searchParams = useSearchParams();

    const storeUser = searchParams.get('storeUser');

    console.log('storeUser', storeUser);


    const storecode = storeUser?.split('@').slice(-1)[0];
    const memberid = storeUser?.split('@').slice(0, -1).join('@');

  

    const paramDepositName = searchParams.get('depositName');
    const paramDepositBankName = searchParams.get('depositBankName');
    





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

      Nickname_should_be_5_10_characters: "",

      You_must_have_a_wallet_address_to_buy_USDT: "",
      Make_Wallet_Address: "",

      My_Wallet_Address: "",

      PRICE_10000_KRW: "",
      PRICE_50000_KRW: "",
      PRICE_100000_KRW: "",
      PRICE_300000_KRW: "",
      PRICE_500000_KRW: "",
      PRICE_1000000_KRW: "",
      PRICE_5000000_KRW: "",
      PRICE_10000000_KRW: "",

      Please_keep_Your_Wallet_address_safe: "",

      Waiting_for_the_USDT_to_be_sent_to_the_store_address: "",
      Successfully_sent_USDT_to_the_store_address: "",

      Order_accepted_successfully: "",

      Order_Opened: "",
      Trade_Started: "",

      When_the_deposit_is_completed: "",

      Completed_at: "",

      Please_enter_deposit_name: "",

      Copy: "",

      Your_wallet_address_is_copied: "",

      Charge: "",

      Deposit_name_description: "",

      Deposit_Confirmed: "",

      Account_number_has_been_copied: "",

      Payment_name_has_been_copied: "",

      Payment_amount_has_been_copied: "",


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

      Nickname_should_be_5_10_characters,

      You_must_have_a_wallet_address_to_buy_USDT,
      Make_Wallet_Address,

      My_Wallet_Address,

      PRICE_10000_KRW,
      PRICE_50000_KRW,
      PRICE_100000_KRW,
      PRICE_300000_KRW,
      PRICE_500000_KRW,
      PRICE_1000000_KRW,
      PRICE_5000000_KRW,
      PRICE_10000000_KRW,

      Please_keep_Your_Wallet_address_safe,

      Waiting_for_the_USDT_to_be_sent_to_the_store_address,
      Successfully_sent_USDT_to_the_store_address,

      Order_accepted_successfully,

      Order_Opened,
      Trade_Started,

      When_the_deposit_is_completed,

      Completed_at,

      Please_enter_deposit_name,

      Copy,

      Your_wallet_address_is_copied,

      Charge,

      Deposit_name_description,

      Deposit_Confirmed,

      Account_number_has_been_copied,

      Payment_name_has_been_copied,

      Payment_amount_has_been_copied,

    } = data;
   
 
 
 
 
  const router = useRouter();
    

  const orderId = params.orderId as string;

  
  console.log('orderId', orderId);


 

    // get the active wallet
    const activeWallet = useActiveWallet();




  const smartAccount = useActiveAccount();


  //const address = smartAccount?.address || "";

  const [address, setAddress] = useState(
    smartAccount?.address || ""
  );




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
        .then(response => response?.json())
        .then(data => {
            
          console.log('getUser data', data);


          setUser(data.result);

        })
        .catch((error) => {
            console.error('Error:', error);
        });
    } , [address]);



    // nickname




    const [nickname, setNickname] = useState(storeUser);

    const [inputNickname, setInputNickname] = useState('');









    const fetchWalletAddress = async (
      paramNickname: string
    ) => {

      if (nickname) {
        return;
      }


      const mobile = '010-1234-5678';


      const response = await fetch('/api/user/setUserWithoutWalletAddress', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nickname: paramNickname,
          mobile: mobile,
        }),
      });
  
      const data = await response?.json();
  
      console.log('setUserWithoutWalletAddress data', data);

      if (!data.walletAddress) {

        toast.error('User registration has been failed');
        return;
      }

      const walletAddress = data.walletAddress;

      setAddress(walletAddress);

      setNickname(paramNickname);


    }

 

    useEffect(() => {



      const fetchWalletAddress = async ( ) => {
  
        if (!nickname) {
          return;
        }
  
  
        const mobile = '010-1234-5678';
  
  
        const response = await fetch('/api/user/setUserWithoutWalletAddress', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            nickname: nickname,
            mobile: mobile,
          }),
        });
    
        const data = await response?.json();
    
        console.log('setUserWithoutWalletAddress data', data);
  
        if (!data.walletAddress) {
  
          toast.error('User registration has been failed');
          return;
        }
  
        const walletAddress = data.walletAddress;

        console.log('walletAddress', walletAddress);


  
        setAddress(walletAddress);
  
  
      }
  



      fetchWalletAddress();


    } , [nickname]);









    // select krw amount (10000, 50000, 100000, 300000, 500000, 1000000, 5000000, 10000000)

    const [krwAmounts, setKrwAmounts] = useState([10000, 50000, 100000, 300000, 500000, 1000000, 5000000, 10000000]);
    // select one of krw amount

    const [selectedKrwAmount, setSelectedKrwAmount] = useState(0);


    const [depositName, setDepositName] = useState(
      ////randomDepositName[Math.floor(Math.random() * randomDepositName.length)]
      paramDepositName
    );

    const [depositBankName, setDepositBankName] = useState(
      //koreanBankName[Math.floor(Math.random() * koreanBankName.length)]
      paramDepositBankName
    );



    const [buyOrders, setBuyOrders] = useState<SellOrder[]>([]);


    /*
    useEffect(() => {

      const fetchSellOrders = async () => {

        if (orderId !== '0') {
          return;
        }
        

        if (!selectedKrwAmount) {
          return;
        }





        // api call
        const responseGetAllSellOrders = await fetch('/api/order/getAllSellOrders', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            lang: params.lang,
            chain: params.chain,
          })
        });

        const dataGetAllSellOrders = await responseGetAllSellOrders.json();

        
        //console.log('data', data);



        if (dataGetAllSellOrders.result) {

          // find one of sell order which is krwAmount is selectedKrwAmount and status is ordered
          

          const order = dataGetAllSellOrders.result.orders.find((item: any) => {
            return item.krwAmount === selectedKrwAmount && item.status === 'ordered';
          });

          if (order) {
            setBuyOrders([order]);
          } else {
            toast.error('Sell order not found');
          }

        }

      }

      fetchSellOrders();

    } , [selectedKrwAmount, params.lang, params.chain, orderId]);
    */
    

    

  
    

    



    useEffect(() => {

        if (!orderId) {
          return;
        }
        
        const fetchBuyOrders = async () => {





          // api call
          const response = await fetch('/api/order/getOneBuyOrder', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                orderId: orderId,
            })
          });
  
          const data = await response?.json();
  
          console.log('getOneBuyOrder data.result', data.result);

  
          if (data.result) {

            if (data.result.orders.length > 0) {

              setBuyOrders(data.result.orders);

              setAddress(data.result.orders[0]?.walletAddress);

              ////setNickname(data.result.orders[0].buyer.nickname);
            }


          }
  
        };
  
        fetchBuyOrders();



        
        const interval = setInterval(() => {

          fetchBuyOrders();
        }, 10000);
        
        return () => clearInterval(interval);
        
  
    }, [orderId]);


    //console.log('buyOrders', buyOrders);







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
        
        buyOrders.map((item) => {
          
          if (item.status === 'paymentRequested') {
            return true;
          }
          return false;
        } )

      );

    } , [buyOrders]);








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


      if (buyOrders.length === 0) {
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
              name: buyOrders[0].tradeId,
              channel_url: buyOrders[0]._id,
              cover_url: 'https://gold.goodtether.com/icon-trade.png',
              custom_type: 'trade',
    
            }),
          });
    
          const data = await result.json();
    
          ////console.log('data', data);
              
    
          ///console.log('Go Chat');
    
          //router.push(`/chat?channel=${orderId}`);
    
          //router.push(`/${params.lang}/chat/${orderId}`);
    
    
    
        }

        
          goChat();
        


    } , [ buyOrders ]);



    const [usdtAmount, setUsdtAmount] = useState(0);

    const [defaultKrWAmount, setDefaultKrwAmount] = useState(0);

    const [krwAmount, setKrwAmount] = useState(
      krwAmounts[0]
    );

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
            buyOrders.map((item, idx) => {
                return false;
            })
        );
    } , [buyOrders]);

    const [acceptingSellOrder, setAcceptingSellOrder] = useState([] as boolean[]);

    useEffect(() => {
        setAcceptingSellOrder (
            buyOrders.map((item, idx) => {
                return false;
            })
        );
    } , [buyOrders]);


    // request payment check box
    const [requestPaymentCheck, setRequestPaymentCheck] = useState([] as boolean[]);
    useEffect(() => {
        
        setRequestPaymentCheck(
          new Array(buyOrders.length).fill(false)
        );
  
    } , [buyOrders]);





    const acceptSellOrder = (index: number, orderId: string) => {

        if (!user) {
            return;
        }

        setAcceptingSellOrder (
            buyOrders.map((item, idx) => {
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
        .then(response => response?.json())
        .then(data => {

            console.log('data', data);

            //setBuyOrders(data.result.orders);
            //openModal();

            toast.success(Order_accepted_successfully);


            /*
            fetch('/api/order/getOneBuyOrder', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  orderId: orderId,
                }),
            })
            .then(response => response?.json())
            .then(data => {
                ///console.log('data', data);
                setBuyOrders(data.result.orders);
            })
            */


            // reouter to

            router.push('/' + params.lang + '/' + params.chain + '/pay-usdt/' + orderId);




        })
        .catch((error) => {
            console.error('Error:', error);
        })
        .finally(() => {
            setAcceptingSellOrder (
                buyOrders.map((item, idx) => {
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

          const data = await response?.json();

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

            const response = await fetch('/api/order/getOneBuyOrder', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                orderId: orderId,
              })
            });
    
            const data = await response?.json();
    
            ///console.log('data', data);
    
            if (data.result) {
              setBuyOrders(data.result.orders);
            }
            


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


    const [buyOrdering, setBuyOrdering] = useState(false);

    const buyOrder = async () => {
      // api call
      // set sell order

      if (buyOrdering) {
        return;
      }

      setBuyOrdering(true);

      const response = await fetch('/api/order/setBuyOrder', {
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

      const data = await response?.json();

      //console.log('data', data);

      if (data.result) {
        toast.success('Sell order has been created');

        setUsdtAmount(0);
        setprivateSale(false);
     


        await fetch('/api/order/getOneBuyOrder', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            walletAddress: address
          })
        }).then(async (response) => {
          const data = await response?.json();
          //console.log('data', data);
          if (data.result) {
            setBuyOrders(data.result.orders);
          }
        });




      } else {
        toast.error('Sell order has been failed');
      }

      setBuyOrdering(false);

      

    };







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

    const data = await response?.json();

    //console.log('data', data);

    if (data.result) {

      const response = await fetch('/api/order/getOneBuyOrder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          orderId: orderId,
        })
      });

      const data = await response?.json();

      ///console.log('data', data);

      if (data.result) {
        setBuyOrders(data.result.orders);
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



  // api setUserWithoutWalletAddress

  const setUserWithoutWalletAddress = async () => {

    ///////const nickname = prompt('Enter your nickname');

    if (!nickname) {

      toast.error('Please enter your nickname for temporary user');
      return;
    }

    const mobile = '010-1234-5678';
    

    const response = await fetch('/api/user/setUserWithoutWalletAddress', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nickname: nickname,
        mobile: mobile,
      }),
    });

    const data = await response?.json();

    console.log('setUserWithoutWalletAddress data.walletAddress', data.walletAddress);

    if (data.walletAddress) {

      //setAddress(data.result);

      ////setUser(data.result);
      
      //window.location.reload();

      setAddress(data.walletAddress);


      /*
      await fetch('/api/user/getUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          walletAddress: data.result.walletAddress,
        }),
      })
      .then(response => response?.json())
      .then(data => {
          console.log('data=======', data);
          setUser(data.result);
      })
      .catch((error) => {
          console.error('Error:', error);
      });
      */



    } else {
      toast.error('User registration has been failed');
    }


  }


  const [acceptingSellOrderRandom, setAcceptingSellOrderRandom] = useState(false);


  const acceptSellOrderRandom = async (
    krwAmount: number,
    depositName: string,
    depositBankName: string,
  ) => {

    
    console.log('acceptSellOrderRandom depositName', depositName);

    if (acceptingSellOrderRandom) {
      return;
    }

    setAcceptingSellOrderRandom(true);

    // fectch sell order and accept one of them

    const responseGetAllSellOrders = await fetch('/api/order/getAllSellOrders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        lang: params.lang,
        chain: params.chain,
      })
    });

    const dataGetAllSellOrders = await responseGetAllSellOrders.json();

    ///console.log('acceptSellOrderRandom dataGetAllSellOrders', dataGetAllSellOrders);

    //console.log('acceptSellOrderRandom krwAmount', krwAmount);


    if (dataGetAllSellOrders.result) {

      // find one of sell order which is krwAmount is selectedKrwAmount and status is ordered
      

      const order = dataGetAllSellOrders.result.orders.find((item: any) => {
        return item.krwAmount === krwAmount && item.status === 'ordered';
      });

      if (order) {

        // accept sell order

        const response = await fetch('/api/order/acceptSellOrder', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            lang: params.lang,
            chain: params.chain,
            orderId: order._id,
            buyerWalletAddress: address,
            buyerNickname: nickname,
            buyerAvatar: '',
            buyerMobile: '010-1234-5678',
            depositName: depositName,
            depositBankName: depositBankName,
          }),
        });

        const data = await response?.json();

        if (data.result) {
          toast.success(Order_accepted_successfully);

          router.push('/' + params.lang + '/' + params.chain + '/pay-usdt/' + order._id);

        } else {
          toast.error('Sell order has been failed');
        }



        //setBuyOrders([order]);
      } else {

        
        ///toast.error('Sell order not found');

        // if sell order not found, create buy order


        const response = await fetch('/api/order/setBuyOrder', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            lang: params.lang,
            chain: params.chain,
            walletAddress: address,
            usdtAmount: usdtAmount,
            krwAmount: krwAmount,
            rate: rate,
            privateSale: false,
          })
        });

        const data = await response.json();

        if (data.result) {
          toast.success(Order_accepted_successfully);

          //router.push('/' + params.lang + '/' + params.chain + '/pay-usdt/' + order._id);


        } else {
          toast.error('Buy order has been failed');
        }



      }

    } else {
      toast.error('Sell order not found');
    }

    setAcceptingSellOrderRandom(false);

  }



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

      //console.log('data', data);

      setStoreCodeNumber(data?.storeCodeNumber);

    }

    fetchStoreCode();

  } , []);






  if (orderId === '0' && !storeUser) {
    return (
      <div>
        Store user not found
      </div>
    );
  }





  if (orderId === '0' && storecode !== storeCodeNumber) {
    return (
      <div>
        Store code is invalid
      </div>
    );
  }
  

  if (orderId === '0' && !paramDepositName) {
    return (
      <div>
        Deposit name is invalid
      </div>
    );
  }

  if (orderId === '0' && !paramDepositBankName) {
    return (
      <div>
        Deposit bank name is invalid
      </div>
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
  
          <div className="hidden mt-4 w-full flex-row gap-5 justify-center mb-10">
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
            <div className="mt-5 flex flex-col items-center gap-2 mb-4">

              <div className='flex flex-row gap-2 items-center justify-center'>
                <div className="text-lg text-white">
                  상점: {
                    buyOrders.length > 0 ? buyOrders[0]?.nickname?.split('@').slice(-1)[0] : ''
                  }
                </div>
                <div className="text-lg text-white">
                  아이디: {
                    buyOrders.length > 0 ? buyOrders[0]?.nickname?.split('@').slice(0, -1).join('@') : ''
                  }
                </div>
              </div>

              {/* wallet address */}
              <div className="text-lg text-white">
                  {My_Wallet_Address}
                </div>
              <div className='flex flex-row gap-2 items-center justify-center'>
                <div className="text-sm xl:text-lg text-white">
                  {address}
                </div>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(address);
                    toast.success(Your_wallet_address_is_copied);
                  }}
                  className="text-sm bg-zinc-100 text-black px-4 py-2 rounded-md hover:bg-zinc-200"
                >
                  {Copy}
                </button>
              </div>


              <div className=" flex flex-row items-center justify-center gap-2">
                <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                <span className="text-sm text-white">
                  {Please_keep_Your_Wallet_address_safe}
                </span>
              </div>

              {/* sending to shop address */}

              {orderId && buyOrders.length > 0 && buyOrders[0].status === 'paymentConfirmed' && balance > 0 && (

                <div className='flex flex-row gap-2 items-center justify-center'>
                  {/* loading image */}
                  <Image
                    src="/loading.png"
                    alt="Loading"
                    width={24}
                    height={24}
                    className='animate-spin'
                  />

                  <div className="text-lg text-white">
                   {Waiting_for_the_USDT_to_be_sent_to_the_store_address}
                  </div>
                </div>

              )}


              {orderId && buyOrders.length > 0 && buyOrders[0].status === 'paymentConfirmed' && balance === 0 && (

                <span className='text-lg text-yellow-500'>
                  {Successfully_sent_USDT_to_the_store_address}
                </span>

              )}

               


              {/* disconnect button */}
              {/*
              
              <button
                onClick={() => {

                  activeWallet?.disconnect();

                    
                    
                  //window.location.reload();

                  router.push('/' + params.lang + '/' + params.chain + '/pay-usdt/0');



                }}
                className="text-lg bg-red-500 text-white px-4 py-2 rounded-md"
              >
                {Disconnect_Wallet}
              </button>
              */}
              
            </div>

          ) : (

            <div className="w-full mt-5 flex flex-row items-center justify-center gap-2 mb-4">



             {orderId === '0' && (
                <div className='hidden w-full flex-col xl:flex-row gap-2 items-center xl:items-end justify-center'>

                
                    <span className="text-sm text-white">
                      {You_must_have_a_wallet_address_to_buy_USDT}
                    </span>

                    <div className='flex flex-col gap-2 items-center justify-center'>

                      <span className="text-sm text-white">
                        {Nickname_should_be_5_10_characters}
                      </span>

                      <input
                        type="text"

                        value={nickname || ''}

                        /*
                        value={inputNickname}

                        
                        onChange={(e) => {


                          // check alphabet and number 5-10 characters

                          //e.target.value = e.target.value.replace(/[^a-zA-Z0-9]/g, '');




                          setInputNickname(

                            e.target.value.replace(/[^a-zA-Z0-9]/g, '').substring(0, 10)
                          );



                        } }
                          */



                        placeholder={Enter_your_nickname}
                        className="text-lg bg-black text-white px-4 py-2 rounded-md border border-zinc-100"
                      />


                    </div>


                      
                  
                    <button
                      ///onClick={setUserWithoutWalletAddress}
                      
                      ///onClick={() => fetchWalletAddress(inputNickname)}

                      onClick={() => fetchWalletAddress(nickname || '')}


                      className="text-lg bg-green-500 text-white px-4 py-2 rounded-md"
                    >
                      {Make_Wallet_Address}
                    </button>

                </div>

              )}




            </div>

          )}



                {true && (
                  <div className="w-full flex flex-col items-start justify-between gap-2">

                    {/* my usdt balance */}
                    <div className='hidden w-full  flex-row items-between justify-start gap-5'>

                      <div className=" flex flex-col gap-2 items-start">
                        <div className="text-5xl font-semibold text-white">
                          {Number(balance).toFixed(2)} <span className="text-lg">USDT</span>
                        </div>
                      </div>

                      <div className="hidden flex-row gap-2 items-center justify-center">
                        
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


                    {/* select one of krw amounts combo box */}
                    {/* combo box */}

                    {/* 10000, 50000, 100000, 300000, 500000, 1000000, 5000000, 10000000 */}

                    {orderId === '0' && (

                      <div className='w-full flex flex-col gap-2 items-center justify-start'>

                        {/*
                        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 w-full">

                            <button
                              onClick={() => setSelectedKrwAmount(10000)}
                              className={`${
                                selectedKrwAmount === 10000 ? 'bg-green-500' : 'bg-black'
                              } text-lg text-white px-4 py-2 rounded-md border border-zinc-100`}
                            >
                              {PRICE_10000_KRW}
                            </button>

                            <button
                              onClick={() => setSelectedKrwAmount(50000)}
                              className={`${
                                selectedKrwAmount === 50000 ? 'bg-green-500' : 'bg-black'
                              } text-lg text-white px-4 py-2 rounded-md border border-zinc-100`}
                            >
                              {PRICE_50000_KRW}
                            </button>

                            <button
                              onClick={() => setSelectedKrwAmount(100000)}
                              className={`${
                                selectedKrwAmount === 100000 ? 'bg-green-500' : 'bg-black'
                              } text-lg text-white px-4 py-2 rounded-md border border-zinc-100`}
                            >
                              {PRICE_100000_KRW}
                            </button>

                            <button
                              onClick={() => setSelectedKrwAmount(500000)}
                              className={`${
                                selectedKrwAmount === 500000 ? 'bg-green-500' : 'bg-black'
                              } text-lg text-white px-4 py-2 rounded-md border border-zinc-100`}
                            >
                              {PRICE_500000_KRW}
                            </button>

                            <button
                              onClick={() => setSelectedKrwAmount(1000000)}
                              className={`${
                                selectedKrwAmount === 1000000 ? 'bg-green-500' : 'bg-black'
                              } text-lg text-white px-4 py-2 rounded-md border border-zinc-100`}
                            >
                              {PRICE_1000000_KRW}
                            </button>

                            <button
                              onClick={() => setSelectedKrwAmount(5000000)}
                              className={`${
                                selectedKrwAmount === 5000000 ? 'bg-green-500' : 'bg-black'
                              } text-lg text-white px-4 py-2 rounded-md border border-zinc-100`}
                            >
                              {PRICE_5000000_KRW}
                            </button>

                            <button
                              onClick={() => setSelectedKrwAmount(10000000)}
                              className={`${
                                selectedKrwAmount === 10000000 ? 'bg-green-500' : 'bg-black'
                              } text-lg text-white px-4 py-2 rounded-md border border-zinc-100`}
                            >
                              {PRICE_10000000_KRW}
                            </button>



                        </div>
                        */}

                        {/* selected krw amount */}

                        <div className="flex flex-row gap-2 items-center justify-center">
                            <span className="text-lg text-white">
                              {Deposit_Amount}
                            </span>
                            <div className="text-lg text-white">
                              {selectedKrwAmount} KRW
                            </div>


                            {/* reset button */}
                            <button
                              onClick={() => setSelectedKrwAmount(0)}
                              className={`${
                                'bg-black'
                              } px-4 py-2 rounded-md border border-zinc-100`}
                            >
                              Reset
                            </button>

                        </div>


                        <div className="mt-4 grid grid-cols-3 xl:grid-cols-7 gap-4 w-full text-sm text-white">



                            {/* when mouse over, background color is green */}

                            <button
                              onClick={() => setSelectedKrwAmount(
                                selectedKrwAmount + 1000
                              )}
                              className={`${
                                'bg-black'
                              } px-4 py-2 rounded-md border border-zinc-100
                                hover:bg-green-500 hover:text-black
                               `}
                            >
                              1000원
                            </button>


                            <button
                              onClick={() => setSelectedKrwAmount(
                                selectedKrwAmount + 10000
                              )}
                              className={`${
                                'bg-black'
                              } px-4 py-2 rounded-md border border-zinc-100
                                hover:bg-green-500 hover:text-black
                               `}
                            >
                              {PRICE_10000_KRW}
                            </button>

                            <button
                              onClick={() => setSelectedKrwAmount(
                                selectedKrwAmount + 50000
                              )}
                              className={`${
                                'bg-black'
                              } px-4 py-2 rounded-md border border-zinc-100
                              hover:bg-green-500 hover:text-black
                               `}
                            >
                              {PRICE_50000_KRW}
                            </button>

                            <button
                              onClick={() => setSelectedKrwAmount(
                                selectedKrwAmount + 100000
                              )}
                              className={`${
                                'bg-black'
                              } px-4 py-2 rounded-md border border-zinc-100
                              hover:bg-green-500 hover:text-black
                               `}
                            >
                              {PRICE_100000_KRW}
                            </button>

                            <button
                              onClick={() => setSelectedKrwAmount(
                                selectedKrwAmount + 500000
                              )}
                              className={`${
                                'bg-black'
                              } px-4 py-2 rounded-md border border-zinc-100
                              hover:bg-green-500 hover:text-black
                               `}
                            >
                              {PRICE_500000_KRW}
                            </button>

                            <button
                              onClick={() => setSelectedKrwAmount(
                                selectedKrwAmount + 1000000
                              )}
                              className={`${
                                'bg-black'
                              } px-4 py-2 rounded-md border border-zinc-100
                               hover:bg-green-500 hover:text-black`}
                            >
                              {PRICE_1000000_KRW}
                            </button>

                            <button
                              onClick={() => setSelectedKrwAmount(
                                selectedKrwAmount + 5000000
                              )}
                              className={`${
                                'bg-black'
                              } px-4 py-2 rounded-md border border-zinc-100
                               hover:bg-green-500 hover:text-black`}
                            >
                              {PRICE_5000000_KRW}
                            </button>

                            <button
                              onClick={() => setSelectedKrwAmount(
                                selectedKrwAmount + 10000000
                              )}
                              className={`${
                                'bg-black'
                              } px-4 py-2 rounded-md border border-zinc-100
                               hover:bg-green-500 hover:text-black`}
                            >
                              {PRICE_10000000_KRW}
                            </button>



                        </div>


                        <div className='mt-5 flex flex-row gap-2 items-center justify-center'>

                          <div className="felex flex-col gap-2 items-center justify-center">

                            {/* deposit bank name */}
                            <div className='flex flex-row gap-2 items-center justify-center'>
                              <span className=" w-20 text-sm text-white">
                                입금자은행명
                              </span>
                              <input
                                //disabled={!address || !selectedKrwAmount || acceptingSellOrderRandom}
                                disabled={true}
                                type="text"
                                value={depositBankName || ''}
                                onChange={(e) => setDepositBankName(e.target.value)}
                                placeholder="입금자은행명"
                                className=" text-sm bg-black text-white px-4 py-2 rounded-md border border-zinc-100"
                              />
                            </div>



                            


                            {/* input deposit name */}
                            <div className='mt-2 flex flex-row gap-2 items-center justify-center'>
                             
                              <span className=" w-20 text-sm text-white">
                                {Deposit_Name}
                              </span>

                              <input
                                //disabled={!address || !selectedKrwAmount || acceptingSellOrderRandom}
                                disabled={true}
                                type="text"
                                value={depositName || ''}
                                onChange={(e) => setDepositName(e.target.value)}
                                placeholder={Deposit_Name}
                                className=" text-sm bg-black text-white px-4 py-2 rounded-md border border-zinc-100"
                              />
                            </div>


                          </div>
                          



                          <button
                            disabled={!address || !selectedKrwAmount || acceptingSellOrderRandom}
                            className={`flex flex-row text-lg text-white px-4 py-2 rounded-md
                            ${!user || !selectedKrwAmount || acceptingSellOrderRandom ? 'bg-zinc-800' : 'bg-green-500 hover:bg-green-600'}
                            `}

                            onClick={() => {

                                // check deposit name is empty
                                if (!depositName) {
                                  toast.error(Please_enter_deposit_name);
                                  return;
                                }

                                acceptSellOrderRandom(
                                  selectedKrwAmount,
                                  depositName,
                                  depositBankName || ''
                                );
                          

                            }}
                          >
                            {/* loaaing icon */}
                            {acceptingSellOrderRandom && (
                              <Image
                                src="/loading.png"
                                alt="Loading"
                                width={24}
                                height={24}
                                className='animate-spin'
                              />
                            )}
                            
                            <span  className="ml-2">
                              {Charge}
                            </span>

                          </button>

                        </div>

                        {/* deposit name description */}
                        <div className='flex flex-row gap-2 items-center justify-center'>
                          <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                          <span className="text-sm text-white">
                            {Deposit_name_description}
                          </span>
                        </div>


                      </div>
                    )}






                  </div>
                )}



              {buyOrders.length > 0 && (
                <div className="mt-4 w-full flex flex-col gap-5 xl:flex-row items-start justify-center ">


                  <div className="w-full mb-10 grid grid-cols-1 gap-4  justify-center  ">

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
                            <div className="absolute inset-0 flex justify-center items-center z-10 pt-10
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

                          {item.status === 'cancelled' && (
                            <span className="text-lg text-red-500">
                              판매자가 거래를 취소했습니다.
                            </span>
                          )}



                          <div className=" w-full flex flex-col gap-2 items-center justify-start">


                            {address && item.buyer && item.buyer.walletAddress === address && (
                              <div className="w-full flex flex-row items-center justify-start">
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

                              </div>
                            )}




                            {/* status is ordered

                            판매자와 거래를 기다리는 중입니다.
                            */}
                            {item.status === 'ordered' && (
                              <div className="w-full flex flex-row items-center justify-start gap-2">
                                {/* loading icon */}
                                <Image
                                  src="/loading.png"
                                  alt="Loading"
                                  width={32}
                                  height={32}
                                  className="animate-spin"
                                />
                                <p className=" text-lg text-zinc-400">
                                  판매자와 거래를 기다리는 중입니다.
                                </p>
                              </div>
                            )}




                            {/* seller information */}
                            {address && item.walletAddress === address && item?.seller && (
                              <div className="w-full flex flex-row items-center justify-start">
                                <div className='flex flex-row items-center gap-2'>

                                  <Image
                                      src={item?.seller?.avatar || '/profile-default.png'}
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
                                          item?.seller?.nickname ? item?.seller?.nickname : Anonymous
                                      }
                                  </h2>

                                  <Image
                                      src="/verified.png"
                                      alt="Verified"
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



                                    <div className='hidden  flex-row items-center gap-2'>
                                  
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


                                      </p>

                                    </div>


                                    <div className='hidden flex-row items-center gap-2'>
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
                                      <p className="text-sm text-green-500">
                                        {Completed_at} {new Date(item.paymentConfirmedAt).toLocaleDateString() + ' ' + new Date(item.paymentConfirmedAt).toLocaleTimeString()}
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


                              


                                {item.status === 'paymentConfirmed' && (
                                  <div className="mt-4 flex flex-col items-start gap-2">
                                    <p className="mt-4 text-sm text-zinc-400">
                                      {Payment}: {item.seller?.bankInfo.bankName} {item.seller?.bankInfo.accountNumber} {item.seller?.bankInfo.accountHolder}
                                    </p> 
                                    <p className="text-sm text-zinc-400">
                                      {Deposit_Amount}: {item.krwAmount} KRW
                                    </p>
                                    <p className="text-sm text-zinc-400">
                                      {Deposit_Name}: {
                                        item.buyer?.depositName ? item.buyer?.depositName : item.tradeId
                                      }
                                    </p>                        

                                    {/* 판매자가 입급을 확인였습니다. */}

                                    <p className="mt-4 text-lg text-green-500">
                                      {Deposit_Confirmed}
                                    </p>
                                  </div>
                                )}
                                

                            


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



                                    {/* Waiting for escrow from the seller */}

                                    <div className="mt-4 flex flex-row items-center gap-2">
                                      <Image
                                        src="/loading.png"
                                        alt="Loading"
                                        width={32}
                                        height={32}
                                        className="animate-spin"
                                      />
                                      <p className="text-lg text-zinc-400">
                                        판매자가 에스크로를 진행중입니다.
                                      </p>
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



                                            
                                              <button
                                                disabled={!address || !agreementForTrade[index]}
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
                                      <span className="text-sm text-green-500">
                                        {When_the_deposit_is_completed}
                                      </span>
                                    </div>

 


                                    {
                                    address && (item.walletAddress === address || item.buyer?.walletAddress === address ) && (
                                      <>
                                        {/* bank transfer information 입금은행 */}
                                        <div className='mt-4 text-lg text-green-500 font-semibold'>
                                          입금은행
                                        </div>
                                        <div className='flex flex-row items-center justify-center gap-2'>
                                          <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                          <div className="text-sm ">
                                          {item.seller?.bankInfo.bankName}
                                          {' '}
                                          <button
                                            onClick={() => {
                                                navigator.clipboard.writeText(item.seller?.bankInfo.accountNumber);
                                                toast.success(Account_number_has_been_copied);
                                            } }
                                            className='text-lg font-semibold'
                                          >
                                            {item.seller?.bankInfo.accountNumber}
                                          </button>
                                          {' '}
                                          <button
                                            onClick={() => {
                                                navigator.clipboard.writeText(item.seller?.bankInfo.accountNumber);
                                                toast.success(Account_number_has_been_copied);
                                            } }
                                            className="text-xs bg-green-500 text-white px-2 py-1 rounded-md"
                                          >
                                            {Copy}
                                          </button>
                                          {' '}
                                          {item.seller?.bankInfo.accountHolder}
                                          </div>
                                        </div>


                                        <div className='flex flex-row items-center gap-2'>
                                          <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                          <div className="text-sm">
                                            {Deposit_Name}:{' '}
                                            <button
                                              onClick={() => {
                                                  navigator.clipboard.writeText(item.buyer?.depositName ? item.buyer?.depositName : item.tradeId);
                                                  toast.success(Payment_name_has_been_copied);
                                              } }
                                              className="text-lg font-semibold"
                                            >
                                              {item.buyer?.depositName ? item.buyer?.depositName : item.tradeId}
                                            </button>
                                            {' '}
                                            <button
                                              onClick={() => {
                                                  navigator.clipboard.writeText(item.buyer?.depositName ? item.buyer?.depositName : item.tradeId);
                                                  toast.success(Payment_name_has_been_copied);
                                              } }
                                              className="hidden text-xs bg-green-500 text-white px-2 py-1 rounded-md"
                                            >
                                              {Copy}
                                            </button>
                                          </div>
                                        </div>

                                        <div className='flex flex-row items-center gap-2'>
                                          <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                          <div className="text-sm">
                                            {Deposit_Amount}:{' '}

                                            <button
                                              onClick={() => {
                                                  navigator.clipboard.writeText(item.krwAmount.toString());
                                                  toast.success(Payment_amount_has_been_copied);
                                              } }
                                              className="text-lg font-semibold"
                                            >
                                              {item.krwAmount.toLocaleString('ko-KR', {
                                                  style: 'currency',
                                                  currency: 'KRW'
                                                })
                                              }
                                            </button>
                                            {' '}
                                            <button
                                              onClick={() => {
                                                  navigator.clipboard.writeText(item.krwAmount.toString());
                                                  toast.success(Payment_amount_has_been_copied);
                                              } }
                                              className="hidden text-xs bg-green-500 text-white px-2 py-1 rounded-md"
                                            >
                                              {Copy}
                                            </button>
                                          </div>
                                        </div>

                                      </>

                                    )}




                                    <div className='flex flex-row items-center gap-2'>
                                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                      <div className="text-sm">
                                        {Deposit_Deadline}: {

                                          // 30 minutes after payment requested
                                        
                                          new Date(new Date(item.paymentRequestedAt).getTime() + 1000 * 60 * 30).toLocaleDateString() + ' ' + new Date(new Date(item.paymentRequestedAt).getTime() + 1000 * 60 * 30).toLocaleTimeString()
                                        
                                        }
                                      </div>

                                    </div>
                                    {/* 입금 기한까지 입금하지 않으면 거래가 취소됩니다. */}
                                    <div className="mt-4 flex flex-row items-center gap-2">
                                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                      <span className="text-lg text-green-500">
                                        입금 기한까지 입금하지 않으면 거래가 취소됩니다.
                                      </span>
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









                            </article>


                          </div>







                        
                        </div>


                      ))}

                  </div>

                  {orderId && address && user && user.nickname && buyOrders.length > 0 && buyOrders[0].status !== 'paymentConfirmed' && buyOrders[0].status !== 'ordered' && (
                    <div className=' w-full hidden'>
                      <Chat

                        channel={orderId}

                        userId={ user.nickname }

                        nickname={ user.nickname }

                        profileUrl={ user.avatar }
                      />
                    </div>
                  )}



                </div>
              )}




            
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



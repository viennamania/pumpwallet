import clientPromise from '../mongodb';

// object id
import { ObjectId } from 'mongodb';


export interface UserProps {
  /*
  name: string;
  username: string;
  email: string;
  image: string;
  bio: string;
  bioMdx: MDXRemoteSerializeResult<Record<string, unknown>>;
  followers: number;
  verified: boolean;
  */

  id: string,
  name: string,
  nickname: string,
  email: string,
  avatar: string,
  regType: string,
  mobile: string,
  gender: string,
  weight: number,
  height: number,
  birthDate: string,
  purpose: string,
  marketingAgree: string,
  createdAt: string,
  updatedAt: string,
  deletedAt: string,
  loginedAt: string,
  followers : number,
  emailVerified: boolean,
  bio: string,

  password: string,

  seller: any,

  status: string,

  walletAddress: string,

  tradeId: string,

  usdtAmount: number,
  krwAmount: number,
  
  acceptedAt: string,
  paymentRequestedAt: string,
  paymentConfirmedAt: string,
  cancelledAt: string,

  buyer: any,

  transactionHash: string,
}

export interface ResultProps {
  totalCount: number;
  orders: UserProps[];
}




// get usdtPrice by walletAddress
export async function getUsdtPrice(data: any) {

  if (!data.walletAddress) {
    return null;
  }

  const client = await clientPromise;
  const collection = client.db('shinemywinter').collection('setup');

  const result = await collection.findOne<UserProps>(
    { $and: [ { walletAddress: data.walletAddress }, { usdtPrice: { $exists: true } } ] }
  );

  ///console.log('getUsdtPrice result: ' + JSON.stringify(result));

  //{"_id":"66b9b4431645dcffd9fbe2c2","walletAddress":"0x68B4F181d97AF97d8b111Ad50A79AfeB33CF6be6","usdtPrice":"1404"}

  if (result) {
    return result;
  } else {
    return null;
  }

}






// updatePrice

export async function updatePrice(data: any) {
  
  ///console.log('updatePrice data: ' + JSON.stringify(data));

  if (!data.walletAddress || !data.price) {
    return null;
  }

  console.log('updatePrice data.price: ' + data.price);



  const client = await clientPromise;
  const collection = client.db('shinemywinter').collection('setup');

  // update and return update, or if not exists, insert and return insert

  // check usdtPrice is field of setup collection
  // if exists, update, else insert

  try {

    const result = await collection.findOneAndUpdate(
      { walletAddress: data.walletAddress },
      { $set: { usdtPrice: data.price } },
      { upsert: true, returnDocument: 'after' }
    );

    if (result) {

      ///console.log('updatePrice result: ' + result);

      return result.value;
    } else {
      return null;
    }


  } catch (error) {

    // updatePrice error: MongoInvalidArgumentError: Update document requires atomic operators
    console.log('updatePrice error: ' + error);

    return null;
  }




}








export async function insertSellOrder(data: any) {

  console.log('insertSellOrder data: ' + JSON.stringify(data));

  if (!data.walletAddress || !data.usdtAmount || !data.krwAmount || !data.rate) {
    return null;
  }



  const client = await clientPromise;



  // get user mobile number by wallet address

  const userCollection = client.db('shinemywinter').collection('users');


  const user = await userCollection.findOne<UserProps>(
    { walletAddress: data.walletAddress },
    { projection: { _id: 0, emailVerified: 0 } }
  );

  if (!user) {
    return null;
  }



  ////console.log('user: ' + user);

  const nickname = user.nickname;

  const mobile = user.mobile;

  const avatar = user.avatar;

  const seller = user.seller;



  const collection = client.db('shinemywinter').collection('orders');

 
  const result = await collection.insertOne(

    {
      lang: data.lang,
      chain: data.chain,
      walletAddress: data.walletAddress,
      nickname: nickname,
      mobile: mobile,
      avatar: avatar,
      seller: seller,
      usdtAmount: data.usdtAmount,
      krwAmount: data.krwAmount,
      rate: data.rate,
      createdAt: new Date().toISOString(),
      status: 'ordered',
      privateSale: data.privateSale,
    }
  );


  if (result) {
    return {
      walletAddress: data.walletAddress,
      
    };
  } else {
    return null;
  }
  

}


// getOrderById
export async function getOrderById(orderId: string): Promise<UserProps | null> {

  const client = await clientPromise;
  const collection = client.db('shinemywinter').collection('orders');

  const result = await collection.findOne<UserProps>(
    { _id: new ObjectId(orderId) }
  );

  if (result) {
    return result;
  } else {
    return null;
  }

}



// get count of open orders not expired 24 hours after created
export async function getOpenOrdersCount(): Promise<number> {

  const client = await clientPromise;
  const collection = client.db('shinemywinter').collection('orders');

  const result = await collection.countDocuments(
    { status: 'ordered', createdAt: { $gt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString() } }
  );

  return result;

}






// get sell orders order by createdAt desc
export async function getSellOrders(

  {

    limit,
    page,
    walletAddress,
    searchMyOrders,
  }: {

    limit: number;
    page: number;
    walletAddress: string;
    searchMyOrders: boolean;
  
  }

): Promise<ResultProps> {

  const client = await clientPromise;
  const collection = client.db('shinemywinter').collection('orders');


  // status is not 'paymentConfirmed'

  // if searchMyOrders is true, get orders by wallet address is walletAddress
  // else get all orders except paymentConfirmed
  // sort status is accepted first, then createdAt desc

  if (searchMyOrders) {

    const results = await collection.find<UserProps>(

      //{ walletAddress: walletAddress, status: { $ne: 'paymentConfirmed' } },
      { walletAddress: walletAddress },
      
      //{ projection: { _id: 0, emailVerified: 0 } }

    )

    .sort({ createdAt: -1 })
    .limit(limit).skip((page - 1) * limit).toArray();

    return {
      totalCount: results.length,
      orders: results,
    };

  } else {

    const results = await collection.find<UserProps>(
      {
        //status: 'ordered',
  
        status: { $ne: 'paymentConfirmed' },
  
        // exclude private sale
        //privateSale: { $ne: true },
      },
      
      //{ projection: { _id: 0, emailVerified: 0 } }
  
    ).sort({ createdAt: -1 }).limit(limit).skip((page - 1) * limit).toArray();
  
    return {
      totalCount: results.length,
      orders: results,
    };

  }


}





export async function getOneSellOrder(

  {
    orderId,
    limit,
    page,
  }: {
    orderId: string;
    limit: number;
    page: number;
  
  }

): Promise<ResultProps> {

  const client = await clientPromise;
  const collection = client.db('shinemywinter').collection('orders');


  // status is not 'paymentConfirmed'

  // check orderId is valid ObjectId


  if (!ObjectId.isValid(orderId)) {
    return {
      totalCount: 0,
      orders: [],
    };
  }




  const results = await collection.find<UserProps>(
    {

      _id: new ObjectId(orderId),

      //status: 'ordered',

      ///status: { $ne: 'paymentConfirmed' },

      // exclude private sale
      //privateSale: { $ne: true },
    },
    
    //{ projection: { _id: 0, emailVerified: 0 } }

  ).sort({ createdAt: -1 }).limit(limit).skip((page - 1) * limit).toArray();



  return {
    totalCount: results.length,
    orders: results,
  };

}



// deleete sell order by orderId
export async function deleteSellOrder(

  {
    orderId,
    walletAddress,
  }: {
    orderId: string;
    walletAddress: string;
  
  }


): Promise<boolean> {

  const client = await clientPromise;
  const collection = client.db('shinemywinter').collection('orders');

  // check orderId is valid ObjectId
  if (!ObjectId.isValid(orderId)) {
    return false;
  }

  // check walletAddress is valid

  if (!walletAddress) {
    return false;
  }

  // status is 'ordered'
  const result = await collection.deleteOne(
    { _id: new ObjectId(orderId), walletAddress: walletAddress, status: 'ordered' }
  );



  if (result.deletedCount === 1) {
    return true;
  } else {
    return false;
  }


}


// cancel sell order by orderId from buyer
export async function cancelTradeByBuyer(

  {
    orderId,
    walletAddress,
  }: {
    orderId: string;
    walletAddress: string;
  
  }

) {

  const client = await clientPromise;
  const collection = client.db('shinemywinter').collection('orders');

  // check orderId is valid ObjectId
  if (!ObjectId.isValid(orderId)) {
    return false;
  }

  // check walletAddress is valid

  if (!walletAddress) {
    return false;
  }

  // check status is 'accepted'

  // update status to 'cancelled'

  const result = await collection.updateOne(
    { _id: new ObjectId(orderId), 'buyer.walletAddress': walletAddress, status: 'accepted' },
    { $set: {
      status: 'cancelled',
      cancelledAt: new Date().toISOString(),
    } }
  );

  const updated = await collection.findOne<UserProps>(
    { _id: new ObjectId(orderId) }
  );

  if (result) {
    return {
      updated,
    }
  } else {
    return null;
  }


}




// cancelTradeByAdmin
// update order status to cancelled
// where status is 'accepted'
// and acceptedAt is more than 1 hour ago

export async function cancelTradeByAdmin() {

  const client = await clientPromise;
  const collection = client.db('shinemywinter').collection('orders');

  // status is 'accepted'
  // acceptedAt is more than 1 hour ago

  const result = await collection.updateMany(
    { status: 'accepted', acceptedAt: { $lt: new Date(Date.now() - 60 * 60 * 1000).toISOString() } },
    { $set: {
      status: 'cancelled',
      cancelledAt: new Date().toISOString(),
      canceller: 'admin',
    } }
  );

  return result;

}







// get sell orders order by createdAt desc
export async function getSellOrdersForBuyer(

  {
    limit,
    page,
    walletAddress,
    searchMyTrades,
  }: {

    limit: number;
    page: number;
    walletAddress: string;
    searchMyTrades: boolean;
  }

): Promise<ResultProps> {

  const client = await clientPromise;
  const collection = client.db('shinemywinter').collection('orders');


  // status is not 'paymentConfirmed'



  // if searchMyTrades is true, get orders by buyer wallet address is walletAddress
  // else get all orders except paymentConfirmed

  if (searchMyTrades) {

    const results = await collection.find<UserProps>(
      {
        'buyer.walletAddress': walletAddress,
        status: { $ne: 'paymentConfirmed' },
      },
      
      //{ projection: { _id: 0, emailVerified: 0 } }

    ).sort({ createdAt: -1 }).limit(limit).skip((page - 1) * limit).toArray();

    return {
      totalCount: results.length,
      orders: results,
    };

  } else {

    const results = await collection.find<UserProps>(
      {
        //status: 'ordered',
  
        status: { $ne: 'paymentConfirmed' },
  
        // exclude private sale
        privateSale: { $ne: true },
      },
      
      //{ projection: { _id: 0, emailVerified: 0 } }
  
    ).sort({ createdAt: -1 }).limit(limit).skip((page - 1) * limit).toArray();
  
    return {
      totalCount: results.length,
      orders: results,
    };

  }


}





// get sell orders by wallet address order by createdAt desc
export async function getSellOrdersByWalletAddress(

  {
    walletAddress,
    limit,
    page,
  }: {
    walletAddress: string;
    limit: number;
    page: number;
  
  }

): Promise<ResultProps> {

  const client = await clientPromise;
  const collection = client.db('shinemywinter').collection('orders');


  const results = await collection.find<UserProps>(
    { walletAddress: walletAddress },
  ).sort({ createdAt: -1 }).limit(limit).skip((page - 1) * limit).toArray();

  return {
    totalCount: results.length,
    orders: results,
  };

}



// accept sell order
// update order status to accepted

export async function acceptSellOrder(data: any) {
  
  ///console.log('acceptSellOrder data: ' + JSON.stringify(data));




  if (!data.orderId || !data.buyerWalletAddress || !data.buyerMobile) {
    return null;
  }

  const buyerMemo = data.buyerMemo || '';


  const depositName = data.depositName || '';

  const depositBankName = data.depositBankName || '';




  const client = await clientPromise;
  const collection = client.db('shinemywinter').collection('orders');

  // random number for tradeId
  // 100000 ~ 999999 string

  const tradeId = Math.floor(Math.random() * 900000) + 100000 + '';



  /*
    const result = await collection.findOne<UserProps>(
    { _id: new ObjectId(orderId) }
  );
  */


  ///console.log('acceptSellOrder data.orderId: ' + data.orderId);

 
  // *********************************************
  // update status to accepted if status is ordered

  // if status is not ordered, return null
  // check condition and update status to accepted
  // *********************************************

  const result = await collection.findOneAndUpdate(
    { _id: new ObjectId(data.orderId + ''), status: 'ordered' },
    { $set: {
      status: 'accepted',
      acceptedAt: new Date().toISOString(),
      tradeId: tradeId,
      buyer: {
        walletAddress: data.buyerWalletAddress,
        nickname: data.buyerNickname,
        avatar: data.buyerAvatar,
        mobile: data.buyerMobile,
        memo: buyerMemo,
        depositName: depositName,
        depositBankName: depositBankName,
      },
    } }
  );









  /*
  const result = await collection.updateOne(
    
    //{ _id: new ObjectId(data.orderId) },

    { _id: new ObjectId( data.orderId + '' ) },




    { $set: {
      status: 'accepted',
      acceptedAt: new Date().toISOString(),


      tradeId: tradeId,

      buyer: {
        walletAddress: data.buyerWalletAddress,
        nickname: data.buyerNickname,
        avatar: data.buyerAvatar,
        mobile: data.buyerMobile,

      },
    } }
  );
  */


  ////console.log('acceptSellOrder result: ' + result);




  if (result) {

    const updated = await collection.findOne<UserProps>(
      { _id: new ObjectId(data.orderId + '') }
    );

    ///console.log('acceptSellOrder updated: ' + JSON.stringify(updated));



    return updated;

  } else {
    return null;
  }
  
}






export async function requestPayment(data: any) {
  
  ///console.log('acceptSellOrder data: ' + JSON.stringify(data));

  if (!data.orderId) {
    return null;
  }

  if (!data.transactionHash) {
    return null;
  }


  const client = await clientPromise;
  const collection = client.db('shinemywinter').collection('orders');


  const result = await collection.updateOne(
    
    { _id: new ObjectId(data.orderId + '') },


    { $set: {
      status: 'paymentRequested',
      escrowTransactionHash: data.transactionHash,
      paymentRequestedAt: new Date().toISOString(),
    } }
  );

  if (result) {
    const updated = await collection.findOne<UserProps>(
      { _id: new ObjectId(data.orderId + '') }
    );

    return updated;
  } else {
    return null;
  }
  
}





export async function confirmPayment(data: any) {
  
  ///console.log('acceptSellOrder data: ' + JSON.stringify(data));

  if (!data.orderId) {
    return null;
  }

  if (!data.transactionHash) {
    return null;
  }

  const paymentAmount = data.paymentAmount || 0;


  const client = await clientPromise;
  const collection = client.db('shinemywinter').collection('orders');


  const result = await collection.updateOne(
    
    { _id: new ObjectId(data.orderId+'') },


    { $set: {
      status: 'paymentConfirmed',
      paymentAmount: paymentAmount,
      queueId: data.queueId,
      transactionHash: data.transactionHash,
      paymentConfirmedAt: new Date().toISOString(),
    } }
  );

  if (result) {
    const updated = await collection.findOne<UserProps>(
      { _id: new ObjectId(data.orderId+'') }
    );

    return updated;
  } else {
    return null;
  }
  
}





// get sell orders by wallet address order by createdAt desc
export async function getTradesByWalletAddress(

  {
    walletAddress,
    limit,
    page,
  }: {
    walletAddress: string;
    limit: number;
    page: number;
  
  }

): Promise<ResultProps> {



  const client = await clientPromise;
  const collection = client.db('shinemywinter').collection('orders');


  // get orders by buyer.walletAddress = walletAddress 
  // tradeId is not null

  const results = await collection.find<UserProps>(

    { 'buyer.walletAddress': walletAddress, tradeId: { $ne: null } },

  ).sort({ acceptedAt: -1 }).limit(limit).skip((page - 1) * limit).toArray();



  //console.log('getTradesByWalletAddress results: ' + JSON.stringify(results)); 



  return {
    totalCount: results.length,
    orders: results,
  };

}




// get sell orders by wallet address order by createdAt desc
export async function getTradesByWalletAddressProcessing(

  {
    walletAddress,
    limit,
    page,
  }: {
    walletAddress: string;
    limit: number;
    page: number;
  
  }

): Promise<ResultProps> {



  const client = await clientPromise;
  const collection = client.db('shinemywinter').collection('orders');


  // get orders by buyer.walletAddress = walletAddress 
  // tradeId is not null
  // status is not 'paymentConfirmed'

  const results = await collection.find<UserProps>(

    {
      'buyer.walletAddress': walletAddress,
      tradeId: { $ne: null },
      status: { $ne: 'paymentConfirmed' },
    },

  ).sort({ createdAt: -1 }).limit(limit).skip((page - 1) * limit).toArray();


  return {
    totalCount: results.length,
    orders: results,
  };

}






// get sell trades by wallet address order by createdAt desc
export async function getSellTradesByWalletAddress(

  {
    walletAddress,
    limit,
    page,
  }: {
    walletAddress: string;
    limit: number;
    page: number;
  
  }

): Promise<ResultProps> {



  const client = await clientPromise;
  const collection = client.db('shinemywinter').collection('orders');


  // get orders by buyer.walletAddress = walletAddress 
  // tradeId is not null

  const results = await collection.find<UserProps>(

    { 'walletAddress': walletAddress, tradeId: { $ne: null } },

  ).sort({ createdAt: -1 }).limit(limit).skip((page - 1) * limit).toArray();


  return {
    totalCount: results.length,
    orders: results,
  };

}




// get sell trades by wallet address order by createdAt desc
// status is not 'paymentConfirmed'
export async function getSellTradesByWalletAddressProcessing(

  {
    walletAddress,
    limit,
    page,
  }: {
    walletAddress: string;
    limit: number;
    page: number;
  
  }

): Promise<ResultProps> {



  const client = await clientPromise;
  const collection = client.db('shinemywinter').collection('orders');


  // get orders by buyer.walletAddress = walletAddress 
  // tradeId is not null

  const results = await collection.find<UserProps>(

    {
      'walletAddress': walletAddress,
      tradeId: { $ne: null },
      status: { $ne: 'paymentConfirmed' },
    },

  ).sort({ createdAt: -1 }).limit(limit).skip((page - 1) * limit).toArray();


  return {
    totalCount: results.length,
    orders: results,
  };

}



// get paymentRequested trades by wallet address
// and sum of usdtAmount
export async function getPaymentRequestedUsdtAmountByWalletAddress(

  {
    walletAddress,
  }: {
    walletAddress: string;
  
  }

): Promise<any> {

  const client = await clientPromise;
  const collection = client.db('shinemywinter').collection('orders');

  const results = await collection.aggregate([
    {
      $match: {
        'walletAddress': walletAddress,
        status: 'paymentRequested',
      }
    },
    {
      $group: {
        _id: null,
        totalUsdtAmount: { $sum: '$usdtAmount' },
      }
    }
  ]).toArray();

  if (results.length > 0) {
    return results[0];
  } else {
    return null;
  }


}








export async function updateOne(data: any) {
  const client = await clientPromise;
  const collection = client.db('shinemywinter').collection('users');


  // update and return updated user

  if (!data.walletAddress || !data.nickname) {
    return null;
  }


  const result = await collection.updateOne(
    { walletAddress: data.walletAddress },
    { $set: { nickname: data.nickname } }
  );

  if (result) {
    const updated = await collection.findOne<UserProps>(
      { walletAddress: data.walletAddress },
      { projection: { _id: 0, emailVerified: 0 } }
    );

    return updated;
  }


}




export async function getOneByWalletAddress(
  walletAddress: string,
): Promise<UserProps | null> {

  console.log('getOneByWalletAddress walletAddress: ' + walletAddress);

  const client = await clientPromise;
  const collection = client.db('shinemywinter').collection('users');


  // id is number

  const results = await collection.findOne<UserProps>(
    { walletAddress: walletAddress },
    { projection: { _id: 0, emailVerified: 0 } }
  );


  console.log('getOneByWalletAddress results: ' + results);

  return results;

}





export async function sellOrderRollbackPayment(data: any) {
  
  ///console.log('acceptSellOrder data: ' + JSON.stringify(data));

  if (!data.orderId) {
    return null;
  }

  if (!data.transactionHash) {
    return null;
  }

  const paymentAmount = data.paymentAmount || 0;


  const client = await clientPromise;
  const collection = client.db('shinemywinter').collection('orders');


  const result = await collection.updateOne(
    
    { _id: new ObjectId(data.orderId+'') },


    { $set: {
      status: 'cancelled',
      paymentAmount: paymentAmount,
      queueId: data.queueId,
      transactionHash: data.transactionHash,
      cancelledAt: new Date().toISOString(),
      rollbackAmount: paymentAmount,
    } }
  );

  if (result) {
    const updated = await collection.findOne<UserProps>(
      { _id: new ObjectId(data.orderId+'') }
    );

    return updated;
  } else {
    return null;
  }
  
}












export async function insertBuyOrder(data: any) {

  console.log('insertBuyOrder data: ' + JSON.stringify(data));
  /*
  insertBuyOrder data:
  {
    "walletAddress":"0xC426C1a1b7bEC05CD5CCFc2c85Ae7A2245BE2263",
    "usdtAmount":0.71,
    "krwAmount":1000,
    "rate":1350,
    "privateSale":false,
    "buyer":{"depositBankName":"국민은행","depositName":"송수영"}
  }
  */

  if (!data.walletAddress || !data.usdtAmount || !data.krwAmount || !data.rate) {
    return null;
  }

  let nickname = data.nickname || '';


  const client = await clientPromise;



  // get user mobile number by wallet address

  const userCollection = client.db('shinemywinter').collection('users');


  const user = await userCollection.findOne<UserProps>(
    { walletAddress: data.walletAddress },
    { projection: { _id: 0, emailVerified: 0 } }
  );




  ////console.log('user: ' + user);

  if (user?.nickname) {
    nickname = user?.nickname;
  }


  const mobile = user?.mobile;

  const avatar = user?.avatar;

  
  //const seller = user.seller;



  const tradeId = Math.floor(Math.random() * 900000) + 100000 + '';



  const collection = client.db('shinemywinter').collection('buyorders');

 
  const result = await collection.insertOne(

    {
      lang: data.lang,
      chain: data.chain,
      walletAddress: data.walletAddress,
      nickname: nickname,
      mobile: mobile,
      avatar: avatar,
      
      //seller: seller,

      usdtAmount: data.usdtAmount,
      krwAmount: data.krwAmount,
      rate: data.rate,
      createdAt: new Date().toISOString(),
      status: 'ordered',
      privateSale: data.privateSale,
      
      buyer: data.buyer,

      tradeId: tradeId,
    }
  );


  if (result) {
    return {

      _id: result.insertedId,

      walletAddress: data.walletAddress,
      
    };
  } else {
    return null;
  }
  

}





// get buy orders order by createdAt desc
export async function getBuyOrders(

  {

    limit,
    page,
    walletAddress,
    searchMyOrders,
  }: {

    limit: number;
    page: number;
    walletAddress: string;
    searchMyOrders: boolean;
  
  }

): Promise<ResultProps> {

  const client = await clientPromise;
  const collection = client.db('shinemywinter').collection('buyorders');


  // status is not 'paymentConfirmed'

  // if searchMyOrders is true, get orders by wallet address is walletAddress
  // else get all orders except paymentConfirmed
  // sort status is accepted first, then createdAt desc

  if (searchMyOrders) {

    const results = await collection.find<UserProps>(

      //{ walletAddress: walletAddress, status: { $ne: 'paymentConfirmed' } },
      { walletAddress: walletAddress },
      
      //{ projection: { _id: 0, emailVerified: 0 } }

    )

    .sort({ createdAt: -1 })
    .limit(limit).skip((page - 1) * limit).toArray();

    return {
      totalCount: results.length,
      orders: results,
    };

  } else {

    const results = await collection.find<UserProps>(
      {
        //status: 'ordered',
  
        
        status: { $ne: 'paymentConfirmed' },

  
        // exclude private sale
        //privateSale: { $ne: true },
      },
      
      //{ projection: { _id: 0, emailVerified: 0 } }
  
    ).sort({ createdAt: -1 }).limit(limit).skip((page - 1) * limit).toArray();
  
    return {
      totalCount: results.length,
      orders: results,
    };

  }


}





// deleete sell order by orderId
export async function deleteBuyOrder(

  {
    orderId,
    walletAddress,
  }: {
    orderId: string;
    walletAddress: string;
  
  }


): Promise<boolean> {

  const client = await clientPromise;
  const collection = client.db('shinemywinter').collection('buyorders');

  // check orderId is valid ObjectId
  if (!ObjectId.isValid(orderId)) {
    return false;
  }

  // check walletAddress is valid

  if (!walletAddress) {
    return false;
  }

  // status is 'ordered'
  const result = await collection.deleteOne(
    { _id: new ObjectId(orderId), walletAddress: walletAddress, status: 'ordered' }
  );



  if (result.deletedCount === 1) {
    return true;
  } else {
    return false;
  }


}








// get sell orders order by createdAt desc
export async function getBuyOrdersForSeller(

  {
    limit,
    page,
    walletAddress,
    searchMyTrades,
  }: {

    limit: number;
    page: number;
    walletAddress: string;
    searchMyTrades: boolean;
  }

): Promise<ResultProps> {

  const client = await clientPromise;
  const collection = client.db('shinemywinter').collection('buyorders');


  // status is not 'paymentConfirmed'



  // if searchMyTrades is true, get orders by buyer wallet address is walletAddress
  // else get all orders except paymentConfirmed

  if (searchMyTrades) {

    const results = await collection.find<UserProps>(
      {
        'walletAddress': walletAddress,
        
        //status: { $ne: 'paymentConfirmed' },

      },
      
      //{ projection: { _id: 0, emailVerified: 0 } }

    ).sort({ createdAt: -1 }).limit(limit).skip((page - 1) * limit).toArray();

    return {
      totalCount: results.length,
      orders: results,
    };

  } else {

    const results = await collection.find<UserProps>(
      {
        //status: 'ordered',
  
        //status: { $ne: 'paymentConfirmed' },
  
        // exclude private sale
        privateSale: { $ne: true },
      },
      
      //{ projection: { _id: 0, emailVerified: 0 } }
  
    ).sort({ createdAt: -1 }).limit(limit).skip((page - 1) * limit).toArray();
  
    return {
      totalCount: results.length,
      orders: results,
    };

  }


}







// accept buy order
// update order status to accepted

export async function acceptBuyOrder(data: any) {
  
  ///console.log('acceptBuyOrder data: ' + JSON.stringify(data));

  /*
  acceptBuyOrder data: {"lang":"kr","chain":"polygon",
  "orderId":"66cbe428254954dcc8929528",
  "sellerWalletAddress":"0x919eB871C4F99b860Da992f51260790BF6dc25a7",
  "sellerNickname":"",
  "sellerAvatar":""}
  */




  if (!data.orderId || !data.sellerWalletAddress || !data.sellerMobile) {
    return null;
  }

  const sellerMemo = data.sellerMemo || '';


  const bankInfo = data?.seller?.bankInfo || {};


  ///console.log('acceptBuyOrder bankInfo: ' + JSON.stringify(bankInfo));



  /*
    if (!data.walletAddress || !data.sellerStatus || !data.bankName || !data.accountNumber || !data.accountHolder) {
    return null;
  }

  const seller = {
    status: data.sellerStatus,
    bankInfo: {
      bankName: data.bankName,
      accountNumber: data.accountNumber,
      accountHolder: data.accountHolder,
    }
  };
  */




  const client = await clientPromise;
  const collection = client.db('shinemywinter').collection('buyorders');

  // random number for tradeId
  // 100000 ~ 999999 string

  const tradeId = Math.floor(Math.random() * 900000) + 100000 + '';



  /*
    const result = await collection.findOne<UserProps>(
    { _id: new ObjectId(orderId) }
  );
  */


  ///console.log('acceptSellOrder data.orderId: ' + data.orderId);

 
  // *********************************************
  // update status to accepted if status is ordered

  // if status is not ordered, return null
  // check condition and update status to accepted
  // *********************************************

  const result = await collection.findOneAndUpdate(
    { _id: new ObjectId(data.orderId + ''), status: 'ordered' },
    { $set: {
      status: 'accepted',
      acceptedAt: new Date().toISOString(),
      tradeId: tradeId,
      
      seller: {
        walletAddress: data.sellerWalletAddress,
        nickname: data.sellerNickname,
        avatar: data.sellerAvatar,
        mobile: data.sellerMobile,
        memo: sellerMemo,
        bankInfo: bankInfo,

      },

    } }
  );








  if (result) {

    const updated = await collection.findOne<UserProps>(
      { _id: new ObjectId(data.orderId + '') }
    );

    ///console.log('acceptSellOrder updated: ' + JSON.stringify(updated));



    return updated;

  } else {
    return null;
  }
  
}







export async function buyOrderRequestPayment(data: any) {
  
  ///console.log('acceptSellOrder data: ' + JSON.stringify(data));

  if (!data.orderId) {
    return null;
  }

  if (!data.transactionHash) {
    return null;
  }


  const client = await clientPromise;
  const collection = client.db('shinemywinter').collection('buyorders');


  const result = await collection.updateOne(
    
    { _id: new ObjectId(data.orderId + '') },


    { $set: {
      status: 'paymentRequested',
      escrowTransactionHash: data.transactionHash,
      paymentRequestedAt: new Date().toISOString(),
    } }
  );

  if (result) {
    const updated = await collection.findOne<UserProps>(
      { _id: new ObjectId(data.orderId + '') }
    );

    return updated;
  } else {
    return null;
  }
  
}





export async function buyOrderConfirmPayment(data: any) {
  
  ///console.log('acceptSellOrder data: ' + JSON.stringify(data));

  if (!data.orderId) {
    return null;
  }

  if (!data.transactionHash) {
    return null;
  }

  const paymentAmount = data.paymentAmount || 0;


  const client = await clientPromise;
  const collection = client.db('shinemywinter').collection('buyorders');


  const result = await collection.updateOne(
    
    { _id: new ObjectId(data.orderId+'') },


    { $set: {
      status: 'paymentConfirmed',
      paymentAmount: paymentAmount,
      queueId: data.queueId,
      transactionHash: data.transactionHash,
      paymentConfirmedAt: new Date().toISOString(),
    } }
  );

  if (result) {
    const updated = await collection.findOne<UserProps>(
      { _id: new ObjectId(data.orderId+'') }
    );

    return updated;
  } else {
    return null;
  }
  
}




export async function buyOrderRollbackPayment(data: any) {
  
  ///console.log('acceptSellOrder data: ' + JSON.stringify(data));

  if (!data.orderId) {
    return null;
  }

  if (!data.transactionHash) {
    return null;
  }

  const paymentAmount = data.paymentAmount || 0;


  const client = await clientPromise;
  const collection = client.db('shinemywinter').collection('buyorders');


  const result = await collection.updateOne(
    
    { _id: new ObjectId(data.orderId+'') },


    { $set: {
      status: 'cancelled',
      paymentAmount: paymentAmount,
      queueId: data.queueId,
      transactionHash: data.transactionHash,
      cancelledAt: new Date().toISOString(),
      rollbackAmount: paymentAmount,
    } }
  );

  if (result) {
    const updated = await collection.findOne<UserProps>(
      { _id: new ObjectId(data.orderId+'') }
    );

    return updated;
  } else {
    return null;
  }
  
}





// getOrderById
export async function buyOrderGetOrderById(orderId: string): Promise<UserProps | null> {

  const client = await clientPromise;
  const collection = client.db('shinemywinter').collection('buyorders');

  const result = await collection.findOne<UserProps>(
    { _id: new ObjectId(orderId) }
  );

  if (result) {
    return result;
  } else {
    return null;
  }

}






// cancel buy order by orderId from seller
export async function cancelTradeBySeller(

  {
    orderId,
    walletAddress,
  }: {
    orderId: string;
    walletAddress: string;
  
  }

) {

  const client = await clientPromise;
  const collection = client.db('shinemywinter').collection('buyorders');

  // check orderId is valid ObjectId
  if (!ObjectId.isValid(orderId)) {
    return false;
  }

  // check walletAddress is valid

  if (!walletAddress) {
    return false;
  }

  // check status is 'accepted'

  // update status to 'cancelled'

  const result = await collection.updateOne(
    { _id: new ObjectId(orderId), 'seller.walletAddress': walletAddress, status: 'accepted' },
    { $set: {
      status: 'cancelled',
      cancelledAt: new Date().toISOString(),
    } }
  );

  const updated = await collection.findOne<UserProps>(
    { _id: new ObjectId(orderId) }
  );

  if (result) {
    return {
      updated,
    }
  } else {
    return null;
  }


}







export async function getOneBuyOrder(

  {
    orderId,
    limit,
    page,
  }: {
    orderId: string;
    limit: number;
    page: number;
  
  }

): Promise<ResultProps> {

  const client = await clientPromise;
  const collection = client.db('shinemywinter').collection('buyorders');


  // status is not 'paymentConfirmed'

  // check orderId is valid ObjectId


  if (!ObjectId.isValid(orderId)) {
    return {
      totalCount: 0,
      orders: [],
    };
  }




  const results = await collection.find<UserProps>(
    {

      _id: new ObjectId(orderId),

      //status: 'ordered',

      ///status: { $ne: 'paymentConfirmed' },

      // exclude private sale
      //privateSale: { $ne: true },
    },
    
    //{ projection: { _id: 0, emailVerified: 0 } }

  ).sort({ createdAt: -1 }).limit(limit).skip((page - 1) * limit).toArray();



  return {
    totalCount: results.length,
    orders: results,
  };

}



// updateBuyOrderByQueueId
export async function updateBuyOrderByQueueId(data: any) {

  console.log('updateBuyOrderByQueueId data: ' + JSON.stringify(data));

  if (!data.queueId || !data.transactionHash || !data.minedAt) {
    return null;
  }

  const client = await clientPromise;
  const collection = client.db('shinemywinter').collection('buyorders');

  const result = await collection.updateOne(
    { queueId: data.queueId },
    { $set: {
      transactionHash: data.transactionHash,
      minedAt: data.minedAt,
    } }
  );

  if (result) {
    return true;
  } else {
    return false;
  }

}
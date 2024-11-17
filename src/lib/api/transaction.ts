import clientPromise from '../mongodb';


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
}

export interface ResultProps {
  totalCount: number;
  users: UserProps[];
}


export async function insertOne(data: any) {

  ///console.log('insertOne data: ' + JSON.stringify(data));

  if (!data.walletAddress || !data.amount || !data.toWalletAddress) {
    return null;
  }



  const client = await clientPromise;



  // get user mobile number by wallet address

  const userCollection = client.db('vienna').collection('users');


  const fromUser = await userCollection.findOne<UserProps>(
    { walletAddress: data.walletAddress },
    { projection: { _id: 0, emailVerified: 0 } }
  );

  if (!fromUser) {
    return null;
  }


  const user = await userCollection.findOne<UserProps>(
    { walletAddress: data.toWalletAddress },
    { projection: { _id: 0, emailVerified: 0 } }
  );

  ///console.log('user: ' + user);
  
  if (!user) {
    return null;
  }

  ////console.log('user: ' + user);

  const fromUserNickname = fromUser.nickname;

  const userMobile = user.mobile;



  const collection = client.db('vienna').collection('transactions');

 
  const result = await collection.insertOne(

    {
      walletAddress: data.walletAddress,
      amount: data.amount,
      toWalletAddress: data.toWalletAddress,
      fromUserNickname: fromUserNickname,
      createdAt: new Date().toISOString(),
    }
  );


  if (result) {
    return {
      walletAddress: data.walletAddress,
      amount: data.amount,
      toWalletAddress: data.toWalletAddress,
      toMobileNumber: userMobile,
      fromUserNickname: fromUserNickname,
    };
  } else {
    return null;
  }
  

}



// get send transactions by wallet address
export async function getSendTransactionsByWalletAddress(
  { walletAddress }: { walletAddress: string }
): Promise<any> {

  const client = await clientPromise;
  const collection = client.db('vienna').collection('transactions');

  const results = await collection.find(
    {
      walletAddress: walletAddress,
    }
  ).sort({ _id: -1 }).toArray();

  return results;

}


// get receive transactions by wallet address
export async function getReceiveTransactionsByWalletAddress(
  { walletAddress }: { walletAddress: string }
): Promise<any> {

  const client = await clientPromise;
  const collection = client.db('vienna').collection('transactions');

  const results = await collection.find(
    {
      toWalletAddress: walletAddress,
    }
  ).sort({ _id: -1 }).toArray();

  return results;

}





export async function updateOne(data: any) {
  const client = await clientPromise;
  const collection = client.db('vienna').collection('users');


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
  const collection = client.db('vienna').collection('users');


  // id is number

  const results = await collection.findOne<UserProps>(
    { walletAddress: walletAddress },
    { projection: { _id: 0, emailVerified: 0 } }
  );


  console.log('getOneByWalletAddress results: ' + results);

  return results;

}





export async function getAllUsers(
  {
    limit,
    page,
  }: {
    limit: number;
    page: number;
  }
): Promise<ResultProps> {


  const client = await clientPromise;
  const collection = client.db('vienna').collection('users');


  console.log('limit: ' + limit);
  console.log('page: ' + page);

  // walletAddress is not empty and not null

  const users = await collection
    .find<UserProps>(
      {


        walletAddress: { $exists: true, $ne: null },
        

      },
      {
        limit: limit,
        skip: (page - 1) * limit,
      },
      
    )
    .sort({ _id: -1 })
    .toArray();


  const totalCount = await collection.countDocuments(
    {
      walletAddress: { $exists: true, $ne: null },
    }
  );

  return {
    totalCount,
    users,
  };

  
}












export async function getUserWalletPrivateKeyByWalletAddress(
  walletAddress: string,
): Promise<string | null> {

  const client = await clientPromise;
  const collection = client.db('lefimall').collection('users');

  const results = await collection.findOne<UserProps>(
    { walletAddress },
    { projection: { _id: 0, emailVerified: 0 } }
  ) as any;

  console.log('getUserWalletPrivateKeyByWalletAddress results: ' + results);

  if (results) {
    return results.walletPrivateKey;
  } else {
    return null;
  }

}


export async function getUserByEmail(
  email: string,
): Promise<UserProps | null> {

  console.log('getUser email: ' + email);

  const client = await clientPromise;
  const collection = client.db('lefimall').collection('users');


  return await collection.findOne<UserProps>(
    { email },
    { projection: { _id: 0, emailVerified: 0 } }
  );

}


export async function checkUserByEmail(
  email: string,
  password: string,
): Promise<UserProps | null> {

  console.log('getUser email: ' + email);

  const client = await clientPromise;
  const collection = client.db('lefimall').collection('users');


  const results = await collection.findOne<UserProps>(
    {
      email,
      password,
    },
    { projection: { _id: 0, emailVerified: 0 } }
  );

  ///console.log('getUser results: ' + results);

  if (results) {
    return {
      ...results,
      ///bioMdx: await getMdxSource(results.bio || placeholderBio)
    };
  } else {
    return null;
  }

}


export async function loginUserByEmail(
  email: string,
  password: string,
): Promise<UserProps | null> {

  console.log('getUser email: ' + email);

  const client = await clientPromise;
  const collection = client.db('lefimall').collection('users');


  const results = await collection.findOne<UserProps>(
    {
      email,
      password,
    },
    { projection: { _id: 0, emailVerified: 0 } }
  );

  if (results) {
    
    // user_login_sesson
    const sessionCollection = client.db('lefimall').collection('user_login_sessions');
    const sessionResults = await sessionCollection.insertOne({
      id: results.id,
      email: results.email,
      loginedAt: new Date().toISOString(),
    });

    console.log('sessionResults: ' + sessionResults);

    return {
      ...results,
      ...sessionResults,
      ///bioMdx: await getMdxSource(results.bio || placeholderBio)
    }

  } else {
    return null;
  }


}









export async function searchUser(query: string): Promise<UserProps[]> {
  const client = await clientPromise;
  const collection = client.db('lefimall').collection('users');

  
  return await collection
    .aggregate<UserProps>([
      {
        $search: {
          index: 'name-index',
          /* 
          name-index is a search index as follows:

          {
            "mappings": {
              "fields": {
                "followers": {
                  "type": "number"
                },
                "name": {
                  "analyzer": "lucene.whitespace",
                  "searchAnalyzer": "lucene.whitespace",
                  "type": "string"
                },
                "username": {
                  "type": "string"
                }
              }
            }
          }

          */
          text: {
            query: query,
            path: {
              wildcard: '*' // match on both name and username
            },
            fuzzy: {},
            score: {
              // search ranking algorithm: multiply relevance score by the log1p of follower count
              function: {
                multiply: [
                  {
                    score: 'relevance'
                  },
                  {
                    log1p: {
                      path: {
                        value: 'followers'
                      }
                    }
                  }
                ]
              }
            }
          }
        }
      },
      {
        // filter out users that are not verified
        $match: {
          verified: true
        }
      },
      // limit to 10 results
      {
        $limit: 10
      },
      {
        $project: {
          _id: 0,
          emailVerified: 0,
          score: {
            $meta: 'searchScore'
          }
        }
      }
    ])
    .toArray();
}

export async function getUserCount(): Promise<number> {
  const client = await clientPromise;
  const collection = client.db('lefimall').collection('users');
  return await collection.countDocuments();
}



export async function updateUser(username: string, bio: string) {
  const client = await clientPromise;
  const collection = client.db('lefimall').collection('users');
  return await collection.updateOne({ username }, { $set: { bio } });
}




export async function checkUser(id: string, password: string): Promise<UserProps | null> {
  

  const client = await clientPromise;
  const collection = client.db('lefimall').collection('users');
  const results = await collection.findOne<UserProps>(
    {
      id,
      password,
    },
    { projection: { _id: 0, emailVerified: 0 } }
  );
  if (results) {
    return {
      ...results,
      //bioMdx: await getMdxSource(results.bio || placeholderBio)
    };
  } else {
    return null;
  }
}



// get user 



export async function getAllUsersForSettlement(
  limit: number,
  page: number,
): Promise<ResultProps> {


  const client = await clientPromise;
  const collection = client.db('lefimall').collection('users');


  console.log('limit: ' + limit);
  console.log('page: ' + page);

  // walletAddress is not empty and not null

  const users = await collection
    .find<UserProps>(
      {
        walletAddress: { $exists: true, $ne: null },
        walletPrivateKey: { $exists: true, $ne: null },

      },
      {
        limit: limit,
        skip: (page - 1) * limit,
      },
      
    )
    .sort({ _id: -1 })
    .toArray();


  const totalCount = await collection.countDocuments(
    {
      walletAddress: { $exists: true, $ne: null },
      walletPrivateKey: { $exists: true, $ne: null },
    }
  );

  return {
    totalCount,
    users,
  };

}




export async function getAllUsersForSettlementOfStore(
  limit: number,
  page: number,
): Promise<ResultProps> {


  const client = await clientPromise;
  const collection = client.db('lefimall').collection('users');


  console.log('limit: ' + limit);
  console.log('page: ' + page);

  // walletAddress is not empty and not null

  const users = await collection
    .find<UserProps>(
      {


        walletAddress: { $exists: true, $ne: null },
        walletPrivateKey: { $exists: true, $ne: null },

        // when settlementAmountOfFee is exist, check settlementAmountOfFee is 0

        settlementAmountOfFee: {
          $exists: true,
          $eq: "0"
        }, 

      },
      {
        limit: limit,
        skip: (page - 1) * limit,
      },
      
    )
    .sort({ _id: -1 })
    .toArray();


  const totalCount = await collection.countDocuments(
    {
      walletAddress: { $exists: true, $ne: null },
      walletPrivateKey: { $exists: true, $ne: null },
    }
  );

  return {
    totalCount,
    users,
  };

}




// update settlementAmountOfFee for User collection
export async function updateSettlementAmountOfFee(
  walletAddress: string,
  settlementAmountOfFee: string,
) {

  console.log('updateSettlementAmountOfFee walletAddress: ' + walletAddress + ' settlementAmountOfFee: ' + settlementAmountOfFee);
  
  const client = await clientPromise;
  const collection = client.db('lefimall').collection('users');

  return await collection.updateOne(
    { walletAddress },
    {
      $set: {
        settlementAmountOfFee,
      }
    }
  );
  
  }

// getAllUsersForSettlementOfFee

export async function getAllUsersForSettlementOfFee(
  limit: number,
  page: number,
): Promise<ResultProps> {


  const client = await clientPromise;
  const collection = client.db('lefimall').collection('users');


  console.log('limit: ' + limit);
  console.log('page: ' + page);

  // walletAddress is not empty and not null

  const users = await collection
    .find<UserProps>(
      {


        walletAddress: { $exists: true, $ne: null },
        walletPrivateKey: { $exists: true, $ne: null },

        // when settlementAmountOfFee is exist, check convert settlementAmountOfFee to float number and check settlementAmountOfFee is greater than 0

        settlementAmountOfFee: {
          $exists: true,
          $ne: "0"
        }, 

      },
      {
        limit: limit,
        skip: (page - 1) * limit,
      },
      
    )
    .sort({ _id: -1 })
    .toArray();


  const totalCount = await collection.countDocuments(
    {
      walletAddress: { $exists: true, $ne: null },
      walletPrivateKey: { $exists: true, $ne: null },
    }
  );

  return {
    totalCount,
    users,
  };

}
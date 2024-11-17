import clientPromise from '../mongodb';

export interface UserProps {
  walletAddress: string;
  otp: number;
  createdAt: string;
}

export async function insertOne(data: any) {

  //console.log('insertOne data: ' + JSON.stringify(data));

  if (!data.walletAddress) {
    return null;
  }


  const client = await clientPromise;
  const collection = client.db('vienna').collection('opts');



  // random number 100000 ~ 999999
  //  // otp is string

  //const otp = Math.floor(Math.random() * 900000) + 100000;

  const otp = Math.floor(100000 + Math.random() * 900000).toString();

 



  const checkUser = await collection.findOne<UserProps>(
    {
      walletAddress: data.walletAddress,

    },
  );

  ///console.log('checkUser: ' + checkUser);


  if (checkUser) {

    const result = await collection.updateOne(
      { walletAddress: data.walletAddress },
      { $set: { otp: otp, createdAt: new Date().toISOString() } }
    );

  } else {
  
    const result = await collection.insertOne(

      {
        walletAddress: data.walletAddress,
        otp: otp,
        createdAt: new Date().toISOString(),
      }
    );

  }

  return {
    walletAddress: data.walletAddress,
    otp: otp,
    createdAt: new Date().toISOString(),
  };

}


export async function findOne(data: any) {

  console.log('findOne data: ' + JSON.stringify(data));

  if (!data.walletAddress) {
    return null;
  }

  if (!data.otp) {
    return null;
  }

  const client = await clientPromise;
  const collection = client.db('vienna').collection('opts');

  const result = await collection.findOne<UserProps>(
    {
      walletAddress: data.walletAddress,
      otp: data.otp,
    },
  );

  return result;
}



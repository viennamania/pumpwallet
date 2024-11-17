import clientPromise from '../mongodb';

export interface ImageProps {
  _id: string;
  prompt: string;
  image: string;
  erc721ContractAddress: string;
  tokenid: number;
  createdAt: string;
  updatedAt: string;
}

export async function insertOne(data: any) {

  //console.log('insertOne data: ' + JSON.stringify(data));


  if (!data.prompt) {
    return null;
  }


  if (!data.url) {
    return null;
  }

  if (!data.image) {
    return null;
  }




  const client = await clientPromise;
  const collection = client.db('vienna').collection('images');


  // check if image already exists
  const existing = await collection.findOne<ImageProps>(
    {
      url: data.url,
    },
  );

  if (existing) {
    console.log('image already exists');
    return null;
  }

  
  const result = await collection.insertOne(
    {
      userid: data.userid,
      prompt: data.prompt,
      url: data.url,
      image: data.image,
      erc721ContractAddress: data.erc721ContractAddress,
      tokenid: data.tokenid,
      createdAt: new Date().toISOString(),
    }
  );

  return {
    result: result,
  };

}




export async function findOne(data: any) {

  console.log('findOne data: ' + JSON.stringify(data));

  if (!data.tokenid) {
    return null;
  }

  const tokenid = parseInt(data.tokenid);


  const client = await clientPromise;
  const collection = client.db('vienna').collection('images');

  const result = await collection.findOne<ImageProps>(
    {
      tokenid: tokenid,
    },
  );

  ///console.log('findOne result: ' + JSON.stringify(result));


  return result;
}


// find one by url
export async function findOneByUrl(data: any) {

  console.log('findOne data: ' + JSON.stringify(data));

  if (!data.url) {
    return null;
  }

  const client = await clientPromise;

  const collection = client.db('vienna').collection('images');

  const result = await collection.findOne<ImageProps>(
    {
      url: data.url,
    },
  );

  ///console.log('findOne result: ' + JSON.stringify(result));


  return result;

}



export async function findOneByImage(data: any) {

  console.log('findOne data: ' + JSON.stringify(data));

  if (!data.image) {
    return null;
  }




  const client = await clientPromise;
  const collection = client.db('vienna').collection('images');

  const result = await collection.findOne<ImageProps>(
    {
      image: data.image,
    },
  );

  ///console.log('findOne result: ' + JSON.stringify(result));


  return result;
}


// update image by image
export async function updateOneByImage(data: any) {
  
  
  console.log('updateOneByImage data: ' + JSON.stringify(data));


  if (!data.image) {
    return null;
  }

  if (!data.erc721ContractAddress) {
    return null;
  }

  if (!data.tokenid) {
    return null;
  }

  const tokenid = parseInt(data.tokenid);

  const client = await clientPromise;
  const collection = client.db('vienna').collection('images');

  const result = await collection.updateOne(
    {
      image: data.image,
    },
    {
      $set: {
        erc721ContractAddress: data.erc721ContractAddress,
        tokenid: tokenid,
        updatedAt: new Date().toISOString(),
      },
    },
  );

  return {
    result: result,
  };

}


// find all (image) by userid ordr by createdAt desc recent 5 images
export async function findAllByUserid(data: any) {
  
  ///console.log('findAllByUserid data: ' + JSON.stringify(data));

  if (!data.userid) {
    return null;
  }

  const client = await clientPromise;
  const collection = client.db('vienna').collection('images');

  const result = await collection.find<ImageProps>(
    {
      userid: data.userid,
    },


  ).sort({createdAt: -1}).toArray();

  return result;
}


// delete one by image
export async function deleteOneByImage(data: any) {
  
  console.log('deleteOneByImage data: ' + JSON.stringify(data));

  if (!data.image) {
    return null;
  }

  const client = await clientPromise;
  const collection = client.db('vienna').collection('images');

  const result = await collection.deleteOne(
    {
      image: data.image,
    },
  );

  return {
    result: result,
  };

}

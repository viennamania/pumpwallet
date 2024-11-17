import clientPromise from '../mongodb';

export interface PromptProps {
  prompt: string;
  englishPrompt: string;
  negativePrompt: string;
  createdAt: string;
}

export async function insertOne(data: any) {

  //console.log('insertOne data: ' + JSON.stringify(data));

  if (!data.prompt) {
    return null;
  }

  if (!data.englishPrompt) {
    return null;
  }

  const userid = data.userid;




  const client = await clientPromise;
  const collection = client.db('vienna').collection('prompts');


  const result = await collection.insertOne(
    {
      prompt: data.prompt,
      englishPrompt: data.englishPrompt,
      negativePrompt: data.negativePrompt,
      userid: userid,
      createdAt: new Date().toISOString(),
    }
  );

  return {
    result: result,
  };

}




export async function findOne(data: any) {

  console.log('findOne data: ' + JSON.stringify(data));

  if (!data.prompt) {
    return null;
  }


  const client = await clientPromise;
  const collection = client.db('vienna').collection('prompts');

  const result = await collection.findOne<PromptProps>(
    {
      tokenid: data.tokenid,
    },
  );

  return result;
}

// all the prompts order by createdAt desc last 500
export async function findAll() {

  const client = await clientPromise;
  const collection = client.db('vienna').collection('prompts');

  const result = await collection.find<PromptProps>({}).sort({ createdAt: -1 }).limit(500).toArray();

  return result;
}




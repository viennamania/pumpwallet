import { NextResponse, type NextRequest } from "next/server";




import axios from "axios";
import sharp from "sharp";

////import { PutBlobResult } from '@vercel/blob'

import { put } from '@vercel/blob';


import { customAlphabet } from 'nanoid';

import {
  findOneByUrl,
	insertOne as insertOneImage,
} from '@/lib/api/image';



///export const runtime = 'edge'

// nextjs-app
export const maxDuration = 60; // This function can run for a maximum of 60 seconds





const nanoid = customAlphabet(
  '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
  7
) // 7-character random string



/*
export default async function handler(req, res) {

  const userid = req.body?.userid;

  const url = req.body.url;

  const prompt = req.body.prompt;

  const type = req.body.type;
*/


export async function POST(request: NextRequest) {



    const body = await request.json();

    const { userid, url, prompt, type } = body;

    //console.log("userid", userid);
    //console.log("url", url);
    //console.log("prompt", prompt);
    //console.log("type", type);




  if (!url) {

    //return res.status(400).json({ error: "Please provide a url" });

    return NextResponse.json({
        status: 400,
        body: { error: "Please provide a url" },
      });


  }



  // check if the image already exists by url
  const existingImage = await findOneByUrl(
    {
      url: url,
    }
  );

  // return error if the image already exists
  if (existingImage) {
    ///return res.status(400).json({ error: "Image already exists" });

    return NextResponse.json({
        status: 400,
        body: { error: "Image already exists" },
      });

  }




  const response = await axios.get(url, {
    responseType: "arraybuffer",
  });

  const base64 = Buffer.from(response.data, "binary").toString("base64");



  const contentType = type || 'image/png';
  
  //const filename = `${nanoid()}.${contentType.split('/')[1]}`

  const filename = `${nanoid()}.${type}`;


  const blob = await put(

    filename,
    
    Buffer.from(base64, "base64"),

    {
      contentType: "image/png",


      access: 'public',
    }
  )

  console.log('blob?.url', blob?.url);





  const image = blob.url;
  const erc721ContractAddress = '';
  const tokenid = 0;


  const result = await insertOneImage({
    userid: userid,
    prompt: prompt,
    url: url,
    image: image,
    erc721ContractAddress: erc721ContractAddress,
    tokenid: tokenid,
  });

  console.log("result", result);



  
  /*
  if (userid != null && userid != 'null' && userid != "" && blob.url != null && blob.url != 'null' && blob.url != "" && userid != "songpa") {
    const pointRrl = "https://www.olgagpt.com/sub/createNFT.asp?userid=" + userid + "&image=" + encodeURIComponent(blob.url);
    ///console.log(pointRrl);
    const callback = await fetch(pointRrl);

    const data = await callback.json();

    ///console.log(data);

  }
  */



  console.log("download url", url);
  console.log("download type", type);



  /*
  const response = await axios.get(url, {
    responseType: "arraybuffer",
  });

  const base64 = Buffer.from(response.data, "binary").toString("base64");
  */


  /*
  if (type == 'png') {

    const png = await sharp(Buffer.from(base64, "base64"))
      .png()
      .toBuffer();
    const pngBase64 = Buffer.from(png, "binary").toString("base64");


    res.status(200).json({ result: `data:image/png;base64,${pngBase64}` });


  } else if (type == 'jpg') {
    const jpg = await sharp(Buffer.from(base64, "base64"))
      .jpeg()
      .toBuffer();
    const jpgBase64 = Buffer.from(jpg, "binary").toString("base64");


    res.status(200).json({ result: `data:image/jpeg;base64,${jpgBase64}` });

  } else if (type == 'gif') {
    const gif = await sharp(Buffer.from(base64, "base64"))
      .gif()
      .toBuffer();
    const gifBase64 = Buffer.from(gif, "binary").toString("base64");


    res.status(200).json({ result: `data:image/gif;base64,${gifBase64}` });

  } else if (type == 'avif') {
    const avif = await sharp(Buffer.from(base64, "base64"))
      .avif()
      .toBuffer();
    const avifBase64 = Buffer.from(avif, "binary").toString("base64");


    res.status(200).json({ result: `data:image/avif;base64,${avifBase64}` });

  } else {


    res.status(200).json({ result: `data:image/webp;base64,${base64}` });
  }

  */

    const png = await sharp(Buffer.from(base64, "base64")).png().toBuffer();

    //const pngBase64 = Buffer.from(png, "binary").toString("base64");

    const pngBase64 = png.toString('base64');



    //res.status(200).json({ result: `data:image/png;base64,${pngBase64}` });



    return NextResponse.json({
        status: 200,
        result: 'data:image/png;base64,' + pngBase64,
    });

  

}

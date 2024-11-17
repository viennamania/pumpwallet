import { NextResponse, type NextRequest } from "next/server";


import { OpenAI } from 'openai';

import Replicate from "replicate";


import * as fal from "@fal-ai/serverless-client";


import { insertOne } from '@/lib/api/prompt';


//nextjs /pages/api
/*
export const config = {
    //runtime: 'edge',
    maxDuration: 180, // This function can run for a maximum of 180 seconds
};
*/

/*
export const maxDuration = 180; // 추가한 코드
export const dynamic = 'force-dynamic'; // 추가한 코드
*/

// nextjs-app
export const maxDuration = 60; // This function can run for a maximum of 60 seconds




const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN,
});

fal.config({
    credentials: process.env.FAL_KEY,
});




///export default async function handler(req, res) {

export async function GET(request: NextRequest) {

    const url = new URL(request.url);

    ///console.log("url=", url);



    const prompt = url.searchParams.get("p")?.trim();
    const n = url.searchParams.get("n");
    const userid = url.searchParams.get("userid");
    const isReal = url.searchParams.get("real");





    let englishPrompt = '';



    // translate prompt to english using OpenAI API

    const completion = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [

            {"role": "system", "content": "Translate this to English: " + prompt
            + " and generate just translated text in English. If this prompt: " + prompt + " is already in English, please respond with just the original prompt."},

            {"role": "user", "content": "Translate this to English: " + prompt
            + " and generate just translated text in English. If this prompt: " + prompt + " is already in English, please respond with just the original prompt."},


        ],
        stream: true,
    });

    for await (const chunk of completion) {
    
    //console.log(
    //  chunk.choices[0].delta.content + '\n'
    //);


    /*
    "
Please
create
a
woman
with
a
beautiful
figure
standing
."
undefined
    */

    
        if (chunk.choices[0].delta.content  != undefined && chunk.choices[0].delta.content  != null && chunk.choices[0].delta.content  != '') {
            englishPrompt = englishPrompt + chunk.choices[0].delta.content;
        }
    
    }



    const negative_prompt = "easynegative,ng_deepnegative_v1_75t,((monochrome)),((grayscale)),bad-picture-chill-75v, (worst quality, low quality:1.4), monochrome, grayscale, sketches, paintings, lowres, normalres, blurry, acnes on face, {{sperm}}, {{bra}}";

    //const negative_prompt = "";


    const resultInsertOne = await insertOne({
        prompt: prompt,
        englishPrompt: englishPrompt,
        negativePrompt: negative_prompt,
        userid: userid,
    });

    console.log("resultInsertOne=", resultInsertOne);


    let input = {
        ///seed: 4234234,

        prompt: englishPrompt,

        output_quality: 90,

        //image_size: "square",
        //image_size: "square",
        image_size: "square_hd",

        disable_safety_checker: true,

        negative_prompt: negative_prompt,
    };


    let hosting = "" as any;
    let model = "" as any;

    // random model


    /*
    let randomModel = Math.floor(Math.random() * 10);

    randomModel = 2;


    console.log("randomModel=", randomModel);

    let hosting = "replicate";

    if (randomModel == 0) {
        
        model = "black-forest-labs/flux-schnell";

    } else if (randomModel == 1) {

        model = "bytedance/sdxl-lightning-4step:5f24084160c9089501c1b3545d9be3c27883ae2239b6f412990e82d4a6210f8f";

    } else if (randomModel == 2) {

        //model = "bytedance/sdxl-lightning-4step:5f24084160c9089501c1b3545d9be3c27883ae2239b6f412990e82d4a6210f8f";

        model = "datacte/proteus-v0.2:06775cd262843edbde5abab958abdbb65a0a6b58ca301c9fd78fa55c775fc019";

    } else if (randomModel == 3) {

        model = "playgroundai/playground-v2.5-1024px-aesthetic:a45f82a1382bed5c7aeb861dac7c7d191b0fdf74d8d57c4a0e6ed7d4d0bf7d24";

    } else if (randomModel == 4) {
        
        model = "lucataco/dreamshaper-xl-turbo:0a1710e0187b01a255302738ca0158ff02a22f4638679533e111082f9dd1b615";

    } else if (randomModel == 5) {

        model = "black-forest-labs/flux-schnell";

    } else if (randomModel == 6) {

        model = "playgroundai/playground-v2.5-1024px-aesthetic:a45f82a1382bed5c7aeb861dac7c7d191b0fdf74d8d57c4a0e6ed7d4d0bf7d24";


    } else if (randomModel >= 7) {

        hosting = "fal";

        
        model = "fal-ai/flux-realism";

        //model = "fal-ai/fast-lcm-diffusion";

    }

    ////model = "lucataco/realistic-vision-v5:8aeee50b868f06a1893e3b95a8bb639a8342e846836f3e0211d6a13c158505b1";


    // nsfw model
    //model = "adirik/realvisxl-v4.0:85a58cc71587cc27539b7c83eb1ce4aea02feedfb9a9fae0598cebc110a3d695";
    */

    console.log("englishPrompt=", englishPrompt);


    // openai image generation result format
    let  result = [] as any;
    

    let randomModel = Math.floor(Math.random() * 4);
    console.log("randomModel=", randomModel);

    randomModel = 1;

    if (isReal == "true") {
        randomModel = 4;
    }

    if (randomModel == 0) {
        hosting = "replicate";
        model = "datacte/proteus-v0.2:06775cd262843edbde5abab958abdbb65a0a6b58ca301c9fd78fa55c775fc019";
    } else if (randomModel == 1) {
        hosting = "replicate";
        
        model = "playgroundai/playground-v2.5-1024px-aesthetic:a45f82a1382bed5c7aeb861dac7c7d191b0fdf74d8d57c4a0e6ed7d4d0bf7d24";


    } else if (randomModel == 2) {
        hosting = "fal";
        model = "fal-ai/flux-realism";
    } else if (randomModel == 3) {
        hosting = "fal";
        model = "fal-ai/flux-pro";
    } else if (randomModel == 4) {
        
        hosting = "fal";
        model = "fal-ai/flux/dev";

        //hosting = "replicate";
        //model = "vonjonfilm/office-girl-lora:227b6aed5cf4623af8d4d73c0f54f8a254c24514c003ce5b39c4c07076575833"



    }



    let output = [];

    if (hosting === "replicate") {

        output = await replicate.run(
            model,
            { input }
        ) as any;

    } else if (hosting == "fal") {

        const data = await fal.subscribe("fal-ai/flux-realism", {
            input: {
                ///seed: 4072637067,
                prompt: englishPrompt,
                num_images: 1,
                enable_safety_checker: false,

            },
            logs: true,
            onQueueUpdate: (update) => {
                if (update.status === "IN_PROGRESS") {
                update.logs.map((log) => log.message).forEach(console.log);
                }
            },
        }) as any;

        ///console.log(data);

        //const output = data.images[0]?.url;
        // output is array of images
        output = [
            data.images[0]?.url,
        ];

    }



    /*
    const output = await replicate.run(
        "zsxkib/stable-diffusion-safety-checker:8b5d150f3203e94cea146de593213f812fd3211993ac5dde89955783c5918583"
        , { input }
    );
    */

    ///console.log("output=", output);





    output.forEach((element: any) => {
        result.push({ url: element });
    } );



    /*
    //result.push({ url: output });


    /// https://www.olgagpt.com/sub/createNFT.asp?userid=aaaa2&image=https://fal.media/files/tiger/ibDYR3ayLebb0wzzlKIPH.png

    //const url = "https://www.olgagpt.com/sub/createNFT.asp?userid=" + userid + "&image=" + output[0];


    // url encode image url

    // if userid is not null, create NFT

    if (userid != null && userid != 'null' && userid != "" && output[0] != null && output[0] != "") {
        const url = "https://www.olgagpt.com/sub/createNFT.asp?userid=" + userid + "&image=" + encodeURIComponent(output[0]);
        console.log(url);
        const callback = await fetch(url);
    }
    */

    return NextResponse.json({

        result: result,
        
    });


}

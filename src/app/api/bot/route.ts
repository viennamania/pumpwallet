export const dynamic = 'force-dynamic'

export const fetchCache = 'force-no-store'

import {
    Bot,
    webhookCallback,
    Context,
    InlineKeyboard,
} from 'grammy'

import Replicate from "replicate";
import * as fal from "@fal-ai/serverless-client";





//import { createToken } from "./jwt.js";
//import { registerUser } from "./operations.js";




// nextjs-app
export const maxDuration = 60; // This function can run for a maximum of 60 seconds




const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN,
});

const token = process.env.TELEGRAM_BOT_TOKEN



if (!token) throw new Error('TELEGRAM_BOT_TOKEN environment variable not found.')



//const bot = new Bot(token)





const BOT_DEVELOPER = 441516803; // bot developer chat identifier // waynepark

// Define custom context type.
interface BotConfig {
  botDeveloper: number;
  isDeveloper: boolean;
}
type MyContext = Context & {
  config: BotConfig;
};

const bot = new Bot<MyContext>(token);

// Set custom properties on context objects.
bot.use(async (ctx, next) => {
  ctx.config = {
    botDeveloper: BOT_DEVELOPER,
    isDeveloper: ctx.from?.id === BOT_DEVELOPER,
  };
  await next();
});







// Commands - Start, Play, Leaderboard, About, Help
bot.command("start", async (ctx) => {
    
    //const userDocId = await registerUser(ctx.from?.id.toString() || "", ctx.from?.first_name || "", ctx.from?.last_name || "", ctx.from?.username || "");
    //console.log("User doc id:", userDocId);
    
    ctx.replyWithPhoto("https://img.etimg.com/thumb/msid-106967420,width-300,height-225,imgsize-478624,resizemode-75/my-life-with-the-walter-boys-season-2-see-everything-we-know-about-renewal-production-plot-and-more.jpg", {
        
        //"caption": "<b>Hi, " + ctx.from?.first_name + "</b>"
        //+ "<p>Play the game now and become top players in the leaderboard!!!</p>",

        "parse_mode": "HTML"
    })
});

/*
{
  method: 'sendGame',
  payload: [Object],
  ok: false,
  error_code: 400,
  description: 'Bad Request: wrong game short name specified',
  parameters: {}
}
*/


bot.command("play", async (ctx) => {

    //const userDocId = await registerUser(ctx.from?.id.toString() || "", ctx.from?.first_name || "", ctx.from?.last_name || "", ctx.from?.username || "");
    //console.log("User doc id:", userDocId);
    
    const keyboard = new InlineKeyboard().game("Play now!")
        .row()
        .text("Leaderboard", "leaderboard")
        .text("About", "about");

    
    ctx.replyWithGame("twosome", {
        reply_markup: keyboard,
        protect_content: true,
        disable_notification: true
    });



});

bot.command("leaderboard", (ctx) => {
    ctx.reply("Leaderboard!!! \n1. User1\n2. User2\n3. User3");
});
bot.command("about", (ctx) => {
    ctx.reply("About!!! \nThis is a game bot");
});
bot.command("help", (ctx) => {
    ctx.reply(`
    <b>Settle Mints Game Bot Help</b><br>
    <p>Get in touch with the game support team.</p>
  `, { parse_mode: "HTML" })
});
bot.on("callback_query:data", async (ctx) => {
    const data = ctx.callbackQuery.data;
    if (data === "leaderboard") {
        ctx.reply("Leaderboard!!! \n1. User1\n2. User2\n3. User3");
    } else if (data === "about") {
        ctx.reply("About!!! \nThis is a game bot");
    }
});

bot.on("callback_query:game_short_name", async (ctx) => {
    
    //const token = createToken(ctx.from.id.toString());

    //console.log("Token: " + token);

    const token = "1234567890";

    await ctx.answerCallbackQuery({ url: `https://preview.codecanyon.net/item/coin-flip-land-html5/full_screen_preview/55506571?_ga=2.230819288.636301431.1732326489-1387678474.1732326489/?token=${token}` });

});

bot.catch((err) => console.error(err));











bot.command("start", async (ctx) => {
    // You can get the chat identifier of the user to send your game to with `ctx.from.id`.
    // which gives you the chat identifier of the user who invoked the start command.
    
    //const chatId = ctx.from.id;

    //await ctx.api.sendGame(chatid, "my_game");

    const chatId = ctx.message?.chat?.id;

    if (!chatId) return;

    // Send a game to the chat
    //await ctx.api.sendGame(chatId, "my_game");
    await ctx.reply("Hi! I can only read messages that explicitly reply to me!", {
        // Make Telegram clients automatically show a reply interface to the user.
        reply_markup: { force_reply: true },
    });

});




// Define handlers for custom context objects.
/*
bot.command("start", async (ctx) => {
  if (ctx.config.isDeveloper) await ctx.reply("Hi mom!");
  else await ctx.reply("Welcome");
});
*/




bot.hears("ping", async (ctx) => {
    // `reply` is an alias for `sendMessage` in the same chat (see next section).
    await ctx.reply("pong", {
        // `reply_parameters` specifies the actual reply feature.
        reply_parameters:{
                message_id: ctx.msg.message_id
        },
    });
});


bot.on('message:text', async (ctx) => {


    //console.log(ctx.message)
    /*
    {
        message_id: 149,
        from: {
            id: 441516803,
            is_bot: false,
            first_name: 'Wayne',
            last_name: 'Park',
            username: 'waynepark',
            language_code: 'ko'
        },
        chat: {
            id: 441516803,
            first_name: 'Wayne',
            last_name: 'Park',
            username: 'waynepark',
            type: 'private'
        },
        date: 1732318838,
        text: '안녕'
    }
    */

    //await ctx.reply('Hello!')


    const hello = "안녕하세요! AI 에이전트 서비스입니다.";

    await ctx.reply(hello, {
        // `reply_parameters` specifies the actual reply feature.
        reply_parameters:{
                message_id: ctx.msg.message_id
        },
    });

    ///await bot.api.sendMessage(441516803, "Hi!", {/* more options */});
    /*
    await bot.api.sendMessage(
        ctx.message.chat.id,
        
        "*Hi\\!* _Welcome_ to [grammY](https://grammy.dev)\\.",

        { parse_mode: "MarkdownV2" },
    );
    */

    /*
    await bot.api.sendMessage(
        ctx.message.chat.id,

        '<b>Hi!</b> <i>Welcome</i> to <a href="https://gold.goodtether.com">GoodTether</a>.',

        { parse_mode: "HTML" },
    );

    await bot.api.sendMessage(
        ctx.message.chat.id,
        'https://gold.goodtether.com',
        {
            parse_mode: "HTML",
        },
    );
    */

    await bot.api.sendMessage(
        ctx.message.chat.id,
        'https://pumpwallet.vercel.app',
        {
            parse_mode: "HTML",
        },
    );


    if (ctx.message.text === '/start') {


        //await ctx.reply('Hello!')

        // image
        // url: https://vzrcy5vcsuuocnf3.public.blob.vercel-storage.com/RiMb8wi-jNIcD6NZIkNZDiCTEwU5C5SIZHFpAu.png

        const photo = 'https://vzrcy5vcsuuocnf3.public.blob.vercel-storage.com/RiMb8wi-jNIcD6NZIkNZDiCTEwU5C5SIZHFpAu.png'
        await ctx.replyWithPhoto(photo, {
            caption: 'This is a photo!'
        })

        return


    }  else if (ctx.message.text === '/tbot') {


        //await ctx.reply('Hello!')

        // generate a photo
        try {


      

            //setMessageMintingAgentNft('AI 에이전트 이미지 생성중입니다');
            await ctx.reply('AI 에이전트 이미지 생성중입니다...');








            // array of strings
            // gold, silver, blue, red, green, black, white, yellow, orange, pink, purple, brown, gray, cyan, magenta
            const robotColors = ["gold", "silver", "blue", "red", "green", "black", "white", "yellow", "orange", "pink", "purple", "brown", "gray", "cyan", "magenta"];

            const randomColor = Math.floor(Math.random() * robotColors.length);

            const englishPrompt = "One cute and " + randomColor + " color metallic robot character with shiny skin in Japanese anime style with a sign AGENT. transparent background.";


            const negative_prompt = "easynegative,ng_deepnegative_v1_75t,((monochrome)),((grayscale)),bad-picture-chill-75v, (worst quality, low quality:1.4), monochrome, grayscale, sketches, paintings, lowres, normalres, blurry, acnes on face, {{sperm}}, {{bra}}";

            let input = {
                ///seed: 4234234,

                prompt: englishPrompt,

                output_quality: 90,

                //image_size: "square",
                image_size: "square",
                //image_size: "square_hd",

                disable_safety_checker: true,

                negative_prompt: negative_prompt,
            };



            let hosting = "" as any;
            let model = "" as any;

        
            /*
            const randomModel = Math.floor(Math.random() * 5);


        
        

            if (randomModel == 0) {
                hosting = "replicate";
                model = "bytedance/sdxl-lightning-4step:5f24084160c9089501c1b3545d9be3c27883ae2239b6f412990e82d4a6210f8f";
            } else if (randomModel == 1) {
                hosting = "replicate";
                model = "datacte/proteus-v0.2:06775cd262843edbde5abab958abdbb65a0a6b58ca301c9fd78fa55c775fc019";
            } else if (randomModel == 2) {
                hosting = "replicate";
                model = "playgroundai/playground-v2.5-1024px-aesthetic:a45f82a1382bed5c7aeb861dac7c7d191b0fdf74d8d57c4a0e6ed7d4d0bf7d24";
            } else {
                hosting = "fal";
                model = "fal-ai/flux/dev";
            }
            */

            hosting = "fal";
            model = "fal-ai/flux-realism";




            let result = [] as any;

            let output = [] as any;

            if (hosting === "replicate") {

                output = await replicate.run(model, { input }) as any;

                

            } else if (hosting === "fal") {

                const data = await fal.subscribe(model, {

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


            
                ////console.log(data);

                
            
                //const output = data.images[0]?.url;
                // output is array of images
                output = [
                    data?.images[0]?.url,
                ];

            }

            //console.log("result=", result);
            /*
            URL {
                href: 'https://replicate.delivery/yhqm/D2aV5KH1Ma7CH9KY8ZppQcZdbKIc5B43aJxQLmTl7hvJDe2JA/out-0.png',
                origin: 'https://replicate.delivery',
                protocol: 'https:',
                username: '',
                password: '',
                host: 'replicate.delivery',
                hostname: 'replicate.delivery',
                port: '',
                pathname: '/yhqm/D2aV5KH1Ma7CH9KY8ZppQcZdbKIc5B43aJxQLmTl7hvJDe2JA/out-0.png',
                search: '',
                searchParams: URLSearchParams {},
                hash: ''
            }
            */

            // get href from result string

            ///console.log("result=", result.toString());


            output.forEach((element: any) => {
                result.push({ url: element });
            } );

            const imageUrl = result[0].url;
        
            if (!imageUrl) {

                throw new Error('Failed to generate image');
            }


            ///setAgentImage(imageUrl);


            /*
            setMessageMintingAgentNft('AI 에이전트 NFT 발행중입니다');

            const contract = getContract({
                client,
                chain: polygon,
                address: erc721ContractAddress,

              });


            const transaction = mintTo({
                contract: contract,
                to: address as string,
                nft: {
                    name: agentName,
                    description: agentDescription,

                    ////image: agentImage,
                    image: imageUrl,

                },
            });

            //await sendTransaction({ transaction, account: activeAccount as any });



            //setActiveAccount(smartConnectWallet);

            const transactionResult = await sendAndConfirmTransaction({
                transaction: transaction,
                account: activeAccount,

                ///////account: smartConnectWallet as any,
            });

            //console.log("transactionResult", transactionResult);


            if (!transactionResult) {
                throw new Error('AI 에이전트 NFT 발행 실패. 관리자에게 문의해주세요');
            }

            setMessageMintingAgentNft('AI 에이전트 NFT 발행 완료');


            // fetch the NFTs again
            const response = await fetch("/api/agent/getAgentNFTByWalletAddress", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    walletAddress: address,
                    //erc721ContractAddress: erc721ContractAddress,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                if (data.result) {
                    setMyNfts(data.result.ownedNfts);
                } else {
                    setMyNfts([]);
                }
            }

            setAgentName("");
            setAgentDescription("");
            

            toast.success('AI 에이전트 NFT 발행 완료');
            */


            const photo = imageUrl;



            await ctx.replyWithPhoto(photo, {
                caption: 'This is a AI Agent photo!'
            })

            await ctx.reply('AI 에이전트 이미지 생성 완료');


        } catch (error) {
            console.error("mintAgentNft error", error);

            //toast.error('AI 에이전트 NFT 발행 실패');

            //setMessageMintingAgentNft('AI 에이전트 NFT 발행 실패');

            await ctx.reply('AI 에이전트 이미지 생성 실패');
        }

        return

    }
    
    else if (ctx.message.text === '/frog') {


        //await ctx.reply('Hello!')

        // image
        // url: https://vzrcy5vcsuuocnf3.public.blob.vercel-storage.com/RiMb8wi-jNIcD6NZIkNZDiCTEwU5C5SIZHFpAu.png

        const photo = 'https://vzrcy5vcsuuocnf3.public.blob.vercel-storage.com/RiMb8wi-jNIcD6NZIkNZDiCTEwU5C5SIZHFpAu.png'
        await ctx.replyWithPhoto(photo, {
            caption: '윤명환은 청개구리다!'
        })

        return
    }
    
    else if (ctx.message.text === '/help') {

        await ctx.reply('Available commands: /start, /tbot, /frog, /help')

        return

    }





    /////await ctx.reply(ctx.message.text)

})

bot.on('message:photo', async (ctx) => {

    console.log("message:photo", ctx.message.photo)
    /*
    [
        {
            file_id: 'AgACAgUAAxkBAAM9Z0BrBLFJ_Wig5A93aThUeVfbE_0AAmXDMRsJTwABVuHbvjIY3o0FAQADAgADcwADNgQ',
            file_unique_id: 'AQADZcMxGwlPAAFWeA',
            file_size: 1171,
            width: 42,
            height: 90
        },
        {
            file_id: 'AgACAgUAAxkBAAM9Z0BrBLFJ_Wig5A93aThUeVfbE_0AAmXDMRsJTwABVuHbvjIY3o0FAQADAgADbQADNgQ',
            file_unique_id: 'AQADZcMxGwlPAAFWcg',
            file_size: 13532,
            width: 148,
            height: 320
        },
        {
            file_id: 'AgACAgUAAxkBAAM9Z0BrBLFJ_Wig5A93aThUeVfbE_0AAmXDMRsJTwABVuHbvjIY3o0FAQADAgADeAADNgQ',
            file_unique_id: 'AQADZcMxGwlPAAFWfQ',
            file_size: 55582,
            width: 369,
            height: 800
        },
        {
            file_id: 'AgACAgUAAxkBAAM9Z0BrBLFJ_Wig5A93aThUeVfbE_0AAmXDMRsJTwABVuHbvjIY3o0FAQADAgADeQADNgQ',
            file_unique_id: 'AQADZcMxGwlPAAFWfg',
            file_size: 99661,
            width: 591,
            height: 1280
        }
    ]
    */
    // get the last photo

    const photo = ctx.message.photo[ctx.message.photo.length - 1].file_id

    // get image from photo

    const photoInfo = await ctx.api.getFile(photo)

    console.log("photoInfo", photoInfo)
    /*
    {
        file_id: 'AgACAgUAAxkBAAM7Z0Bq4By_0DSwiBr18_SXceWmVIsAAmTDMRsJTwABVgaKqMNcfad3AQADAgADeQADNgQ',
        file_unique_id: 'AQADZMMxGwlPAAFWfg',
        file_size: 156830,
        file_path: 'photos/file_0.jpg'
        }
    */
   // get the image url
    const photoUrl = `https://api.telegram.org/file/bot${token}/${photoInfo.file_path}`

    console.log("photoUrl", photoUrl)

  
    await ctx.reply('This is a photo!')

 
    
    ////ctx.api.close()



} )




// message is video
    /*
    {
        file_id: 'BAACAgUAAxkBAAM9Z0Bq4By_0DSwiBr18_SXceWmVIsAAmTDMRsJTwABVgaKqMNcfad3AQADAgADeQADNgQ',
        file_unique_id: 'AQADZMMxGwlPAAFWfg',
        file_size: 156830,
        file_path: 'videos/file_0.mp4'
        }
    */
/*
bot.on('message:video', async (ctx) => {

    console.log("message:video", ctx.message.video)

   // get the video url
    const videoUrl = `https://api.telegram.org/file/bot${token}/${ctx.message.video.file_path}`

    console.log("videoUrl", videoUrl)

    await ctx.reply('This is a video!')

    ////ctx.api.close()

} )
*/

/*
bot.command("start", async (ctx) => {
    await ctx.reply("Hi! I can only read messages that explicitly reply to me!", {
      // Make Telegram clients automatically show a reply interface to the user.
      reply_markup: { force_reply: true },
    });
});


bot.on("message", async (ctx) => {
  // `ctx` is the `Context` object.
  console.log(ctx.message);
});

bot.on("edited_message", async (ctx) => {
    // Get the new, edited, text of the message.
    const editedText = ctx.editedMessage.text;

    console.log("editedText", editedText)
});
*/


/*
bot.on("message", async (ctx) => {
  await ctx.reply("I got your message!");
});

// Or, even shorter:
bot.on("message", (ctx) => ctx.reply("Gotcha!"));
*/



/*
{
  message_id: 257,
  from: {
    id: 441516803,
    is_bot: false,
    first_name: 'Wayne',
    last_name: 'Park',
    username: 'waynepark',
    language_code: 'ko'
  },
  chat: {
    id: 441516803,
    first_name: 'Wayne',
    last_name: 'Park',
    username: 'waynepark',
    type: 'private'
  },
  date: 1732324028,
  game: {
    title: 'Math Battle',
    text: 'Top Players\n1. Wayne Park – 5\n\nWayne has just scored 5.',
    text_entities: [ [Object], [Object], [Object] ],
    description: 'Show your math skills! How high can you score?',
    photo: [ [Object], [Object], [Object] ]
  },
  reply_markup: { inline_keyboard: [ [Array] ] },
  via_bot: {
    id: 166035794,
    is_bot: true,
    first_name: 'GameBot',
    username: 'gamebot'
  }
}
*/


/*
{
  message_id: 311,
  from: {
    id: 441516803,
    is_bot: false,
    first_name: 'Wayne',
    last_name: 'Park',
    username: 'waynepark',
    language_code: 'ko'
  },
  chat: {
    id: 441516803,
    first_name: 'Wayne',
    last_name: 'Park',
    username: 'waynepark',
    type: 'private'
  },
  date: 1732324684,
  animation: {
    file_name: '21.mp4',
    mime_type: 'video/mp4',
    duration: 1,
    width: 848,
    height: 848,
    thumbnail: {
      file_id: 'AAMCAgADGQEAAgE2Z0Es6ymKOVUw5FZ7xuX-yThkcLYAAo0PAAKO6UhIRRMoHr3lFbsBAAdtAAM2BA',
      file_unique_id: 'AQADjQ8AAo7pSEhy',
      file_size: 15350,
      width: 320,
      height: 320
    },
    thumb: {
      file_id: 'AAMCAgADGQEAAgE2Z0Es6ymKOVUw5FZ7xuX-yThkcLYAAo0PAAKO6UhIRRMoHr3lFbsBAAdtAAM2BA',
      file_unique_id: 'AQADjQ8AAo7pSEhy',
      file_size: 15350,
      width: 320,
      height: 320
    },
    file_id: 'CgACAgIAAxkBAAIBNmdBLOspijlVMORWe8bl_sk4ZHC2AAKNDwACjulISEUTKB695RW7NgQ',
    file_unique_id: 'AgADjQ8AAo7pSEg',
    file_size: 100287
  },
  document: {
    file_name: '21.mp4',
    mime_type: 'video/mp4',
    thumbnail: {
      file_id: 'AAMCAgADGQEAAgE2Z0Es6ymKOVUw5FZ7xuX-yThkcLYAAo0PAAKO6UhIRRMoHr3lFbsBAAdtAAM2BA',
      file_unique_id: 'AQADjQ8AAo7pSEhy',
      file_size: 15350,
      width: 320,
      height: 320
    },
    thumb: {
      file_id: 'AAMCAgADGQEAAgE2Z0Es6ymKOVUw5FZ7xuX-yThkcLYAAo0PAAKO6UhIRRMoHr3lFbsBAAdtAAM2BA',
      file_unique_id: 'AQADjQ8AAo7pSEhy',
      file_size: 15350,
      width: 320,
      height: 320
    },
    file_id: 'CgACAgIAAxkBAAIBNmdBLOspijlVMORWe8bl_sk4ZHC2AAKNDwACjulISEUTKB695RW7NgQ',
    file_unique_id: 'AgADjQ8AAo7pSEg',
    file_size: 100287
  },
  via_bot: {
    id: 140267078,
    is_bot: true,
    first_name: 'Tenor GIF Search',
    username: 'gif'
  }
}
  */


/*
{
  message_id: 312,
  from: {
    id: 441516803,
    is_bot: false,
    first_name: 'Wayne',
    last_name: 'Park',
    username: 'waynepark',
    language_code: 'ko'
  },
  chat: {
    id: 441516803,
    first_name: 'Wayne',
    last_name: 'Park',
    username: 'waynepark',
    type: 'private'
  },
  date: 1732324739,
  video_note: {
    duration: 3,
    length: 384,
    thumbnail: {
      file_id: 'AAMCBQADGQEAAgE4Z0Etgy3_1RH7LmoEP_TDVOsK-5sAAm4kAAJaBhFWaN9PjlZBPJoBAAdtAAM2BA',
      file_unique_id: 'AQADbiQAAloGEVZy',
      file_size: 17269,
      width: 320,
      height: 320
    },
    thumb: {
      file_id: 'AAMCBQADGQEAAgE4Z0Etgy3_1RH7LmoEP_TDVOsK-5sAAm4kAAJaBhFWaN9PjlZBPJoBAAdtAAM2BA',
      file_unique_id: 'AQADbiQAAloGEVZy',
      file_size: 17269,
      width: 320,
      height: 320
    },
    file_id: 'DQACAgUAAxkBAAIBOGdBLYMt_9UR-y5qBD_0w1TrCvubAAJuJAACWgYRVmjfT45WQTyaNgQ',
    file_unique_id: 'AgADbiQAAloGEVY',
    file_size: 250157
  }
}
  */



export const POST = webhookCallback(bot, 'std/http')

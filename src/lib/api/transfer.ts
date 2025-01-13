import clientPromise from '../mongodb';

/*
  console.log("transactionHash", transactionHash, "transactionIndex", transactionIndex,
    "fromAddress", fromAddress, "toAddress", toAddress, "value", value,
    "timestamp", timestamp);
  
*/

export interface TransferProps {
    transactionHash: string;
    transactionIndex: string;
    fromAddress: string;
    toAddress: string;
    value: string;
    timestamp: string;
}

export async function insertOne(data: any) {

    if (!data.transactionHash || !data.transactionIndex || !data.fromAddress || !data.toAddress || !data.value || !data.timestamp) {
        return null;
    }

    const transferData = {
        transactionHash: data.transactionHash,
        transactionIndex: data.transactionIndex,
        fromAddress: data.fromAddress,
        toAddress: data.toAddress,
        value: data.value,
        timestamp: data.timestamp,
    };


    const client = await clientPromise;

    // if fromAddress is user wallet address, then insert into userTransfers collection
    // if toAddress is user wallet address, then insert into userTransfers collection


    const collectionUsers = client.db('shinemywinter').collection('users');

    const collectionUserTransfers = client.db('shinemywinter').collection('userTransfers');

    const collection = client.db('shinemywinter').collection('transfers');



    ////const userFromAddress = await collectionUsers.findOne({ walletAddress: data.fromAddress });
    
    const userFromAddress = collectionUsers
    .aggregate([
        { $match: { walletAddress: data.fromAddress } },
        { $project: { _id: 1, telegramId: 1, walletAddress: 1 } }
    ])

    if (userFromAddress) {
        
        //console.log("userFromAddress", userFromAddress);


        await collectionUserTransfers.insertOne(
        {
            user: userFromAddress,
            sendOrReceive: "send",
            transferData: transferData,
        }
        );

        await collection.insertOne(
            transferData
        );

    }

    const userToAddress = await collectionUsers.findOne({ walletAddress: data.toAddress });

    if (userToAddress) {
        
        //console.log("userToAddress", userToAddress);

        await collectionUserTransfers.insertOne(
        {
            user: userToAddress,
            sendOrReceive: "receive",
            transferData: transferData,
        }
        );

        await collection.insertOne(
            transferData
        );


        const telegramId = userToAddress.telegramId;

        if (telegramId) {

            const amount = parseFloat(data.value) / 1000000.0;

            const message = "You have received " + Number(amount).toFixed(6) + " USDT";

            const collectionTelegramMessages = client.db('shinemywinter').collection('telegramMessages');

            await collectionTelegramMessages.insertOne(
            {
                category: "wallet",
                telegramId: telegramId,
                message: message,
            }
            );

        }
        
    }


    return {
        result: "success",
    };


}




// getTransferByWalletAddress
export async function getTransferByWalletAddress(data: any) {

    if (!data.walletAddress) {
        return null;
    }

    const client = await clientPromise;

    const collectionUsers = client.db('shinemywinter').collection('users');

    const user = await collectionUsers.findOne({ walletAddress: data.walletAddress });

    if (!user) {
        return null;
    }

    // transferData: { transactionHash: string, transactionIndex: string, fromAddress: string, toAddress: string, value: string, timestamp: string }
    // timestamp desc
    

    const collectionUserTransfers = client.db('shinemywinter').collection('userTransfers');

    const userTransfers = await collectionUserTransfers
    .find({ "user._id": user._id })
    .sort({ "transferData.timestamp": -1 })
    .toArray();


    return userTransfers;

}


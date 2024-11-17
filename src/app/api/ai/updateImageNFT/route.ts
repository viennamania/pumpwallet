import { NextResponse, type NextRequest } from "next/server";



import { updateOneByImage } from '@/lib/api/image';




export async function POST(request: NextRequest) {



    const body = await request.json();

    const { image, erc721ContractAddress, tokenid } = body;



    if (!image || !erc721ContractAddress || !tokenid) {

        return NextResponse.json({
            status: 400,
            body: { error: "Please provide a url" },
        });

    }

    const result = await updateOneByImage(
        {
            image: image,
            erc721ContractAddress: erc721ContractAddress,
            tokenid: tokenid,
        }
    );




    return NextResponse.json({

        result: result,
        
    });


}

import { NextResponse, type NextRequest } from "next/server";



import {
    deleteOneByImage,
} from '@/lib/api/image';




export async function POST(request: NextRequest) {


  const body = await request.json();

  const { image, } = body;



  console.log("removeOneImage image", image);

  if (!image) {
    return NextResponse.json({
      status: 400,
      error: "Please provide a image",
    });
  }


  const result = await deleteOneByImage(
    {
      image: image,
    }
  );


  return NextResponse.json({
      status: 200,
      result: result,
  });

}

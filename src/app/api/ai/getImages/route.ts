import { NextResponse, type NextRequest } from "next/server";



import {
    findAllByUserid
} from '@/lib/api/image';




export async function GET(request: NextRequest) {


  const url = new URL(request.url);

  const userid = url.searchParams.get("userid");


  console.log("getImages userid", userid);




  if (!userid) {
    return NextResponse.json({
      status: 400,
      error: "Please provide a userid",
    });
  }

  const images = await findAllByUserid(
    {
      userid: userid,
    }
  );



  return NextResponse.json({
      status: 200,
      images: images,
  });


}

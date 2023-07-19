import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModels";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const {token} = reqBody;
    console.log(token);
    const user = await User.findOne({ verifyToken:token,
        verifyTokenExpiry:{$gt:Date.now()}
    });
    if (!user) {
      return NextResponse.json(
        {
          error: "error",
        },
        { status: 500 }
      );
    }

    user.isVerified=true;
    user.verifyToken=undefined;
    user.verifyTokenExpiry=undefined;
    const saveduser=await user.save();
    console.log(saveduser);

    return NextResponse.json({
        message:"Email verified Successfully",success:true,
        saveduser
    })

  } catch (error: any) {
    return NextResponse.json(
      {
        error: error.message,
      },
      { status: 500 }
    );
  }
}

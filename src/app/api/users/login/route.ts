import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModels";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;
    console.log(reqBody);
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        {
          error: "user Doesnot exists",
        },
        { status: 500 }
      );
    }
    const validpass = await bcryptjs.compare(password, user.password);

    if (!validpass) {
      return NextResponse.json(
        {
          error: "Invalid password",
        },
        { status: 400 }
      );
    };

    const tokendata={
        id: user._id,
        username:user.username,
        email:user.email
    }

    const token=await jwt.sign(tokendata,process.env.TOKEN_SECRET!,{expiresIn:"1d"})

    const response =NextResponse.json({
        message:"LOGIN SUCCESSFULL",
        success:true,
    })
    response.cookies.set("token",token,{
        httpOnly:true,
    })
    return response;

  } catch (error: any) {
    return NextResponse.json(
      {
        error: error.message,
      },
      { status: 500 }
    );
  }
}

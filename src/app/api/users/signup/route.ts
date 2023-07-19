import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModels";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, email, password } = reqBody;
    console.log(reqBody);
    const user = await User.findOne({ email });
    if (user) {
      return NextResponse.json(
        {
          error: "user already exists",
        },
        { status: 500 }
      );
    }
    const salt = await bcryptjs.genSalt(10);
    const hashedpassword = await bcryptjs.hash(password, salt);

    const newUser =new User({
        username,
        email,
        password:hashedpassword
    })
    const saveduser=await newUser.save();
    console.log(saveduser);

    await sendEmail({email,emailType:"VERIFY",userID:saveduser._id})

    return NextResponse.json({
        message:"user created",success:true,
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

import { getdata } from "@/helpers/getdata";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import User from "@/models/userModels";
import { connect } from "@/dbConfig/dbConfig";

connect();

export async function GET(request: NextRequest) {
  try {
    const userid=await getdata(request);
    const user =await User.findOne({_id:userid}).select("-password");
    return NextResponse.json({
        message:"user found ",
        data:user
    })
  } catch (error: any) {
    throw new Error(error.message);
  }
}

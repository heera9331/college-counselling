import { connectDB } from "@/utils";
import { User } from "@/app/api/models";
import { NextResponse } from "next/server";
connectDB();

// login route
export const POST = async (req, res) => {
  // console.log(req);

  return NextResponse.json({ msg: "ok" });
  if (!user) {
    return NextResponse.json({ error: "user not found" });
  }
  let tmpUser = await User.findOne({
    email: user.email,
    password: user.password,
  }).select("-password");

  return NextResponse.json({ user: tmpUser });
};

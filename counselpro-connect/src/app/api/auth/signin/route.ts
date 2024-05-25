import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/utils";
import { User } from "@/models";
import jwt from "jsonwebtoken";

export const POST = async (req: NextRequest) => {
  await connectDB();

  let { email, password } = await req.json();
  console.log("request login user - ", email, password);

  if (!email || !password) {
    return NextResponse.json({ msg: "user/email not found" }, { status: 400 });
  }

  let user = await User.findOne({ email: email, password: password }).select(
    "-password"
  );

  if (!user) {
    return NextResponse.json({ msg: "invalid credentials" }, { status: 404 });
  }

  // Extract necessary information from the user object
  const userData = {
    _id: user._id,
    email: user.email,
    isAdmin: user.isAdmin,
    // Add other necessary fields
  };

  let secret = "heera";
  let token = jwt.sign(userData, secret, { expiresIn: "1h" });
  const response = NextResponse.json({
    msg: "Sign in Successfully",
    success: true,
    email: user.email,
    isAdmin: user.isAdmin,
  });

  response.cookies.set("token", token, {
    httpOnly: true,
  });

  response.cookies.set("user",JSON.stringify(user), {
    httpOnly: true,
  });

  return response;
};

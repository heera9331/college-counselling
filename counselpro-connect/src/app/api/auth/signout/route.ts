import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/utils";
import { User } from "@/models";
import jwt from "jsonwebtoken";

export const GET = async (req: NextRequest) => {
   req.cookies.clear();
   return NextResponse.json({msg: "logged out"});
};

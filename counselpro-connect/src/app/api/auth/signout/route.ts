import { NextRequest, NextResponse } from "next/server";
import { connectDB, disconnectDB } from "@/utils";
import { User } from "@/models";
import jwt from "jsonwebtoken";

export const GET = async (req: NextRequest) => {
  try {
    // Connect to database if needed (assuming connection isn't persistent)
    await connectDB();

    // 1. Clear cookies (optional)
    req.cookies.clear();

    // Disconnect from database after processing (placeholder)
    await disconnectDB();

    // 3. Return success message and (optional) redirect
    return NextResponse.json(
      { msg: "logged out" },
      {
        headers: {
          Location: "/login",
        },
      }
    );

    return NextResponse.json({ msg: "logged out" });
  } catch (error) {
    console.error("Error during logout:", error);
    // Handle error appropriately (e.g., return an error message)
    return NextResponse.json({ msg: "Logout failed" }, { status: 500 });
  }
};

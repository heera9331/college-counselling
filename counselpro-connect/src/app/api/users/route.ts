
import { connectDB } from "@/utils";
import { User } from "@/models";
import { NextResponse, NextRequest } from "next/server";


export const GET = async (req: NextRequest, res: NextResponse) => {
    await connectDB();
    console.log('get -> /api/users');
    const users: any[] = await User.find({});

    return NextResponse.json(users);
};


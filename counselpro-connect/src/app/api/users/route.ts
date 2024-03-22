
import { connectDB } from "@/utils";
import { User } from "@/models";
import { NextResponse, NextRequest } from "next/server";

export const GET = async (req: NextRequest, res: NextResponse) => {
    await connectDB();
    console.log('get -> /api/users');
    const users: any[] = await User.find({});

    return NextResponse.json(users);
};


export const POST = async (req: NextRequest, res: NextResponse) => {
    await connectDB();
    let user = await req.json();
    console.log('get -> /api/users', user);

    if (!user) {
        return NextResponse.json({ error: 'user not found' });
    }

    try {
        const ack: any = await User.insertMany([user]);
        return NextResponse.json(ack);
    } catch (error) {
        return NextResponse.json({ error: 'database error' });
    }
};


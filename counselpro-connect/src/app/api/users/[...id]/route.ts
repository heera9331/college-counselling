import { User } from "@/models";
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/utils";

export const GET = async (req: NextRequest, { params }: any) => {
    await connectDB();
    console.log('get -> /api/users/387e6e7aw8f');
    let email: string = params.id[0];
    const user: any[] = await User.find({ email: email }).select(["-password"]);
    return NextResponse.json(user)
}
export const DELETE = async (req: NextRequest, { params }: any) => {
    await connectDB();
    console.log('delete -> /api/users/387e6e7aw8f');
    let email: string = params.id[0];
    const user: any[] = await User.find({ email: email }).select(["-password"]);
    return NextResponse.json(user)
}
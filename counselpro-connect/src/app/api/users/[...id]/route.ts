import {User} from "@/models";
import { NextRequest } from "next/server";
import { connectDB } from "@/utils";

export const GET = async (req: NextRequest, props) => {
    console.log(props)
}
import {NextRequest,NextResponse} from 'next/server';
import {connectDB} from "@/utils";
import { User }from "@/models";
import jwt from "jsonwebtoken";


export const POST = async (req: NextRequest) => {
    await connectDB();

    let {email, password} = await req.json();
    console.log('email', email)
    console.log('password', password)

    if(!email || !password) {
        return NextResponse.json({msg:"user/email not found"}, {status: 400});
    }

    let user = User.findOne({email, password}).select("-password");

    if(!user) {
        return NextResponse.json({msg: "invalid credentials"}, {status:404})
    }
    let secret = "heera";
    let data = {...user};
    // delete data._id;
    let token = jwt.sign(data, secret, {expiresIn: '1h'});
    const response =  NextResponse.json({msg:"Sign in Sucessfully",success:true,token})
        
    response.cookies.set("token",token,{
        httpOnly:true
    });

    return response
}





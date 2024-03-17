import { connectDB } from "@/utils";
import { Student } from "@/models";
import { NextResponse , NextRequest} from "next/server";

// /api/students

export const GET = async (req: NextRequest, res: NextResponse) => {
    await connectDB();
    console.log('/api/students'); 
    
    const currentPage : number =Number(req.nextUrl.searchParams.get('currentPage')) || 1;
    const pageSize: number =Number(req.nextUrl.searchParams.get('pageSize')) || 15;
    const students: any[] = await Student.find({}).skip((currentPage-1)*pageSize).limit(pageSize);
    return NextResponse.json({students});
};


// new student registration
export const POST = async (req: NextRequest) => { 
    await connectDB();
    const student = await req.json(); 
    
    console.log('post - /api/students/');
    console.log('student ', student);
    
    try {
        const ack = await Student.insertMany([student]);  

        console.log('student is - ', student);

        if (!ack) {
            return NextResponse.json({error: "student not found"})
        }
        
        return NextResponse.json({ ack });
    } catch (error) {
        console.error("Error fetching student:", error);
        return NextResponse.json({error: "internal server error"})
    }
};

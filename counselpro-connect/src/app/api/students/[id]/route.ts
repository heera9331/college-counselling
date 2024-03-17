import { connectDB } from "@/utils";
import { Student } from "@/models";
import { NextResponse, NextRequest } from "next/server";

// Ensure database connection before handling requests
(async () => {
    await connectDB();
})();

// /api/students/3e89ru398arufyiadohfjdf

export const GET = async (req: NextRequest, { params }: { params: { id: string } }) => {
    console.log('/api/students/3eriojfdsiof');
    console.log('params -', params);

    const { id } = params;

    console.log('student id - ', id);

    try {
        const student = await Student.findById("656c4874ee4ca4b11794bf64");  

        console.log('student is - ', student);

        if (!student) {
            return NextResponse.json({error: "student not found"})
        }
        
        return NextResponse.json({ student });
    } catch (error) {
        console.error("Error fetching student:", error);
        return NextResponse.json({error: "internal server error"})
    }
};

export const DELETE = async (req: NextRequest, { params }: { params: { id: string } }) => {
    console.log('/api/students/3eriojfdsiof');
    console.log('params -', params);

    const { id } = params;

    console.log('student id - ', id);

    try {
        const student = await Student.deleteOne({ _id: id });  

        console.log('student is - ', student);

        if (!student) {
            return NextResponse.json({error: "student not found"})
        }
        
        return NextResponse.json({ student });
    } catch (error) {
        console.error("Error fetching student:", error);
        return NextResponse.json({error: "internal server error"})
    }
};



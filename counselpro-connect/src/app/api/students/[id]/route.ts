import { connectDB } from "@/utils";
import { Student } from "@/models";
import { NextResponse, NextRequest } from "next/server";
 
import { getSession, getCsrfToken } from "next-auth/react";
// Ensure database connection before handling requests
(async () => {
    await connectDB();
})();

// /api/students/3e89ru398arufyiadohfjdf

export const GET = async (req: NextRequest, { params }: { params: { id: string } }) => {
    console.log('/api/students/3eriojfdsiof');
    console.log('params -', params);

    const id = params.id;

    console.log('student id - ', id);

    try {
        const student = await Student.findById(id).limit(1);

        console.log('student is - ', student);

        if (!student) {
            return NextResponse.json({ error: "student not found" })
        }

        return NextResponse.json({ student });
    } catch (error) {
        console.error("Error fetching student:", error);
        return NextResponse.json({ error: "internal server error" })
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
            return NextResponse.json({ error: "student not found" })
        }

        return NextResponse.json({ student });
    } catch (error) {
        console.error("Error fetching student:", error);
        return NextResponse.json({ error: "internal server error" })
    }
};


export const PUT = async (req: NextRequest, { params }: { params: { id: string } }) => {
    console.log('put -> /api/students/3eriojfdsiof');
    console.log('params -', params);
    let student = await req.json();
    const id = params.id;
    const session = await getSession();
    console.log('session', session);
    try {

        return NextResponse.json({ msg: "updated" });
    } catch (error) {
        console.error("Error fetching student:", error);
        return NextResponse.json({ error: "internal server error" })
    }
};
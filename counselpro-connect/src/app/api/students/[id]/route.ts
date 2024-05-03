import { connectDB } from "@/utils";
import { Student } from "@/models";
import { NextResponse, NextRequest } from "next/server"; 
// Ensure database connection before handling requests

; (async () => {
    await connectDB();
})();

// /api/students/3e89ru398arufyiadohfjdf

export const GET = async (req: NextRequest, { params }: { params: { id: string } }) => {
    console.log('/api/students/3eriojfdsiof');
    console.log('params -', params);

    const id = params.id;
    const field = req.nextUrl.searchParams.get('field') || "";


    try {

        const student = await Student.findById(id).select(`${field}`).limit(1);

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
    let id = params.id;
    let data = await req.json();
    console.log('data', data);
    // return;
    let student = data.student;
    let updatedBy = data.updatedBy;

    if (!id) {
        return NextResponse.json({ error: "id not defined" });
    }

    if (!student) {
        return NextResponse.json({ error: "student is not found" });
    }

    let tmpStudent = await Student.findOne({ _id: id });

    tmpStudent.chats.push({ msg: student.comment, teacher: updatedBy });

    // Check if the student object has any fields to update
    if (Object.keys(student).length > 0) {
        // Iterate over the properties of the student object
        for (const field in student) {
            // Ensure the property exists in tmpStudent and is different
            if (student.hasOwnProperty(field) && student[field] !== tmpStudent[field]) {
                tmpStudent[field] = student[field]; // Update the property
            }
        }
    }

    try {
        let res = await tmpStudent.save();
        return NextResponse.json({ msg: "updated", ack: res });
    } catch (error) {
        console.log('student::put', error);
        return NextResponse.json({ error }, {status: 500});
    }
};

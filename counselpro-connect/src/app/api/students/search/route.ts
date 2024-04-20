import { connectDB } from "@/utils";
import { Student } from "@/models";
import { NextResponse, NextRequest } from "next/server";

// /api/students

export const GET = async (req: NextRequest, res: NextResponse) => {
    await connectDB();
    console.log('get /api/students/search');

    const currentPage: number = Number(req.nextUrl.searchParams.get('currentPage')) || 1;
    const pageSize: number = Number(req.nextUrl.searchParams.get('pageSize')) || 15;
    const order: number = Number(req.nextUrl.searchParams.get('order')) || 1;

    const query: string = req.nextUrl.searchParams.get('query') || "";
    const district: string = req.nextUrl.searchParams.get('district') || "";
    const status: string = req.nextUrl.searchParams.get('status') || "";
    const category: string = req.nextUrl.searchParams.get('category') || "";
    const registeredBy: string = req.nextUrl.searchParams.get('registeredBy') || "";
    const sortBy: string = req.nextUrl.searchParams.get('sortBy') || "name";

    const searchQuery = {
        $or: [
            { name: query },
            { name: { $regex: new RegExp(`^${query}`, "i") } },
            { fatherName: { $regex: new RegExp(`^${query}`, "i") } },
            { mobile: { $regex: new RegExp(`^${query}`, "i") } },
        ],
    };

    // Define type for additionalConditions
    interface AdditionalConditions {
        district?: string;
        status?: string;
        category?: string;
        registeredBy?: string;
    }

    // Initialize additionalConditions
    const additionalConditions: AdditionalConditions = {};

    // Add conditions for each specified filter
    if (district) {
        additionalConditions.district = district;
    }
    if (status) {
        additionalConditions.status = status;
    }
    if (category) {
        additionalConditions.category = category;
    }
    if (registeredBy) {
        additionalConditions.registeredBy = registeredBy;
    }

    // Add the additional conditions to the search query
    Object.assign(searchQuery, additionalConditions);

    // let students = await Student.find(searchQuery)
    //     .skip(pageSize * (currentPage - 1))
    //     .limit(pageSize)
    //     .sort({ [sortBy]: order });
    let students = await Student.find(searchQuery)
        .skip(pageSize * (currentPage - 1))
        .limit(pageSize) 

    return NextResponse.json(students);
};

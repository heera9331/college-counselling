"use client"
import React, { useEffect, } from 'react'
// import type { RootState } from '@/lib/store';
// import { useAppDispatch, useAppSelector, useAppStore } from "@/hooks"
// import { fetchStudents } from "@/lib/features/search/searchSlice";

import { useSearchContext } from "@/hooks";
import axios from "axios";

const Page = () => {
    // const store = useAppStore();
    // const { error, status, students, query } = store.getState().search;
    // const dispatch = useAppDispatch();

    // Using the custom hook to access search context
    const { students, status, query, error, updateSearchContext, setLoading, setSuccess, setError } = useSearchContext();

    const makeSearch = async (query: string) => {
        try {
            // Simulated fetch request (replace with actual API call)
            const response = await fetch(`/api/students/search?query=${query}`);
            const students = await response.json();
            // Update context with fetched data on success
            setSuccess(students);
        } catch (error) {
            // Update context with error message on failure
            setError('Failed to fetch data.');
        }
    }

    useEffect(() => {
        setLoading();
        ; (async () => {
            await makeSearch("heera");
        })()
    })

    return (
        <div>
            <h1 className='font-semibold text-2xl'>Tests</h1>
            <div>
                <p>students - {students.length}</p>
            </div>
        </div>
    )
}

export default Page;
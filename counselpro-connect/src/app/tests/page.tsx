"use client"
import React, { useEffect } from 'react'
import type { RootState } from '@/lib/store';
import { useAppDispatch, useAppSelector, useAppStore } from "@/hooks"
import { fetchStudents } from "@/lib/features/search/searchSlice";

const Page = () => {
    const store = useAppStore();
    const { error, status, students, query } = store.getState().search;
    const dispatch = useAppDispatch();

    useEffect(() => {
        console.log('students - ', students);
        console.log('dispatching action ');
        ; (async () => {
            await dispatch(fetchStudents("heera"));
        })()
        console.log('students - ', students);

    }, [students])

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
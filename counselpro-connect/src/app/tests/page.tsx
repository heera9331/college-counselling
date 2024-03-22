"use client"
import React, { useEffect } from 'react'
import type { RootState } from '@/store';
import { useSelector, useDispatch } from 'react-redux';
import { getResult, makeSearch } from '@/features/search/searchSlice';

const Page = () => {
    const students = useSelector((state: RootState) => state.search.students)
    const dispatch = useDispatch()


    useEffect(() => {
        console.log('students', students);
        console.log('dispatch action');
        dispatch(makeSearch("heera"));

    }, [])

    return (
        <div>
            <h1>Tests</h1>
            <div>

            </div>
        </div>
    )
}

export default Page;
"use client"
import { useState } from "react"
import { Input, Button } from "@/components"

const SearchCounselor = () => {
    const [query, setQuery] = useState("");

    const handleSearch = () => {

    }

    return (
        <form action="#"
            className=""
            onSubmit={(e) => {

                e.preventDefault();
                handleSearch();
            }}>
            <Input
                label="Search"
                placeholder="Enter name here..."
                value={query}
                onChange={(e) => { setQuery(e.target.value) }}
                type="text"
                htmlFor="query"
            />
            <Button
                text="Search"
                onClick={() => { }}
            />
        </form>
    )
}
export default SearchCounselor;
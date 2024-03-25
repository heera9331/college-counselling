import { createContext } from "react";

const SearchContext = createContext({
    students: [],
    status: "idle", // loading, 
    query: "",
    error: "",
})

export default SearchContext;
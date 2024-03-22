import axios from 'axios';
import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    error: "",
    state: "idle",
    students: [],
    query: ""
}

const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {
        getResult: (state) => { state.students },
        makeSearch: (state, action) => {
            let query = action.payload;
            ; (async () => {
                let res = await axios.get(`/api/students/search?query=${query}`);
                return await res.data;
            })();
        }
    }
})


// Action creators are generated for each case reducer function
export const { getResult, makeSearch } = searchSlice.actions

// but exported => searchReducer
export default searchSlice.reducer
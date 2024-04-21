import axios from 'axios';
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

// Create an async thunk action creator
const fetchStudents = createAsyncThunk('search/fetchStudents', async (query) => {
    const response = await axios.get(`/api/students/search?query=${query}`);
    console.log('responsed students', await response.data);
    return await response.data;
}
);

const searchSlice = createSlice({
    name: "search",
    initialState: {
        error: "",
        status: "idle",
        students: [],
        query: ""
    },
    reducers: {
        getResult: (state) => { state.students },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchStudents.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchStudents.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.students = action.payload;
            })
            .addCase(fetchStudents.rejected, (state, action) => {
                state.status = "failed"; 
            });
    },
})

export { fetchStudents };
export const { getResult } = searchSlice.actions;
export default searchSlice.reducer

import { configureStore } from '@reduxjs/toolkit'
import searchReducer from "@/lib/features/search/searchSlice";

const makeStore = () => {
    return configureStore({
        reducer: { search: searchReducer },
    })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']


export { makeStore };
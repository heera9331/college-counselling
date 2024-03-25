import { useReducer } from "react";
import SearchContext from ".";

// Define action types
const SET_STATE = 'SET_STATE';
const SET_LOADING = 'SET_LOADING';
const SET_SUCCESS = 'SET_SUCCESS';
const SET_ERROR = 'SET_ERROR';

// Define reducer function to manage state transitions
const searchReducer = (state: typeof SearchContext, action: any) => {
    switch (action.type) {
        case SET_STATE:
            return { ...state, ...action.payload };
        case SET_LOADING:
            return { ...state, status: 'loading', error: '' };
        case SET_SUCCESS:
            return { ...state, status: 'success', error: '', students: action.payload };
        case SET_ERROR:
            return { ...state, status: 'error', error: action.payload };
        default:
            return state;
    }
};

// Create a provider component for the SearchContext
const SearchProvider = ({ children }: { children: any }) => {
    // Initialize state using useReducer
    const [state, dispatch] = useReducer(searchReducer, {
        students: [],
        status: "idle",
        query: "",
        error: "",
    });

    // Function to update the context values
    const updateSearchContext = (newState: typeof SearchContext) => {
        dispatch({ type: SET_STATE, payload: newState });
    };

    // Additional actions
    const setLoading = () => {
        dispatch({ type: SET_LOADING });
    };

    const setSuccess = (students: any[]) => {
        dispatch({ type: SET_SUCCESS, payload: students });
    };

    const setError = (error: string) => {
        dispatch({ type: SET_ERROR, payload: error });
    };

    return (
        <SearchContext.Provider value={{ ...state, updateSearchContext, setLoading, setSuccess, setError, dispatch }}>
            {children}
        </SearchContext.Provider>
    );
};

export { SearchProvider, SearchContext };

export default SearchContext;
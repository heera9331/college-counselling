
import { createContext, useState } from "react";

const StudentContext = createContext({});

const StudentContextProvider = ({ children }: { children: any }) => {

    const [state, setState] = useState<{ students: any[], status: string, error: string }>({
        // status => initial, loading, success 
        students: [],
        status: "initial",
        error: ""
    })

    const resetState = () => {
        setState({ students: [], status: "initial", error: "" })
    }

    const setStudents = (students: any[]) => {
        setState({ ...state, students: students });
    }

    const setError = (error: string) => {
        setState({ ...state, error: error })
    }

    const setStatus = (status: string) => {
        setState({ ...state, status: status })
    }

    const initializeState = (state: { students: any[], status: string, error: string }) => {
        setState(state);
    }

    return (
        <StudentContext.Provider value={{ initializeState, students: state.students, status: state.status, error: state.error, setStudents, setStatus, setError, resetState }}>
            {children}
        </StudentContext.Provider>
    )
}

export { StudentContext, StudentContextProvider };
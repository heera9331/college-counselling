
import { createContext, useReducer, useState } from "react";



const StudentContext = createContext({});

const StudentContextProvider = ({ children }: { children: any }) => {

    const [state, setState] = useState<{ students: any[], status: string, error: string }>({
        students: [],
        status: "idle",
        error: ""
    })

    const setStudents = (students: any[]) => {
        setState({ ...state, students: students });
    }

    const setError = (error: string) => {
        setState({ ...state, error: error })
    } 

    const setStatus = (status: string) => {
        setState({ ...state, status: status })
    }



    return (
        <StudentContext.Provider value={{ students: state.students, status: state.status, error: state.error, setStudents, setStatus, setError }}>
            {children}
        </StudentContext.Provider>
    )
}

export { StudentContext, StudentContextProvider };
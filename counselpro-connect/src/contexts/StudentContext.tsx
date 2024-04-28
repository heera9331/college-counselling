import React, { createContext, useState, ReactNode } from "react";

interface Student {
  _id: string;
  // Define other properties of student
}

interface StudentContextType {
  getStudent: (id: string) => Student | null;
  initializeState: (state: {
    students: Student[];
    status: string;
    error: string;
  }) => void;
  students: Student[];
  status: string;
  error: string;
  setStudents: (students: Student[]) => void;
  setStatus: (status: string) => void;
  setError: (error: string) => void;
  resetState: () => void;
}

const initialStudentState = {
  students: [],
  status: "initial",
  error: "",
};

const StudentContext = createContext<StudentContextType>({
  ...initialStudentState,
  getStudent: () => null,
  initializeState: () => {},
  setStudents: () => {},
  setStatus: () => {},
  setError: () => {},
  resetState: () => {},
});

const StudentContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<{
    students: Student[];
    status: string;
    error: string;
  }>(initialStudentState);

  const getStudent = (id: string) => {
    return state.students.find((student) => student._id === id) || null;
  };

  const resetState = () => {
    setState(initialStudentState);
  };

  const setStudents = (students: Student[]) => {
    setState((prevState) => ({ ...prevState, students }));
  };

  const setError = (error: string) => {
    setState((prevState) => ({ ...prevState, error }));
  };

  const setStatus = (status: string) => {
    setState((prevState) => ({ ...prevState, status }));
  };

  const initializeState = (newState: typeof initialStudentState) => {
    setState(newState);
  };

  return (
    <StudentContext.Provider
      value={{
        getStudent,
        initializeState,
        students: state.students,
        status: state.status,
        error: state.error,
        setStudents,
        setStatus,
        setError,
        resetState,
      }}
    >
      {children}
    </StudentContext.Provider>
  );
};

export { StudentContext, StudentContextProvider };

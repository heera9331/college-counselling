import { useContext } from "react"
import { StudentContext } from "@/contexts/StudentContext";

const useStudentContext = () => {
    return useContext(StudentContext);
}

export default useStudentContext;

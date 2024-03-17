import axios from "axios";

const getStudents = async () => {
    let res = await axios.get(`http://localhost:3000/api/students`);

    if (res.statusText === "OK") {
        let students = await res.data;
        return students;
    }
    return [];
}

const Page = async (pross) => {

    const students = await getStudents();

    console.log(students);

    return (
        <div className="px-2">
            Dashboard page
        </div>
    )
}

export default Page;
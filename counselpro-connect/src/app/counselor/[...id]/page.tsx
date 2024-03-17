import axios from 'axios';
import { apiBaseUrl } from "@/utils";
import { Students } from "@/components"

const getUser = async (id: string) => {
    let res = await axios.get(`${apiBaseUrl}/api/users/${id}`);

    if (res.statusText === "OK") {
        let user = await res.data;
        return user;
    }

    return null;
}

const getStudents = async (registeredBy: string) => {
    let res = await axios.get(`${apiBaseUrl}/api/students/search?registeredBy=${registeredBy}`);

    if (res.statusText === "OK") {
        let students = await res.data;
        return students;
    }
    return [];
}

const Page = async ({ params }: { params: object }) => {

    const id = params.id[0];
    const user = await getUser(id);
    const students = await getStudents(id);

    console.log('user', user);
    return (
        <div>
            <div>
                <p>Name - Heera Singh</p>
                <p>Email - admin@gmail.com</p>
                <p>Position - Admin</p>
                <p>Registered students - 10</p>
            </div>
        </div>
    )
}

export default Page;
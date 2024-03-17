"use client"

import { Input, Button } from "@/components"
import { useState } from "react"
import axios from "axios"

const Page = (props: any) => {

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: ""
    })

    const registerNow = async () => {
        // let res = await axios.post('/api/users', user);
        console.log('counselor to be registered', user);
    }

    return (
        <div className="flex flex-col max-w-[720px] m-auto border border-gray-200  rounded-sm p-2">
            <form action={'#'} className="" onSubmit={(e) => {
                e.preventDefault();
                registerNow();
            }}>
                <Input
                    label={"Name"}
                    htmlFor={"cname"}
                    type={"text"}
                    placeholder={"Enter counsellor name"}
                    value={user.name}
                    onChange={(e) => {
                        setUser({ ...user, name: e.target.value.toUpperCase() });
                    }}
                />
                <Input
                    label={"Email"}
                    htmlFor={"email"}
                    type={"email"}
                    placeholder={"Enter counsellor email"}
                    value={user.email}
                    onChange={(e) => {
                        setUser({ ...user, email: e.target.value });
                    }}
                />

                <Input
                    label={"Password"}
                    htmlFor={"password"}
                    type={"password"}
                    placeholder={"Enter counsellor password"}
                    value={user.password}
                    onChange={(e) => {
                        setUser({ ...user, password: e.target.value });
                    }}
                />

                <Button
                    text={"Submit"}
                    className={"bg-green-600 ml-2"}
                    onClick={(event: any) => { }}
                />
            </form>


        </div>
    )
}

export default Page;

"use client";
import "../globals.css";

import { useEffect, useState } from "react";
import axios from "axios";
import { Loading, Input, Button } from "@/components";
import { useRouter, useSearchParams } from "next/navigation";
import { getProviders, signIn, useSession } from "next-auth/react";

const Page = () => {
    const [user, setUser] = useState({
        email: "admin@gmail.com",
        password: "admin",
    });
    const session = useSession();
    const params = useSearchParams();
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();

    let timeout: any = null;

    const handleLogin = async () => {
        try {
            console.log('user to be login', user);
            setLoading(true);
            signIn("credentials", {
                email: user.email,
                password: user.password,
            });
            setLoading(false);
        } catch (error) {
            setLoading(false);
            alert("Server connection timeout");
            console.error("Error during login:", error);
        }
        setLoading(false);
    };


    useEffect(() => {
        setError(params.get("error") || "");
        setSuccess(params.get("success") || "");

        return () => {
            clearInterval(timeout);
        };
    }, [params, timeout]);

    if (session.status === "loading") {
        return <Loading />;
    }

    if (session.status === "authenticated") {
        router?.push("/home");
    }

    return (

        <div className="flex flex-col m-1 h-[78vh]">
            <div className="p-4 m-auto shadow-sm shadow-slate-600 sm:w-[450px]">
                <div className="px-2">
                    <h1 className="text-2xl font-semibold">Login</h1>
                    <form
                        className="text-black p-4"
                        action="#"
                        method="post"
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleLogin();
                        }}
                    >
                        {loading ? <Loading /> : <>
                            <Input
                                inputColor={"text-black"}
                                label={"Email"}
                                htmlFor={"email"}
                                value={user.email}
                                placeholder={"email"}
                                className={
                                    "bg-gray-100 p-1 text-black rounded-sm focus:outline-none"
                                }
                                type={"text"}
                                onChange={(e: any) => {
                                    setUser({ ...user, email: e.target.value });
                                }}
                            />
                            <Input
                                inputColor={"text-black"}
                                label={"Password"}
                                htmlFor={"password"}
                                value={user.password}
                                placeholder={"Password"}
                                className={"bg-gray-100 p-1 rounded-sm focus:outline-none"}
                                type={"password"}
                                onChange={(e) => {
                                    setUser({ ...user, password: e.target.value });
                                }}
                            />
                        </>}
                        <div className="flex justify-center pt-2 flex-col items-center">
                            <button className="bg-white border border-black border-opacity-25 rounded-sm px-2 py-1 font-semibold hover:bg-gray-100">
                                Login
                            </button>
                            {error && error}
                        </div>
                    </form>
                </div>
            </div>
        </div>

    );
};

export default Page;
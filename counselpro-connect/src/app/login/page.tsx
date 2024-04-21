"use client";
import "../globals.css";

import { useEffect, useState } from "react";
import axios from "axios";
import { Loading, Input, Button, AwsCard } from "@/components";
// import { useRouter, useSearchParams } from "next/navigation"; 

const Page = () => {
  const [user, setUser] = useState({
    email: "admin@gmail.com",
    password: "admin",
  }); 
  // const params = useSearchParams();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [loading, setLoading] = useState<boolean>(false);
  // const router = useRouter();

  let timeout: any = null;

  const handleLogin = async () => {
    try {
      console.log("user to be login", user);
      setLoading(true);
      //  signin code
      setLoading(false);
    } catch (error) {
      setLoading(false);
      alert("Server connection timeout");
      console.error("Error during login:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    // setError(params.get("error") || "");
    // setSuccess(params.get("success") || "");

    return () => {
      clearInterval(timeout);
    };
  // }, [params, timeout]);
  }, [timeout]);

  // if (session.status === "loading") {
  //   return <Loading />;
  // }

  // if (session.status === "authenticated") {
  //   router?.push("/home");
  // }

  return (
    <div className="flex flex-col justify-center h-[70vh]">
      <AwsCard
        title="Login"
        cardProps="sm:w-[450px] mx-auto"
        showCardControls={false}
      >
        <div className="px-2">
          <form className="text-black p-4" action="#" method="post">
            {loading ? (
              <Loading />
            ) : (
              <>
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
              </>
            )}
            <div className="flex justify-center pt-2 flex-col items-center">
              <Button
                text={"Login"}
                onClick={(e) => {
                  e.preventDefault();
                  handleLogin();
                }}
              />
              {error && error}
            </div>
          </form>
        </div>
      </AwsCard>
    </div>
  );
};

export default Page;

"use client";
import "../globals.css";

import { useEffect, useState } from "react";
import axios from "axios";
import { Loading, Input, Button, AwsCard } from "@/components";
import { useAuthContext } from "@/hooks";
import { useRouter, useSearchParams } from "next/navigation";

const Page = (props: any) => {
  const [currentUser, setCurrentUser] = useState({
    email: "admin@gmail.com",
    password: "admin",
  });
  
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const { status, setStatus, setUser } = useAuthContext();

  let timeout: any = null;

  const handleLogin = async () => {
    try {
      setLoading(true);
      //  signin code
      setStatus("unauthenticated");
      setStatus("loading");
      console.log("user to be login", currentUser);
      let res = await axios.post("/api/auth/signin", currentUser);
      setStatus("success");
      setLoading(false);
      let resData: any = await res.data;
      let newUser = { email: resData.email, isAdmin: resData.isAdmin };
      console.log("login user", newUser);
      setUser(newUser);
      setStatus("authenticated");
      router.push("/home");
    } catch (error) {
      setLoading(false);
      setStatus("success");
      // alert("invalid credentials or Server connection timeout");
      setError("invalid credentials or Server connection timeout");
      console.error("Error during login:", error);
    }
    setLoading(false);
  };

  const handleChange = (e: any) => {
    setCurrentUser({ ...currentUser, [e.target.name]: e.target.value });
  };

  useEffect(() => {
       
    return () => {
      clearInterval(timeout);
    }; 
  }, [timeout, status]);

  if (status === "loading") {
    return <Loading />;
  }
 

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
                  value={currentUser.email}
                  placeholder={"email"}
                  className={
                    "bg-gray-100 p-1 text-black rounded-sm focus:outline-none"
                  }
                  type={"text"}
                  onChange={(e: any) => {
                    handleChange(e);
                  }}
                />
                <Input
                  inputColor={"text-black"}
                  label={"Password"}
                  htmlFor={"password"}
                  value={currentUser.password}
                  placeholder={"Password"}
                  className={"bg-gray-100 p-1 rounded-sm focus:outline-none"}
                  type={"password"}
                  onChange={(e) => {
                    handleChange(e);
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

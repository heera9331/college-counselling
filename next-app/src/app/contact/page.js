"use client";
import { useState } from "react";
import Input from "@/components/Input";
import Button from "@/components/Button";

export default function Page() {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    name: "",
    email: "",
    number: "",
    message: "",
  });

  const handleSubmit = () => {
    console.log(user);
  };

  return (
    <div className="min-h-[100vh] mt-[65px] flex items-center justify-center flex-col">
      <div
        className="p-4 m-auto shadow-sm shadow-slate-600 w-[450px] bg-white"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        {!loading ? (
          <>
            <div className="px-2">
              <h1 className="text-2xl font-semibold text-center">Contact</h1>
              <form
                className="text-black p-4 "
                action="#"
                method="post"
                onSubmit={(e) => {
                  e.preventDefault();
                }}
              >
                <Input
                  inputColor={"text-black"}
                  label={"Name"}
                  htmlFor={"name"}
                  value={user.name}
                  placeholder={"Enter name"}
                  className={
                    "bg-gray-100 p-1 text-black rounded-sm focus:outline-none"
                  }
                  type={"text"}
                  onChange={(e) => {
                    setUser({ ...user, name: e.target.value.toUpperCase() });
                  }}
                />
                <Input
                  inputColor={"text-black"}
                  label={"Mobile"}
                  htmlFor={"mobile"}
                  value={user.mobile}
                  placeholder={"Enter mobile number"}
                  className={
                    "bg-gray-100 p-1 text-black rounded-sm focus:outline-none"
                  }
                  type={"number"}
                  onChange={(e) => {
                    setUser({ ...user, mobile: e.target.value });
                  }}
                />
                <Input
                  label={"Email"}
                  htmlFor={"email"}
                  value={user.email}
                  placeholder={"Email"}
                  className={
                    "bg-gray-100 p-1 rounded-sm focus:outline-none text-black"
                  }
                  type={"email"}
                  onChange={(e) => {
                    setUser({ ...user, email: e.target.value });
                  }}
                />
                <Input
                  label={"Message"}
                  htmlFor={"message"}
                  value={user.message}
                  placeholder={"Leave a message"}
                  className={
                    "bg-gray-100 p-1 rounded-sm focus:outline-none text-black"
                  }
                  type={"text"}
                  onChange={(e) => {
                    setUser({ ...user, message: e.target.value });
                  }}
                />

                <div
                  className="flex items-center justify-center bg-primary m-2 rounded-sm my-4 cursor-pointer hover:bg-blue-800"
                  onClick={handleSubmit}
                >
                  <Button
                    className={`p-1 text-white font-semibold`}
                    onClick={() => {
                      alert("message sent successfully, we will contact soon");
                    }}
                    text={"Send"}
                  />
                  {/* <button className="p-1 text-white font-semibold">Sent</button> */}
                </div>
              </form>
            </div>
          </>
        ) : (
          <Loading />
        )}
      </div>
    </div>
  );
}

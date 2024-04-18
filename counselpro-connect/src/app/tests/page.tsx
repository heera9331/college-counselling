"use client";
import { AwsCard, Input, Button } from "@/components";
import { useState } from "react";
import axios from "axios";

export default function Page(props: any) {
  const [user, setUser] = useState({
    email: "admin@gmail.com",
    password: "123456",
  });

  const loginNow = async () => {
    console.log("user", user);
    let res = await axios.post("/api/auth/signin/", user);
    console.log("response", res);
  };

  return (
    <div>
      <AwsCard
        title="Login"
        cardProps="max-w-[400px] mx-auto"
        showCardControls={false}
      >
        <form method="post" action={"#"} className="flex flex-col gap-2">
          <Input
            label="Email"
            htmlFor="email"
            value={user.email}
            onChange={(e) => {
              setUser({ ...user, email: e.target.value });
            }}
            type="email"
            placeholder="Enter email"
          />
          <Input
            label="password"
            htmlFor="password"
            value={user.password}
            onChange={(e) => {
              setUser({ ...user, password: e.target.value });
            }}
            type="password"
            placeholder="Enter password"
          />
          <Button
            text="Login"
            onClick={(e) => {
              e.preventDefault();
              loginNow();
            }}
          />
        </form>
      </AwsCard>
    </div>
  );
}

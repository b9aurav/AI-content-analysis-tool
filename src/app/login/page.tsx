"use client";
import {
  Card,
  CardHeader,
  Divider,
  CardBody,
  Button,
  Input,
} from "@nextui-org/react";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

type Props = {};

const Login = (props: Props) => {
  const router = useRouter();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const handleRegisterClick = () => {
    router.push("/register");
  };

  const handleLoginClick = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();
      if (result.success) {
        localStorage.setItem("token", result.token);
        localStorage.setItem("userId", result.userId);
        router.push("/dashboard");
      } else {
        alert("Error: Invalid email or password");
      }
    } catch (error) {
      console.log("An error occurred", error);
    }
  };

  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <Card className="max-w-[400px]">
        <CardHeader className="flex gap-3">
          <div className="flex flex-col">
            <p className="text-lg font-bold my-2">Login</p>
            <p className="text-small text-default-500">
              Al-Powered Content Summarization and Analysis Tool
            </p>
          </div>
        </CardHeader>
        <Divider />
        <CardBody>
          <div className="flex gap-4 flex-col">
            <Input
              type="email"
              label="Email"
              placeholder="Enter your email"
              onChange={(e) => setemail(e.currentTarget.value)}
            />
            <Input
              type="password"
              label="Password"
              placeholder="Enter your password"
              onChange={(e) => setpassword(e.currentTarget.value)}
            />
          </div>
        </CardBody>
        <Divider />
        <div className="flex justify-center items-center gap-2 p-2">
          <Button color="danger" onClick={handleLoginClick}>
            Login
          </Button>
          <Button onClick={handleRegisterClick}>Register</Button>
        </div>
      </Card>
    </div>
  );
};

export default Login;

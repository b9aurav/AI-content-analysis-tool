"use client";
import {
  Card,
  CardHeader,
  Divider,
  CardBody,
  Button,
  Input,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

type Props = {};

const Register = (props: Props) => {
  const router = useRouter();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const validateEmailFormat = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLoginClick = () => {
    router.push("/login");
  };

  const handleRegisterClick = async () => {
    if (!email || !validateEmailFormat(email)) {
      alert("Error: Invalid email format");
      router.push("/login");
      return;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const result = await response.json();
      alert(result.message);
    } catch (error) {
      console.log("An error occurred", error);
    }
  };

  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <Card className="max-w-[400px]">
        <CardHeader className="flex gap-3">
          <div className="flex flex-col">
            <p className="text-lg font-bold my-2">Registeration</p>
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
          <Button color="danger" onClick={handleRegisterClick}>
            Register
          </Button>
          <Button onClick={handleLoginClick}>Login</Button>
        </div>
      </Card>
    </div>
  );
};

export default Register;

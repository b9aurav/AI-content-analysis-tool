"use client";
import { Spinner } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  const checkToken = async () => {
    if (typeof window !== "undefined" && localStorage.getItem("token")) {
      router.push("/dashboard");
    } else {
      router.push("/login");
    }
  };

  useEffect(() => {
    checkToken();
  });

  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <Spinner color="danger" size="lg" />
    </div>
  );
}

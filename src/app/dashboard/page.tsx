"use client";
import { useEffect, useState } from "react";
import Analytics from "../components/Analytics";
import { Progress } from "@nextui-org/react";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState<string>("");
  const [analysisResults, setAnalysisResults] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
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

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    if (!file) {
      setMessage("No file selected");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const result = await response.json();
      if (result.success) {
        setAnalysisResults(result.data);
        setMessage("");
      } else {
        setMessage("Upload failed");
      }
    } catch (error) {
      setMessage("An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <div className="pt-12 flex justify-center items-center">
      <div className="w-full flex justify-center items-center flex-col">
        <form onSubmit={handleSubmit}>
          <input
            className="input w-60"
            onChange={handleFileChange}
            type="file"
            accept=".txt,.html,.doc,.docx"
          />
          <button type="submit" className="btn variant-filled mx-2">
            Analyze
          </button>
          <button className="btn variant-filled" onClick={() => logout()}>Logout</button>
          {message && <p>{message}</p>}
        </form>
        {isLoading && (
          <Progress
            size="sm"
            isIndeterminate
            label="Uploading & Analyzing..."
            className="max-w-md mt-4"
            color="default"
          />
        )}
        {analysisResults && (
          <div className="w-full">
            <Analytics analysisResults={analysisResults} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

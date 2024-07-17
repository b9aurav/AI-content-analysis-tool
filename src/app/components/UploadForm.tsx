"use client";
import { useState } from "react";
import Analytics from "./Analytics";

const UploadForm = () => {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState<string>("");
  const [analysisResults, setAnalysisResults] = useState<any>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
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
      console.log(result);
      if (result.success) {
        setAnalysisResults(result.data);
        setMessage("");
      } else {
        setMessage("Upload failed");
      }
    } catch (error) {
      setMessage("An error occurred");
    }
  };

  const getSentimentEmoji = (score: number) => {
    if (score > 0.75) return "😃";
    if (score > 0.25) return "🙂";
    if (score > -0.25) return "😐";
    if (score > -0.75) return "😟";
    return "😠";
  };

  return (
    <div className="w-full flex justify-center items-center flex-col">
      <form onSubmit={handleSubmit}>
        <input
          className="input w-60"
          onChange={handleFileChange}
          type="file"
          accept=".txt,.html,.doc"
        />
        <button type="submit" className="btn variant-filled mx-2">
          Analyze
        </button>
        {message && <p>{message}</p>}
      </form>
      {analysisResults && (
        <div className="w-full">
          <Analytics analysisResults={analysisResults} />
        </div>
      )}
    </div>
  );
};

export default UploadForm;

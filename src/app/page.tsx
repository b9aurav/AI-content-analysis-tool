import Image from "next/image";
import UploadForm from "./components/UploadForm";

export default function Home() {
  return (
    <main>
      <div className="py-12 flex justify-center items-center">
        <UploadForm />
      </div>
    </main>
  );
}

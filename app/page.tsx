import { Navbar } from "@/components/Navbar";
import Landing from "@/components/Landing";

export default function Home() {
  return (
    <div className="h-screen overflow-hidden">
      <Navbar />
      <div className="flex items-center justify-center drop-shadow-lg">
        <div className="w-[90%]">
          <Landing />
        </div>
      </div>
    </div>
  );
}

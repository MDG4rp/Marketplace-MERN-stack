import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="flex flex-col h-screen">
      <header className="flex-1 flex flex-col justify-center items-center gap-4 p-6 sm:p-8 lg:p-12">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center">
          Welcome to the Marketplace!
        </h1>
        <Link to="/login">
          <Button className="px-6 py-3 rounded-2xl bg-zinc-600 text-white text-lg sm:text-xl lg:text-2xl hover:bg-zinc-700 transition-colors">
            Get Started
          </Button>
        </Link>
      </header>
    </div>
  );
}

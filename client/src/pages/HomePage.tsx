import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="flex flex-col h-full">
      <header className="flex-1 flex flex-col justify-center items-center gap-4 p-6">
        <h1 className="text-4xl">Welcome to the Marketplace!</h1>
        <Link to="/login">
          <Button className="px-4 py-2 rounded-2xl bg-zinc-600 text-white">
            Get Started
          </Button>
        </Link>
      </header>
    </div>
  );
}

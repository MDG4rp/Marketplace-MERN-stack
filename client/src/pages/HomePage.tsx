import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="flex flex-col h-screen bg-transparent">
      <header className="flex-1 flex flex-col justify-center items-center gap-6 p-6 sm:p-8 lg:p-12">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-800 dark:text-white text-center drop-shadow-lg">
          Welcome to the Marketplace!
        </h1>
        <p className="text-lg sm:text-xl lg:text-2xl text-gray-700 dark:text-gray-300 mb-6 text-center">
          Discover amazing deals and unique products just for you.
        </p>
        <Link to="/login">
          <Button className="px-8 py-8 rounded-full bg-green-600 dark:bg-emerald-600 text-white dark:text-white text-lg sm:text-xl lg:text-2xl hover:bg-green-700 dark:hover:bg-emerald-700 transition-colors shadow-lg">
            Get Started
          </Button>
        </Link>
      </header>
    </div>
  );
}

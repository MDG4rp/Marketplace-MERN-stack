import Login from "@/components/Login";
import { Link } from "react-router-dom";

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center h-full bg-gray-200 dark:bg-gray-900">
      <div className="w-full p-11 bg-gray-100 dark:bg-gray-700 shadow-lg variant2">
        <h1 className="text-2xl text-center font-bold text-gray-900 dark:text-gray-100 mb-6">Login</h1>
        <Login />
        <p className="mt-4 text-center text-gray-600 dark:text-gray-400">
          Don’t have an account?{" "}
          <Link to={'/signup'} className="text-teal-500 hover:underline dark:text-teal-300">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
import { Link } from "react-router-dom";
import Register from "@/components/Register";
export default function SignupPage() {
  return (
    <div className="flex items-center justify-center h-full bg-gray-200 dark:bg-gray-900">
      <div className="w-full p-6 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-lg variant2">
        <h1 className="text-2xl text-center font-bold text-gray-900 dark:text-gray-100 mb-6">
          Sign up!
        </h1>
        <Register />
        <p className="mt-4 text-center text-gray-600 dark:text-gray-400">
          Already have an account?{" "}
          <Link
            to={"/login"}
            className="text-teal-500 hover:underline dark:text-teal-300"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

import { Link } from "react-router-dom";
import Register from "@/components/Register";
export default function SignupPage() {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="w-full p-6 rounded-lg flex flex-col items-center justify-center">
        <h1 className="text-2xl text-center font-bold mb-6">
          Sign up!
        </h1>
        <Register />
        <p className="mt-4 text-center ">
          Already have an account?{" "}
          <Link
            to={"/login"}
            className="text-green-700 hover:underline dark:text-green-600"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

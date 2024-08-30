import Login from "@/components/Login";
import { Link } from "react-router-dom";

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center h-full ">
      <div className="w-full p-6 flex flex-col items-center justify-center rounded-lg">
        <h1 className="text-2xl text-center font-bold mb-6">Login</h1>
        <Login />
        <p className="mt-4 text-center ">
          Don’t have an account?{" "}
          <Link
            to={"/signup"}
            className="text-green-700 hover:underline dark:text-green-600"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

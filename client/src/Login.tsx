import { useState } from "react";
import LoginInfo from "./api/models/LoginInfo";
import login from "./api/services/login-service";
import { useForm, SubmitHandler } from "react-hook-form";
import { setAuthToken } from "./axiosConfig";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";

export default function Login(): JSX.Element {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<LoginInfo>();
  const [mappedData, setMappedData] = useState(null);

  const onSubmit: SubmitHandler<LoginInfo> = ({
    email,
    password,
  }: LoginInfo) => {
    login({ email, password })
      .then((response) => {
        setMappedData(response);
        console.log(response);
        const jwt = response.jwt;
        setAuthToken(jwt);
        navigate("/dashboard");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-indigo-600 opacity-30 rounded-lg"></div>
          <div className="relative z-10">
            <h1 className="text-3xl font-bold mb-2">Login Page</h1>
            <h2 className="text-xl mb-6">Welcome back!</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <Input
                type="text"
                {...register("email")}
                placeholder="username"
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <Input
                type="password"
                placeholder="password"
                {...register("password", { required: true })}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <Checkbox id="check" className="mr-2" />
                  <Label htmlFor="check" className="text-gray-300">
                    Remember me
                  </Label>
                </div>
                <a href="" className="text-indigo-400 hover:underline">
                  Reset password
                </a>
              </div>
              <Button
                type="submit"
                className="w-full px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                id="signin"
              >
                Sign in
              </Button>
              <div className="text-center mt-4">
                <p className="text-gray-400">Don't have an account?</p>
                <Link
                  to={"/register"}
                  className="text-indigo-400 hover:underline"
                >
                  Sign up
                </Link>
              </div>
              <div className="space-y-2 mt-4">
                <Button className="w-full px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500">
                  Continue with Google
                </Button>
                <Button className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  Continue with Twitter
                </Button>
              </div>
            </form>

            {mappedData && (
              <div className="mt-6">
                <h2 className="text-2xl font-semibold mb-2">Dati Utente:</h2>
                {Object.keys(mappedData).map((key, index) => (
                  <div key={index} className="mb-4">
                    <h2 className="text-lg">
                      {key}: {mappedData[key]}
                    </h2>
                    <hr className="border-gray-700" />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

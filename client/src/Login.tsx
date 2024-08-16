import LoginInfo from "./api/models/LoginInfo";
import loginService from "./api/services/login-service";
import { useForm, SubmitHandler } from "react-hook-form";
import { setAuthToken } from "./axiosConfig";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";


export default function Login(): JSX.Element {
  const { register, handleSubmit } = useForm<LoginInfo>();

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<LoginInfo> = ({
    username,
    password,
  }: LoginInfo) => {
    loginService({ username, password })
      .then((response) => {
        const jwt = response.jwt;
        setAuthToken(jwt);
        console.log("response: ",response)
        const id = response.user;
        navigate(`/users/${id}/products`);
      })
      .catch((error) => {
        console.error("Login error: ", error);
      });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 to-indigo-600 text-white">
      <div className="w-full max-w-md p-8 bg-gray-900 bg-opacity-70 rounded-lg flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-2 z-10">Login Page</h1>
        <h2 className="text-xl mb-6 z-10">Welcome back!</h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full space-y-4 z-10"
        >
          <Input
            type="text"
            {...register("username")}
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
            <Link to={"/register"} className="text-indigo-400 hover:underline">
              Sign up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

import LoginInfo from "./api/models/LoginInfo";
import { axiosInstance } from "./lib/axios";
import { AxiosResponse } from "axios";
import login from "./api/services/login-service";
import { useForm, SubmitHandler } from "react-hook-form";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";
import { Checkbox } from "./components/ui/checkbox";
import { Label } from "./components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";
import LoginResponse from "./api/models/LoginResponse";

export default function Login(): JSX.Element {

  const signIn = useSignIn();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInfo>();
  const navigate = useNavigate();
  const isAuthenticated = useIsAuthenticated();

  const onSubmit: SubmitHandler<LoginInfo> = ({
    username,
    password,
  }: LoginInfo) => {
    login({ username, password })
      .then(({ data }: AxiosResponse<LoginResponse>) => data)
      .then(({ jwt, refreshToken, id, name, role }: LoginResponse) => {
        console.log(jwt, refreshToken, id, name, role);
        if (
          signIn({
            auth: {
              token: jwt,
              type: "Bearer",
            },
            refresh: refreshToken,
            userState: {
              name: name,
              id: id,
              role: role,
            },
          })
        ) {
          axiosInstance.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${jwt}`;
          if(role === "admin"){
            navigate("/userslist");
          }else{
            navigate("/products");
          }
          console.log(isAuthenticated);
        } else {
          console.log("Authentication failed");
        }
      });
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 to-indigo-600 text-white">
      <div className="w-full max-w-md p-8 bg-gray-900 bg-opacity-70 rounded-lg flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-2">Login Page</h1>
        <h2 className="text-xl mb-6">Welcome back!</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-4">
          <Input
            type="text"
            {...register("username", { required: "Username is required" })}
            placeholder="Username"
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {errors.username && (
            <p className="text-red-500">{errors.username.message}</p>
          )}

          <Input
            type="password"
            placeholder="Password"
            {...register("password", { required: "Password is required" })}
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}

          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Checkbox id="remember-me" className="mr-2" />
              <Label htmlFor="remember-me" className="text-gray-300">
                Remember me
              </Label>
            </div>
            <a href="#" className="text-indigo-400 hover:underline">
              Reset password
            </a>
          </div>

          <Button
            type="submit"
            className="w-full px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Sign in
          </Button>

          <div className="text-center mt-4">
            <p className="text-gray-400">Don't have an account?</p>
            <Link to="/register" className="text-indigo-400 hover:underline">
              Sign up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

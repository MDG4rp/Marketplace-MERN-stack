import LoginInfo from "./api/models/LoginInfo";
import { axiosInstance } from "./lib/axios";
import { login } from "./api/services/login-service";
import { SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import LoginResponse from "./api/models/LoginResponse";
import { LoginForm } from "./components/LoginForm";
import { RegisterForm } from "./components/RegisterForm";
import register from "./api/services/register-service";
import RegisterInfo from "./api/models/RegisterInfo";
export default function Login(): JSX.Element {
  const signIn = useSignIn();
  const navigate = useNavigate();

  const onLoginSubmit: SubmitHandler<LoginInfo> = ({
    username,
    password,
  }: LoginInfo) => {
    login({ username, password })
      .then(({ jwt, refreshToken, id, name, role }: LoginResponse) => {
        console.log("Received login response:", {
          jwt,
          refreshToken,
          id,
          name,
          role,
        });

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
          console.log("SignIn successful, navigating...");
          if (role === "admin") {
            navigate("/userslist");
          } else {
            navigate("/products");
          }
        } else {
          console.log("Authentication failed");
        }
      })
      .catch((error) => {
        console.error("Login error:", error);
      });
  };
  const onRegisterSubmit: SubmitHandler<RegisterInfo> = ({
    name,
    username,
    password,
  }: RegisterInfo) => {
    register({ name, username, password });
  };

  return (
    <div className="mx-auto p-4 wp h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-center mb-8">Welcome Back!</h1>
      <div className="flex flex-col md:flex-row items-start">
        <div className="flex flex-col items-center text-center md:w-1/2 md:pr-4 mb-6 md:mb-0">
          <h2 className="text-lg font-semibold mb-4">Login</h2>
          <LoginForm onSubmit={onLoginSubmit} />
        </div>
        <div className="border-t md:border-l border-gray-400 md:h-[250px] h-[250px] self-center mx-0 md:mx-6"></div>
        <div className="flex flex-col items-center text-center md:w-1/2 md:pl-4 mb-6 md:mb-0">
          <h2 className="text-lg font-semibold mb-4">Register</h2>
          <RegisterForm onSubmit={onRegisterSubmit} />
        </div>
      </div>
    </div>
  );
}

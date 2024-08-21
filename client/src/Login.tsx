import { SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import { axiosInstance } from "./lib/axios";
import { login } from "./api/services/login-service";
import { LoginForm } from "./components/LoginForm";
import { RegisterForm } from "./components/RegisterForm";
import { Separator } from "./components/ui/separator";
import LoginInfo from "./api/models/LoginInfo";
import RegisterInfo from "./api/models/RegisterInfo";
import RegisterService from "./api/services/register-service";
import LoginResponse from "./api/models/LoginResponse";
import { ModeToggle } from "./components/DarkModeToggle";
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
          navigate(role === "admin" ? "/totalProducts" : "/products");
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
    RegisterService({ name, username, password })
      .then(() => {
        console.log("Registration successful!");
      })
      .catch((error) => {
        console.error("Registration error:", error);
      });
  };

  return (
    <div className="relative mx-auto p-8 w-full h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 transition-colors duration-500 ease-in-out">
  <div className="absolute top-4 right-4">
    <ModeToggle />
  </div>
  <div className="text-center mb-12">
    <h1 className="text-5xl font-extrabold text-blue-600 dark:text-blue-400 transition-colors duration-500 ease-in-out">
      Welcome Back!
    </h1>
  </div>
  <div className="flex flex-col md:flex-row items-start w-full max-w-4xl bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 md:p-10 transition-colors duration-500 ease-in-out">
    <div className="flex flex-col items-center text-center md:w-1/2 md:pr-6 mb-8 md:mb-0">
      <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-6 transition-colors duration-500 ease-in-out">
        Login
      </h2>
      <LoginForm onSubmit={onLoginSubmit} />
    </div>

    <Separator orientation="vertical" className="hidden md:block mx-6 transition-colors duration-500 ease-in-out" />

    <div className="flex flex-col items-center text-center md:w-1/2 md:pl-6">
      <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-6 transition-colors duration-500 ease-in-out">
        Register
      </h2>
      <RegisterForm onSubmit={onRegisterSubmit} />
    </div>
  </div>
</div>
  );
}

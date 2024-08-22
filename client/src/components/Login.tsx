import { LoginForm } from "./LoginForm";
import { SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { login } from "../api/services/login-service";
import LoginInfo from "../api/models/LoginInfo";
import LoginResponse from "../api/models/LoginResponse";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import { axiosInstance } from "../lib/axios";

export default function Login() {
  const signIn = useSignIn();
  const navigate = useNavigate();

  const onLoginSubmit: SubmitHandler<LoginInfo> = async ({
    username,
    password,
  }: LoginInfo) => {
    try {
      const response: LoginResponse = await login({ username, password });
      const { jwt, refreshToken, id, name, role } = response;

      console.log("Received login response:", {
        jwt,
        refreshToken,
        id,
        name,
        role,
      });

      const isSignedIn = signIn({
        auth: {
          token: jwt,
          type: "Bearer",
        },
        refresh: refreshToken,
        userState: {
          name,
          id,
          role,
        },
      });

      if (isSignedIn) {
        axiosInstance.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${jwt}`;
        console.log("SignIn successful, navigating...");
        navigate(role === "admin" ? "/totalProducts" : "/products");
      } else {
        console.log("Authentication failed");
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return <LoginForm onSubmit={onLoginSubmit} />;
}

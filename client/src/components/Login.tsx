import { LoginForm } from "./LoginForm";
import { SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { login } from "../api/services/login-service";
import LoginInfo from "../api/models/LoginInfo";
import LoginResponse from "../api/models/LoginResponse";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import { axiosInstance } from "../lib/axios";
import { useToastProvider } from "@/api/context/ToastContext";
import { ToastType } from "@/api/models/ToastContext";

export default function Login() {
  const signIn = useSignIn();
  const navigate = useNavigate();
  const { showMessage } = useToastProvider();

  const onLoginSubmit: SubmitHandler<LoginInfo> = async ({
    username,
    password,
  }: LoginInfo) => {
    try {
      const response: LoginResponse = await login({ username, password });
      const { jwt, refreshToken, id, name, role } = response;

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
        showMessage({
          message: "Login successfully",
          type: ToastType.SUCCESS,
        });
        navigate(role === "admin" ? "/totalUsers" : "/shop");
      } else {
        showMessage({
          message: "Failed to sign in, check your credentials",
          type: ToastType.ERROR,
        });
      }
    } catch {
      showMessage({
        message: "Failed to sign in, check your credentials",
        type: ToastType.ERROR,
      });
    }
  };

  return <LoginForm onSubmit={onLoginSubmit} />;
}

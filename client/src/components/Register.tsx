import { RegisterForm } from "./RegisterForm";
import { SubmitHandler } from "react-hook-form";
import RegisterService from "../api/services/register-service";
import RegisterInfo from "../api/models/RegisterInfo";
import { useNavigate } from "react-router-dom";
import { useToastProvider } from "@/api/context/ToastContext";
import { ToastType } from "@/api/models/ToastContext";

export default function Register() {
  const { showMessage } = useToastProvider();
  const navigate = useNavigate();
  const onRegisterSubmit: SubmitHandler<RegisterInfo> = ({
    name,
    username,
    password,
  }: RegisterInfo) => {
    RegisterService({ name, username, password }).then(
      () => {
        showMessage({
          message: "Registration successful, redirecting...",
          type: ToastType.SUCCESS,
        });
        navigate("/login");
      },
      () => {
        showMessage({
          message: "Registration failed, check credentials",
          type: ToastType.ERROR,
        });
      }
    );
  };

  return <RegisterForm onSubmit={onRegisterSubmit} />;
}

import { RegisterForm } from "./RegisterForm";
import { SubmitHandler } from "react-hook-form";
import RegisterService from "../api/services/register-service";
import RegisterInfo from "../api/models/RegisterInfo";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const onRegisterSubmit: SubmitHandler<RegisterInfo> = ({
    name,
    username,
    password,
  }: RegisterInfo) => {
    RegisterService({ name, username, password }).then(
      (response) => {
        console.log("Registration successful:", response);
        navigate("/login");
      },
      (error) => {
        console.error("Registration error:", error);
      }
    );
  };

  return <RegisterForm onSubmit={onRegisterSubmit} />;
}

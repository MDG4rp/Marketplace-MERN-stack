import register from "./api/services/register-service";
import { useNavigate } from "react-router-dom";
import { SubmitHandler } from "react-hook-form";
import { ProfileForm } from "./components/LoginForm";
import LoginInfo from "./api/models/LoginInfo";
export default function Register() {
  const navigate = useNavigate();

  const onRegisterSubmit: SubmitHandler<LoginInfo> = ({
    username,
    password,
  }: LoginInfo) => {
    register({ username, password });
  };

  return (
    <>
      <ProfileForm onSubmit={onSubmit}></ProfileForm>
    </>
  );
}

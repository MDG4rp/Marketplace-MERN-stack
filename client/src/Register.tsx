import { useState } from "react";
import RegisterInfo from "./api/models/RegisterInfo";
import register from "./api/services/register-service";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [loginInfo, setLoginInfo] = useState<RegisterInfo>({
    username: "",
    password: "",
  });

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await register(loginInfo);
      setLoginInfo({
        username: "",
        password: "",
      });
      navigate("/products");
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-purple-500 to-indigo-600">
      <div className="w-full max-w-md p-8 bg-gray-900 bg-opacity-70 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center text-white mb-6">
          Register
        </h1>
        <form onSubmit={submitForm} className="space-y-4">
          <div>
            <input
              id="username"
              type="text"
              value={loginInfo.username}
              placeholder="username"
              onChange={(e) =>
                setLoginInfo({ ...loginInfo, username: e.target.value })
              }
              className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-white placeholder-gray-400"
            />
          </div>
          <div>
            <input
              id="password"
              type="password"
              value={loginInfo.password}
              placeholder="Password"
              onChange={(e) =>
                setLoginInfo({ ...loginInfo, password: e.target.value })
              }
              className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-white placeholder-gray-400"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

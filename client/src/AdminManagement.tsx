import { getAllUsers } from "./api/services/user-service";
import UserInfo from "./api/models/UserInfo";
import { useState, useEffect } from "react";
import { Button } from "./components/ui/button";
import { useNavigate } from "react-router-dom";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import useSignOut from "react-auth-kit/hooks/useSignOut";
import { DataTableDemo } from "./components/DataTableTest";
type authUser = {
  name: string;
  id: string;
  role: string;
};
export default function AdminManagement(): JSX.Element {
  const [users, setUsers] = useState<UserInfo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const auth = useAuthUser<authUser>();
  const signOut = useSignOut();

  useEffect(() => {
    getAllUsers()
      .then((response) => {
        setUsers(response);
        setLoading(false);
      })
      .catch((error: string) => {
        console.error("Error fetching users:", error);
      });
  }, []);

  const handleLogOut = () => {
    console.log("Logging out...");
    signOut();
    navigate("/");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-2xl font-semibold text-gray-700">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold mb-6 text-gray-800">
            Welcome back admin: {auth?.name}
          </h1>
          <Button onClick={handleLogOut}>Logout</Button>
        </div>
        <DataTableDemo data={users} />
      </div>
    </div>
  );
}

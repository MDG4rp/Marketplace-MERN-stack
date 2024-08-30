import { useEffect, useState } from "react";
import Auth from "@/api/models/Auth";
import { getUser } from "@/api/services/user-service";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import UserInfo from "@/api/models/UserInfo";
import { format } from "date-fns";
import { useToastProvider } from "@/api/context/ToastContext";
import { ToastType } from "@/api/models/ToastContext";
import useSignOut from "react-auth-kit/hooks/useSignOut";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function UserPage() {
  const { showMessage } = useToastProvider();
  const auth = useAuthUser<Auth>();
  const signOut = useSignOut();
  const navigate = useNavigate();
  const [userData, setUserData] = useState<UserInfo>();
  const [loading, setLoading] = useState(true);

  const handleLogout = () => {
    showMessage({
      message: "Logged out successfully",
      type: ToastType.SUCCESS,
    });
    signOut();
    navigate("/login");
  };

  function formatDate(data: string) {
    const date = new Date(data);
    return {
      formattedDate: format(date, "dd MMM yyyy"),
      formattedTime: format(date, "HH:mm"),
    };
  }

  const id = auth?.id || "";

  useEffect(() => {
    setLoading(true);
    getUser(id)
      .then((response) => {
        setUserData(response);
        setLoading(false);
      })
      .catch(() => {
        showMessage({
          message: "Error fetching user data",
          type: ToastType.ERROR,
        });
        setLoading(false);
      });
  }, [id, showMessage]);

  if (loading) return <p className="text-center text-lg text-gray-400">Loading...</p>;

  return (
    <div className="flex flex-col items-center h-full bg-transparent text-gray-900 dark:text-white">
      <header className="w-full">
        <img
          src="https://cdn.pixabay.com/photo/2018/03/20/03/11/northern-lights-3242090_1280.jpg"
          alt="Cover"
          className="w-full h-48 object-cover rounded-b-lg"
        />
      </header>
      <div className="w-36 h-36 -mt-16 rounded-full overflow-hidden border-4 border-green-100 dark:border-emerald-700 bg-green-200 dark:bg-emerald-800">
        <img
          src="https://github.com/shadcn.png"
          alt={userData?.name || "Profile"}
          className="w-full h-full object-cover"
        />
      </div>
      <main className="flex-1 p-6 flex flex-col items-center w-full max-w-md">
        <h1 className="text-4xl font-bold mb-2">{userData?.username}</h1>
        <p className="text-lg mb-4">#{userData?.userID}</p>
        <div className="bg-green-200 dark:bg-emerald-800 p-4 rounded-lg shadow-md w-full">
          <p className="text-sm mb-2">
            <strong>Role:</strong> {userData?.role}
          </p>
          <p className="text-sm mb-2">
            <strong>Created At:</strong>{" "}
            {`${formatDate(userData?.createdAt || "").formattedDate} at ${formatDate(userData?.createdAt || "").formattedTime}`}
          </p>
          <p className="text-sm">
            <strong>Updated At:</strong>{" "}
            {`${formatDate(userData?.updatedAt || "").formattedDate} at ${formatDate(userData?.updatedAt || "").formattedTime}`}
          </p>
        </div>
        <Button
          onClick={handleLogout}
          className="mt-6 bg-green-500 text-white dark:text-white dark:bg-emerald-600 hover:bg-green-600 dark:hover:bg-emerald-700 transition-colors rounded-lg py-2 px-4 text-lg"
        >
          Log Out
        </Button>
      </main>
    </div>
  );
}
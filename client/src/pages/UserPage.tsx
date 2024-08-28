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
  const {showMessage} = useToastProvider();
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

  function formatDate(data:string){
    const date = new Date(data);
    const formattedDate = format(date, "dd MMM yyyy");
    const formattedTime = format(date, "HH:mm");
    return { formattedDate, formattedTime };
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
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="max-w-4xl h-screen mx-auto px-4">
      <div className=" h-48 rounded-xl">
        <img
          src={
            "https://cdn.pixabay.com/photo/2016/11/21/03/56/landscape-1844227_1280.png"
          }
          alt="Cover"
          className="w-full h-full object-cover rounded-2xl"
        />
      </div>
      <div className="-mt-20 space-x-4">
        <div className="w-32 h-32 rounded-full overflow-hidden">
          <img
            src={"https://github.com/shadcn.png"}
            alt={userData?.name || "Profile"}
            className="w-full h-full object-cover"
          />
        </div>

        <div>
          <h1 className="text-3xl font-semibold text-neutral-800 dark:text-white">
            {userData?.name || "User Name"}
          </h1>
          <p className="text-neutral-600 dark:text-gray-200 mt-2">
            <strong>UserID:</strong> {userData?.userID}
          </p>
          <p className="text-neutral-600 dark:text-gray-200 mt-2">
            <strong>Role:</strong> {userData?.role}
          </p>
          <p className="text-neutral-600 dark:text-gray-200 mt-2">
            <strong>Created At:</strong> {`${formatDate(userData?.createdAt || "").formattedDate} at ${formatDate(userData?.createdAt || "").formattedTime}`}
          </p>
          <p className="text-neutral-600 dark:text-gray-200 mt-2">
            <strong>Updated At:</strong> {`${formatDate(userData?.updatedAt || "").formattedDate} at ${formatDate(userData?.updatedAt || "").formattedTime}`}
          </p>
        </div>
      <Button onClick={handleLogout}>Log Out</Button>
      </div>
    </div>
  );
}
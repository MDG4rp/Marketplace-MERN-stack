import { getAllUsers } from "@/api/services/user-service";
import UserInfo from "@/api/models/UserInfo";
import { useState, useEffect } from "react";
import { DataTable } from "@/components/TotalUsersTable";
import { useToastProvider } from "@/api/context/ToastContext";
import { ToastType } from "@/api/models/ToastContext";

export default function AdminManagement(): JSX.Element {
  const { showMessage } = useToastProvider();
  const [users, setUsers] = useState<UserInfo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getAllUsers()
      .then((response) => {
        setUsers(response);
        setLoading(false);
      })
      .catch(() => {
        showMessage({
          message: "Error fetching users",
          type: ToastType.ERROR,
        });
      });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center">
        <div className="text-2xl font-semibold text-gray-800 dark:text-white">
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div className="p-7 mx-8 rounded-lg">
      <div className="p-6 rounded-lg flex flex-col items-center">
        <DataTable data={users} />
      </div>
    </div>
  );
}

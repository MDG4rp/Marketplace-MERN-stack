import { getAllUsers } from "@/api/services/user-service";
import UserInfo from "@/api/models/UserInfo";
import { useState, useEffect } from "react";
import { DataTableDemo } from "@/components/TotalUsersTable";

export default function AdminManagement(): JSX.Element {
  const [users, setUsers] = useState<UserInfo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

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
    <div className="p-7 mx-8 rounded-lg h-screen">
      <div className="p-6 rounded-lg flex flex-col items-center">
        <DataTableDemo data={users} />
      </div>
    </div>
  );
}

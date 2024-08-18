import { getAllUsers } from "./api/services/user-service";
import UserInfo from "./api/models/UserInfo";
import { useState, useEffect } from "react";
import { deleteUser } from "./api/services/user-service";

export default function AdminManagement(): JSX.Element {
  const [users, setUsers] = useState<UserInfo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getAllUsers()
      .then((response) => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch((error:string) => {
        console.error("Error fetching users:", error);
      });
  }, []);

  const handleDeleteUser = (userId: string) => {
    deleteUser(userId)
      .then(() => {
        setUsers(users.filter((user) => user.id !== userId));
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <h1>Admin Management</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.role}</td>
              <td>
                <button onClick={() => handleDeleteUser(user.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
import React from "react";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import UserInfo from "@/api/models/UserInfo";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";

interface AdminTableProps {
    users: UserInfo[];
    onDeleteUser: (userId: string) => void;
}

type authUser = {
    name: string;
    id: string;
    role: string;
};

const UsersListTable: React.FC<AdminTableProps> = ({ users, onDeleteUser }) => {
    const authUser = useAuthUser<authUser>();

    return (
        <div className="overflow-x-auto">
            <Table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden text-center">
                <TableCaption>A list of registered users.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px] py-3 px-4 bg-gray-200 text-gray-600 text-center">ID</TableHead>
                        <TableHead className="py-3 px-4 bg-gray-200 text-gray-600 text-center">Username</TableHead>
                        <TableHead className="py-3 px-4 bg-gray-200 text-gray-600 text-center">Role</TableHead>
                        <TableHead className="py-3 px-4 bg-gray-200 text-gray-600 text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {users.map((user) => (
                        <TableRow key={user._id} className="border-t hover:bg-gray-50">
                            <TableCell className="py-3 px-4 font-medium">{user._id}</TableCell>
                            <TableCell className="py-3 px-4">{user.username}</TableCell>
                            <TableCell className="py-3 px-4">{user.role}</TableCell>
                            <TableCell className="py-3 px-4 text-right">
                                {authUser?.id !== user._id && (
                                    <button
                                        onClick={() => onDeleteUser(user._id)}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        Delete
                                    </button>
                                )}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default UsersListTable;
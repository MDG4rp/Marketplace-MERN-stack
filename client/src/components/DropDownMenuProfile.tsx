import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ProfileAvatar from "./Avatar";
import useSignOut from "react-auth-kit/hooks/useSignOut";
import { Link, useNavigate } from "react-router-dom";
import { ModeToggle } from "./DarkModeToggle";
import { useToastProvider } from "@/api/context/ToastContext";
import { ToastType } from "@/api/models/ToastContext";
import { LogOut, User } from "lucide-react";
export default function DropdownMenuProfile() {
  const { showMessage } = useToastProvider();
  const signOut = useSignOut();
  const navigate = useNavigate();
  const handleLogout = () => {
    showMessage({
      message: "Logged out successfully",
      type: ToastType.SUCCESS,
    });
    signOut();
    navigate("/login");
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="cursor-pointer">
          <ProfileAvatar />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className=" dark:bg-emerald-950 rounded-lg dark:rounded-lg "
      >
        <DropdownMenuLabel className="cursor-default">
          My Account
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Link to={"MyProfile"} >
          <DropdownMenuItem className="cursor-pointer">
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </DropdownMenuItem>
        </Link>
        <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuLabel className="cursor-default">Theme</DropdownMenuLabel>
        <span className="flex justify-center">
          <ModeToggle />
        </span>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

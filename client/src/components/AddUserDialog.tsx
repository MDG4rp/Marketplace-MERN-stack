import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToastProvider } from "@/api/context/ToastContext";
import { ToastType } from "@/api/models/ToastContext";
import RegisterInfo from "@/api/models/RegisterInfo";
import register from "@/api/services/register-service";

interface AddUserDialogProps {
  onUserChange: () => void;
}

export function AdduserDialog({
  onUserChange,
}: AddUserDialogProps) {
  const [name, setName] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { showMessage } = useToastProvider();

  const handleSubmit = async () => {
    try {
      await register({ name, username, password }as RegisterInfo);
      onUserChange();
      showMessage({
        message: "User added successfully",
        type: ToastType.SUCCESS,
      });
      setName("");
      setUsername("")
      setPassword("");
    } catch {
      showMessage({
        message: "Error adding product",
        type: ToastType.ERROR,
      });
      setName("");
      setUsername("");
      setPassword("");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="default"
          className="bg-green-500 text-white dark:bg-green-700 dark:text-white dark:hover:bg-green-900 hover:bg-green-700 dark:hover:text-white"
        >
          Add User
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add a new product to the database.</DialogTitle>
          <DialogDescription>
            Fill in the details to add a new product.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="col-span-3 dark:text-black focus:ring-green-700"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="col-span-3 dark:text-black focus:ring-green-700"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="password" className="text-right">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="col-span-3 dark:text-black focus:ring-green-700"
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose
            onClick={handleSubmit}
            className="bg-green-500 text-white dark:bg-green-700 hover:bg-green-700 dark:hover:bg-green-900 dark:text-white px-4 py-2 rounded-md"
          >
            Add User
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

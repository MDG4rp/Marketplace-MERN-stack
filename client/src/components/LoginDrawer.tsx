import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

export function DrawerAuth() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline" className="text-black dark:text-white">Get Started</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Authentication</DrawerTitle>
            <DrawerDescription>
              Please choose an option to proceed.
            </DrawerDescription>
          </DrawerHeader>
          <div className="p-4">
            <Button 
              onClick={handleLogin} 
              className="w-full mb-4"
            >
              Login
            </Button>
            <Button 
              onClick={handleRegister} 
              className="w-full"
            >
              Register
            </Button>
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline">Close</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
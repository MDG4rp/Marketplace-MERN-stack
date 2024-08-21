import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/api/context/ThemeContext";
import { Switch } from "@/components/ui/switch";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div className="flex items-center">
      <Sun className="h-[1.2rem] w-[1.2rem] text-yellow-500" />
      <Switch
        checked={theme === "dark"}
        onCheckedChange={toggleTheme}
        className="mx-2"
      />
      <Moon className="h-[1.2rem] w-[1.2rem] text-blue-500" />
    </div>
  );
}
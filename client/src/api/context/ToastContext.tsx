import { createContext, useContext, useEffect, useState } from "react";
import {
  ToastContextParams,
  ToastContextType,
  ToastType,
} from "@/api/models/ToastContext";

const ToastContext = createContext<ToastContextType>({
  showMessage: () => {},
});

export const useToastProvider = () => useContext(ToastContext);

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [message, setMessage] = useState<string | React.ReactNode>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isExiting, setIsExiting] = useState<boolean>(false);
  const [type, setType] = useState<ToastType>();

  const showMessage = ({ message, type }: ToastContextParams) => {
    setMessage(message);
    setIsOpen(true);
    setIsExiting(false);
    setType(type);
  };

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (isOpen) {
      timeout = setTimeout(() => {
        setIsExiting(true);
        setTimeout(() => setIsOpen(false), 500);
      }, 4000);
    }
    return () => clearTimeout(timeout);
  }, [isOpen]);

  return (
    <ToastContext.Provider value={{ showMessage }}>
      {children}
      {isOpen && (
        <div
          className={`fixed bottom-4 right-4 py-2 px-4 rounded shadow-lg text-white ${
            type === ToastType.SUCCESS ? "bg-green-600" : "bg-red-600"
          } ${isExiting ? "toast-exit" : "toast-enter"}`}
        >
          {message}
        </div>
      )}
    </ToastContext.Provider>
  );
};

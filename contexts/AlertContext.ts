import { createContext } from "react";

interface AlertContextType {
  message: string;
  setMessage: (message: string) => void;
  visible: boolean;
  setVisible: (visible: boolean) => void;
  messageType: "alert-error" | "alert-info" | "alert-success" | "alert-warning";
  setMessageType: (messageType: "alert-error" | "alert-info" | "alert-success" | "alert-warning")=>void;
}

export const AlertContext = createContext<AlertContextType>({
  message: "",
  setMessage: () => {},
  visible: false,
  setVisible: () => {},
  messageType:  "alert-info",
  setMessageType: ()=> {},
});
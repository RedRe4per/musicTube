import { createContext } from "react";
import { IAlertBox } from "@/interfaces/alertBox";

interface AlertContextType {
  alertBox: IAlertBox;
  setAlertBox: (albumBox: IAlertBox) => void;
}

export const AlertContext = createContext<AlertContextType>({
  alertBox: {
    message: "",
    messageType: "alert-info",
  },
  setAlertBox: () => {},
});

export interface IAlertBox {
  message: string;
  messageType?:
    | "alert-error"
    | "alert-info"
    | "alert-success"
    | "alert-warning";
}

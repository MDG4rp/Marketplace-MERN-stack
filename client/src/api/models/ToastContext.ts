export interface ToastContextParams {
  message: string | React.ReactNode;
  type: ToastType;
}

export interface ToastContextType {
  showMessage: (toastParams: ToastContextParams) => void;
}

export enum ToastType {
  SUCCESS = "success",
  ERROR = "error",
}

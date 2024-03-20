import toast from "react-hot-toast";
import { toastIcons } from "../constants";
import ToastWrapper from "@/components/toast/Toast";

export const throwError = (error: any) => {
  toast.error(
    (t) => (
      <ToastWrapper
        message={
          error?.response?.data?.message ||
          error?.message ||
          "Something went wrong"
        }
        t={t}
      />
    ),
    {
      icon: toastIcons.error
    }
  );
};

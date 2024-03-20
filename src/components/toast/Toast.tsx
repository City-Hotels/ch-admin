import { CloseCircle } from "@/assets/icons/close-circle";
import { toast } from "react-hot-toast";
import type { Toast } from "react-hot-toast";
import styles from "./Toast.module.scss";

const ToastWrapper = ({ message, t }: { message: string; t: Toast }) => {
  return (
    <div className={styles.header}>
      <span
        className={`${styles.span} ${t.type === "success" && "text-green10"} ${
          t.type === "error" && "text-red10"
        } ${t.type === "blank" && "text-yellow10"}`}
      >
        {message}
      </span>
      <span onClick={() => toast.dismiss(t.id)} className="cursor-pointer">
        {CloseCircle}
      </span>
    </div>
  );
};

export default ToastWrapper;

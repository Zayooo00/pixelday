import { useEffect } from "react";
import { FiAlertCircle } from "react-icons/fi";

interface ToastProps {
  message: string;
  type: "success" | "error";
  isVisible: boolean;
  hideToast: () => void;
}

const Toast: React.FC<ToastProps> = ({
  message,
  type,
  isVisible,
  hideToast,
}) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        hideToast();
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [isVisible, hideToast]);

  if (!isVisible) {
    return null;
  }

  return (
    <div
      className={`fixed left-3 top-3 z-[100] m-4 flex rounded p-4 text-white ${
        type === "success" ? "bg-green-500" : "bg-red-500"
      }`}
    >
      <FiAlertCircle className="mr-2 mt-1 text-white" />
      <p>{message}</p>
    </div>
  );
};

export default Toast;

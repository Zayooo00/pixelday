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
      className={`flex fixed top-3 left-3 z-[100] text-white p-4 m-4 rounded ${
        type === "success" ? "bg-green-500" : "bg-red-500"
      }`}
    >
      <FiAlertCircle className="mr-2 mt-1 text-white" />
      <p>{message}</p>
    </div>
  );
};

export default Toast;

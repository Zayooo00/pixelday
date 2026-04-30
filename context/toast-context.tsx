"use client";

import React, { createContext, useState, useContext } from "react";

type ToastContextType = {
  toast: {
    isVisible: boolean;
    message: string;
    type: "success" | "error";
  };
  setToast: React.Dispatch<
    React.SetStateAction<{
      isVisible: boolean;
      message: string;
      type: "success" | "error";
    }>
  >;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [toast, setToast] = useState({
    isVisible: false,
    message: "",
    type: "success" as "success" | "error",
  });

  return (
    <ToastContext.Provider value={{ toast, setToast }}>
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

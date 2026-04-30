"use client";

import React, { createContext, useState, useContext } from "react";

type ListContextType<T> = {
  items: T[];
  setItems: React.Dispatch<React.SetStateAction<T[]>>;
};

export function createListContext<T>(displayName: string) {
  const Context = createContext<ListContextType<T> | undefined>(undefined);
  Context.displayName = displayName;

  const Provider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [items, setItems] = useState<T[]>([]);
    return (
      <Context.Provider value={{ items, setItems }}>
        {children}
      </Context.Provider>
    );
  };

  const useList = () => {
    const ctx = useContext(Context);
    if (ctx === undefined) {
      throw new Error(`use${displayName} must be used within a ${displayName}Provider`);
    }
    return ctx;
  };

  return { Provider, useList };
}

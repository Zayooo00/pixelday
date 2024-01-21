import React, { createContext, useState, useContext } from "react";

import { TQuest } from "@/types/quests";

type QuestContextType = {
  quests: TQuest[];
  setQuests: React.Dispatch<React.SetStateAction<TQuest[]>>;
};

const QuestContext = createContext<QuestContextType | undefined>(undefined);

export const QuestProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [quests, setQuests] = useState<TQuest[]>([]);

  return (
    <QuestContext.Provider value={{ quests, setQuests }}>
      {children}
    </QuestContext.Provider>
  );
};

export const useQuests = () => {
  const context = useContext(QuestContext);
  if (context === undefined) {
    throw new Error("useQuests must be used within a QuestProvider");
  }
  return context;
};

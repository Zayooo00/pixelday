import { Quest } from "@/types/quests";
import { createListContext } from "./create-list-context";

const { Provider: QuestProvider, useList: _useQuests } =
  createListContext<Quest>("Quests");

export { QuestProvider };

export const useQuests = () => {
  const { items: quests, setItems: setQuests } = _useQuests();
  return { quests, setQuests };
};

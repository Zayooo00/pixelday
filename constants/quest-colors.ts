import { TQuestColorType } from "@/types/quests";

export const questColors: { [key: string]: TQuestColorType } = {
  main: {
    active: "border-orange-600 text-stroke-orange",
    complete: "border-red-600 text-stroke-red",
  },
  recurring: {
    active: "border-sky-600 text-stroke-sky",
    complete: "border-red-600 text-stroke-red",
  },
};

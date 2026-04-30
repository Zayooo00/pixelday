import { useState } from "react";
import Image from "next/image";
import { z } from "zod";

import ModalShell from "@/components/common/ModalShell";
import Spinner from "@/components/common/spinner";
import Error from "@/components/common/error";

import { useToast } from "@/context/ToastContext";
import { useQuests } from "@/context/QuestsContext";
import { TCreateQuestModalProps, TQuest } from "@/types/quests";
import { createQuest } from "@/services/quests";
import { QuestSchema } from "@/helpers/createQuestValidator";
import { cn } from "@/helpers/cn";

const QUEST_THEME = {
  main: {
    heading: "Create a new quest",
    inputBorder: "border-red-500 focus:border-red-900",
    button:
      "border-red-900 bg-red-500 text-stroke-red",
  },
  recurring: {
    heading: "Create a new recurring quest",
    inputBorder: "border-rose-400 focus:border-rose-700",
    button:
      "border-rose-900 bg-rose-300 text-stroke-rose",
  },
} as const;

export default function CreateQuestModal({
  isOpen,
  onClose,
  uid,
  questType,
}: TCreateQuestModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [newQuest, setNewQuest] = useState<TQuest>({
    questId: "",
    title: "",
    status: "active",
    uid,
    type: questType,
  });
  const { setQuests } = useQuests();
  const { setToast } = useToast();

  const theme = QUEST_THEME[questType];

  const handleCreateQuest = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const validatedQuest = QuestSchema.parse(newQuest);
      const createdQuest = await createQuest(
        { ...validatedQuest, questId: "" },
        uid,
        questType,
      );

      setQuests((prevQuests) => [...prevQuests, createdQuest]);
      setToast({
        isVisible: true,
        message: "Quest created successfully",
        type: "success",
      });
      onClose();
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors(error.errors.map((err) => err.message));
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <ModalShell
      isOpen={isOpen}
      onClose={onClose}
      background="/assets/images/quest-board.png"
      backgroundAlt="Quest background"
      as="form"
      onSubmit={handleCreateQuest}
    >
      <div className="mt-12 flex w-full flex-col items-center sm:mt-24 md:mt-12">
        <Image
          src="/assets/images/quest.png"
          width={150}
          height={150}
          alt="Quest icon"
          sizes="150px"
        />
        <h1
          className={cn(
            "mt-2 text-4xl text-black",
            questType === "recurring" && "w-60 text-center",
          )}
        >
          {theme.heading}
        </h1>
        <div className="mt-2 w-[60vw] text-left sm:w-[35vw] md:w-[30vw] lg:w-[320px]">
          {errors.map((error, index) => (
            <Error key={index} message={error} />
          ))}
        </div>
        <div className="w-[60vw] sm:w-[35vw] md:w-[30vw] lg:w-[320px]">
          <input
            placeholder="Quest title goes here"
            className={cn(
              "mb-4 mt-4 w-full rounded-md border-2 bg-white bg-opacity-50 p-2 text-xl transition-colors duration-500 focus:outline-none",
              theme.inputBorder,
            )}
            value={newQuest.title}
            onChange={(e) =>
              setNewQuest({ ...newQuest, title: e.target.value })
            }
          />
        </div>
      </div>
      <button
        disabled={isLoading}
        className={cn(
          "w-42 mb-8 transform border-x-4 border-b-8 border-t-4 p-2 px-4 py-1 text-xl transition-transform duration-300 hover:scale-105",
          theme.button,
          "text-amber-50",
          isLoading && "cursor-not-allowed",
        )}
        type="submit"
      >
        {isLoading ? <Spinner /> : "Create quest"}
      </button>
    </ModalShell>
  );
}

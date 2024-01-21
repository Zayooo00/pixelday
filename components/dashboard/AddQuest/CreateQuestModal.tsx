import { useState } from "react";
import Image from "next/image";
import { z } from "zod";

import Modal from "@/components/common/modal";
import Spinner from "@/components/common/spinner";
import Error from "@/components/common/error";

import { useToast } from "@/context/ToastContext";
import { useQuests } from "@/context/QuestsContext";
import { TCreateQuestModalProps, TQuest } from "@/types/quests";
import { createQuest } from "@/services/quests";
import { QuestSchema } from "@/helpers/createQuestValidator";

export default function CreateQuestModal({
  isOpen,
  onClose,
  uid,
}: TCreateQuestModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [newQuest, setNewQuest] = useState<TQuest>({
    questId: "",
    title: "",
    status: "active",
    uid: uid,
    type: "main",
  });
  const { setQuests } = useQuests();
  const [questType] = useState<"main" | "recurring">("main");
  const { setToast } = useToast();

  const handleCreateQuest = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const validatedQuest = QuestSchema.parse(newQuest);
      const createdQuest = await createQuest(
        { ...validatedQuest, questId: "" },
        uid,
        questType
      );
      setIsLoading(false);

      setQuests((prevQuests) => [...prevQuests, createdQuest]);

      setToast({
        isVisible: true,
        message: "Quest created successfully",
        type: "success",
      });
      onClose();
    } catch (error) {
      setIsLoading(false);
      if (error instanceof z.ZodError) {
        setErrors(error.errors.map((err) => err.message));
      }
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <form
          className="-mt-14 relative flex items-center justify-center"
          onSubmit={handleCreateQuest}
        >
          <Image
            src="/assets/images/quest-board.png"
            width={900}
            height={900}
            quality={100}
            alt="Quest background"
          />
          <div className="absolute inset-0 flex flex-col justify-center items-center">
            <div className="flex flex-col items-center w-full mt-12 sm:mt-24 md:mt-12">
              <Image
                src="/assets/images/quest.png"
                width={150}
                height={150}
                quality={100}
                alt="Quest icon"
              />
              <h1 className="text-4xl text-black mt-2">Create a new quest</h1>
              <div className=" mt-2 w-[60vw] sm:w-[35vw] md:w-[30vw] lg:w-[320px] text-left">
                {errors.map((error, index) => (
                  <Error key={index} message={error} />
                ))}
              </div>
              <div className="w-[60vw] sm:w-[35vw] md:w-[30vw] lg:w-[320px]">
                <input
                  placeholder="Quest title goes here"
                  className="w-full border-2 text-xl mt-4 bg-opacity-50 bg-white border-red-500 focus:border-red-900 focus:outline-none p-2 mb-4 rounded-md transition-colors duration-500"
                  value={newQuest.title}
                  onChange={(e) =>
                    setNewQuest({ ...newQuest, title: e.target.value })
                  }
                />
              </div>
            </div>
            <button
              disabled={isLoading}
              className={`px-4 py-1 text-xl mb-8 w-42 p-2 text-amber-50 text-stroke-red transform transition-transform hover:scale-105 duration-300 border-t-4 border-x-4 border-b-8 border-red-900 bg-red-500 ${
                isLoading ? "cursor-not-allowed" : ""
              }`}
              type="submit"
            >
              {isLoading ? <Spinner /> : "Create quest"}
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
}

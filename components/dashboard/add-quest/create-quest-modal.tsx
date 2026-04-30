import Image from "next/image";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import ModalShell from "@/components/common/modal-shell";
import Spinner from "@/components/common/spinner";
import Error from "@/components/common/error";

import { useToast } from "@/context/toast-context";
import { useQuests } from "@/context/quests-context";
import { CreateQuestModalProps } from "@/types/quests";
import { createQuest } from "@/services/quests";
import { cn } from "@/helpers/cn";

const QuestSchema = z.object({
  title: z
    .string()
    .min(1, "Title cannot be empty")
    .max(20, "Title cannot exceed 20 characters")
    .refine((v) => v.trim().length > 0, {
      message: "Title cannot consist of just empty spaces",
    }),
});

type QuestFormData = z.infer<typeof QuestSchema>;

const QUEST_THEME = {
  main: {
    heading: "Create a new quest",
    inputBorder: "border-red-500 focus:border-red-900",
    button: "border-red-900 bg-red-500 text-stroke-red",
  },
  recurring: {
    heading: "Create a new recurring quest",
    inputBorder: "border-rose-400 focus:border-rose-700",
    button: "border-rose-900 bg-rose-300 text-stroke-rose",
  },
} as const;

export default function CreateQuestModal({
  isOpen,
  onClose,
  uid,
  questType,
}: CreateQuestModalProps) {
  const { setQuests } = useQuests();
  const { setToast } = useToast();
  const theme = QUEST_THEME[questType];

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<QuestFormData>({ resolver: zodResolver(QuestSchema) });

  const onSubmit = async ({ title }: QuestFormData) => {
    const createdQuest = await createQuest(
      { title, questId: "", uid, status: "active", type: questType },
      uid,
      questType,
    );
    setQuests((prev) => [...prev, createdQuest]);
    setToast({ isVisible: true, message: "Quest created successfully", type: "success" });
    onClose();
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
      onSubmit={handleSubmit(onSubmit)}
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
          {errors.title && <Error message={errors.title.message ?? ""} />}
        </div>
        <div className="w-[60vw] sm:w-[35vw] md:w-[30vw] lg:w-[320px]">
          <input
            {...register("title")}
            placeholder="Quest title goes here"
            className={cn(
              "mb-4 mt-4 w-full rounded-md border-2 bg-white bg-opacity-50 p-2 text-xl transition-colors duration-500 focus:outline-none",
              theme.inputBorder,
            )}
          />
        </div>
      </div>
      <button
        disabled={isSubmitting}
        className={cn(
          "w-42 mb-8 transform border-x-4 border-b-8 border-t-4 p-2 px-4 py-1 text-xl transition-transform duration-300 hover:scale-105",
          theme.button,
          "text-amber-50",
          isSubmitting && "cursor-not-allowed",
        )}
        type="submit"
      >
        {isSubmitting ? <Spinner /> : "Create quest"}
      </button>
    </ModalShell>
  );
}

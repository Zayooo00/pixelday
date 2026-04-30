import Image from "next/image";
import { useState, useEffect } from "react";

import ModalShell from "@/components/common/modal-shell";
import Spinner from "@/components/common/spinner";

import { PreviewQuestModalProps } from "@/types/quests";
import { deleteQuest, updateQuestStatus } from "@/services/quests";
import { useToast } from "@/context/toast-context";
import { useQuests } from "@/context/quests-context";
import { cn } from "@/helpers/cn";

function getQuestColor(
  status: string | undefined,
  type: string | undefined,
): string {
  if (status === "complete") {
    return "bg-red-500 border-red-600 text-stroke-red";
  }
  if (type === "main") {
    return "bg-orange-500 border-orange-600 text-stroke-orange";
  }
  return "bg-sky-500 border-sky-600 text-stroke-sky";
}

export default function PreviewQuestModal({
  isOpen,
  onClose,
  selectedQuest: initialSelectedQuest,
  onQuestUpdate,
}: PreviewQuestModalProps) {
  const [selectedQuest, setSelectedQuest] = useState(initialSelectedQuest);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const { setToast } = useToast();
  const { setQuests } = useQuests();

  const questColor = getQuestColor(selectedQuest?.status, selectedQuest?.type);

  useEffect(() => {
    setSelectedQuest(initialSelectedQuest);
  }, [initialSelectedQuest]);

  const handleDelete = async () => {
    if (!selectedQuest) {
      return;
    }
    setDeleteLoading(true);
    try {
      await deleteQuest(selectedQuest.questId);
      setQuests((prev) =>
        prev.filter((quest) => quest.questId !== selectedQuest.questId),
      );
      setToast({
        isVisible: true,
        message: "Quest deleted successfully",
        type: "success",
      });
      onClose();
    } catch (error) {
      setToast({
        isVisible: true,
        message: `Error deleting quest: ${(error as Error).message}`,
        type: "error",
      });
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleStatusUpdate = async () => {
    if (!selectedQuest) {
      return;
    }
    setUpdateLoading(true);
    try {
      const newStatus =
        selectedQuest.status === "active" ? "complete" : "active";
      const updatedQuest = await updateQuestStatus(
        selectedQuest.questId,
        newStatus,
      );

      onQuestUpdate(updatedQuest);
      setToast({
        isVisible: true,
        message: `Quest status update successfully to: ${newStatus}`,
        type: "success",
      });
    } catch (error) {
      setToast({
        isVisible: true,
        message: `Error updating quest status: ${(error as Error).message}`,
        type: "error",
      });
    } finally {
      setUpdateLoading(false);
    }
  };

  return (
    <ModalShell
      isOpen={isOpen}
      onClose={onClose}
      background="/assets/images/quest-board.png"
      backgroundAlt="Quest board background"
    >
      <p
        className={cn(
          "absolute right-[10dvw] top-[17rem] rotate-[24deg] transform rounded-lg border-2 bg-opacity-90 px-4 py-1 text-xl sm:right-[13rem] sm:top-[14rem] md:right-[15rem] md:top-[17rem] lg:right-[15rem] lg:top-[17rem] lg:text-3xl",
          questColor,
          "text-white",
        )}
      >
        {selectedQuest?.status}
      </p>
      <div className="absolute inset-0 mt-72 flex flex-col items-center justify-start p-4 text-center sm:mt-56 md:mt-72">
        <h1 className="mb-4 w-[60vw] text-5xl leading-8 text-black sm:w-[35vw] sm:text-4xl md:w-[30vw] md:text-5xl lg:w-[320px] lg:text-6xl">
          {selectedQuest?.title}
        </h1>
        <Image
          src="/assets/images/quest.png"
          width={150}
          height={150}
          alt="Quest icon"
          className="-mt-6"
          sizes="150px"
        />
        <hr
          className={cn(
            "mb-4 w-[300px] border-2 xs:mt-2 sm:w-[200px] md:w-[280px]",
            questColor,
          )}
        />
        <div className="mb-4 flex space-x-4">
          <button
            type="button"
            onClick={handleDelete}
            className="w-42 mb-8 transform border-x-4 border-b-8 border-l-8 border-t-4 border-red-900 bg-red-500 p-2 px-4 py-1 text-xl text-amber-50 transition-transform duration-300 hover:scale-105"
          >
            {deleteLoading ? <Spinner /> : "Delete"}
          </button>
          <button
            type="button"
            onClick={handleStatusUpdate}
            className="w-42 mb-8 transform border-x-4 border-b-8 border-r-8 border-t-4 border-green-900 bg-green-500 p-2 px-4 py-1 text-xl text-amber-50 transition-transform duration-300 hover:scale-105"
          >
            {updateLoading ? <Spinner /> : "Update"}
          </button>
        </div>
      </div>
    </ModalShell>
  );
}

import Image from "next/image";
import { useState, useEffect } from "react";

import Modal from "@/components/common/modal";
import Spinner from "@/components/common/spinner";

import { TPreviewQuestModalProps } from "@/types/quests";
import { deleteQuest, updateQuestStatus } from "@/services/quests";
import { useToast } from "@/context/ToastContext";
import { useQuests } from "@/context/QuestsContext";

export default function PreviewQuestModal({
  isOpen,
  onClose,
  selectedQuest: initialSelectedQuest,
  onQuestUpdate,
}: TPreviewQuestModalProps) {
  const [selectedQuest, setSelectedQuest] = useState(initialSelectedQuest);
  const questColor =
    selectedQuest && selectedQuest.status === "active"
      ? selectedQuest.type === "main"
        ? "bg-orange-500 border-orange-600 text-stroke-orange"
        : "bg-sky-500 border-sky-600 text-stroke-sky"
      : "bg-red-500 border-red-600 text-stroke-red";
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const { setToast } = useToast();
  const { quests, setQuests } = useQuests();

  useEffect(() => {
    setSelectedQuest(initialSelectedQuest);
  }, [initialSelectedQuest]);

  const handleDelete = async () => {
    setDeleteLoading(true);
    if (selectedQuest) {
      try {
        await deleteQuest(selectedQuest.questId);

        setQuests(
          quests.filter((quest) => quest.questId !== selectedQuest.questId),
        );
        setToast({
          isVisible: true,
          message: "Quest deleted successfully",
          type: "success",
        });
        setDeleteLoading(false);
        onClose();
      } catch (error) {
        setToast({
          isVisible: true,
          message: `Error deleting quest: ${(error as Error).message}`,
          type: "error",
        });
        setDeleteLoading(false);
      }
    }
  };

  const handleStatusUpdate = async () => {
    setUpdateLoading(true);
    if (selectedQuest) {
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
        setUpdateLoading(false);
      } catch (error) {
        setToast({
          isVisible: true,
          message: `Error updating quest status: ${(error as Error).message}`,
          type: "error",
        });
        setUpdateLoading(false);
      }
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="relative -mt-14 flex items-center justify-center">
        <p
          className={`absolute right-[10dvw] top-[17rem] rounded-lg border-2 bg-opacity-90 px-4 py-1 text-xl text-white sm:right-[13rem] sm:top-[14rem] md:right-[15rem] md:top-[17rem] lg:right-[15rem] lg:top-[17rem] lg:text-3xl ${questColor} rotate-[24deg] transform`}
        >
          {selectedQuest?.status}
        </p>
        <Image
          src="/assets/images/quest-board.png"
          width={900}
          height={900}
          quality={100}
          alt="Note background"
        />
        <div className="absolute inset-0 mt-72 flex flex-col items-center justify-start p-4 text-center sm:mt-56 md:mt-72">
          <h1 className="mb-4 w-[60vw] text-5xl leading-8 text-black sm:w-[35vw] sm:text-4xl md:w-[30vw] md:text-5xl lg:w-[320px] lg:text-6xl">
            {selectedQuest?.title}
          </h1>
          <Image
            src="/assets/images/quest.png"
            width={150}
            height={150}
            quality={100}
            alt="Quest icon"
            className="-mt-6"
          />
          <hr
            className={`w-[300px] border-2 xs:mt-2 sm:w-[200px] md:w-[280px] ${questColor} mb-4`}
          />
          <div className="mb-4 flex space-x-4">
            <button
              onClick={handleDelete}
              className="w-42 mb-8 transform border-x-4 border-b-8 border-l-8 border-t-4 border-red-900 bg-red-500 p-2 px-4 py-1 text-xl text-amber-50 transition-transform duration-300 hover:scale-105"
            >
              {deleteLoading ? <Spinner /> : "Delete"}
            </button>
            <button
              onClick={handleStatusUpdate}
              className="w-42 mb-8 transform border-x-4 border-b-8 border-r-8 border-t-4 border-green-900 bg-green-500 p-2 px-4 py-1 text-xl text-amber-50 transition-transform duration-300 hover:scale-105"
            >
              {updateLoading ? <Spinner /> : "Update"}
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}

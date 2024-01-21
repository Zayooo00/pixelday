import Image from "next/image";
import { useState, useEffect } from "react";

import Modal from "@/components/common/modal";
import Spinner from "@/components/common/spinner";

import { TPreviewQuestModalProps } from "@/types/quests";
import { questColors } from "@/constants/questColors";
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
  const questColor = selectedQuest
    ? questColors[selectedQuest.type][selectedQuest.status]
    : "";
  const colorName = questColor.split("-")[1];
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
          quests.filter((quest) => quest.questId !== selectedQuest.questId)
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
          newStatus
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
          className={`absolute top-[17rem] right-[10dvw] sm:right-[13rem] sm:top-[14rem] md:right-[15rem] md:top-[17rem] lg:top-[17rem] lg:right-[15rem] bg-opacity-90 text-xl lg:text-3xl px-4 py-1 rounded-lg border-2 text-white bg-${colorName}-500 ${questColor} transform rotate-[24deg]`}
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
        <div className="absolute inset-0 flex flex-col justify-start items-center text-center mt-72 sm:mt-56 md:mt-72 p-4">
          <h1 className="w-[60vw] sm:w-[35vw] md:w-[30vw] lg:w-[320px] text-5xl sm:text-4xl md:text-5xl lg:text-6xl leading-8 text-black mb-4">
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
            className={`xs:mt-2 w-[300px] sm:w-[200px] md:w-280px] border-2 ${questColor} mb-4`}
          />
          <div className="flex space-x-4 mb-4">
            <button
              onClick={handleDelete}
              className="px-4 py-1 text-xl mb-8 w-42 p-2 text-amber-50 transform transition-transform hover:scale-105 duration-300 border-t-4 border-x-4 border-b-8 border-l-8 border-red-900 bg-red-500"
            >
              {deleteLoading ? <Spinner /> : "Delete"}
            </button>
            <button
              onClick={handleStatusUpdate}
              className="px-4 py-1 text-xl mb-8 w-42 p-2 text-amber-50 transform transition-transform hover:scale-105 duration-300 border-t-4 border-x-4 border-b-8 border-r-8 border-green-900 bg-green-500"
            >
              {updateLoading ? <Spinner /> : "Update"}
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}

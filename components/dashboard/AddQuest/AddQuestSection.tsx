import { useState } from "react";
import { GiJusticeStar } from "react-icons/gi";

import { TUserInfo } from "@/types/users";

import CreateQuestModal from "./CreateQuestModal";
import CreateRecurringQuestModal from "./CreateRecurringQuestModal";

export default function AddQuestSection({
  currentUser,
}: {
  currentUser: TUserInfo;
}) {
  const [isQuestModalOpen, setIsQuestModalOpen] = useState(false);
  const [isRecurringQuestModalOpen, setIsRecurringQuestModalOpen] =
    useState(false);

  return (
    <>
      <div className="mt-[44px] flex items-center border-x-[10px] border-t-[10px] border-red-900 bg-amber-50 p-2 md:mt-[58px] lg:-mt-[30px]">
        <GiJusticeStar className="mr-2 border-2 border-red-900 bg-white text-3xl text-red-900" />
        <h1 className="w-full border-2 border-red-900 bg-white pl-2 text-xl text-red-900">
          Add quests
        </h1>
      </div>
      <div className="flex h-3/4 flex-col items-center justify-center space-y-2 border-[10px] border-red-900 bg-amber-50 lg:h-[200px]">
        <button className="w-4/5 transform border-x-4 border-b-8 border-t-4 border-red-900 bg-red-500 p-2 text-2xl text-amber-50 transition-transform duration-300 hover:scale-105">
          <h1
            className="text-md text-stroke-red lg:text-[1.2dvw] xl:text-2xl"
            onClick={() => setIsQuestModalOpen(true)}
          >
            Add Quest
          </h1>
        </button>
        <button className="w-4/5 transform border-x-4 border-b-8 border-t-4 border-rose-900 bg-rose-300 p-2 text-2xl text-amber-50 transition-transform duration-300 hover:scale-105">
          <h1
            className="text-md text-stroke-rose lg:text-[1.2dvw] xl:text-2xl"
            onClick={() => setIsRecurringQuestModalOpen(true)}
          >
            Add Recurring Quest
          </h1>
        </button>
      </div>
      {isQuestModalOpen && (
        <CreateQuestModal
          isOpen={isQuestModalOpen}
          onClose={() => setIsQuestModalOpen(false)}
          uid={currentUser.uid}
        />
      )}
      {isRecurringQuestModalOpen && (
        <CreateRecurringQuestModal
          isOpen={isRecurringQuestModalOpen}
          onClose={() => setIsRecurringQuestModalOpen(false)}
          uid={currentUser.uid}
        />
      )}
    </>
  );
}

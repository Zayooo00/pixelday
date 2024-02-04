import { GiJusticeStar } from "react-icons/gi";
import { ImPlus } from "react-icons/im";
import { useState } from "react";

import { TUserInfo } from "@/types/users";

import WeekPlan from "./WeekPlan";
import CreateTaskModal from "./CreateTaskModal";

export default function WeekSection({
  currentUser,
}: {
  currentUser: TUserInfo;
}) {
  const [isCreateTaskModalOpen, setIsCreateTaskModalOpen] = useState(false);

  return (
    <>
      <div className="mt-[44px] flex items-center border-x-[10px] border-t-[10px] border-red-900 bg-amber-50 p-2 md:mt-[51px] lg:-mt-[72px]">
        <GiJusticeStar className="mr-2 border-2 border-red-900 bg-white text-3xl text-red-900" />
        <div className="flex w-full items-center justify-between border-2 border-red-900 bg-white pl-2">
          <h1 className="text-xl text-red-900">Your week plan</h1>
          <button
            className="duration-600 mr-1 rounded-full p-1 transition-colors hover:bg-rose-200"
            title="Create a new task"
            onClick={() => setIsCreateTaskModalOpen(true)}
          >
            <ImPlus className="text-red-700" />
          </button>
        </div>
      </div>
      <WeekPlan uid={currentUser.uid} />
      {isCreateTaskModalOpen && (
        <CreateTaskModal
          isOpen={isCreateTaskModalOpen}
          onClose={() => setIsCreateTaskModalOpen(false)}
          uid={currentUser.uid}
        />
      )}
    </>
  );
}

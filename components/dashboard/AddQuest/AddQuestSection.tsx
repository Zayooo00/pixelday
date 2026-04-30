import { useState } from "react";

import SectionHeader from "@/components/common/SectionHeader";

import { TUserInfo } from "@/types/users";
import { TQuestType } from "@/types/quests";

import CreateQuestModal from "./CreateQuestModal";

const QUEST_BUTTONS: {
  type: TQuestType;
  label: string;
  className: string;
}[] = [
  {
    type: "main",
    label: "Add Quest",
    className: "border-red-900 bg-red-500 text-stroke-red",
  },
  {
    type: "recurring",
    label: "Add Recurring Quest",
    className: "border-rose-900 bg-rose-300 text-stroke-rose",
  },
];

export default function AddQuestSection({
  currentUser,
}: {
  currentUser: TUserInfo;
}) {
  const [openType, setOpenType] = useState<TQuestType | null>(null);

  return (
    <>
      <SectionHeader
        title="Add quests"
        className="mt-[44px] md:mt-[58px] lg:-mt-[30px]"
      />
      <div className="flex h-3/4 flex-col items-center justify-center space-y-2 border-[10px] border-red-900 bg-amber-50 lg:h-[200px]">
        {QUEST_BUTTONS.map(({ type, label, className }) => (
          <button
            key={type}
            type="button"
            onClick={() => setOpenType(type)}
            className={`w-4/5 transform border-x-4 border-b-8 border-t-4 p-2 text-2xl text-amber-50 transition-transform duration-300 hover:scale-105 ${className}`}
          >
            <h1 className="text-md lg:text-[1.2dvw] xl:text-2xl">{label}</h1>
          </button>
        ))}
      </div>
      {openType && (
        <CreateQuestModal
          isOpen={openType !== null}
          onClose={() => setOpenType(null)}
          uid={currentUser.uid}
          questType={openType}
        />
      )}
    </>
  );
}

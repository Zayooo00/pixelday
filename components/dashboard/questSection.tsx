import { GiJusticeStar } from "react-icons/gi";

export default function QuestSection() {
  return (
    <>
      <div className="flex items-center border-x-[10px] border-t-[10px] p-2 border-red-900 bg-amber-50">
        <GiJusticeStar className="text-red-900 text-3xl mr-2 border-2 border-red-900 bg-white" />
        <h1 className="text-xl text-red-900 w-full pl-2 border-2 border-red-900 bg-white">
          Quests
        </h1>
      </div>
      <div className="h-full p-4 border-[10px] border-red-900 bg-amber-50">
        <h1>Quests</h1>
      </div>
    </>
  );
}

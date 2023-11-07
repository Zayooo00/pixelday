import { GiJusticeStar } from "react-icons/gi";

export default function AddQuestSection() {
  return (
    <>
      <div className="flex items-center-x-[10px] border-x-[10px] border-t-[10px] p-2  mt-4 border-red-900 bg-amber-50 border">
        <GiJusticeStar className="text-red-900 text-3xl mr-2 border-2 border-red-900 bg-white" />
        <h1 className="text-xl text-red-900 border-2  w-full pl-2 border-red-900 bg-white">
          Add Quests
        </h1>
      </div>
      <div className="flex flex-col items-center justify-center h-1/3 lg:p-4 space-y-2 border-[10px] border-red-900 bg-amber-50">
        <button className="p-2 text-amber-50 text-2xl w-4/5 transform transition-transform hover:scale-105 duration-300 transition- border-t-4 border-x-4 border-b-8 border-red-900 bg-red-500">
          <h1 className="text-sm lg:text-2xl text-stroke-red">Add Quest</h1>
        </button>
        <button className="p-2 text-amber-50 text-2xl w-4/5 transform transition-transform hover:scale-105 duration-300 border-t-4 border-x-4 border-b-8 border-rose-900 bg-rose-300">
          <h1 className="text-sm lg:text-2xl text-stroke-rose">Add Recurring Quest</h1>
        </button>
      </div>
    </>
  );
}

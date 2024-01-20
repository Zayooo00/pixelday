import { GiJusticeStar } from "react-icons/gi";

export default function AddQuestSection() {
  return (
    <>
      <div className="mt-[44px] md:mt-[58px] lg:-mt-[20px] flex items-center border-x-[10px] border-t-[10px] p-2 border-red-900 bg-amber-50">
        <GiJusticeStar className="text-red-900 text-3xl mr-2 border-2 border-red-900 bg-white" />
        <h1 className="text-xl text-red-900 w-full pl-2 border-2 border-red-900 bg-white">
          Add quests
        </h1>
      </div>
      <div className="flex flex-col items-center justify-center h-3/4 lg:h-[200px] space-y-2 border-[10px] border-red-900 bg-amber-50">
        <button className="p-2 text-amber-50 text-2xl w-4/5 transform transition-transform hover:scale-105 duration-300 border-t-4 border-x-4 border-b-8 border-red-900 bg-red-500">
          <h1 className="text-md lg:text-[1.2dvw] xl:text-2xl text-stroke-red">
            Add Quest
          </h1>
        </button>
        <button className="p-2 text-amber-50 text-2xl w-4/5 transform transition-transform hover:scale-105 duration-300 border-t-4 border-x-4 border-b-8 border-rose-900 bg-rose-300">
          <h1 className="text-md lg:text-[1.2dvw] xl:text-2xl text-stroke-rose">
            Add Recurring Quest
          </h1>
        </button>
      </div>
    </>
  );
}

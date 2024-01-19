import { GiJusticeStar } from "react-icons/gi";

import { Quest } from "./Quest";

const quests = {
  main: [{ title: "Walk 20 KM", type: "main" }],
  daily: [
    { title: "Groceries", type: "daily" },
    { title: "Gym", type: "daily" },
    { title: "Gaming", type: "daily" },
    { title: "Gym", type: "daily" },
  ],
};

export default function QuestSection() {
  return (
    <>
      <div className="flex items-center border-x-[10px] border-t-[10px] p-2 border-red-900 bg-amber-50">
        <GiJusticeStar className="text-red-900 text-3xl mr-2 border-2 border-red-900 bg-white" />
        <h1 className="text-xl text-red-900 w-full pl-2 border-2 border-red-900 bg-white">
          Quests
        </h1>
      </div>
      <div className="h-full p-2 px-6 border-[10px] border-red-900 bg-amber-50">
        <h1 className="mb-2 text-2xl text-red-900">Main Quest</h1>
        {quests.main.map((quest, index) => (
          <Quest key={index} title={quest.title} type={quest.type} />
        ))}
        <h1 className="mb-2 text-2xl text-red-900 mt-4">Daily Quest</h1>
        {quests.daily.map((quest, index) => (
          <Quest key={index} title={quest.title} type={quest.type} />
        ))}
      </div>
    </>
  );
}

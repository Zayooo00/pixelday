import { GiJusticeStar } from "react-icons/gi";
import { ImPlus } from "react-icons/im";

type Quest = {
  title: string;
  color: string;
};

const quests = {
  main: [{ title: "Walk 20 KM", color: "red" }],
  daily: [
    { title: "Groceries", color: "blue" },
    { title: "Gym", color: "blue" },
  ],
};

const questTypeColors: { [key: string]: string } = {
  red: "border-red-300 text-stroke-red",
  blue: "border-blue-300 text-stroke-blue",
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
          <Quest key={index} title={quest.title} color={quest.color} />
        ))}
        <h1 className="mb-2 text-2xl text-red-900 mt-4">Daily Quest</h1>
        {quests.daily.map((quest, index) => (
          <Quest key={index} title={quest.title} color={quest.color} />
        ))}
      </div>
    </>
  );
}

function Quest({ title, color }: Quest) {
  return (
    <div
      className={`w-full h-20 my-4 rounded-md border-4 ${questTypeColors[color]} bg-white flex items-center justify-center transform transition-transform hover:animate-card-bounce`}
    >
      <p className={`text-[26px] text-stroke-${color} text-white`}>{title}</p>
      <div
        className={`absolute -top-[64px] -left-[20px] rounded-sm w-20 h-16 border-r-[8px] rotate-45 ${questTypeColors[color]} transform origin-top-left`}
      />
      <div
        className={`absolute top-7 left-5 rounded-full border-2 w-4 h-4 ${questTypeColors[color]}`}
      />
      <div
        className={`absolute top-7 right-5 rounded-full border-2 w-4 h-4 ${questTypeColors[color]}`}
      />
      <div
        className={`absolute bottom-[38px] -right-[9px] rounded-sm w-20 h-16 border-r-[8px] rotate-[225deg] ${questTypeColors[color]} transform origin-bottom-right`}
      />
    </div>
  );
}
{
  /* <div className="w-full h-20 rounded-md  border-4 border-blue-300 bg-white flex items-center justify-center transform transition-transform hover:scale-105 duration-300">
          <ImPlus className="text-5xl text-sky-400 p-2 border-4 rounded-md border-blue-300" />
          <div className="absolute -top-[64px] -left-[20px] rounded-sm w-20 h-16 border-r-[8px] rotate-45 border-sky-400 transform origin-top-left" />
          <div className="absolute top-7 left-5 rounded-full border-2 w-4 h-4 border-blue-400" />
          <div className="absolute top-7 right-5 rounded-full border-2 w-4 h-4 border-blue-400" />
          <div className="absolute bottom-[38px] -right-[9px] rounded-sm w-20 h-16 border-r-[8px] rotate-[225deg] border-sky-400 transform origin-bottom-right" />
        </div> */
}

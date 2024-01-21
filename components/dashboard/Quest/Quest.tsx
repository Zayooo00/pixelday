import { questColors } from "@/constants/questColors";
import { TQuestProps } from "@/types/quests";

export default function Quest({ title, type, status }: TQuestProps) {
  const color = questColors[type][status];

  return (
    <div
      className={`cursor-pointer w-full h-20 my-4 rounded-md border-4 ${color} bg-white flex items-center justify-center transform transition-transform hover:animate-card-bounce`}
    >
      <p
        className={`mx-10 text-center text-xl sm:text-[26px] lg:text-[1.4dvw] text-white ${color}`}
      >
        {title}
      </p>
      <div className="absolute -top-[64px] -left-[20px] rounded-sm w-20 h-16 border-r-[8px] rotate-45 border-slate-200 transform origin-top-left opacity-75" />
      <div
        className={`absolute top-7 left-5 rounded-full border-2 w-4 h-4 ${color}`}
      />
      <div
        className={`absolute top-7 right-5 rounded-full border-2 w-4 h-4 ${color}`}
      />
      <div className="absolute bottom-[38px] -right-[9px] rounded-sm w-20 h-16 border-r-[8px] rotate-[225deg] border-slate-200 transform origin-bottom-right opacity-75" />
    </div>
  );
}

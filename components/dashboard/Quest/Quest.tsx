import { questColors } from "@/constants/questColors";
import { TQuestProps } from "@/types/quests";

export default function Quest({ title, type, status }: TQuestProps) {
  const color = questColors[type][status];

  return (
    <div
      className={`my-4 h-20 w-full cursor-pointer rounded-md border-4 ${color} flex transform items-center justify-center bg-white transition-transform hover:animate-card-bounce`}
    >
      <p
        className={`mx-10 text-center text-xl text-white sm:text-[26px] lg:text-[1.4dvw] ${color}`}
      >
        {title}
      </p>
      <div className="absolute -left-[20px] -top-[64px] h-16 w-20 origin-top-left rotate-45 transform rounded-sm border-r-[8px] border-slate-200 opacity-75" />
      <div
        className={`absolute left-5 top-7 h-4 w-4 rounded-full border-2 ${color}`}
      />
      <div
        className={`absolute right-5 top-7 h-4 w-4 rounded-full border-2 ${color}`}
      />
      <div className="absolute -right-[9px] bottom-[38px] h-16 w-20 origin-bottom-right rotate-[225deg] transform rounded-sm border-r-[8px] border-slate-200 opacity-75" />
    </div>
  );
}

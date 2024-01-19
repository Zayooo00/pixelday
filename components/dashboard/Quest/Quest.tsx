import { TQuest } from "@/types/quests";

export function Quest({ title, type }: TQuest) {
  const questTypeColors: { [key: string]: string } = {
    main: "border-orange-600 text-stroke-orange",
    daily: "border-sky-600 text-stroke-sky",
  };

  return (
    <div
      className={`w-full h-20 my-4 rounded-md border-4 ${questTypeColors[type]} bg-white flex items-center justify-center transform transition-transform hover:animate-card-bounce`}
    >
      <p className={`text-[26px] text-white ${questTypeColors[type]}`}>
        {title}
      </p>
      <div className="absolute -top-[64px] -left-[20px] rounded-sm w-20 h-16 border-r-[8px] rotate-45 border-slate-200 transform origin-top-left opacity-75" />
      <div
        className={`absolute top-7 left-5 rounded-full border-2 w-4 h-4 ${questTypeColors[type]}`}
      />
      <div
        className={`absolute top-7 right-5 rounded-full border-2 w-4 h-4 ${questTypeColors[type]}`}
      />
      <div className="absolute bottom-[38px] -right-[9px] rounded-sm w-20 h-16 border-r-[8px] rotate-[225deg] border-slate-200 transform origin-bottom-right opacity-75" />
    </div>
  );
}

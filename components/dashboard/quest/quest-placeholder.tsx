export function QuestPlaceholder() {
  const color = "border-gray-300";

  return (
    <div className="my-4 flex h-20 w-full transform animate-pulse cursor-pointer items-center justify-center rounded-md border-t-2 border-l-2 border-r-4 border-b-4 border-gray-300 bg-white">
      <div className="mx-10 w-40 rounded-lg bg-gray-300" />
      <div className="absolute -left-[20px] -top-[64px] h-16 w-20 origin-top-left rotate-45 transform rounded-sm border-r-[8px] border-slate-200 opacity-75" />
      <div className="absolute left-5 top-7 h-4 w-4 rounded-full border-2 border-gray-300" />
      <div className="absolute right-5 top-7 h-4 w-4 rounded-full border-2 border-gray-300" />
      <div className="absolute -right-[9px] bottom-[38px] h-16 w-20 origin-bottom-right rotate-[225deg] transform rounded-sm border-r-[8px] border-slate-200 opacity-75" />
    </div>
  );
}

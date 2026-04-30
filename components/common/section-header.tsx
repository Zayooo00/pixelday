import { GiJusticeStar } from "react-icons/gi";

import { cn } from "@/helpers/cn";

type SectionHeaderProps = {
  title: React.ReactNode;
  className?: string;
  action?: React.ReactNode;
};

export default function SectionHeader({
  title,
  className,
  action,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "flex items-center border-x-[10px] border-t-[10px] border-red-900 bg-amber-50 p-2",
        className,
      )}
    >
      <GiJusticeStar className="mr-2 border-2 border-red-900 bg-white text-3xl text-red-900" />
      <div className="flex w-full items-center justify-between border-2 border-red-900 bg-white pl-2">
        <h1 className="text-xl text-red-900">{title}</h1>
        {action}
      </div>
    </div>
  );
}

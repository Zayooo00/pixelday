import { GiJusticeStar } from "react-icons/gi";

export default function WeekSection() {
  const weekDays = {
    Monday: "bg-red-500",
    Tuesday: "bg-cyan-500",
    Wednesday: "bg-emerald-400",
    Thursday: "bg-sky-500",
    Friday: "bg-lime-400",
    Saturday: "bg-teal-500",
    Sunday: "bg-rose-500",
  };

  return (
    <>
      <div className="mt-[44px] flex items-center border-x-[10px] border-t-[10px] border-red-900 bg-amber-50 p-2 md:mt-[51px] lg:-mt-[68px]">
        <GiJusticeStar className="mr-2 border-2 border-red-900 bg-white text-3xl text-red-900" />
        <h1 className="w-full border-2 border-red-900 bg-white pl-2 text-xl text-red-900">
          Plan your week
        </h1>
      </div>
      <div className="grid grid-cols-7 gap-4 border-[10px] border-red-900 bg-amber-50 p-4 lg:h-[105.75%]">
        {Object.entries(weekDays).map(([day, colorClass], index) => (
          <div key={index} className="flex flex-col items-center">
            <div
              className={`${colorClass} mt-2 h-[300px] w-full p-2 lg:h-full`}
            >
              <b>Day {index + 1}</b>
            </div>
            <h2 className="lg:text-md sm:text-xs md:text-sm xl:text-xl">
              {day}
            </h2>
          </div>
        ))}
      </div>
    </>
  );
}

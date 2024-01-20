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
      <div className="mt-[44px] md:mt-[51px] lg:-mt-[68px] flex items-center border-x-[10px] border-t-[10px] p-2 border-red-900 bg-amber-50">
        <GiJusticeStar className="text-red-900 text-3xl mr-2 border-2 border-red-900 bg-white" />
        <h1 className="text-xl text-red-900 w-full pl-2 border-2 border-red-900 bg-white">
          Plan your week
        </h1>
      </div>
      <div className="p-4 lg:h-[105.75%] border-[10px] border-red-900 bg-amber-50 grid grid-cols-7 gap-4">
        {Object.entries(weekDays).map(([day, colorClass], index) => (
          <div key={index} className="flex flex-col items-center">
            <div
              className={`${colorClass} h-[300px] lg:h-full w-full mt-2 p-2`}
            >
              <b>Day {index + 1}</b>
            </div>
            <h2 className="sm:text-xs md:text-sm lg:text-md xl:text-xl">
              {day}
            </h2>
          </div>
        ))}
      </div>
    </>
  );
}

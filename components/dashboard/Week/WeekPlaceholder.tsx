export default function WeekPlaceholder() {
  return (
    <div className="grid grid-cols-3 grid-rows-2 gap-4 overflow-x-hidden overflow-y-scroll border-[10px] border-red-900 bg-amber-50 p-4 sm:grid-cols-6 sm:grid-rows-1 lg:h-[486.44px] ">
      {Array(6)
        .fill(0)
        .map((_, index) => (
          <div key={index} className="flex flex-col items-center animate-pulse">
            <div className="h-[300px] bg-gray-300 w-full border-2 border-gray-300 border-opacity-40 p-2 shadow-lg lg:h-full">
              <div className="-m-2 mb-3 p-4 bg-gray-400 bg-opacity-40 text-center text-lg text-white" />
            </div>
            <div className="mt-2 px-12 py-3 bg-gray-300" />
          </div>
        ))}
    </div>
  );
}

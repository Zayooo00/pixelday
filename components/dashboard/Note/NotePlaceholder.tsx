export const NotePlaceholder = () => (
  <div className="group relative mx-auto mb-4 flex h-full w-full cursor-pointer items-center justify-center border-2 border-gray-300 p-4 shadow-md lg:max-w-full">
    <div className="absolute -left-0 -top-[23.25px] h-8 w-8 origin-top-left rotate-45 transform border-r-2 border-gray-300" />
    <div className="mr-4 hidden flex-shrink-0 lg:block">
      <div className="h-16 w-16 animate-pulse bg-gray-300" />
    </div>
    <div className="flex-grow">
      <div className="mb-2 h-4 w-3/4 animate-pulse bg-gray-300"></div>
      <div className="h-3 w-1/2 animate-pulse bg-gray-300"></div>
    </div>
    <span className="absolute bottom-[-0.5rem] left-2 h-2 w-full scale-y-100 transform rounded-l-sm bg-red-700" />
    <span className="absolute right-[-0.5rem] top-2 h-full w-2 scale-x-100 transform rounded-r-sm bg-red-700" />
  </div>
);

import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-20 text-center">
      <h1 className="title-text-stroke text-9xl font-bold text-white">
        Pixel Day
      </h1>
      <div className="mt-6 flex">
        <Link
          href="/sign-in"
          className="group relative m-4 transform rounded-md border-4 border-solid border-red-700 bg-white px-2 py-3 text-2xl text-red-700 transition-transform duration-500 hover:scale-110 sm:px-10"
        >
          Sign In
          <span className="absolute bottom-[-0.5rem] left-2 h-2 w-full scale-y-0 transform rounded-l-sm bg-red-700 transition-transform duration-500 group-hover:scale-y-100"></span>
          <span className="absolute right-[-0.5rem] top-2 h-full w-2 scale-x-0 transform rounded-r-sm bg-red-700 transition-transform duration-500 group-hover:scale-x-100"></span>
        </Link>
        <Link
          href="/sign-up"
          className="group relative m-4 transform rounded-md border-4 border-solid border-red-700 bg-white px-2 py-3 text-2xl text-red-700 transition-transform duration-500 hover:scale-110 sm:px-10"
        >
          Sign Up
          <span className="absolute bottom-[-0.5rem] left-2 h-2 w-full scale-y-0 transform rounded-l-sm bg-red-700 transition-transform duration-500 group-hover:scale-y-100"></span>
          <span className="absolute right-[-0.5rem] top-2 h-full w-2 scale-x-0 transform rounded-r-sm bg-red-700 transition-transform duration-500 group-hover:scale-x-100"></span>
        </Link>
      </div>
    </main>
  );
}

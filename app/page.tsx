import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center flex-1 px-20 text-center">
      <h1 className="text-9xl font-bold text-white title-text-stroke">Pixel Day</h1>
      <div className="flex mt-6">
        <Link
          href="/sign-in"
          className="px-2 sm:px-10 py-3 m-4 text-2xl text-red-700 bg-white rounded-md border-solid border-4 border-red-700 transform transition-transform duration-500 hover:scale-110 relative group"
        >
          Sign In
          <span className="absolute bottom-[-0.5rem] left-2 w-full h-2 transform scale-y-0 bg-red-700 transition-transform duration-500 group-hover:scale-y-100 rounded-l-sm"></span>
          <span className="absolute top-2 right-[-0.5rem] h-full w-2 transform scale-x-0 bg-red-700 transition-transform duration-500 group-hover:scale-x-100 rounded-r-sm"></span>
        </Link>
        <Link
          href="/sign-up"
          className="px-2 sm:px-10 py-3 m-4 text-2xl text-red-700 bg-white rounded-md border-solid border-4 border-red-700 transform transition-transform duration-500 hover:scale-110 relative group"
        >
          Sign Up
          <span className="absolute bottom-[-0.5rem] left-2 w-full h-2 transform scale-y-0 bg-red-700 transition-transform duration-500 group-hover:scale-y-100 rounded-l-sm"></span>
          <span className="absolute top-2 right-[-0.5rem] h-full w-2 transform scale-x-0 bg-red-700 transition-transform duration-500 group-hover:scale-x-100 rounded-r-sm"></span>
        </Link>
      </div>
    </main>
  );
}

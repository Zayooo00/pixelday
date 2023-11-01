import Link from "next/link";

export default function SignIn() {
  return (
    <main className="flex flex-col items-center justify-center flex-1 px-20 text-center">
      <Link href={"/"} className="-mt-52">
        <h1 className="text-6xl sm:text-8xl font-bold text-white text-stroke">
          Pixel Day
        </h1>
      </Link>
      <div className="flex flex-col items-center mt-16">
        <label className="flex items-center mb-4">
          <span className="w-32 text-left text-2xl text-white">Username:</span>
          <input
            className="px-2 py-1 w-36 sm:w-48 text-xl border-solid border-2 border-yellow-600 focus:border-yellow-700 focus:outline-none"
            type="text"
            name="name"
            placeholder="Enter username"
          />
        </label>
        <label className="flex items-center">
          <span className="w-32 text-left text-2xl text-white">Password:</span>
          <input
            type="password"
            className="px-2 py-1 w-36 sm:w-48 text-xl border-solid border-2 border-yellow-600 focus:border-yellow-700 focus:outline-none"
            placeholder="********"
          />
        </label>
        <button
          onClick={""}
          className="px-4 py-1 mt-6 text-xl text-yellow-700 bg-white rounded-md border-solid border-4 border-yellow-700 transform transition-transform duration-500 hover:scale-110 relative group"
        >
          Sign In
          <span className="absolute bottom-[-0.5rem] left-2 w-full h-2 transform scale-y-0 bg-yellow-700 transition-transform duration-500 group-hover:scale-y-100 rounded-l-sm"></span>
          <span className="absolute top-2 right-[-0.5rem] h-full w-2 transform scale-x-0 bg-yellow-700 transition-transform duration-500 group-hover:scale-x-100 rounded-r-sm"></span>
        </button>
        <p className="mt-3 text-xl text-white inline">
          Don&apos;t have an account?{" "}
          <Link href="/sign-up">
            <strong>Sign up</strong>
          </Link>
        </p>
      </div>
    </main>
  );
}

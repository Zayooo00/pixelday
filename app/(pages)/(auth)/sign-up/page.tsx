"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { updateProfile } from "firebase/auth";

import Spinner from "@/components/spinner";

import { SignUpSchema } from "@/helpers/signUpValidator";
import { createUserDocument } from "@/services/users";
import { auth, createUserWithEmailAndPassword } from "@/firebase/firebase";

export default function SignUp() {
  const [user, setUser] = useState({ email: "", username: "", password: "" });
  const [error, setError] = useState("");
  const [isAuthLoading, setIsAuthLoading] = useState(false);
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAuthLoading(true);
    try {
      SignUpSchema.parse(user);
  
      const { user: newUser } = await createUserWithEmailAndPassword(auth, user.email, user.password);
  
      await updateProfile(newUser, { displayName: user.username });
  
      await createUserDocument(newUser.uid, { displayName: user.username, email: user.email });
  
      router.push("/dashboard");
    } catch (error: unknown) {
      if (error instanceof Error && "errors" in error) {
        setError((error as any).errors[0].message);
      } else if (error instanceof Error) {
        setError(error.message);
      }
    } finally {
      setIsAuthLoading(false);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center flex-1 px-20 text-center">
      <Link href={"/"} className="-mt-16 sm:-mt-52">
        <h1 className="text-6xl sm:text-8xl font-bold text-white title-text-stroke">
          Pixel Day
        </h1>
      </Link>
      <div className="flex flex-col items-center mt-16">
        {error && (
          <p className="text-xl rounded-sm -mt-10 mb-3 px-2 bg-white text-red-500">
            {error}
          </p>
        )}
        <label className="flex items-center mb-4">
          <span className="w-32 text-left text-2xl text-white">Email:</span>
          <input
            className="px-2 py-1 w-36 sm:w-48 text-xl border-solid border-2 border-red-600 focus:border-red-700 focus:outline-none"
            type="text"
            name="name"
            placeholder="Enter email"
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
        </label>
        <label className="flex items-center mb-4">
          <span className="w-32 text-left text-2xl text-white">Username:</span>
          <input
            className="px-2 py-1 w-36 sm:w-48 text-xl border-solid border-2 border-red-600 focus:border-red-700 focus:outline-none"
            type="text"
            name="name"
            placeholder="Enter username"
            onChange={(e) => setUser({ ...user, username: e.target.value })}
          />
        </label>
        <label className="flex items-center">
          <span className="w-32 text-left text-2xl text-white">Password:</span>
          <input
            type="password"
            className="px-2 py-1 w-36 sm:w-48 text-xl border-solid border-2 border-red-600 focus:border-red-700 focus:outline-none"
            placeholder="********"
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
        </label>
        <button
          className="px-4 py-1 mt-6 text-xl text-red-700 bg-white rounded-md border-solid border-4 border-red-700 transform transition-transform duration-500 hover:scale-110 relative group"
          onClick={handleSignUp}
        >
          {isAuthLoading ? <Spinner/> : "Sign Up"}
          <span className="absolute bottom-[-0.5rem] left-2 w-full h-2 transform scale-y-0 bg-red-700 transition-transform duration-500 group-hover:scale-y-100 rounded-l-sm"/>
          <span className="absolute top-2 right-[-0.5rem] h-full w-2 transform scale-x-0 bg-red-700 transition-transform duration-500 group-hover:scale-x-100 rounded-r-sm"/>
        </button>
        <p className="mt-3 text-xl text-white inline">
          Already have an acccount?{" "}
          <Link href="/sign-in">
            <strong>Sign in</strong>
          </Link>
        </p>
      </div>
    </main>
  );
}

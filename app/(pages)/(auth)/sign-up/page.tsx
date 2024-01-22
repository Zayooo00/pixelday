"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { updateProfile } from "firebase/auth";

import Spinner from "@/components/common/spinner";

import { SignUpSchema } from "@/helpers/signUpValidator";
import { createUserDocument } from "@/services/users";
import { auth, createUserWithEmailAndPassword } from "@/firebase/firebase";
import { ERROR_EMAIL_ALREADY_IN_USE } from "@/constants/firebaseErrorCodes";

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

      const { user: newUser } = await createUserWithEmailAndPassword(
        auth,
        user.email,
        user.password,
      );

      await updateProfile(newUser, { displayName: user.username });

      await createUserDocument(newUser.uid, {
        displayName: user.username,
        email: user.email,
      });

      router.push("/dashboard");
    } catch (error) {
      const { code, message } = error as { code?: string; message: string };

      if (code === ERROR_EMAIL_ALREADY_IN_USE) {
        setError("Email is already in use.");
      } else if (message) {
        const parsedError = JSON.parse(message);
        setError(parsedError[0].message);
      } else {
        setError(message);
      }
    } finally {
      setIsAuthLoading(false);
    }
  };

  return (
    <main className="flex flex-1 flex-col items-center justify-center px-20 text-center">
      <Link href={"/"} className="-mt-16 sm:-mt-52">
        <h1 className="title-text-stroke text-6xl font-bold text-white sm:text-8xl">
          Pixel Day
        </h1>
      </Link>
      <form
        onSubmit={handleSignUp}
        className="mt-16 flex flex-col items-center"
      >
        {error && (
          <p className="-mt-10 mb-3 rounded-sm bg-white px-2 text-xl text-red-500">
            {error}
          </p>
        )}
        <label className="mb-4 flex items-center">
          <span className="w-32 text-left text-2xl text-white">Email:</span>
          <input
            className="w-36 border-2 border-solid border-red-600 px-2 py-1 text-xl focus:border-red-700 focus:outline-none sm:w-48"
            type="text"
            name="name"
            placeholder="Enter email"
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
        </label>
        <label className="mb-4 flex items-center">
          <span className="w-32 text-left text-2xl text-white">Username:</span>
          <input
            className="w-36 border-2 border-solid border-red-600 px-2 py-1 text-xl focus:border-red-700 focus:outline-none sm:w-48"
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
            className="w-36 border-2 border-solid border-red-600 px-2 py-1 text-xl focus:border-red-700 focus:outline-none sm:w-48"
            placeholder="********"
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
        </label>
        <button
          className="group relative mt-6 transform rounded-md border-4 border-solid border-red-700 bg-white px-4 py-1 text-xl text-red-700 transition-transform duration-500 hover:scale-110"
          onClick={handleSignUp}
        >
          {isAuthLoading ? <Spinner /> : "Sign Up"}
          <span className="absolute bottom-[-0.5rem] left-2 h-2 w-full scale-y-0 transform rounded-l-sm bg-red-700 transition-transform duration-500 group-hover:scale-y-100" />
          <span className="absolute right-[-0.5rem] top-2 h-full w-2 scale-x-0 transform rounded-r-sm bg-red-700 transition-transform duration-500 group-hover:scale-x-100" />
        </button>
        <p className="mt-3 inline text-xl text-white">
          Already have an acccount?{" "}
          <Link href="/sign-in">
            <strong>Sign in</strong>
          </Link>
        </p>
      </form>
    </main>
  );
}

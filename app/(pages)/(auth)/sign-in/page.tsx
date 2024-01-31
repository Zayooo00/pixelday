"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { FaGoogle } from "react-icons/fa";

import Spinner from "@/components/common/spinner";

import { auth, googleProvider } from "@/firebase/firebase";
import {
  ERROR_INVALID_EMAIL,
  ERROR_WRONG_PASSWORD,
  ERROR_USER_NOT_FOUND,
  ERROR_MISSING_PASSWORD,
  ERROR_NETWORK_REQUEST_FAILED,
  ERROR_POPUP_CLOSED,
} from "@/constants/firebaseErrorCodes";

export default function SignIn() {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [isAuthLoading, setIsAuthLoading] = useState(false);
  const [isGoogleAuthLoading, setIsGoogleAuthLoading] = useState(false);
  const router = useRouter();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAuthLoading(true);
    try {
      await signInWithEmailAndPassword(
        auth,
        credentials.email,
        credentials.password,
      );
      router.push("/dashboard");
    } catch (error) {
      const { code, message } = error as FirebaseError;
      setError(message);
      if (code === ERROR_INVALID_EMAIL || code === ERROR_WRONG_PASSWORD) {
        setError("The email address or password you entered is invalid");
      } else if (code === ERROR_USER_NOT_FOUND) {
        setError("The email address you entered was not found");
      } else if (code === ERROR_MISSING_PASSWORD) {
        setError("Password is missing");
      } else if (code === ERROR_NETWORK_REQUEST_FAILED) {
        setError("No network, check your connection and try again");
      }
    } finally {
      setIsAuthLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsGoogleAuthLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
      router.push("/dashboard");
    } catch (error) {
      const { code } = error as FirebaseError;
      if (code === ERROR_POPUP_CLOSED) {
        setError("Popup has been closed by the user");
      }
    } finally {
      setIsGoogleAuthLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <main className="flex flex-1 flex-col items-center justify-center px-20 text-center">
      <Link href={"/"} className="-mt-16 sm:-mt-52">
        <h1 className="md-title-text-stroke sm:title-text-stroke text-6xl font-bold text-white sm:text-8xl">
          Pixel Day
        </h1>
      </Link>
      <form
        onSubmit={handleSignIn}
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
            name="email"
            onChange={handleChange}
            placeholder="Enter email"
          />
        </label>
        <label className="flex items-center">
          <span className="w-32 text-left text-2xl text-white">Password:</span>
          <input
            type="password"
            name="password"
            className="w-36 border-2 border-solid border-red-600 px-2 py-1 text-xl focus:border-red-700 focus:outline-none sm:w-48"
            onChange={handleChange}
            placeholder="********"
          />
        </label>
        <div className="flex items-center justify-center gap-4">
          <button
            type="submit"
            disabled={!credentials.email || !credentials.password}
            className={`group relative mt-6 transform rounded-md border-4 border-solid border-red-700 bg-white px-4 py-1 text-xl text-red-700 transition-transform duration-500 hover:scale-110 ${
              !credentials.email || !credentials.password
                ? "cursor-not-allowed"
                : ""
            }`}
          >
            {isAuthLoading ? <Spinner /> : "Sign In"}
            <span className="absolute bottom-[-0.5rem] left-2 h-2 w-full scale-y-0 transform rounded-l-sm bg-red-700 transition-transform duration-500 group-hover:scale-y-100" />
            <span className="absolute right-[-0.5rem] top-2 h-full w-2 scale-x-0 transform rounded-r-sm bg-red-700 transition-transform duration-500 group-hover:scale-x-100" />
          </button>
          <button
            type="button"
            className="group relative mt-6 flex transform items-center rounded-md border-4 border-solid border-red-700 bg-white px-4 py-1 text-xl text-red-700 transition-transform duration-500 hover:scale-110"
            onClick={handleGoogleSignIn}
          >
            {isGoogleAuthLoading ? (
              <Spinner />
            ) : (
              <>
                <FaGoogle
                  alt="Google sign in button"
                  className="mr-1 text-red-700"
                />{" "}
                <span>Google</span>
                <span className="absolute bottom-[-0.5rem] left-2 h-2 w-full scale-y-0 transform rounded-l-sm bg-red-700 transition-transform duration-500 group-hover:scale-y-100" />
                <span className="absolute right-[-0.5rem] top-2 h-full w-2 scale-x-0 transform rounded-r-sm bg-red-700 transition-transform duration-500 group-hover:scale-x-100" />
              </>
            )}
          </button>
        </div>
        <p className="mt-3 inline text-xl text-white">
          Don&apos;t have an account?{" "}
          <Link href="/sign-up">
            <strong>Sign up</strong>
          </Link>
        </p>
      </form>
    </main>
  );
}

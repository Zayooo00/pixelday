"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { FaGoogle } from "react-icons/fa";

import Spinner from "@/components/Spinner";

import { auth, googleProvider } from "@/firebase/firebase";
import {
  ERROR_INVALID_EMAIL,
  ERROR_WRONG_PASSWORD,
  ERROR_USER_NOT_FOUND,
  ERROR_MISSING_PASSWORD,
  ERROR_NETWORK_REQUEST_FAILED,
  ERROR_POPUP_CLOSED,
} from "@/firebase/firebaseErrorCodes";

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
        credentials.password
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
    <main className="flex flex-col items-center justify-center flex-1 px-20 text-center">
      <Link href={"/"} className="-mt-16 sm:-mt-52">
        <h1 className="text-6xl sm:text-8xl font-bold text-white title-text-stroke">
          Pixel Day
        </h1>
      </Link>
      <form
        onSubmit={handleSignIn}
        className="flex flex-col items-center mt-16"
      >
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
            className="px-2 py-1 w-36 sm:w-48 text-xl border-solid border-2 border-red-600 focus:border-red-700 focus:outline-none"
            onChange={handleChange}
            placeholder="********"
          />
        </label>
        <div className="flex items-center justify-center gap-4">
          <button
            type="submit"
            disabled={!credentials.email || !credentials.password}
            className={`px-4 py-1 mt-6 text-xl text-red-700 bg-white rounded-md border-solid border-4 border-red-700 transform transition-transform duration-500 hover:scale-110 relative group ${
              !credentials.email || !credentials.password
                ? "cursor-not-allowed"
                : ""
            }`}
          >
            {isAuthLoading ? <Spinner /> : "Sign In"}
            <span className="absolute bottom-[-0.5rem] left-2 w-full h-2 transform scale-y-0 bg-red-700 transition-transform duration-500 group-hover:scale-y-100 rounded-l-sm" />
            <span className="absolute top-2 right-[-0.5rem] h-full w-2 transform scale-x-0 bg-red-700 transition-transform duration-500 group-hover:scale-x-100 rounded-r-sm" />
          </button>
          <button
            type="button"
            className="px-4 py-1 mt-6 text-xl text-red-700 bg-white rounded-md border-solid border-4 border-red-700 transform transition-transform duration-500 hover:scale-110 relative group flex items-center"
            onClick={handleGoogleSignIn}
          >
            {isGoogleAuthLoading ? (
              <Spinner />
            ) : (
              <>
                <FaGoogle
                  alt="Google sign in button"
                  className="text-red-700 mr-1"
                />{" "}
                <span>Google</span>
                <span className="absolute bottom-[-0.5rem] left-2 w-full h-2 transform scale-y-0 bg-red-700 transition-transform duration-500 group-hover:scale-y-100 rounded-l-sm" />
                <span className="absolute top-2 right-[-0.5rem] h-full w-2 transform scale-x-0 bg-red-700 transition-transform duration-500 group-hover:scale-x-100 rounded-r-sm" />
              </>
            )}
          </button>
        </div>
        <p className="mt-3 text-xl text-white inline">
          Don&apos;t have an account?{" "}
          <Link href="/sign-up">
            <strong>Sign up</strong>
          </Link>
        </p>
      </form>
    </main>
  );
}

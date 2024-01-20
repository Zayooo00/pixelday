"use client";

import { GiJusticeStar } from "react-icons/gi";
import { useRouter } from "next/navigation";
import { BiLogOut } from "react-icons/bi";

import DateDisplay from "@/components/dateDisplay";

import { auth } from "@/firebase/firebase";
import { TUserInfo } from "@/types/users";

export default function WelcomeSection({
  currentUser,
}: {
  currentUser: TUserInfo;
}) {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await auth.signOut();
      router.push("/");
    } catch (error) {}
  };

  return (
    <>
      <div className="flex items-center justify-between border-x-[10px] border-t-[10px] p-2 border-red-900 bg-amber-50">
        <GiJusticeStar className="text-red-900 text-3xl mr-2 border-2 border-red-900 bg-white" />
        <h1 className="flex justify-between items-center text-xl text-red-900 w-full pl-2 border-2 border-red-900 bg-white">
          <span>
            Welcome again,{" "}
            <strong>
              {currentUser ? currentUser.currentUser?.displayName : "Guest"}
            </strong>
          </span>
          <button
            className="mr-1 p-0.5 hover:bg-rose-200 transition-colors duration-600 rounded-full"
            onClick={handleLogout}
          >
            <BiLogOut className="text-red-700" />
          </button>
        </h1>
      </div>
      <div className="h-24 p-4 border-[10px] border-red-900 bg-amber-50">
        <DateDisplay />
      </div>
    </>
  );
}

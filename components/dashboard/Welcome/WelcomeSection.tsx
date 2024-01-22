"use client";

import { GiJusticeStar } from "react-icons/gi";
import { useRouter } from "next/navigation";
import { BiLogOut } from "react-icons/bi";

import DateDisplay from "@/components/common/dateDisplay";

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
      <div className="flex items-center justify-between border-x-[10px] border-t-[10px] border-red-900 bg-amber-50 p-2">
        <GiJusticeStar className="mr-2 border-2 border-red-900 bg-white text-3xl text-red-900" />
        <h1 className="flex w-full items-center justify-between border-2 border-red-900 bg-white pl-2 text-xl text-red-900">
          <span>
            Welcome again,{" "}
            <strong>
              {currentUser ? currentUser.currentUser?.displayName : "Guest"}
            </strong>
          </span>
          <button
            className="duration-600 mr-1 rounded-full p-0.5 transition-colors hover:bg-rose-200"
            onClick={handleLogout}
            title="Logout"
          >
            <BiLogOut className="text-red-700" />
          </button>
        </h1>
      </div>
      <div className="h-24 border-[10px] border-red-900 bg-amber-50 p-4">
        <DateDisplay />
      </div>
    </>
  );
}

"use client";

import { useRouter } from "next/navigation";
import { BiLogOut } from "react-icons/bi";

import SectionHeader from "@/components/common/section-header";
import DateDisplay from "@/components/common/date-display";

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
    } catch {}
  };

  return (
    <>
      <SectionHeader
        title={
          <>
            Welcome again,{" "}
            <strong>
              {currentUser ? currentUser.currentUser?.displayName : "Guest"}
            </strong>
          </>
        }
        action={
          <button
            type="button"
            className="duration-600 mr-1 rounded-full p-0.5 transition-colors hover:bg-rose-200"
            onClick={handleLogout}
            title="Logout"
          >
            <BiLogOut className="text-red-700" />
          </button>
        }
      />
      <div className="h-24 border-[10px] border-red-900 bg-amber-50 p-4">
        <DateDisplay />
      </div>
    </>
  );
}

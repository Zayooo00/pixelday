"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useEffect } from "react";

import NoteSection from "@/components/dashboard/Note/NoteSection";
import AddQuestSection from "@/components/dashboard/AddQuest/AddQuestSection";
import WelcomeSection from "@/components/dashboard/Welcome/WelcomeSection";
import WeekSection from "@/components/dashboard/Week/WeekSection";
import QuestSection from "@/components/dashboard/Quest/QuestSection";
import Toast from "@/components/common/toast";

import { TUserInfo } from "@/types/users";
import { auth } from "@/firebase/firebase";
import { QuestProvider } from "@/context/QuestsContext";
import { useToast } from "@/context/ToastContext";

export default function Dashboard() {
  const [currentUser, setCurrentUser] = useState<TUserInfo>({
    currentUser: null,
    uid: "",
  });
  const router = useRouter();
  const { toast, setToast } = useToast();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser({ currentUser: user, uid: user.uid });
      } else {
        router.push("/sign-in");
      }
    });

    return () => unsubscribe();
  }, [router]);

  return (
    <QuestProvider>
      <div className="grid-rows-10 md:grid-rows-10 my-4 grid w-11/12 grid-cols-1 gap-y-4 md:grid-cols-2 md:gap-x-4 lg:my-20 lg:grid-cols-4 lg:grid-rows-3">
        <Toast
          message={toast.message}
          type={toast.type}
          isVisible={toast.isVisible}
          hideToast={() => setToast((prev) => ({ ...prev, isVisible: false }))}
        />
        <div className="col-span-1 col-start-1 row-span-1 row-start-1 md:col-span-2 md:col-start-1 md:-mr-4 lg:col-start-2 lg:-mr-0">
          <WelcomeSection currentUser={currentUser} />
        </div>
        <div className="col-span-1 col-start-1 row-span-2 row-start-2 md:row-start-2 lg:row-start-1">
          <NoteSection currentUser={currentUser} />
        </div>
        <div className="row-start-9 col-span-2 col-start-1 row-span-2 md:col-start-1 md:row-start-6 md:-mr-4 lg:col-start-2 lg:row-start-2 lg:-mr-0">
          <WeekSection />
        </div>
        <div className="col-span-1 col-start-1 row-span-2 row-start-4 md:col-span-2 md:col-start-2 md:row-start-2 lg:col-start-4 lg:row-span-4 lg:row-start-1">
          <QuestSection currentUser={currentUser} />
        </div>
        <div className="col-span-1 col-start-1 row-span-2 row-start-7 md:col-span-2 md:row-start-4 md:-mr-4 lg:col-span-1 lg:col-start-1 lg:row-start-3 lg:-mr-0">
          <AddQuestSection currentUser={currentUser} />
        </div>
      </div>
    </QuestProvider>
  );
}

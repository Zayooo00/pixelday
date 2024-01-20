"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useEffect } from "react";
import Image from "next/image";

import NoteSection from "@/components/dashboard/Note/NoteSection";
import AddQuestSection from "@/components/dashboard/AddQuest/AddQuestSection";
import WelcomeSection from "@/components/dashboard/Welcome/WelcomeSection";
import WeekSection from "@/components/dashboard/Week/WeekSection";
import QuestSection from "@/components/dashboard/Quest/QuestSection";
import Modal from "@/components/modal";

import { TNoteType } from "@/types/notes";
import { TUserInfo } from "@/types/users";
import { auth } from "@/firebase/firebase";

export default function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState<TNoteType | null>(null);
  const [currentUser, setCurrentUser] = useState<TUserInfo>({
    currentUser: null,
    uid: "",
  });
  const router = useRouter();

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

  const handleNoteClick = (note: TNoteType) => {
    setSelectedNote(note);
    setIsModalOpen(true);
  };

  return (
    <div className="gap-y-4 md:gap-x-4 w-11/12 my-4 lg:my-20 grid grid-cols-1 grid-rows-10 md:grid-cols-2 md:grid-rows-10 lg:grid-cols-4 lg:grid-rows-3">
      <div className="col-span-1 row-span-1 row-start-1 col-start-1 md:col-start-1 lg:col-start-2 md:col-span-2 md:-mr-4 lg:-mr-0">
        <WelcomeSection currentUser={currentUser} />
      </div>
      <div className="col-span-1 row-span-2 row-start-2 col-start-1 md:row-start-2 lg:row-start-1">
        <NoteSection onNoteClick={handleNoteClick} currentUser={currentUser} />
      </div>
      <div className="col-span-2 row-span-2 row-start-9 col-start-1 md:col-start-1 md:row-start-6 lg:col-start-2 lg:row-start-2 md:-mr-4 lg:-mr-0">
        <WeekSection />
      </div>
      <div className="col-span-1 row-span-2 row-start-4 col-start-1 md:col-start-2 md:row-start-2 md:col-span-2 lg:col-start-4 lg:row-start-1 lg:row-span-4">
        <QuestSection />
      </div>
      <div className="col-span-1 row-span-2 row-start-7 col-start-1 md:col-span-2 md:row-start-4 lg:col-start-1 lg:col-span-1 lg:row-start-3 md:-mr-4 lg:-mr-0">
        <AddQuestSection />
      </div>
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <div className="relative">
            <Image
              src="/assets/images/note-bg.png"
              width={800}
              height={800}
              sizes="(max-width: 768px) 100vw, 33vw"
              alt="Note background"
            />
            <div className="absolute inset-0 flex flex-col justify-start items-center text-center mt-2 xs:mt-16 p-4">
              <h1 className="text-4xl xs:text-7xl leading-8 text-black mb-4">
                {selectedNote?.title}
              </h1>
              <hr className="xs:mt-2 w-3/5 border-t-2 border-red-600 mb-4" />
              <p className="w-44 xs:w-64 text-md xs:text-xl break-words text-black">
                {selectedNote?.content}
              </p>
            </div>
            <AiOutlineClose
              className="absolute top-8 xs:top-10 right-8 text-xl xs:text-3xl cursor-pointer rounded-sm text-black hover:bg-gray-300 transition-colors duration-600"
              onClick={() => setIsModalOpen(false)}
            />
          </div>
        </Modal>
      )}
    </div>
  );
}

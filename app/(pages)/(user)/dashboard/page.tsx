"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { auth } from "@/firebase/firebase";
import { AiOutlineClose } from "react-icons/ai";
import Image from "next/image";

import NoteSection from "@/components/dashboard/noteSection";
import AddQuestSection from "@/components/dashboard/addQuestSection";
import WelcomeSection from "@/components/dashboard/welcomeSection";
import WeekSection from "@/components/dashboard/weekSection";
import QuestSection from "@/components/dashboard/questSection";
import Modal from "@/components/modal";

type Note = {
  title: string;
  content: string;
};

export default function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const router = useRouter();

  const signOut = async () => {
    try {
      await auth.signOut();
      router.push("/");
    } catch (error) {}
  };

  const handleNoteClick = (note: Note) => {
    setSelectedNote(note);
    setIsModalOpen(true);
  };

  return (
    <div className="flex flex-col sm:flex-row h-[calc(100dvh)] w-11/12 my-32 gap-4">
    <div className="order-3 sm:order-1 flex flex-col w-full sm:w-1/4">
      <NoteSection onNoteClick={handleNoteClick} />
      <AddQuestSection />
    </div>
    <div className="order-1 sm:order-2 flex flex-col w-full mt-4 sm:mt-0 sm:w-2/4">
      <WelcomeSection />
      <WeekSection />
    </div>
    <div className="order-2 sm:order-3 flex flex-col w-full sm:w-1/4">
      <QuestSection />
    </div>
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <div className="relative">
            <Image
              src="/note-bg.png"
              objectFit="cover"
              width={800}
              height={800}
              sizes="(max-width: 768px) 100vw, 33vw"
              quality={100}
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

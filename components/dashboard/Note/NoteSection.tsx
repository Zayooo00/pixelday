"use client";

import Image from "next/image";
import { GiJusticeStar } from "react-icons/gi";
import { useEffect, useState } from "react";
import { ImPlus } from "react-icons/im";

import NoteModal from "@/components/dashboard/Note/NoteModal";

import { TNoteType } from "@/types/notes";
import { TUserInfo } from "@/types/users";
import { getUserNotes } from "@/services/notes";

type NoteClickHandler = (note: TNoteType) => void;

export default function NoteSection({
  currentUser,
  onNoteClick,
}: {
  currentUser: TUserInfo;
  onNoteClick: NoteClickHandler;
}) {
  const [notes, setNotes] = useState<TNoteType[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleNoteAdded = (note: any) => {
    setNotes((prevNotes) => [...prevNotes, note]);
  };

  useEffect(() => {
    const fetchNotes = async () => {
      if (currentUser) {
        const notes = await getUserNotes(currentUser.uid);
        setNotes(notes);
      }
    };

    fetchNotes();
  }, [currentUser]);

  const colors = ["bg-red-500", "bg-emerald-500", "bg-rose-400"];

  return (
    <>
      <div className="flex items-center border-x-[10px] border-t-[10px] p-2 border-red-900 bg-amber-50">
        <GiJusticeStar className="text-red-900 text-3xl mr-2 border-2 border-red-900 bg-white" />
        <div className="flex items-center justify-between w-full pl-2 border-2 border-red-900 bg-white">
          <h1 className="text-xl text-red-900">Your notes</h1>
          <button
            className="mr-1 p-1 hover:bg-rose-200 transition-colors duration-600 rounded-full"
            onClick={() => setIsModalOpen(true)}
          >
            <ImPlus className="text-red-700" />
          </button>
        </div>
      </div>
      <div className="h-[382px] lg:h-2/3 xl:h-[382px] border-[10px] border-red-900 bg-amber-50 overflow-y-auto">
        <div className="-mb-0.5">
          <div className="w-full h-full pt-2 pl-2 pr-[13px] xl:block xl:flex-col lg:grid lg:grid-cols-2 gap-4">
            {notes.map((note, index) => (
              <div
                key={index}
                onClick={() => onNoteClick(note)}
                className={`cursor-pointer relative p-4 mb-4 w-full h-full mx-auto ${
                  colors[index % colors.length]
                } shadow-md flex items-center justify-center border-2 border-red-900 group lg:max-w-full hover:animate-card-bounce`}
              >
                <div className="absolute -top-[23.25px] -left-0 w-8 h-8 border-r-2 rotate-45 border-red-900 transform origin-top-left" />
                <div className="flex-shrink-0 lg:block hidden mr-4">
                  <Image
                    className="xl:block hidden"
                    width={48}
                    height={48}
                    src="/assets/images/app-icon.png"
                    alt="Note icon"
                  />
                </div>
                <div className="flex-grow">
                  <div className="text-xl lg:-ml-[15px] xl:-ml-0 font-medium text-white xl:text-left text-center">
                    {note.title}
                  </div>
                  <p className="xl:block hidden break-words text-gray-200">
                    {note.content}
                  </p>
                </div>
                <span className="absolute bottom-[-0.5rem] left-2 w-full h-2 transform scale-y-100 bg-red-700 rounded-l-sm" />
                <span className="absolute top-2 right-[-0.5rem] h-full w-2 transform scale-x-100 bg-red-700 rounded-r-sm" />
              </div>
            ))}
          </div>
        </div>
      </div>
      {isModalOpen && (
        <NoteModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onNoteAdded={handleNoteAdded}
          uid={currentUser.uid}
        />
      )}
    </>
  );
}

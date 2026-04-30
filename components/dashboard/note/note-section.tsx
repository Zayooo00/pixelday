"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import SectionHeader from "@/components/common/section-header";
import AddButton from "@/components/common/add-button";

import CreateNoteModal from "./create-note-modal";
import PreviewNoteModal from "./preview-note-modal";
import { NotePlaceholder } from "./note-placeholder";

import { getUserNotes } from "@/services/notes";
import { TNote } from "@/types/notes";
import { TUserInfo } from "@/types/users";

const NOTE_COLORS = ["bg-red-500", "bg-emerald-500", "bg-rose-400"];

export default function NoteSection({
  currentUser,
}: {
  currentUser: TUserInfo;
}) {
  const [notes, setNotes] = useState<TNote[]>([]);
  const [selectedNote, setSelectedNote] = useState<TNote | null>(null);
  const [isCreateNoteModalOpen, setIsCreateNoteModalOpen] = useState(false);
  const [isPreviewNoteModalOpen, setIsPreviewNoteModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      if (!currentUser.uid) {
        return;
      }
      setIsLoading(true);
      const fetched = await getUserNotes(currentUser.uid);
      setNotes(fetched);
      setIsLoading(false);
    };

    fetchNotes();
  }, [currentUser.uid]);

  const handleNoteClick = (note: TNote) => {
    setSelectedNote(note);
    setIsPreviewNoteModalOpen(true);
  };

  const handleNoteCreated = (newNote: TNote) => {
    setNotes((prev) => [...prev, newNote]);
  };

  return (
    <>
      <SectionHeader
        title="Your notes"
        action={
          <AddButton
            title="Create a new note"
            onClick={() => setIsCreateNoteModalOpen(true)}
          />
        }
      />
      <div className="h-[382px] overflow-y-auto overflow-x-hidden border-[10px] border-red-900 bg-amber-50 md:h-full lg:h-[382px]">
        <div className="-mb-0.5">
          <div className="h-full w-full gap-4 pl-2 pr-[13px] pt-2 lg:grid lg:grid-cols-2 xl:block xl:flex-col">
            {isLoading
              ? Array.from({ length: 3 }).map((_, index) => (
                  <NotePlaceholder key={index} />
                ))
              : notes.map((note, index) => (
                  <div
                    key={index}
                    onClick={() => handleNoteClick(note)}
                    className={`group relative mx-auto mb-4 flex h-full w-full cursor-pointer items-center justify-center border-2 border-red-900 p-4 shadow-md hover:animate-card-bounce lg:max-w-full ${
                      NOTE_COLORS[index % NOTE_COLORS.length]
                    }`}
                  >
                    <div className="absolute -left-0 -top-[23.25px] h-8 w-8 origin-top-left rotate-45 transform border-r-2 border-red-900" />
                    <div className="mr-4 hidden flex-shrink-0 lg:block">
                      <Image
                        className="hidden xl:block"
                        width={48}
                        height={48}
                        src="/assets/images/app-icon.png"
                        alt="Note icon"
                        sizes="48px"
                      />
                    </div>
                    <div className="flex-grow">
                      <div className="break-word text-center text-xl font-medium text-white lg:-ml-[15px] lg:max-w-[14rem] xl:-ml-0 xl:text-left">
                        {note.title}
                      </div>
                      <p className="hidden max-w-[10dvw] break-words text-gray-200 xl:block">
                        {note.content}
                      </p>
                    </div>
                    <span className="absolute bottom-[-0.5rem] left-2 h-2 w-full scale-y-100 transform rounded-l-sm bg-red-700" />
                    <span className="absolute right-[-0.5rem] top-2 h-full w-2 scale-x-100 transform rounded-r-sm bg-red-700" />
                  </div>
                ))}
          </div>
        </div>
      </div>
      {isCreateNoteModalOpen && (
        <CreateNoteModal
          isOpen={isCreateNoteModalOpen}
          onClose={() => setIsCreateNoteModalOpen(false)}
          uid={currentUser.uid}
          onNoteCreated={handleNoteCreated}
        />
      )}
      {isPreviewNoteModalOpen && (
        <PreviewNoteModal
          isOpen={isPreviewNoteModalOpen}
          onClose={() => setIsPreviewNoteModalOpen(false)}
          selectedNote={selectedNote}
        />
      )}
    </>
  );
}

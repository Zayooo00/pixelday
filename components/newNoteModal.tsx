import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import Image from "next/image";

import { NoteModalProps, NoteType } from "@/services/notes/notes-schema";
import Modal from "./modal";

import { createNote } from "@/services/notes/notes";
import Spinner from "@/components/spinner";

export default function NoteModal({
  isOpen,
  onClose,
  onNoteAdded,
}: NoteModalProps) {
  const [newNote, setNewNote] = useState<NoteType>({ title: "", content: "" });
  const [isLoading, setIsLoading] = useState(false);

  const handleAddNote = async () => {
    setIsLoading(true);
    const note = await createNote(newNote);
    onNoteAdded(note);
    setIsLoading(false);
    onClose();
    setNewNote({ title: "", content: "" });
  };

  if (!isOpen) {
    return null;
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="relative">
        <Image
          src="/note-bg.png"
          objectFit="cover"
          width={800}
          height={800}
          quality={100}
          alt="Note background"
          className="max-w-[400px] sm:max-w-[100%]"
        />
        <div className="absolute inset-0 flex flex-col justify-start items-center text-center mt-2 sm:mt-16 p-12">
          <div className="flex flex-col items-start w-full">
            <label className="text-3xl leading-8 text-black mb-4 self-start">
              Title
            </label>
            <input
              placeholder="Note title goes here"
              className="w-full border-2 text-xl border-red-600 focus:border-red-700 focus:outline-none p-2 mb-4 rounded-md"
              value={newNote.title}
              onChange={(e) =>
                setNewNote({ ...newNote, title: e.target.value })
              }
            />
            <label className="text-3xl leading-8 text-black mb-4 self-start">
              Content
            </label>
            <textarea
              placeholder="Describe your note"
              className="w-full text-xl max-h-16 xs:max-h-60 resize-none border-solid border-2 border-red-600 focus:border-red-700 focus:outline-none p-2 mb-4 rounded-md"
              value={newNote.content}
              onChange={(e) =>
                setNewNote({ ...newNote, content: e.target.value })
              }
            />
          </div>
          <button
            disabled={!newNote.title || !newNote.content}
            className={`px-4 py-1 text-xl mb-8 w-28 text-red-700 bg-white rounded-md border-solid border-4 border-red-700 transform transition-transform duration-500 hover:scale-110 self-center ${
              !newNote.title || !newNote.content ? "cursor-not-allowed" : ""
            }`}
            onClick={handleAddNote}
          >
            {isLoading ? <Spinner /> : "Add note"}
          </button>
        </div>
        <AiOutlineClose
          className="absolute top-8 xs:top-10 right-8 text-xl xs:text-3xl cursor-pointer rounded-sm text-black hover:bg-gray-300 transition-colors duration-600"
          onClick={() => onClose()}
        />
      </div>
    </Modal>
  );
}

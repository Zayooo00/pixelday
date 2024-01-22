import { useState } from "react";
import Image from "next/image";
import z from "zod";

import Modal from "@/components/common/modal";
import Spinner from "@/components/common/spinner";
import Error from "@/components/common/error";

import { NoteSchema } from "@/helpers/createNoteValidator";
import { TCreateNoteModalProps, TNote } from "@/types/notes";
import { useToast } from "@/context/ToastContext";
import { createNote } from "@/services/notes";

export default function CreateNoteModal({
  isOpen,
  onClose,
  uid,
  onNoteCreated,
}: TCreateNoteModalProps) {
  const [newNote, setNewNote] = useState<TNote>({ title: "", content: "" });
  const [titleErrors, setTitleErrors] = useState<string[]>([]);
  const [contentErrors, setContentErrors] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { setToast } = useToast();

  const handleCreateNote = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const validatedNote = NoteSchema.parse(newNote);
      const createdNote = await createNote(validatedNote, uid);
      setIsLoading(false);
      setToast({
        isVisible: true,
        message: "Note created successfully",
        type: "success",
      });
      onNoteCreated(createdNote);
      onClose();
    } catch (error) {
      setIsLoading(false);
      if (error instanceof z.ZodError) {
        setTitleErrors(
          error.errors
            .filter((err) => err.path[0] === "title")
            .map((err) => err.message)
        );
        setContentErrors(
          error.errors
            .filter((err) => err.path[0] === "content")
            .map((err) => err.message)
        );
      }
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form
        className="-mt-14 relative flex items-center justify-center"
        onSubmit={handleCreateNote}
      >
        <Image
          src="/assets/images/note-bg-1.png"
          width={1000}
          height={1000}
          quality={100}
          alt="Note background"
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center">
          <div className="flex flex-col items-center w-full -mt-2">
            <div className="w-[55vw] sm:w-[25vw] md:w-[30vw] lg:w-[320px]">
              <label className="text-3xl leading-8 text-black mb-2 text-left">
                Title
              </label>
              {titleErrors.map((error, index) => (
                <Error key={index} message={error} />
              ))}
              <input
                placeholder="Note title goes here"
                className="w-full border-2 text-xl mt-2 bg-opacity-50 bg-white border-red-400 focus:border-red-500 focus:outline-none p-2 mb-4 rounded-md transition-colors duration-500"
                value={newNote.title}
                onChange={(e) =>
                  setNewNote({ ...newNote, title: e.target.value })
                }
              />
            </div>
            <div className="w-[55vw] sm:w-[25vw] md:w-[30vw] lg:w-[320px]">
              <label className="text-3xl leading-8 text-black mb-2 text-left">
                Content
              </label>
              {contentErrors.map((error, index) => (
                <Error key={index} message={error} />
              ))}
              <textarea
                placeholder="Describe your note"
                className="w-full text-xl h-36 sm:h-24 lg:h-48 xs:max-h-60 resize-none border-2 mt-2 bg-opacity-50 bg-white border-red-400 focus:border-red-500 focus:outline-none p-2 mb-4 rounded-md transition-colors duration-500"
                value={newNote.content}
                onChange={(e) =>
                  setNewNote({ ...newNote, content: e.target.value })
                }
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleCreateNote(e);
                  }
                }}
              />
            </div>
          </div>
          <button
            disabled={isLoading}
            className={`px-4 py-1 text-xl mb-8 w-28 text-white bg-rose-400 rounded-md border-b-4 border-2 border-rose-600 transform transition-transform duration-500 hover:scale-110 self-center ${
              isLoading ? "cursor-not-allowed" : ""
            }`}
            type="submit"
          >
            {isLoading ? <Spinner /> : "Add note"}
          </button>
        </div>
      </form>
    </Modal>
  );
}

import Image from "next/image";

import Modal from "@/components/common/modal";

import { TPreviewNoteModalProps } from "@/types/notes";

export default function PreviewNoteModal({
  isOpen,
  onClose,
  selectedNote,
}: TPreviewNoteModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="relative -mt-14 flex items-center justify-center">
        <Image
          src="/assets/images/note-bg-1.png"
          width={1000}
          height={1000}
          quality={100}
          alt="Note background"
        />
        <div className="absolute inset-0 mt-64 flex flex-col items-center justify-start p-4 text-center sm:mt-48 md:mt-64">
          <h1 className="mb-4 text-5xl leading-8 text-black sm:text-4xl md:text-5xl lg:text-6xl">
            {selectedNote?.title}
          </h1>
          <hr className="mb-4 w-[300px] border-t-2 border-red-700 xs:mt-2 sm:w-[200px] md:w-[300px]" />
          <p className="text-md w-44 break-words text-black xs:w-64 xs:text-xl">
            {selectedNote?.content}
          </p>
        </div>
      </div>
    </Modal>
  );
}

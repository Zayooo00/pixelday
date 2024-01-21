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
        <div className="absolute inset-0 flex flex-col justify-start items-center text-center mt-64 sm:mt-48 md:mt-64 p-4">
          <h1 className="text-5xl sm:text-4xl md:text-5xl lg:text-6xl leading-8 text-black mb-4">
            {selectedNote?.title}
          </h1>
          <hr className="xs:mt-2 w-[300px] sm:w-[200px] md:w-[300px] border-t-2 border-red-700 mb-4" />
          <p className="w-44 xs:w-64 text-md xs:text-xl break-words text-black">
            {selectedNote?.content}
          </p>
        </div>
      </div>
    </Modal>
  );
}

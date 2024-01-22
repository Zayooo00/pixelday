import { useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";

type TModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export default function Modal({ isOpen, onClose, children }: TModalProps) {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.keyCode === 27) onClose();
    };
    window.addEventListener("keydown", handleEsc);

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="flex min-h-screen items-center justify-center px-4 pt-12 text-center sm:block sm:p-0 sm:pt-4">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div
            className="absolute inset-0 bg-gray-900 opacity-75"
            onClick={onClose}
          />
          <AiOutlineClose
            size={40}
            className="duration-600 absolute right-2 top-2 cursor-pointer rounded-full border-2 border-red-900 bg-amber-100 p-2 text-xl text-red-900 transition-all duration-500 hover:scale-110 hover:bg-red-900 hover:text-amber-50 xs:text-3xl sm:right-5 sm:top-5"
            onClick={() => onClose()}
          />
        </div>

        <span
          className="hidden sm:inline-block sm:h-screen sm:align-middle"
          aria-hidden="true"
        >
          &#8203;
        </span>

        <div className="z-10 inline-block transform overflow-hidden rounded-lg text-left align-bottom transition-all sm:my-8 sm:align-middle ">
          {children}
        </div>
      </div>
    </div>
  );
}

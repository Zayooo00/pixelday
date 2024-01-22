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
    <div className="fixed z-50 inset-0 overflow-hidden">
      <div className="flex items-center justify-center min-h-screen pt-12 sm:pt-4 px-4 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div
            className="absolute inset-0 bg-gray-900 opacity-75"
            onClick={onClose}
          />
          <AiOutlineClose
            size={40}
            className="absolute top-2 right-2 sm:top-5 sm:right-5 text-xl xs:text-3xl cursor-pointer rounded-full p-2 border-2 border-red-900 text-red-900 bg-amber-100 hover:bg-red-900 hover:text-amber-50 duration-600 transition-all duration-500 hover:scale-110"
            onClick={() => onClose()}
          />
        </div>

        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>

        <div className="inline-block align-bottom rounded-lg text-left z-10 overflow-hidden transform transition-all sm:my-8 sm:align-middle ">
          {children}
        </div>
      </div>
    </div>
  );
}

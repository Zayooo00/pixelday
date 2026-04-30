import Image from "next/image";

import Modal from "./modal";

type ModalShellProps = {
  isOpen: boolean;
  onClose: () => void;
  background: string;
  backgroundAlt: string;
  backgroundSize?: number;
  children: React.ReactNode;
  as?: "div" | "form";
  onSubmit?: (e: React.FormEvent) => void;
};

export default function ModalShell({
  isOpen,
  onClose,
  background,
  backgroundAlt,
  backgroundSize = 900,
  children,
  as = "div",
  onSubmit,
}: ModalShellProps) {
  const Wrapper = as;
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Wrapper
        className="relative -mt-14 flex items-center justify-center"
        onSubmit={onSubmit}
      >
        <Image
          src={background}
          width={backgroundSize}
          height={backgroundSize}
          alt={backgroundAlt}
          priority
          sizes="(max-width: 640px) 90vw, (max-width: 1024px) 60vw, 900px"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {children}
        </div>
      </Wrapper>
    </Modal>
  );
}

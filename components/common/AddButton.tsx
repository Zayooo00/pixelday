import { ImPlus } from "react-icons/im";

type AddButtonProps = {
  title: string;
  onClick: () => void;
};

export default function AddButton({ title, onClick }: AddButtonProps) {
  return (
    <button
      type="button"
      className="duration-600 mr-1 rounded-full p-1 transition-colors hover:bg-rose-200"
      title={title}
      onClick={onClick}
    >
      <ImPlus className="text-red-700" />
    </button>
  );
}

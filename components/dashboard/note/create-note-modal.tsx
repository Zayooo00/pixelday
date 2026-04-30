import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import ModalShell from "@/components/common/modal-shell";
import Spinner from "@/components/common/spinner";
import Error from "@/components/common/error";

import { useToast } from "@/context/toast-context";
import { createNote } from "@/services/notes";
import { cn } from "@/helpers/cn";
import { CreateNoteModalProps } from "@/types/notes";

const NoteSchema = z.object({
  title: z
    .string()
    .min(1, "Title cannot be empty")
    .max(20, "Title cannot exceed 20 characters")
    .refine((v) => v.trim().length > 0, {
      message: "Title cannot consist of just empty spaces",
    }),
  content: z
    .string()
    .max(200, "Content cannot exceed 200 characters")
    .transform((v) => v.trim()),
});

type NoteFormData = z.infer<typeof NoteSchema>;

const NOTE_BG = "/assets/images/note-bg-1.png";

const INPUT_CLASSES =
  "mb-4 mt-2 w-full rounded-md border-2 border-red-400 bg-white bg-opacity-50 p-2 text-xl transition-colors duration-500 focus:border-red-500 focus:outline-none";

export default function CreateNoteModal({
  isOpen,
  onClose,
  uid,
  onNoteCreated,
}: CreateNoteModalProps) {
  const { setToast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<NoteFormData>({ resolver: zodResolver(NoteSchema) });

  const onSubmit = async (data: NoteFormData) => {
    const createdNote = await createNote(data, uid);
    setToast({ isVisible: true, message: "Note created successfully", type: "success" });
    onNoteCreated(createdNote);
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <ModalShell
      isOpen={isOpen}
      onClose={onClose}
      background={NOTE_BG}
      backgroundAlt="Note background"
      backgroundSize={1000}
      as="form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="-mt-2 flex w-full flex-col items-center">
        <div className="w-[55vw] sm:w-[25vw] md:w-[30vw] lg:w-[320px]">
          <label className="mb-2 text-left text-3xl leading-8 text-black">Title</label>
          {errors.title && <Error message={errors.title.message ?? ""} />}
          <input
            {...register("title")}
            placeholder="Note title goes here"
            className={INPUT_CLASSES}
          />
        </div>
        <div className="w-[55vw] sm:w-[25vw] md:w-[30vw] lg:w-[320px]">
          <label className="mb-2 text-left text-3xl leading-8 text-black">Content</label>
          {errors.content && <Error message={errors.content.message ?? ""} />}
          <textarea
            {...register("content")}
            placeholder="Describe your note"
            className="mb-4 mt-2 h-36 w-full resize-none rounded-md border-2 border-red-400 bg-white bg-opacity-50 p-2 text-xl transition-colors duration-500 focus:border-red-500 focus:outline-none xs:max-h-60 sm:h-24 lg:h-48"
          />
        </div>
      </div>
      <button
        disabled={isSubmitting}
        className={cn(
          "mb-8 w-28 transform self-center rounded-md border-2 border-b-4 border-rose-600 bg-rose-400 px-4 py-1 text-xl text-white transition-transform duration-500 hover:scale-110",
          isSubmitting && "cursor-not-allowed",
        )}
        type="submit"
      >
        {isSubmitting ? <Spinner /> : "Add note"}
      </button>
    </ModalShell>
  );
}

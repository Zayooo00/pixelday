import Image from "next/image";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import ModalShell from "@/components/common/modal-shell";
import Spinner from "@/components/common/spinner";
import Error from "@/components/common/error";

import { useToast } from "@/context/toast-context";
import { useTasks } from "@/context/tasks-context";
import { CreateTaskModalProps } from "@/types/tasks";
import { createTask } from "@/services/tasks";
import { cn } from "@/helpers/cn";

const TaskSchema = z.object({
  title: z
    .string()
    .min(1, "Title cannot be empty")
    .max(20, "Title cannot exceed 20 characters")
    .refine((v) => v.trim().length > 0, {
      message: "Title cannot consist of just empty spaces",
    }),
  date: z.string().min(1, "Date cannot be empty"),
  hour: z.string().min(1, "Hour cannot be empty"),
});

type TaskFormData = z.infer<typeof TaskSchema>;

const INPUT_CLASSES =
  "mb-4 mt-4 w-full rounded-md border-2 border-red-500 bg-white bg-opacity-50 p-2 text-xl transition-colors duration-500 focus:border-red-900 focus:outline-none";

export default function CreateTaskModal({
  isOpen,
  onClose,
  uid,
}: CreateTaskModalProps) {
  const { setTasks } = useTasks();
  const { setToast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TaskFormData>({ resolver: zodResolver(TaskSchema) });

  const onSubmit = async (data: TaskFormData) => {
    const createdTask = await createTask({ ...data, uid, taskId: "" });
    setTasks((prev) => [...prev, createdTask]);
    setToast({ isVisible: true, message: "Task created successfully", type: "success" });
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <ModalShell
      isOpen={isOpen}
      onClose={onClose}
      background="/assets/images/quest-board.png"
      backgroundAlt="Quest background"
      as="form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="mt-12 flex w-full flex-col items-center sm:mt-24 md:mt-12">
        <Image
          src="/assets/images/quest.png"
          width={150}
          height={150}
          alt="Quest icon"
          sizes="150px"
        />
        <h1 className="mt-2 text-4xl text-black">Create a new task</h1>
        <div className="mt-2 w-[60vw] text-left sm:w-[35vw] md:w-[30vw] lg:w-[320px]">
          {errors.title && <Error message={errors.title.message ?? ""} />}
          {errors.date && <Error message={errors.date.message ?? ""} />}
          {errors.hour && <Error message={errors.hour.message ?? ""} />}
        </div>
        <div className="w-[60vw] sm:w-[35vw] md:w-[30vw] lg:w-[320px]">
          <input
            {...register("title")}
            placeholder="Task title goes here"
            className={INPUT_CLASSES}
          />
          <input
            {...register("date")}
            type="date"
            className={INPUT_CLASSES}
          />
          <input
            {...register("hour")}
            type="time"
            className={INPUT_CLASSES}
          />
        </div>
      </div>
      <button
        disabled={isSubmitting}
        className={cn(
          "w-42 mb-8 transform border-x-4 border-b-8 border-t-4 border-red-900 bg-red-500 p-2 px-4 py-1 text-xl text-amber-50 transition-transform duration-300 hover:scale-105",
          isSubmitting && "cursor-not-allowed",
        )}
        type="submit"
      >
        {isSubmitting ? <Spinner /> : "Create task"}
      </button>
    </ModalShell>
  );
}

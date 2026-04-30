import { useState } from "react";
import Image from "next/image";
import { z } from "zod";

import ModalShell from "@/components/common/ModalShell";
import Spinner from "@/components/common/spinner";
import Error from "@/components/common/error";

import { useToast } from "@/context/ToastContext";
import { useTasks } from "@/context/TasksContext";
import { TCreateTaskModalProps, TTask } from "@/types/tasks";
import { createTask } from "@/services/tasks";
import { TaskSchema } from "@/helpers/createTaskValidator";
import { cn } from "@/helpers/cn";

const INPUT_CLASSES =
  "mb-4 mt-4 w-full rounded-md border-2 border-red-500 bg-white bg-opacity-50 p-2 text-xl transition-colors duration-500 focus:border-red-900 focus:outline-none";

export default function CreateTaskModal({
  isOpen,
  onClose,
  uid,
}: TCreateTaskModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [newTask, setNewTask] = useState<TTask>({
    uid,
    taskId: "",
    title: "",
    date: "",
    hour: "",
  });
  const { setTasks } = useTasks();
  const { setToast } = useToast();

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const validatedTask = TaskSchema.parse(newTask);
      const createdTask = await createTask(validatedTask);

      setTasks((prevTasks) => [...prevTasks, createdTask]);
      setToast({
        isVisible: true,
        message: "Task created successfully",
        type: "success",
      });
      onClose();
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors(error.errors.map((err) => err.message));
      }
    } finally {
      setIsLoading(false);
    }
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
      onSubmit={handleCreateTask}
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
          {errors.map((error, index) => (
            <Error key={index} message={error} />
          ))}
        </div>
        <div className="w-[60vw] sm:w-[35vw] md:w-[30vw] lg:w-[320px]">
          <input
            placeholder="Task title goes here"
            className={INPUT_CLASSES}
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          />
          <input
            type="date"
            className={INPUT_CLASSES}
            value={newTask.date}
            onChange={(e) => setNewTask({ ...newTask, date: e.target.value })}
          />
          <input
            type="time"
            className={INPUT_CLASSES}
            value={newTask.hour}
            onChange={(e) => setNewTask({ ...newTask, hour: e.target.value })}
          />
        </div>
      </div>
      <button
        disabled={isLoading}
        className={cn(
          "w-42 text-stroke-red mb-8 transform border-x-4 border-b-8 border-t-4 border-red-900 bg-red-500 p-2 px-4 py-1 text-xl text-amber-50 transition-transform duration-300 hover:scale-105",
          isLoading && "cursor-not-allowed",
        )}
        type="submit"
      >
        {isLoading ? <Spinner /> : "Create task"}
      </button>
    </ModalShell>
  );
}

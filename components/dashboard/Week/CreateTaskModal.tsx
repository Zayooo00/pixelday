import { useState } from "react";
import Image from "next/image";
import { z } from "zod";

import Modal from "@/components/common/modal";
import Spinner from "@/components/common/spinner";
import Error from "@/components/common/error";

import { useToast } from "@/context/ToastContext";
import { useTasks } from "@/context/TasksContext";
import { TCreateTaskModalProps, TTask } from "@/types/tasks";
import { createTask } from "@/services/tasks";
import { TaskSchema } from "@/helpers/createTaskValidator";

export default function CreateTaskModal({
  isOpen,
  onClose,
  uid,
}: TCreateTaskModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [newTask, setNewTask] = useState<TTask>({
    uid: uid,
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
      setIsLoading(false);

      setTasks((prevTasks) => [...prevTasks, createdTask]);

      setToast({
        isVisible: true,
        message: "Task created successfully",
        type: "success",
      });
      onClose();
    } catch (error) {
      setIsLoading(false);
      if (error instanceof z.ZodError) {
        setErrors(error.errors.map((err) => err.message));
      }
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <form
          className="relative -mt-14 flex items-center justify-center"
          onSubmit={handleCreateTask}
        >
          <Image
            src="/assets/images/quest-board.png"
            width={900}
            height={900}
            quality={100}
            alt="Quest background"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="mt-12 flex w-full flex-col items-center sm:mt-24 md:mt-12">
              <Image
                src="/assets/images/quest.png"
                width={150}
                height={150}
                quality={100}
                alt="Quest icon"
              />
              <h1 className="mt-2 text-4xl text-black">Create a new task</h1>
              <div className=" mt-2 w-[60vw] text-left sm:w-[35vw] md:w-[30vw] lg:w-[320px]">
                {errors.map((error, index) => (
                  <Error key={index} message={error} />
                ))}
              </div>
              <div className="w-[60vw] sm:w-[35vw] md:w-[30vw] lg:w-[320px]">
                <input
                  placeholder="Task title goes here"
                  className="mb-4 mt-4 w-full rounded-md border-2 border-red-500 bg-white bg-opacity-50 p-2 text-xl transition-colors duration-500 focus:border-red-900 focus:outline-none"
                  value={newTask.title}
                  onChange={(e) =>
                    setNewTask({ ...newTask, title: e.target.value })
                  }
                />
                <input
                  type="date"
                  className="mb-4 mt-4 w-full rounded-md border-2 border-red-500 bg-white bg-opacity-50 p-2 text-xl transition-colors duration-500 focus:border-red-900 focus:outline-none"
                  value={newTask.date}
                  onChange={(e) =>
                    setNewTask({ ...newTask, date: e.target.value })
                  }
                />
                <input
                  type="time"
                  className="mb-4 mt-4 w-full rounded-md border-2 border-red-500 bg-white bg-opacity-50 p-2 text-xl transition-colors duration-500 focus:border-red-900 focus:outline-none"
                  value={newTask.hour}
                  onChange={(e) =>
                    setNewTask({ ...newTask, hour: e.target.value })
                  }
                />
              </div>
            </div>
            <button
              disabled={isLoading}
              className={`w-42 text-stroke-red mb-8 transform border-x-4 border-b-8 border-t-4 border-red-900 bg-red-500 p-2 px-4 py-1 text-xl text-amber-50 transition-transform duration-300 hover:scale-105 ${
                isLoading ? "cursor-not-allowed" : ""
              }`}
              type="submit"
            >
              {isLoading ? <Spinner /> : "Create task"}
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
}

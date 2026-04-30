import { Task } from "@/types/tasks";
import { createListContext } from "./create-list-context";

const { Provider: TaskProvider, useList: _useTasks } =
  createListContext<Task>("Tasks");

export { TaskProvider };

export const useTasks = () => {
  const { items: tasks, setItems: setTasks } = _useTasks();
  return { tasks, setTasks };
};

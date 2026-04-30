import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";

import { updateTask } from "@/services/tasks";
import { useTasks } from "@/context/tasks-context";
import { WeekDay } from "@/types/tasks";

const DAY_NAMES = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const COLOR_CLASSES = [
  "bg-red-500",
  "bg-cyan-500",
  "bg-emerald-400",
  "bg-sky-500",
  "bg-lime-400",
  "bg-teal-500",
  "bg-rose-500",
];

type WeekPlanProps = {
  weekDays: WeekDay[];
};

export default function WeekPlan({ weekDays }: WeekPlanProps) {
  const { setTasks } = useTasks();

  const onDragEnd = async (result: DropResult) => {
    if (!result.destination) {
      return;
    }
    const sourceIndex = Number(result.source.droppableId);
    const destinationIndex = Number(result.destination.droppableId);
    if (sourceIndex === destinationIndex) {
      return;
    }

    const movedTaskId = result.draggableId;
    const newDate = weekDays[destinationIndex].date;

    setTasks((prev) =>
      prev.map((task) =>
        task.taskId === movedTaskId ? { ...task, date: newDate } : task,
      ),
    );

    try {
      await updateTask(movedTaskId, { date: newDate });
    } catch {
      setTasks((prev) =>
        prev.map((task) =>
          task.taskId === movedTaskId
            ? { ...task, date: weekDays[sourceIndex].date }
            : task,
        ),
      );
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="grid grid-cols-3 grid-rows-2 gap-4 overflow-y-scroll overflow-x-hidden border-[10px] border-red-900 bg-amber-50 p-4 sm:grid-cols-6 sm:grid-rows-1 lg:h-[486.44px]">
        {weekDays.map((day, index) => (
          <Droppable droppableId={String(index)} key={day.date}>
            {(provided) => (
              <div className="flex flex-col items-center">
                <div
                  className={`${COLOR_CLASSES[index]} h-full w-full border-2 border-slate-600 border-opacity-40 shadow-lg lg:h-full`}
                >
                  <p className="bg-slate-800 bg-opacity-40 p-1 text-center text-lg text-white">
                    {DAY_NAMES[new Date(day.date).getDay()]}
                  </p>
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="min-h-[60px] p-2 flex flex-col gap-2"
                  >
                  {day.tasks.map((task, i) => (
                    <Draggable
                      key={task.taskId}
                      draggableId={task.taskId}
                      index={i}
                    >
                      {(dragProvided) => (
                        <div
                          {...dragProvided.draggableProps}
                          {...dragProvided.dragHandleProps}
                          ref={dragProvided.innerRef}
                          className="w-full rounded-md border-2 border-b-4 border-slate-500 bg-slate-600 bg-opacity-40 transition-colors duration-500 hover:animate-card-bounce hover:bg-slate-600 hover:bg-opacity-60"
                        >
                          <p className="overflow-hidden text-ellipsis p-1 text-center text-white">
                            {task.title}
                          </p>
                          <p className="-mt-2 text-center text-sm text-white">
                            {task.hour}
                          </p>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                  </div>
                </div>
                <h2 className="text-lg sm:text-base md:text-lg xl:text-lg">
                  {day.date.split("-").reverse().join("/")}
                </h2>
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
}

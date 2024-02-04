import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";

import { updateTask } from "@/services/tasks";
import { WeekPlanProps } from "@/types/tasks";

export default function WeekPlan({ weekDays, setWeekDays }: WeekPlanProps) {

  const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const colorClasses = [
    "bg-red-500",
    "bg-cyan-500",
    "bg-emerald-400",
    "bg-sky-500",
    "bg-lime-400",
    "bg-teal-500",
    "bg-rose-500",
  ];

  const onDragEnd = async (result: DropResult) => {
    if (!result.destination) return;
    const { source, destination } = result;

    const sourceIndex = Number(source.droppableId);
    const destinationIndex = Number(destination.droppableId);

    const startDayTasks = [...weekDays[sourceIndex].tasks];
    const [removed] = startDayTasks.splice(source.index, 1);

    let newWeekDays = [...weekDays];

    if (sourceIndex === destinationIndex) {
      startDayTasks.splice(destination.index, 0, removed);
      newWeekDays[sourceIndex].tasks = startDayTasks;
    } else {
      const finishDayTasks = [...weekDays[destinationIndex].tasks];
      finishDayTasks.splice(destination.index, 0, removed);
      newWeekDays[sourceIndex].tasks = startDayTasks;
      newWeekDays[destinationIndex].tasks = finishDayTasks;

      const newDate = newWeekDays[destinationIndex].date
        .split("/")
        .reverse()
        .join("-");
      await updateTask(removed.taskId, { date: newDate });
    }

    setWeekDays(newWeekDays);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="grid grid-cols-3 grid-rows-2 sm:grid-rows-1 sm:grid-cols-6 gap-4 border-[10px] border-red-900 bg-amber-50 p-4 lg:h-[486.44px] overflow-x-hidden overflow-y-scroll ">
        {weekDays.map((day, index) => (
          <Droppable droppableId={String(index)} key={index}>
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="flex flex-col items-center"
              >
                <div
                  className={`${colorClasses[index]} h-full w-full border-2 border-slate-600 border-opacity-40 p-2 shadow-lg lg:h-full`}
                >
                  <p className="-m-2 mb-3 bg-slate-800 bg-opacity-40 text-center text-lg text-white">
                    {
                      dayNames[
                        new Date(
                          day.date.split("/").reverse().join("-"),
                        ).getDay()
                      ]
                    }
                  </p>
                  {day.tasks.map((task, i) => (
                    <Draggable
                      key={`${index}-${i}`}
                      draggableId={`${index}-${i}`}
                      index={i}
                    >
                      {(provided) => (
                        <div
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          ref={provided.innerRef}
                          className="my-2 w-full rounded-md border-2 border-b-4 border-slate-500 bg-slate-600 bg-opacity-40 transition-colors duration-500 hover:animate-card-bounce hover:bg-slate-600 hover:bg-opacity-60"
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

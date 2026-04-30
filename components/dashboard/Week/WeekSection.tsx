import { useState, useEffect, useMemo } from "react";

import SectionHeader from "@/components/common/SectionHeader";
import AddButton from "@/components/common/AddButton";

import { TUserInfo } from "@/types/users";
import { useTasks } from "@/context/TasksContext";
import { getUserTasks } from "@/services/tasks";

import WeekPlan from "./WeekPlan";
import CreateTaskModal from "./CreateTaskModal";
import WeekPlaceholder from "./WeekPlaceholder";

const DAYS_IN_WEEK = 6;

function buildWeekDates(): string[] {
  return Array.from({ length: DAYS_IN_WEEK }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - 1 + i);
    return d.toISOString().split("T")[0];
  });
}

export default function WeekSection({
  currentUser,
}: {
  currentUser: TUserInfo;
}) {
  const [isCreateTaskModalOpen, setIsCreateTaskModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { tasks, setTasks } = useTasks();

  useEffect(() => {
    const fetchTasks = async () => {
      if (!currentUser.uid) {
        return;
      }
      const fetchedTasks = await getUserTasks(currentUser.uid);
      setTasks(fetchedTasks);
      setIsLoading(false);
    };

    fetchTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser.uid]);

  const weekDays = useMemo(() => {
    const dates = buildWeekDates();
    return dates.map((date) => ({
      date,
      tasks: tasks.filter((task) => task.date === date),
    }));
  }, [tasks]);

  return (
    <>
      <SectionHeader
        title="Your week plan"
        className="mt-[44px] md:mt-[51px] lg:-mt-[72px]"
        action={
          <AddButton
            title="Create a new task"
            onClick={() => setIsCreateTaskModalOpen(true)}
          />
        }
      />
      {isLoading ? (
        <WeekPlaceholder />
      ) : (
        <WeekPlan weekDays={weekDays} />
      )}
      {isCreateTaskModalOpen && (
        <CreateTaskModal
          isOpen={isCreateTaskModalOpen}
          onClose={() => setIsCreateTaskModalOpen(false)}
          uid={currentUser.uid}
        />
      )}
    </>
  );
}

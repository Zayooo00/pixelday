export type TTask = {
  uid: string;
  taskId: string;
  title: string;
  date: string;
  hour: string;
};

export type TCreateTaskModalProps = {
  isOpen: boolean;
  onClose: () => void;
  uid: string;
};

export type TWeekDay = {
  date: string;
  tasks: TTask[];
};

export type WeekPlanProps = {
  weekDays: TWeekDay[];
  setWeekDays: React.Dispatch<React.SetStateAction<TWeekDay[]>>;
};
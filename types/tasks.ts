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

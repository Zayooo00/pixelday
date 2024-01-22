export type QuestStatus = 'active' | 'complete';

export type TQuest = {
  questId: string;
  title: string;
  status: QuestStatus;
  uid: string;
  type: "main" | "recurring";
};

export type TQuestProps = {
  title: string;
  status: QuestStatus;
  type: "main" | "recurring";
};

export type TQuestColorType = {
  active: string;
  complete: string;
};

export type TPreviewQuestModalProps = {
  isOpen: boolean;
  onClose: () => void;
  selectedQuest: TQuest | null;
  onQuestUpdate: (updatedQuest: TQuest) => void
};

export type TCreateQuestModalProps = {
  isOpen: boolean;
  onClose: () => void;
  uid: string;
};

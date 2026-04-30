export type QuestStatus = "active" | "complete";

export type Quest = {
  questId: string;
  title: string;
  status: QuestStatus;
  uid: string;
  type: "main" | "recurring";
};

export type QuestProps = {
  title: string;
  status: QuestStatus;
  type: "main" | "recurring";
};

export type QuestColorType = {
  active: string;
  complete: string;
};

export type PreviewQuestModalProps = {
  isOpen: boolean;
  onClose: () => void;
  selectedQuest: Quest | null;
  onQuestUpdate: (updatedQuest: Quest) => void;
};

export type QuestType = "main" | "recurring";

export type CreateQuestModalProps = {
  isOpen: boolean;
  onClose: () => void;
  uid: string;
  questType: QuestType;
};

export type TNoteType = {
  uid?: string;
  title?: string;
  content?: string;
};

export type TNoteModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onNoteAdded: (note: TNoteType) => void;
  uid: string;
};

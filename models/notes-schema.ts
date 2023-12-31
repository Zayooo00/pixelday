export type NoteType = {
  uid?: string;
  title?: string;
  content?: string;
};

export type NoteModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onNoteAdded: (note: NoteType) => void;
  uid: string;
};

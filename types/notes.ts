export type Note = {
  uid?: string;
  title?: string;
  content?: string;
};

export type CreateNoteModalProps = {
  isOpen: boolean;
  onClose: () => void;
  uid: string;
  onNoteCreated: (note: Note) => void;
};

export type PreviewNoteModalProps = {
  isOpen: boolean;
  onClose: () => void;
  selectedNote: Note | null;
};

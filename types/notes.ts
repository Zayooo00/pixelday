export type TNote = {
  uid?: string;
  title?: string;
  content?: string;
};

export type TCreateNoteModalProps = {
  isOpen: boolean;
  onClose: () => void;
  uid: string;
  onNoteCreated: (note: TNote) => void;
};

export type TPreviewNoteModalProps = {
  isOpen: boolean;
  onClose: () => void;
  selectedNote: TNote | null;
};

import { db } from "@/firebase/firebase";
import {
  collection,
  addDoc,
  getDocs,
  orderBy,
  getDoc,
  query,
  serverTimestamp,
} from "firebase/firestore";

import { NoteType } from "./notes-schema";

export const createNote = async (note: NoteType): Promise<NoteType> => {
  const timestamp = serverTimestamp();
  const docRef = await addDoc(collection(db, "notes"), { ...note, timestamp });
  const docSnap = await getDoc(docRef);
  return { id: docSnap.id, ...docSnap.data() } as NoteType;
};

export const getNotes = async () => {
  const q = query(collection(db, "notes"), orderBy("timestamp", "desc"));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

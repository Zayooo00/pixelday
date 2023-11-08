import { db } from "@/firebase/firebase";
import {
  collection,
  doc,
  setDoc,
  getDocs,
  orderBy,
  getDoc,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";

import { NoteType } from "../models/notes-schema";

const notesCollection = collection(db, 'notes');

export const createNote = async (note: NoteType, uid: string): Promise<NoteType> => {
  const timestamp = serverTimestamp();
  const docRef = doc(notesCollection);
  await setDoc(docRef, { ...note, uid, timestamp });
  const docSnap = await getDoc(docRef);
  return { uid: docSnap.id, ...docSnap.data() } as NoteType;
};

export const getNotes = async (uid: string) => {
  const q = query(notesCollection, where("uid", "==", uid), orderBy("timestamp", "desc"));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({ uid: doc.id, ...doc.data() }));
};
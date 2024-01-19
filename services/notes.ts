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

import { TNoteType } from "../types/notes";

const notesCollection = collection(db, "notes");

export const createNote = async (
  note: TNoteType,
  uid: string
): Promise<TNoteType> => {
  const timestamp = serverTimestamp();
  const docRef = doc(notesCollection);
  await setDoc(docRef, { ...note, uid, timestamp });
  const docSnap = await getDoc(docRef);
  return { uid: docSnap.id, ...docSnap.data() } as TNoteType;
};

export const getUserNotes = async (uid: string) => {
  const q = query(
    notesCollection,
    where("uid", "==", uid),
    orderBy("timestamp", "desc")
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({ uid: doc.id, ...doc.data() }));
};

import { doc, setDoc, serverTimestamp } from "firebase/firestore"; 
import { db } from "@/firebase/firebase";

export const createUserDocument = async (uid: string, additionalData: { displayName: string; email: string; }) => {
  if (!uid) return;

  const userRef = doc(db, 'users', uid);

  const userData = {
    ...additionalData,
    createdAt: serverTimestamp(),
  };

  await setDoc(userRef, userData);

  return userRef;
};
import {
  collection,
  doc,
  getDoc,
  getDocs,
  deleteDoc,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
  orderBy,
} from "firebase/firestore";
import { db } from "@/firebase/firebase";

import { TQuest, QuestStatus } from "../types/quests";

const questsCollection = collection(db, "quests");

export const createQuest = async (
  quest: Omit<TQuest, "status" | "type">,
  uid: string,
  type: "main" | "recurring"
): Promise<TQuest> => {
  const timestamp = serverTimestamp();
  const docRef = doc(questsCollection);
  const questId = docRef.id;
  await setDoc(docRef, { ...quest, questId, status: "active", uid, timestamp, type });
  const docSnap = await getDoc(docRef);
  return { uid: docSnap.id, ...docSnap.data() } as TQuest;
};

export const getUserQuests = async (uid: string) => {
  const q = query(
    questsCollection,
    where("uid", "==", uid),
    orderBy("timestamp", "desc")
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({ uid: doc.id, ...doc.data() }));
};

export async function updateQuestStatus(questId: string, status: QuestStatus): Promise<TQuest> {
  const questRef = doc(questsCollection, questId);
  
  await updateDoc(questRef, { status });

  const questSnapshot = await getDoc(questRef);
  const updatedQuest = { ...questSnapshot.data(), questId } as TQuest;

  return updatedQuest;
};

export const deleteQuest = async (questId: string) => {
  const questRef = doc(questsCollection, questId);
  await deleteDoc(questRef);
};
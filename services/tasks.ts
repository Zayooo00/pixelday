import { db } from "@/firebase/firebase";
import {
  collection,
  doc,
  setDoc,
  getDocs,
  orderBy,
  getDoc,
  query,
  where,
  updateDoc,
} from "firebase/firestore";
import { TTask } from "@/types/tasks";

const tasksCollection = collection(db, "tasks");

export const createTask = async (task: TTask): Promise<TTask> => {
  const docRef = doc(tasksCollection);
  const taskId = docRef.id;
  await setDoc(docRef, { ...task, taskId });
  const docSnap = await getDoc(docRef);
  return { id: docSnap.id, ...(docSnap.data() as Partial<TTask>) } as TTask;
};

export const getUserTasks = async (uid: string): Promise<TTask[]> => {
  const q = query(
    tasksCollection,
    where("uid", "==", uid),
    orderBy("date", "desc"),
    orderBy("hour", "desc"),
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as TTask),
  }));
};

export const updateTask = async (
  taskId: string,
  newTaskData: Partial<TTask>,
): Promise<void> => {
  const taskRef = doc(db, "tasks", taskId);
  await updateDoc(taskRef, newTaskData);
};

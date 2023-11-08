import { User } from "firebase/auth";

export type UserInfo = {
    currentUser: User | null;
    displayName?: string;
    uid: string;
  }
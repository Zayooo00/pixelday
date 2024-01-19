import { User } from "firebase/auth";

export type TUserInfo = {
  currentUser: User | null;
  displayName?: string;
  uid: string;
};

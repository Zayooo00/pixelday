"use client";

import { useRouter } from "next/navigation";
import { auth } from "@/firebase/firebase";
import { GiJusticeStar } from "react-icons/gi";

export default function Dashboard() {
  const router = useRouter();

  const signOut = async () => {
    try {
      await auth.signOut();
      router.push("/");
    } catch (error) {
    }
  };

  return (
    <div className="flex h-[calc(100dvh)] w-11/12 my-32 gap-4">
      <div className="flex flex-col w-1/4">
        <div className="flex items-center border-x-[10px] border-t-[10px] p-2 border-red-900 bg-amber-50">
          <GiJusticeStar className="text-red-900 text-3xl mr-2 border-2 border-red-900 bg-white" />
          <h1 className="text-xl text-red-900 w-full pl-2 border-2 border-red-900 bg-white">
            Your notes
          </h1>
        </div>
        <div className="h-2/3 border-[10px] border-red-900 bg-amber-50">
          <div className="w-full h-full p-4 border-2 border-rose-300">
            <h1>Pixel Day</h1>
          </div>
        </div>
        <div className="flex items-center-x-[10px] border-x-[10px] border-t-[10px] p-2  mt-4 border-red-900 bg-amber-50 border">
          <GiJusticeStar className="text-red-900 text-3xl mr-2 border-2 border-red-900 bg-white" />
          <h1 className="text-xl text-red-900 border-2  w-full pl-2 border-red-900 bg-white">
            Add Quests
          </h1>
        </div>
        <div className="flex flex-col items-center justify-center h-1/3 p-4 space-y-2 border-[10px] border-red-900 bg-amber-50">
          <button className="p-2 text-amber-50 text-2xl w-4/5 transform transition-transform hover:scale-105 border-t-4 border-x-4 border-b-8 border-red-900 bg-red-500">
            <h1 className="text-stroke-red">Add Quest</h1>
          </button>
          <button className="p-2 text-amber-50 text-2xl w-4/5 transform transition-transform hover:scale-105 border-t-4 border-x-4 border-b-8 border-rose-900 bg-rose-300">
            <h1 className="h1-text-stroke-orange">Add Recurring Quest</h1>
          </button>
        </div>
      </div>
      <div className="flex flex-col w-2/4">
        <div className="flex items-center border-x-[10px] border-t-[10px] p-2 border-red-900 bg-amber-50">
          <GiJusticeStar className="text-red-900 text-3xl mr-2 border-2 border-red-900 bg-white" />
          <h1 className="text-xl text-red-900 w-full pl-2 border-2 border-red-900 bg-white">
            Welcome again *User*
          </h1>
        </div>
        <div className="h-1/6 p-4 border-[10px] border-red-900 bg-amber-50">
          <h1>Hi username</h1>
        </div>
        <div className="mt-4 flex items-center border-x-[10px] border-t-[10px] p-2 border-red-900 bg-amber-50">
          <GiJusticeStar className="text-red-900 text-3xl mr-2 border-2 border-red-900 bg-white" />
          <h1 className="text-xl text-red-900 w-full pl-2 border-2 border-red-900 bg-white">
            Plan your week
          </h1>
        </div>
        <div className="h-5/6 p-4 border-[10px] border-red-900 bg-amber-50">
          <h1>Placeholder</h1>
        </div>
      </div>
      <div className="flex flex-col w-1/4">
        <div className="flex items-center border-x-[10px] border-t-[10px] p-2 border-red-900 bg-amber-50">
          <GiJusticeStar className="text-red-900 text-3xl mr-2 border-2 border-red-900 bg-white" />
          <h1 className="text-xl text-red-900 w-full pl-2 border-2 border-red-900 bg-white">
            Quests
          </h1>
        </div>
        <div className="h-full p-4 border-[10px] border-red-900 bg-amber-50">
          <h1>Quests</h1>
        </div>
      </div>
    </div>
  );
}

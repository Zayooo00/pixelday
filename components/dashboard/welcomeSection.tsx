"use client"

import { GiJusticeStar } from "react-icons/gi";
import { useState } from "react";

import DateDisplay from "../dateDisplay";

export default function WelcomeSection() {
  const [user] = useState("Test123");
  return (
    <>
      <div className="flex items-center border-x-[10px] border-t-[10px] p-2 border-red-900 bg-amber-50">
        <GiJusticeStar className="text-red-900 text-3xl mr-2 border-2 border-red-900 bg-white" />
        <h1 className="text-xl text-red-900 w-full pl-2 border-2 border-red-900 bg-white">
          Welcome again, <strong>{user}</strong>
        </h1>
      </div>
      <div className="h-2/6 sm:h-1/6 p-4 border-[10px] border-red-900 bg-amber-50">
        <DateDisplay />
      </div>
    </>
  );
}

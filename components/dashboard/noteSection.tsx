"use client";

import { useState } from "react";
import Image from "next/image";
import { GiJusticeStar } from "react-icons/gi";

type Note = {
  title: string;
  content: string;
};

export default function NoteSection({
  onNoteClick,
}: {
  onNoteClick: (note: Note) => void;
}): JSX.Element {
  const notes = [
    { title: "Movies", content: "I should watch the new Netflix series" },
    { title: "Books", content: "Finish reading 'The Great Gatsby'" },
    { title: "Grocery", content: "Buy milk, eggs, and bread" },
    { title: "Movies", content: "I should watch the new Netflix series" },
    { title: "Books", content: "Finish reading 'The Great Gatsby'" },
    { title: "Grocery", content: "Buy milk, eggs, and bread" },
  ];

  const colors = ["bg-red-500", "bg-emerald-500", "bg-rose-400"];

  return (
    <>
      <div className="flex items-center border-x-[10px] border-t-[10px] p-2 border-red-900 bg-amber-50">
        <GiJusticeStar className="text-red-900 text-3xl mr-2 border-2 border-red-900 bg-white" />
        <h1 className="text-xl text-red-900 w-full pl-2 border-2 border-red-900 bg-white">
          Your notes
        </h1>
      </div>
      <div className="h-[382px] lg:h-2/3 xl:h-[382px] border-[10px] border-red-900 bg-amber-50 overflow-y-auto">
        <div className="-mb-0.5">
          <div className="w-full h-full pt-2 pl-2 pr-[13px] xl:block xl:flex-col lg:grid lg:grid-cols-2 gap-4">
            {notes.map((note, index) => (
              <div
                key={index}
                onClick={() => onNoteClick(note)}
                className={`cursor-pointer relative p-4 mb-4 w-full h-full mx-auto ${
                  colors[index % colors.length]
                } shadow-md flex items-center justify-center border-2 border-red-900 group lg:max-w-full hover:animate-card-bounce`}
              >
                {/* <div className="absolute -top-0.5 -left-0.5 w-8 h-8 bg-white border-2 border-red-900 transform origin-top-left rounded-br-full" /> */}
                <div className="flex-shrink-0 lg:block hidden mr-4">
                  <Image
                    className="xl:block hidden"
                    width={48}
                    height={48}
                    src="/../app-icon.png"
                    alt="Note icon"
                  />
                </div>
                <div className="flex-grow">
                  <div className="text-xl lg:-ml-[15px] xl:-ml-0 font-medium text-white xl:text-left text-center">
                    {note.title}
                  </div>
                  <p className="xl:block hidden break-words text-gray-200">
                    {note.content}
                  </p>
                </div>
                <span className="absolute bottom-[-0.5rem] left-2 w-full h-2 transform scale-y-100 bg-red-700 rounded-l-sm" />
                <span className="absolute top-2 right-[-0.5rem] h-full w-2 transform scale-x-100 bg-red-700 rounded-r-sm" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

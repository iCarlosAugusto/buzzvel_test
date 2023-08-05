import React from "react";
import Image from "next/image";

interface TaskItemProps {
  title: string;
  createdAt: Date;
  deleteTask: () => void;
}

export const TaskItem = ({ title, createdAt, deleteTask ,...rest }: TaskItemProps) => {
  return (
    <div className="p-6 m-2 bg-slate-400 flex flex-row justify-between">
      <div>
        <p className="text-white">{title}</p>
        <p className="text-white">
          {new Date(createdAt.toString()).toLocaleDateString()}
        </p>
      </div>

      <Image
        onClick={deleteTask}
        src="trash.svg"
        alt="Vercel Logo"
        className="cursor-pointer"
        width={32}
        height={32}
        priority
      />
    </div>
  );
};

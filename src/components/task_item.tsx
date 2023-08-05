import React from "react";
import Image from "next/image";

interface TaskItemProps {
  title: string;
  createdAt: Date;
  isDone: boolean;
  deleteTask: () => void;
  changeDoneStatus: () => void;
}

export const TaskItem = ({
  title,
  createdAt,
  deleteTask,
  isDone,
  changeDoneStatus,
  ...rest
}: TaskItemProps) => {
  return (
    <div className="flex items-center">
      <input
        checked={isDone}
        onChange={changeDoneStatus}
        type="checkbox"
        className="cursor-pointer w-10 h-10 border-gray-300 focus:outline-none focus:ring-0"
      />
      <div className="p-2 m-2 bg-slate-500 flex flex-1 flex-row justify-between">
        <div className="inline-block">
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
    </div>
  );
};

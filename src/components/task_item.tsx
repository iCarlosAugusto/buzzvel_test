import React, { MutableRefObject, useRef, useState } from "react";
import Image from "next/image";
import { useOnClickOutside } from "@/hooks/useOnClickOutside";

interface TaskItemProps {
  title: string;
  createdAt: Date;
  isDone: boolean;
  deleteTask: () => void;
  changeDoneStatus: () => void;
  createSubTask: (subTask: string) => void;
  subTasks?: Subtask[];
}

export const TaskItem = ({
  title,
  createdAt,
  deleteTask,
  isDone,
  changeDoneStatus,
  createSubTask,
  subTasks,
  ...rest
}: TaskItemProps) => {
  const [isCreatingSubtask, setIsCreatingSubtask] = useState(false);
  const wrapperRef = useRef(null);
  const [subTask, setSubTask] = useState<string>("");

  useOnClickOutside(wrapperRef, () => {
    handleClickOutside();
  });

  const handleClickOutside = () => {
    setIsCreatingSubtask(false);
  };

  return (
    <div className="flex items-center" ref={wrapperRef}>
      <input
        checked={isDone}
        onChange={changeDoneStatus}
        type="checkbox"
        className="cursor-pointer w-10 h-10 border-gray-300 focus:outline-none focus:ring-0"
      />
      <div className="p-2 m-2 bg-slate-500 flex flex-1 flex-row justify-between">
        <div className="inline-block">
          <p className="text-white">{title}</p>
          {isCreatingSubtask && (
            <input
              className="bg-transparent mb-2"
              placeholder="Add a subtask"
              value={subTask}
              onChange={(e) => setSubTask(e.target.value)}
            />
          )}
          <ul>
            {!!subTasks &&
              subTasks.map((subtask) => (
                <li key={subtask.id}> {subtask.title}</li>
              ))}
          </ul>

          <p className="text-white">
            {new Date(createdAt.toString()).toLocaleDateString()}
          </p>
        </div>
        <div className="flex">
          {!isCreatingSubtask ? (
            <Image
              onClick={() => setIsCreatingSubtask(true)}
              src="plus-circle.svg"
              alt="Vercel Logo"
              className="cursor-pointer mr-2"
              width={32}
              height={32}
              priority
            />
          ) : (
            <Image
              onClick={() => {
                createSubTask(subTask);
                setIsCreatingSubtask(false);
              }}
              src="check.svg"
              alt="Vercel Logo"
              className="cursor-pointer mr-2"
              width={32}
              height={32}
              priority
            />
          )}

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
    </div>
  );
};

import React, { useRef, useState } from "react";
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
  const inputTaskRef = useRef<HTMLInputElement>(null);

  useOnClickOutside(wrapperRef, () => {
    handleClickOutside();
  });

  const handleClickOutside = () => {
    setIsCreatingSubtask(false);
  };

  const handleCreateSubtask = () => {
    if (!!subTask) {
      createSubTask(subTask);
      setSubTask("");
      setIsCreatingSubtask(false);
    }
  };

  const handleShowSubTaskForm = () => {
    setIsCreatingSubtask(true);
    inputTaskRef.current?.focus();
  }

  return (
    <div className="flex items-center" ref={wrapperRef}>
      <input
        checked={isDone}
        onChange={changeDoneStatus}
        type="checkbox"
        className="cursor-pointer w-10 h-10 border-gray-300 focus:outline-none focus:ring-0"
      />
      <div className="p-2 m-2 bg-slate-400 flex flex-1 flex-row justify-between">
        <div className="inline-block">
          <p className="text-white">{title}</p>
          {isCreatingSubtask && (
            <input
              ref={inputTaskRef}
              className="bg-transparent mb-2 placeholder-gray-200 text-gray-200"
              placeholder="Add a subtask"
              value={subTask}
              onChange={({ target }) => setSubTask(target.value)}
            />
          )}
          <ul>
            {!!subTasks &&
              subTasks.map((subtask) => (
                <li key={subtask.id}> - {subtask.title}</li>
              ))}
          </ul>

          <p className="text-white">
            {new Date(createdAt.toString()).toLocaleDateString()}
          </p>
        </div>
        <div className="flex">
          {!isCreatingSubtask ? (
            <Image
              onClick={handleShowSubTaskForm}
              src="plus-circle.svg"
              alt="Vercel Logo"
              className="cursor-pointer mr-2"
              width={32}
              height={32}
              priority
            />
          ) : (
            <Image
              onClick={handleCreateSubtask}
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

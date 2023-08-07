"use client";

import { InputComponent } from "@/components/input";
import { InputSearchComponent } from "@/components/search_input";
import { TaskItem } from "@/components/task_item";
import axios from "axios";
import { useEffect, useState } from "react";
import Lottie from "react-lottie";
import * as animationData from "../../public/empty.json";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState<string>("");
  const [search, setSearch] = useState<string>("");

  const subitForm = async () => {
    const { data: task } = await axios.post(
      "http://localhost:3000/task/create",
      {
        title: title,
        message: "TESTE REMOVER",
      }
    );
    setTitle("");
    const newTasks: Task[] = [...tasks, task];
    setTasks(newTasks);
  };

  const fetchAllTasks = async () => {
    const { data } = await axios.get("http://localhost:3000/task/getAll");
    setTasks(data);
  };

  const handleDeleteTask = async (task: Task) => {
    const tasksUpdated = tasks.filter((taskItem) => taskItem.id !== task.id);
    setTasks(tasksUpdated);
    await axios.post("http://localhost:3000/task/delete", {
      id: task.id,
    });
  };

  const handleChangeTaskStatus = async (task: Task, index: number) => {
    const statusUpdated = !task.isDone;
    setTasks((oldState) => {
      const tasksTotal = [...oldState];
      tasksTotal[index].isDone = statusUpdated;
      return tasksTotal;
    });
    await axios.post("http://localhost:3000/task/update", {
      id: task.id,
      isDone: statusUpdated,
    });
  };

  const handleCreateSubTask = async (
    task: Task,
    index: number,
    subTask: string
  ) => {
    const { data: subtaskResult } = await axios.post(
      "http://localhost:3000/task/createSubtask",
      {
        taskId: task.id,
        title: subTask,
      }
    );

    const totalTasks = [...tasks];
    totalTasks[index].subTasks = [
      ...(tasks[index].subTasks ?? []),
      subtaskResult,
    ];

    setTasks(totalTasks);
  };

  const handleSetFilter = async (option: any) => {
    if (option.value === "done") {
      const { data } = await axios.get("http://localhost:3000/task/getAll", {
        params: {
          isDone: true,
        },
      });
      console.log(data);
      setTasks(data);
    }

    if (option.value === "not done") {
      const { data } = await axios.get("http://localhost:3000/task/getAll", {
        params: {
          isDone: false,
        },
      });
      setTasks(data);
    }

    if (option.value === "all") {
      const { data } = await axios.get("http://localhost:3000/task/getAll");
      setTasks(data);
    }
  };

  const handleCreateTaskByEnterKey = (key: string) => {
    if (key === "Enter") {
      subitForm();
    }
  };

  useEffect(() => {
    fetchAllTasks();
  }, []);

  const options = ["all", "done", "not done"];
  const defaultOption = options[0];
  return (
    <main className="p-6  flex flex-col items-center justify-start">
      <div>
        <p className="text-5xl">What we gonna build today?</p>

        <InputComponent
          placeholder="Títutlo"
          value={title}
          onClickPlus={subitForm}
          onKeyDown={({ key }) => handleCreateTaskByEnterKey(key)}
          onChange={({ target }) => setTitle(target.value)}
        />

        <div className="pt-5">
          <div className="flex items-center justify-between">
            <p className="text-5xl"> Created tasks </p>
            <Dropdown
              options={options}
              onChange={handleSetFilter}
              value={defaultOption}
              placeholder="Select an option"
            />
          </div>
          <InputSearchComponent
            label="Títutlo"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {tasks.length === 0 && (
            <div className="w-full flex items-center flex-col">
              <Lottie
                height={400}
                width={400}
                options={{
                  autoplay: true,
                  loop: true,
                  animationData: animationData,
                }}
              />
              <p>You do not have any task</p>
            </div>
          )}

          {tasks
            .filter((task) => {
              if (search === "") {
                return task;
              } else if (
                task.title.toLowerCase().includes(search.toLowerCase())
              ) {
                return task;
              }
            })
            .map((task, index) => (
              <TaskItem
                key={index}
                title={task.title}
                createdAt={task.createdAt}
                isDone={task.isDone}
                subTasks={task.subTasks}
                changeDoneStatus={() => handleChangeTaskStatus(task, index)}
                createSubTask={(subTask) =>
                  handleCreateSubTask(task, index, subTask)
                }
                deleteTask={() => handleDeleteTask(task)}
              />
            ))}
        </div>
      </div>
    </main>
  );
}

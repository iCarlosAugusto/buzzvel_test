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
import Swal from "sweetalert2";

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [titleError, setTitleError] = useState<string>("");

  const subitForm = async () => {
    if (!title) {
      setTitleError("You have to type something");
      return;
    }
    setTitleError("");
    try {
      const { data: task } = await axios.post(
        "http://localhost:3000/task/create",
        {
          title: title,
        }
      );
      setTitle("");
      const newTasks: Task[] = [...tasks, task];
      setTasks(newTasks);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  };

  const fetchAllTasks = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get("http://localhost:3000/task/getAll");
      setTasks(data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  };

  const handleDeleteTask = async (task: Task) => {
    try {
      await axios.post("http://localhost:3000/task/delete", {
        id: task.id,
      });
      const tasksUpdated = tasks.filter((taskItem) => taskItem.id !== task.id);
      setTasks(tasksUpdated);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  };

  const handleChangeTaskStatus = async (task: Task, index: number) => {
    const statusUpdated = !task.isDone;
    try {
      await axios.post("http://localhost:3000/task/update", {
        id: task.id,
        isDone: statusUpdated,
      });
      setTasks((oldState) => {
        const tasksTotal = [...oldState];
        tasksTotal[index].isDone = statusUpdated;
        return tasksTotal;
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  };

  const handleCreateSubTask = async (
    task: Task,
    index: number,
    subTask: string
  ) => {
    try {
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
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  };

  const handleSetFilter = async (option: any) => {
    let isDone: boolean | undefined = undefined;

    if (option.value === "done") {
      isDone = true;
    } else if (option.value === "not done") {
      isDone = false;
    }

    try {
      const { data } = await axios.get("http://localhost:3000/task/getAll", {
        params: {
          isDone: isDone,
        },
      });

      setTasks(data);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
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
          placeholder="Title"
          value={title}
          onClickPlus={subitForm}
          onKeyDown={({ key }) => handleCreateTaskByEnterKey(key)}
          onChange={({ target }) => setTitle(target.value)}
        />
        {!!titleError && <span className="text-red-600"> {titleError}</span>}

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
            <>
              {isLoading ? (
                <p>Carregando...</p>
              ) : (
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
            </>
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

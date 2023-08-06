"use client";

import { InputComponent } from "@/components/input";
import { InputSearchComponent } from "@/components/search_input";
import { TaskItem } from "@/components/task_item";
import axios from "axios";
import { Formik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import Lottie from "react-lottie";
import * as animationData from "../../public/empty.json";

interface InitialValuesProps {
  title: string;
}

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const schema = Yup.object().shape({
    title: Yup.string().required("Campo obrigatório"),
  });
  const [search, setSearch] = useState<string>("");

  const initialValues: InitialValuesProps = {
    title: "",
  };

  const subitForm = async (values: InitialValuesProps) => {
    const { data: task } = await axios.post(
      "http://localhost:3000/task/create",
      {
        title: values.title,
        message: "TESTE REMOVER",
      }
    );
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

  useEffect(() => {
    fetchAllTasks();
  }, []);

  return (
    <main className=" p-6">
      <p className="text-5xl">What we gonna build today?</p>
      <Formik
        onSubmit={subitForm}
        initialValues={initialValues}
        validationSchema={schema}
      >
        {({ handleChange, values, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <InputComponent
              placeholder="Títutlo"
              value={values.title}
              onClickPlus={handleSubmit}
              onChange={handleChange("title")}
            />
          </form>
        )}
      </Formik>

      <div className="pt-5">
        <p className="text-5xl"> Created tasks </p>
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
    </main>
  );
}

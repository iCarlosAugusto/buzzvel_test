"use client";

import { InputComponent } from "@/components/input";
import axios from "axios";
import { Formik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";

interface InitialValuesProps {
  title: string;
  message: string;
}

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const schema = Yup.object().shape({
    title: Yup.string().required("Campo obrigatório"),
    message: Yup.string().required("Campo obrigatório"),
  });

  const initialValues: InitialValuesProps = {
    title: "",
    message: "",
  };

  const subitForm = async (values: InitialValuesProps) => {
    const { data: task} = await axios.post("http://localhost:3000/task/create", {
      title: values.title,
      message: values.message,
    });
    const newTasks: Task[] = [...tasks, task];
    setTasks(newTasks);
  };

  const fetchAllTasks = async () => {
    const { data } = await axios.get("http://localhost:3000/task/getAll");
    setTasks(data);
  };

  useEffect(() => {
    fetchAllTasks();
  }, []);

  return (
    <main>
      <div className="flex justify-between">
        <p> Olá, Carlos! O que vamos resolver hoje?</p>
        <InputComponent label="Títutlo" value={""} onChange={() => {}} />
        <button> Pesquisar</button>
      </div>

      <p className="text-2xl"> O vamos criar? </p>
      <Formik
        onSubmit={subitForm}
        initialValues={initialValues}
        validationSchema={schema}
      >
        {({ handleChange, values, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <InputComponent
              label="Títutlo"
              value={values.title}
              onChange={handleChange("title")}
            />
            <InputComponent
              label="Mensagem"
              value={values.message}
              onChange={handleChange("message")}
            />
            <button type="submit">Create</button>
          </form>
        )}
      </Formik>

      <p className="text-2xl"> To-do criadas </p>

      {tasks.map((task, index) => (
        <p key={index}> {task.title}</p>
      ))}
    </main>
  );
}

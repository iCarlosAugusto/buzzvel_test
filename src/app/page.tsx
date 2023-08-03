"use client";

import { InputComponent } from "@/components/input";
import { Formik } from "formik";
import * as Yup from "yup";

interface InitialValuesProps {
  name: string;
  github: string;
  linkedin: string;
}

export default function Home() {
  const schema = Yup.object().shape({
    name: Yup.string().required("Campo obrigatório"),
    github: Yup.string().required("Campo obrigatório"),
    linkedin: Yup.string().required("Campo obrigatório"),
  });

  const initialValues: InitialValuesProps = {
    name: "",
    github: "",
    linkedin: "",
  };

  const subitForm = (values: InitialValuesProps) => {
    console.log(values);
  };

  return (
    <main>
      <p> QR Code Generator </p>
      <Formik
        onSubmit={subitForm}
        initialValues={initialValues}
        validationSchema={schema}
      >
        {({ handleChange, values, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <InputComponent
              label="name"
              value={values.name}
              onChange={handleChange("name")}
            />
            <InputComponent
              label="LinkedIn"
              value={values.linkedin}
              onChange={handleChange("linkedin")}
            />
            <InputComponent
              label="Github"
              value={values.github}
              onChange={handleChange("github")}
            />
            <button type="submit"> 
              Generate Image
            </button>
          </form>
        )}
      </Formik>
    </main>
  );
}

import "./styles.css";
import Form from "./components/Form";
import withMultiStepForm from "./utils/withMultiStepForm";
import { FormEvent } from "react";
import { FormData, FormProps } from "./types";

const MULTI_STEP_FORM: FormProps[] = [
  {
    title: "User Detail",
    inputFields: [
      {
        labelName: "First Name",
        autoFocus: true,
        formKey: "firstName"
      },
      { labelName: "Last Name", formKey: "lastName" },
      { labelName: "Age", type: "number", formKey: "age" }
    ]
  },
  {
    title: "User Address",
    inputFields: [
      {
        labelName: "Street",
        autoFocus: true,
        formKey: "street"
      },
      { labelName: "City", formKey: "city" },
      { labelName: "State", formKey: "state" },
      { labelName: "Zip", type: "number", formKey: "zip" }
    ]
  },
  {
    title: "Account Creation",
    inputFields: [
      {
        labelName: "Email",
        autoFocus: true,
        type: "email",
        formKey: "email"
      },
      { labelName: "Password", type: "password", formKey: "password" }
    ]
  }
];

export default function App() {
  const handleSubmit = async (
    e: FormEvent<HTMLFormElement>,
    data: FormData
  ) => {
    e.preventDefault();
    await new Promise((resolve) => setTimeout(resolve, 2000));
    window.alert(`Thanks for submiting ${data.firstName} ${data.lastName}`);
  };

  const MultiStepForm = withMultiStepForm({
    formSteps: MULTI_STEP_FORM.map(({ title, inputFields }) => (
      <Form key={title} title={title} inputFields={inputFields} />
    )),
    onSubmit: handleSubmit
  });

  return <MultiStepForm />;
}

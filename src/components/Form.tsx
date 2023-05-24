import { Fragment } from "react";
import { FormProps } from "../types";
import CustomInput from "./CustomInput";

function Form({ title, inputFields }: FormProps) {
  return (
    <>
      <h2 className="form-title">{title}</h2>
      <div className="form-content">
        {inputFields.map(({ formKey, labelName, ...rest }) => (
          <Fragment key={formKey}>
            <label htmlFor={`form-${formKey}`}>{labelName}</label>
            <CustomInput
              id={`form-${formKey}`}
              formKey={formKey}
              required
              {...rest}
            />
          </Fragment>
        ))}
      </div>
    </>
  );
}

export default Form;

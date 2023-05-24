import { InputHTMLAttributes } from "react";
import { useFormStore, updateForm } from "../utils/formStore";
import { FormData } from "../types";

interface CustomInputProps extends InputHTMLAttributes<HTMLInputElement> {
  formKey: keyof FormData;
}

function CustomInput({ formKey, ...rest }: CustomInputProps) {
  const value = useFormStore((state) => state[formKey]);

  return (
    <input
      value={value}
      onChange={(e) => updateForm({ [formKey]: e.target.value })}
      {...rest}
    />
  );
}

export default CustomInput;

import { InputHTMLAttributes } from "react";

export type UserFormData = {
  firstName: string;
  lastName: string;
  age: string;
};

export type AddressFormData = {
  street: string;
  city: string;
  state: string;
  zip: string;
};

export type AccountFormData = {
  email: string;
  password: string;
};

export type FormData = UserFormData & AddressFormData & AccountFormData;

export type FormProps = {
  title: string;
  inputFields: (InputHTMLAttributes<HTMLInputElement> & {
    labelName: string;
    formKey: keyof FormData;
  })[];
};

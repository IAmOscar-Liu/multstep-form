import { useSyncExternalStore } from "react";
import { FormData } from "../types";

const INITIAL_DATA: FormData = Object.freeze({
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  age: "",
  street: "",
  city: "",
  state: "",
  zip: ""
});

const createFormStore = () => {
  let state = { ...INITIAL_DATA };

  const listeners = new Set<(state: FormData) => void>();
  const subscribe = (listener: (state: FormData) => void) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  };
  const emitChange = () => listeners.forEach((listener) => listener(state));

  return {
    updateForm: (newState: Partial<FormData>) => {
      state = { ...state, ...newState };
      emitChange();
    },
    getFormData: () => state,
    useFormStore: <SelectorOutput>(
      selector: (state: FormData) => SelectorOutput
    ): SelectorOutput => useSyncExternalStore(subscribe, () => selector(state))
  };
};

const formStore = createFormStore();

export const { updateForm, getFormData, useFormStore } = formStore;

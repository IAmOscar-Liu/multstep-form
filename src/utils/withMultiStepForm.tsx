import { useState, FormEvent, ReactNode } from "react";
import { FormData } from "../types";
import { getFormData } from "./formStore";

export default function withMultiStepForm({
  formSteps,
  onSubmit,
}: {
  formSteps: ReactNode[];
  onSubmit: (e: FormEvent<HTMLFormElement>, data: FormData) => Promise<unknown>;
}) {
  return () => {
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [isLoading, toggleIsLoading] = useState(false);

    const isFirstStep = currentStepIndex !== 0;
    const isLastStep = currentStepIndex === formSteps.length - 1;

    const next = () => {
      setCurrentStepIndex((prev) => {
        if (prev >= formSteps.length - 1) return prev;
        return prev + 1;
      });
    };

    const back = () => {
      setCurrentStepIndex((prev) => {
        if (prev <= 0) return prev;
        return prev - 1;
      });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
      if (isLoading) return;
      if (isLastStep) {
        toggleIsLoading(true);
        await onSubmit(e, getFormData());
        toggleIsLoading(false);
        return;
      }
      e.preventDefault();
      next();
    };

    return (
      <div className="form-wrapper">
        <form onSubmit={handleSubmit}>
          <div className="form-page">
            {currentStepIndex + 1} / {formSteps.length}
          </div>
          {formSteps[currentStepIndex]}
          <div className="form-btns">
            {isFirstStep && (
              <button type="button" onClick={back}>
                Back
              </button>
            )}
            <button type="submit">
              {isLoading ? "Loading" : isLastStep ? "Finish" : "Next"}
            </button>
          </div>
        </form>
      </div>
    );
  };
}

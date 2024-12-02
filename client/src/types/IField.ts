import { ChangeEvent } from "react";
import { FieldError } from "react-hook-form";

export interface IField<T = HTMLInputElement> {
  type: string;
  name: string;
  id: string;
  placeholder?: string;
  inputClassName: string;
  defaultValue?: string | number;
  value?: string | number;
  disabled?: boolean;
  label?: string;
  error?: FieldError;
  required?: boolean;
  errorMessage?: string;
  onChange: (event: ChangeEvent<T>) => void;
  classNameInputBlock?: string;
}

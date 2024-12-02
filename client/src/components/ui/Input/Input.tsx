import classNames from "classnames";
import {
  useState,
  forwardRef,
  ChangeEvent,
  ForwardRefRenderFunction,
} from "react";
import { IField } from "@/types/IField.ts";

const Input: ForwardRefRenderFunction<HTMLInputElement, IField> = (
  {
    type,
    id,
    name,
    placeholder,
    inputClassName,
    defaultValue,
    disabled,
    label,
    error,
    errorMessage,
    onChange,
    value,
    required = false,
    classNameInputBlock,
  },
  ref,
) => {
  const [hasValue, setHasValue] = useState(!!defaultValue || !!value);
  const [isError, setIsError] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setHasValue(!!e.target.value);
    onChange(e);
  };

  const handleBlur = () => {
    if (required && !hasValue) {
      setIsError(true);
    } else {
      setIsError(false);
    }
  };

  const classNameInput = classNameInputBlock || "";

  return (
    <div
      className={classNames("my-2 sm:my-6 z-10", {
        [classNameInput]: !!classNameInputBlock,
      })}
    >
      <div className="flex flex-col relative my-2">
        <label
          htmlFor={id}
          className={`absolute mx-5 transition-transform duration-300 text-gray500 ${
            hasValue ? "top-3 text-xs" : "top-9"
          } transform -translate-y-1/2 ${error || isError ? "text-red600" : ""}`}
        >
          {label}
        </label>
        <input
          ref={ref}
          type={type}
          name={name}
          id={id}
          value={value}
          placeholder={placeholder}
          className={`${inputClassName} ${disabled && "bg-gray100 text-gray500"} ${error || isError ? "border-red600" : ""} focus-ring-brand`}
          defaultValue={defaultValue}
          disabled={disabled}
          required={required}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </div>
      {(error || isError) && errorMessage && (
        <span className="text-red600 text-base absolute bottom-[-24px] xl:bottom-0 w-[500px]">
          {errorMessage}
        </span>
      )}
    </div>
  );
};

export default forwardRef(Input);

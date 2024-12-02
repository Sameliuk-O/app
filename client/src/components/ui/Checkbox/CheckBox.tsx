import { forwardRef, ChangeEvent } from "react";

interface CheckBoxProps {
  name: string;
  id: string;
  inputClassName?: string;
  labelClassName?: string;
  label?: string;
  defaultChecked?: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const CheckBox = forwardRef<HTMLInputElement, CheckBoxProps>(
  (
    {
      id,
      name,
      inputClassName,
      defaultChecked,
      label,
      labelClassName,
      onChange,
    },
    ref,
  ) => {
    return (
      <div className="relative">
        <input
          type="checkbox"
          name={name}
          id={id}
          className={`${inputClassName} cursor-pointer`}
          defaultChecked={defaultChecked}
          ref={ref}
          onChange={onChange}
        />
        <label htmlFor={id} className={labelClassName}>
          {label}
        </label>
      </div>
    );
  },
);

export default CheckBox;

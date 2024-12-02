import { months } from "@/constants/months";
import {
  useState,
  forwardRef,
  ChangeEvent,
  ForwardRefRenderFunction,
} from "react";
import { IField } from "@/types/IField";

interface DateInputProps extends Omit<IField<HTMLSelectElement>, "onChange"> {
  onChange: (
    e: ChangeEvent<HTMLSelectElement> & {
      target: { name: string; value: { month: string; year: string } };
    },
  ) => void;
}

const DateInput: ForwardRefRenderFunction<HTMLSelectElement, DateInputProps> = (
  { id, name, inputClassName, disabled, onChange },
  ref,
) => {
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, index) =>
    (currentYear - index).toString(),
  );

  const handleMonthChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedMonth(e.target.value);
    const event = {
      ...e,
      target: {
        ...e.target,
        name,
        value: {
          year: selectedYear,
          month: e.target.value,
        },
      },
    } as ChangeEvent<HTMLSelectElement> & {
      target: { name: string; value: { month: string; year: string } };
    };
    onChange(event);
  };

  const handleYearChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(e.target.value);
    const event = {
      ...e,
      target: {
        ...e.target,
        name,
        value: {
          month: selectedMonth,
          year: e.target.value,
        },
      },
    } as ChangeEvent<HTMLSelectElement> & {
      target: { name: string; value: { month: string; year: string } };
    };
    onChange(event);
  };

  return (
    <div className="flex flex-col relative my-4">
      <div className="flex space-x-2">
        <select
          ref={ref}
          name={`${name}-month`}
          id={`${id}-month`}
          value={selectedMonth}
          onChange={handleMonthChange}
          className={`${inputClassName} ${disabled ? "bg-gray100 text-gray500" : "text-gray300"} text-gray300`}
          disabled={disabled}
        >
          <option className="text-gray500" value="">
            Місяць
          </option>
          {months.map((month) => (
            <option
              key={`month-${month.value}`}
              value={month.value}
              className="text-gray800"
            >
              {month.name}
            </option>
          ))}
        </select>
        <select
          ref={ref}
          name={`${name}-year`}
          id={`${id}-year`}
          value={selectedYear}
          onChange={handleYearChange}
          className={`${inputClassName} ${disabled ? "bg-gray10 text-gray500" : "text-gray500"} text-gray500`}
          disabled={disabled}
        >
          <option value="">Рік</option>
          {years.map((year) => (
            <option key={`year-${year}`} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default forwardRef(DateInput);

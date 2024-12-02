interface SwitchProps {
  isChecked: boolean;
  setIsChecked: (value: boolean) => void;
  className?: string;
  id: string;
}

const Switch = (props: SwitchProps) => {
  const { isChecked, setIsChecked, className, id } = props;
  const toggleSwitch = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div className={className}>
      <div className="relative inline-block w-10 mr-2 ease-in">
        <input
          type="checkbox"
          name="toggle"
          id={id}
          checked={isChecked}
          onChange={toggleSwitch}
          className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
        />
        <label
          htmlFor="toggle"
          className={`toggle-label block overflow-hidden h-6 rounded-full cursor-pointer ${
            isChecked ? "bg-green-400" : "bg-gray-300"
          }`}
        ></label>
      </div>
      <style>
        {`
          .toggle-checkbox:checked {
            right: 0;
            border-color: #68d391;
          }
          .toggle-checkbox:checked + .toggle-label {
            background-color: #68d391;
          }
        `}
      </style>
    </div>
  );
};

export default Switch;

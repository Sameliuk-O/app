import classNames from "classnames";

interface Button {
  text: string;
  className?: string;
  type: "submit" | "reset" | "button";
  disabled?: boolean;
  onClick?: () => void;
}

const Button = (props: Button) => {
  const { text, className, type, disabled, onClick } = props;
  return (
    <button
      className={classNames(className, "focus-ring-brand text-white", {
        "cursor-not-allowed bg-brand200": disabled,
        "hover:bg-brand300 bg-brand400": !disabled,
      })}
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;

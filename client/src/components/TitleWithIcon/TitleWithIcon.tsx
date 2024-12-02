import { ITitleWithIcon } from "@/types/ITitleWithIcon.ts";
import classNames from "classnames";
import { Link } from "react-router-dom";

const TitleWithIcon = (props: ITitleWithIcon) => {
  const {
    text,
    optionalText,
    classNameBlock,
    classNameOptional,
    icon,
    classNameButton,
    classNameLink,
    optionalLink,
    iconOption,
    buttonAction,
  } = props;

  return (
    <div
      className={classNames("flex pb-7 lg:pb-10 border-b", {
        [`${classNameBlock}`]: classNameBlock,
      })}
    >
      <div className="flex">
        <button
          onClick={buttonAction}
          className={classNames("focus-ring-brand", {
            classNameButton: !!classNameButton,
          })}
        >
          {icon}
        </button>
        <div className="ml-5">
          <h1 className="text-2xl sm:text-3xl text-gray500">{text}</h1>
          {optionalText && <p className={classNameOptional}>{optionalText}</p>}
        </div>
      </div>
      {optionalLink && (
        <Link
          to={optionalLink}
          className={classNames("focus-ring-brand", {
            classNameLink: !!classNameLink,
          })}
        >
          {iconOption}
        </Link>
      )}
    </div>
  );
};

export default TitleWithIcon;

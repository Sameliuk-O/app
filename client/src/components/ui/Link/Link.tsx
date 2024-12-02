import { ILink } from "@/types/ILink";
import { cloneElement } from "react";
import classNames from "classnames";
import { Link as LinkReact } from "react-router-dom";

const Link = ({
  icon,
  link,
  text,
  classNameLink,
  isActive,
  setActiveLink,
  messages,
  setCloseModal,
  onClick,
}: ILink) => {
  const iconWithProps =
    icon &&
    cloneElement(icon, {
      className: classNames(`${icon.props.className} text-gray500`, {
        "fill-brand800": isActive,
      }),
    });

  return (
    <LinkReact
      onClick={() => {
        setActiveLink && setActiveLink(link);
        setCloseModal && setCloseModal(false);
        onClick && onClick();
      }}
      to={link}
      className={classNames(
        "flex text-gray500 mb-1 justify-between text-xl focus-ring-brand w-full hover:shadow-lg xl:px-4 md:py-2.5 rounded-2xl",
        {
          [`${classNameLink}`]: !!classNameLink,
          ["shadow-lg bg-brand100"]: isActive,
          "mr-0": messages !== undefined,
          "mr-[42px]": messages === undefined,
        },
      )}
    >
      <div className="flex items-center">
        {iconWithProps}
        <span
          className={classNames("ml-1 text-gray500", {
            ["text-brand800"]: isActive,
          })}
        >
          {text}
        </span>
      </div>
      {messages && (
        <span className="bg-red-500 text-gray500 rounded-full px-4 text-white ml-5 flex items-center">
          {messages}
        </span>
      )}
    </LinkReact>
  );
};

export default Link;

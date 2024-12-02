import { useState, useEffect, useRef } from "react";
import IcoMoon from "react-icomoon";
import classNames from "classnames";

import icomoon from "@/constants/icomoon.json";

interface ISelector {
  options: string[] | number[];
  setSelectedValue: (value: string | number) => void;
  selectValue: string | number;
}

const Selector = (props: ISelector) => {
  const { options, setSelectedValue, selectValue } = props;
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const selectNewValue = (newValue: string | number) => {
    setSelectedValue(newValue);
    toggleDropdown();
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="flex justify-between items-center w-full px-5 py-6 text-gray800 text-xl bg-white border border-gray300 rounded-lg focus-ring-brand hover:bg-gray100"
      >
        <span className="pr-12">{selectValue}</span>
        <IcoMoon
          iconSet={icomoon}
          icon="arrow_left"
          className={classNames("h-3 w-5 fill-gray800", {
            "rotate-90": isOpen,
            "-rotate-90": !isOpen,
          })}
        />
      </button>
      {isOpen && (
        <ul className="absolute right-0 text-xl w-full z-10 mt-1 bg-white text-gray800 border border-gray300 rounded-lg shadow-lg max-h-48 overflow-auto">
          {options.map((option) => (
            <li
              key={option}
              className={classNames(
                "px-5 py-3 cursor-pointer flex justify-between items-center hover:bg-gray200",
                { "bg-gray100": option === selectValue },
              )}
              onClick={() => option !== selectValue && selectNewValue(option)}
            >
              {option}
              {option === selectValue && (
                <IcoMoon
                  iconSet={icomoon}
                  icon="accept"
                  className={classNames("h-6 w-6 fill-brand400")}
                />
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Selector;

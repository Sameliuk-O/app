import classNames from "classnames";
import IcoMoon from "react-icomoon";
import { Link } from "react-router-dom";

import { Block } from "@/components/ui/Block";
import { Icon } from "@/components/ui/Icon";
import { IContact } from "@/constants/serviceContactsInformation.tsx";

import icomoon from "@/constants/icomoon.json";

interface IContacts {
  name: string;
  department: string;
  providerName: string;
  icon: string;
  workSchedule: string;
  site: string;
  setShowActiveElement?: (el: string[]) => void;
  showActiveElement?: string[];
  contacts: IContact[];
  activeBlock?: boolean;
}

const Contacts = (props: IContacts) => {
  const {
    name,
    providerName,
    showActiveElement = [name],
    setShowActiveElement,
    workSchedule,
    site,
    icon,
    department,
    contacts,
    activeBlock = false,
  } = props;

  return (
    <Block
      className={classNames("my-2.5 p-8 text-xl ", {
        "border-0": !activeBlock,
        "cursor-pointer hover:bg-gray50 hover:shadow-lg": activeBlock,
      })}
      key={name + department}
    >
      <button
        className="flex justify-between items-center w-full"
        onClick={() => {
          if (setShowActiveElement && showActiveElement) {
            const newActiveElements = showActiveElement.includes(name)
              ? showActiveElement.filter((el) => el !== name)
              : [...showActiveElement, name];

            setShowActiveElement(newActiveElements);
          }
        }}
      >
        <div className="flex">
          <Icon imgUrl={icon} imgAlt={name} />
          <div className="ml-5">
            <p
              className={classNames("text-left text-sm lg:text-lg", {
                "text-yellow600": providerName === "gas-supply",
                "text-blue600": providerName === "water-supply",
                "text-green600": providerName === "electricity-supply",
                "text-red600": providerName === "heat-supply",
              })}
            >
              {department}
            </p>
            <h2 className="lg:text-3xl">{name}</h2>
          </div>
        </div>

        {activeBlock && (
          <IcoMoon
            iconSet={icomoon}
            icon="arrow_left"
            className={`h-5 fill-gray500 hover:fill-gray600 ${showActiveElement.includes(name) ? "rotate-[90deg]" : "rotate-[270deg]"}`}
          />
        )}
      </button>
      {showActiveElement.includes(name) && (
        <div className="my-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
            {contacts.map((item, contactIndex) => (
              <div
                className="my-2.5"
                key={`${item.provider}-${name}-${contactIndex}`}
              >
                <div className="flex">
                  <Icon
                    imgUrl={item.icon}
                    imgAlt={item.provider}
                    classNameImg="mr-2"
                  />
                  <span>{item.provider}:</span>
                </div>
                <div>
                  {item.phones.map((phone, phoneIndex) => (
                    <p>
                      <a
                        className="my-1 text-grayMain font-medium"
                        key={`${phone}-${contactIndex}-${phoneIndex}`}
                        href={`tel:${phone}`}
                      >
                        {phone}
                      </a>
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <p className="text-grayMain text-lg md:text-xl">{workSchedule}</p>
          <p className="text-grayMain mt-2.5 text-lg md:mt-5">
            Сайт:{" "}
            <Link
              to={site}
              target="_blank"
              className="text-brand500 hover:text-brand600 focus-ring-brand"
            >
              {site}
            </Link>
          </p>
        </div>
      )}
    </Block>
  );
};

export default Contacts;

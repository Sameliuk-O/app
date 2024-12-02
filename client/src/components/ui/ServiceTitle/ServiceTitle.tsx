import { Contacts } from "@/components/Contacts";
import { Icon } from "@/components/ui/Icon";
import { Modal } from "@/components/ui/Modal";
import icomoon from "@/constants/icomoon.json";
import { serviceContactsInformation } from "@/constants/serviceContactsInformation.tsx";
import { IServiceTitle } from "@/types/IServiceTitle.ts";
import classNames from "classnames";
import { useState } from "react";
import IcoMoon from "react-icomoon";

const ServiceTitle = (props: IServiceTitle) => {
  const { icon, service, provider, providerName, contact } = props;

  const [isHover, setIsHover] = useState(false);
  const [isOpenContact, setIsOpenContact] = useState(false);

  const contactData = serviceContactsInformation.find(
    (el) => el.name === service,
  );

  return (
    <div className="sm:flex justify-between mt-10">
      <div className="flex">
        <Icon
          imgUrl={icon}
          imgAlt={provider}
          classNameImg="h-[55px] w-[55px] sm:h-[70px] sm:w-[70px]"
        />
        <div className="ml-4">
          <p
            className={classNames("text-left text-lg", {
              "text-brand400": providerName === "gas-supply",
              "text-blue800": providerName === "water-supply",
              "text-green700": providerName === "electricity-supply",
              "text-red600": providerName === "heat-supply",
            })}
          >
            {provider}
          </p>
          <p className="text-left text-2xl text-nowrap text-gray800">
            {service}
          </p>
        </div>
      </div>
      {contact && (
        <>
          <button
            type="button"
            className="flex text-xl items-center px-8 py-3 mt-6 border border-gray200 rounded-2xl hover:bg-brand300 hover:text-white w-full justify-center sm:mt-0 sm:w-fit sm:py-5 focus-ring-brand"
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            onClick={() => setIsOpenContact(true)}
          >
            <IcoMoon
              iconSet={icomoon}
              className={classNames("mr-2 h-9 w-9", {
                "fill-white": isHover,
                "fill-gray700": !isHover,
              })}
              icon="phone"
            />
            Контакти
          </button>

          <Modal isOpen={isOpenContact} onClose={() => setIsOpenContact(false)}>
            {contactData && (
              <Contacts
                name={contactData.name}
                department={contactData.department}
                providerName={contactData.providerName}
                icon={contactData.icon}
                workSchedule={contactData.workSchedule}
                site={contactData.site}
                contacts={contactData.contacts}
              />
            )}
          </Modal>
        </>
      )}
    </div>
  );
};

export default ServiceTitle;

import { Block } from "@/components/ui/Block";
import { serviceContactsInformation } from "@/constants/serviceContactsInformation.tsx";
import { useState } from "react";
import { ReferenceTitleBlock } from "@/components/ReferenceTitleBlock";
import Contacts from "../../components/Contacts/Contacts.tsx";

const InformationContacts = () => {
  const defaultShowActiveElement = serviceContactsInformation[0].name;
  const [showActiveElement, setShowActiveElement] = useState<Array<string>>([
    defaultShowActiveElement,
  ]);

  console.log(showActiveElement);

  return (
    <Block className="border-0 pb-5 px-0 lg:border lg:p-5">
      <ReferenceTitleBlock />
      <section>
        <h2 className="text-2xl text-grayMain my-5 lg:text-3xl lg:mx-6">
          Контакти підприємств
        </h2>
        {serviceContactsInformation.map((element) => (
          <Contacts
            contacts={element.contacts}
            icon={element.icon}
            site={element.site}
            name={element.name}
            providerName={element.providerName}
            workSchedule={element.workSchedule}
            showActiveElement={showActiveElement}
            setShowActiveElement={setShowActiveElement}
            department={element.department}
            key={element.providerName + element.site}
            activeBlock={true}
          />
        ))}
      </section>
    </Block>
  );
};

export default InformationContacts;

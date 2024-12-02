import { DescriptionTextBlock } from "@/components/DescriptionTextBlock";
import { CreateHomeForm } from "@/components/forms/CreateHomeForm";
import { TitleWithIcon } from "@/components/TitleWithIcon/";
import { Block } from "@/components/ui/Block";

import icomoon from "@/constants/icomoon.json";
import { routingBack } from "@/utils/routingBack.ts";
import IcoMoon from "react-icomoon";
const CreateHome = () => {
  return (
    <Block className="p-4 sm:p-10">
      <TitleWithIcon
        text="Додати помешкання"
        icon={
          <IcoMoon
            className="h-10 w-10 fill-gray600 hover:fill-gray900"
            iconSet={icomoon}
            icon="arrow_left"
          />
        }
        buttonAction={routingBack}
      />
      <div className="mt-5 sm:mt-10">
        <DescriptionTextBlock
          mainText="Адреса помешкання"
          optionalText="Введіть адресу помешкання заякою плануєте передавати показники лічильників"
        />
        <CreateHomeForm />
      </div>
    </Block>
  );
};

export default CreateHome;

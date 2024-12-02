import { DescriptionTextBlock } from "@/components/DescriptionTextBlock";
import { EditHomeForm } from "@/components/forms/EditHomeForm";
import { TitleWithIcon } from "@/components/TitleWithIcon";
import { Block } from "@/components/ui/Block";
import { userStore } from "@/stores/userStore.ts";
import { routingBack } from "@/utils/routingBack.ts";
import { useParams } from "react-router-dom";
import icomoon from "@/constants/icomoon.json";
import IcoMoon from "react-icomoon";

const UpdateHome = () => {
  const { id } = useParams();
  const userId = userStore((state) => state.userId);

  return (
    <Block className="p-5">
      <TitleWithIcon
        text="До адрес"
        icon={
          <IcoMoon
            className="h-10 w-10 fill-gray600 hover:fill-gray900"
            iconSet={icomoon}
            icon="arrow_left"
          />
        }
        buttonAction={routingBack}
        classNameBlock="lg:pb-4 mb-4"
      />
      <DescriptionTextBlock
        mainText="Адреса помешкання"
        optionalText="Введіть адресу помешкання заякою плануєте передавати показники лічильників"
      />
      <EditHomeForm userId={userId} homeId={id} />
    </Block>
  );
};

export default UpdateHome;

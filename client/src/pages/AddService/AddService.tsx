import { AddServiceForm } from "@/components/forms/AddServiceForm";
import { TitleWithIcon } from "@/components/TitleWithIcon";
import { AddServiceInformation } from "@/components/ui/AddServiceInformation";
import { Block } from "@/components/ui/Block";
import { ServiceTitle } from "@/components/ui/ServiceTitle";
import icomoon from "@/constants/icomoon.json";
import { userStore } from "@/stores/userStore.ts";
import { routingBack } from "@/utils/routingBack.ts";
import IcoMoon from "react-icomoon";
import { useParams } from "react-router-dom";
import { providers } from "@/constants/providers.ts";

const AddService = () => {
  const { id, providerName, serviceName } = useParams();
  const userId = userStore((state) => state.userId);
  const userHomes = userStore((state) => state.userHomes);

  const currentHome = userHomes.find(
    (el) => id && +id === el.id && userId === el.uuid,
  );

  const provider = providers.find(
    (el) => el.providerName === providerName && el.serviceName === serviceName,
  );

  return (
    <Block className="p-5 sm:p-10">
      <TitleWithIcon
        icon={
          <IcoMoon
            className="h-10 w-10 fill-gray600 hover:fill-gray900"
            iconSet={icomoon}
            icon="arrow_left"
          />
        }
        text="Комунальні сервіси"
        optionalText={`м. ${currentHome?.city}, вул. ${currentHome?.street}, буд. ${currentHome?.building}, кв. ${currentHome?.apartment} `}
        classNameOptional="text-gray400 text-xl mt-2"
        classNameButton="h-9"
        iconOption={
          <IcoMoon
            iconSet={icomoon}
            className="text-gray400 text-xl mt-2 h-14 w-14 fill-gray600 hover:fill-gray900"
            icon="setting"
          />
        }
        optionalLink="#"
        classNameBlock="justify-between"
        buttonAction={routingBack}
      />
      {provider && (
        <ServiceTitle
          icon={provider.icon}
          service={provider.service}
          provider={provider.provider}
          contact={provider.contact}
          providerName={provider.providerName}
        />
      )}
      <AddServiceInformation information="Для підключення комунального підприємства, потрібно єдиноразово ввести наступну інформацію" />

      {provider && currentHome && (
        <AddServiceForm
          provider={provider.serviceName}
          userId={userId}
          homeId={currentHome.id}
        />
      )}
    </Block>
  );
};

export default AddService;

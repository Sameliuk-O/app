import { TitleWithIcon } from "@/components/TitleWithIcon";
import { Block } from "@/components/ui/Block";
import { ServiceLink } from "@/components/ui/ServiceLink";
import icomoon from "@/constants/icomoon.json";
import { providers } from "@/constants/providers.ts";
import { userStore } from "@/stores/userStore.ts";
import { routingBack } from "@/utils/routingBack.ts";
import classNames from "classnames";
import IcoMoon from "react-icomoon";
import { useParams } from "react-router-dom";
import { RoutingBack } from "@/components/ui/RoutingBack/index.ts";

const ChooseServices = () => {
  const { id } = useParams();
  const userId = userStore((state) => state.userId);
  const userHomes = userStore((state) => state.userHomes);

  const currentHome = userHomes.find(
    (el) => id && +id === el.id && userId === el.uuid,
  );

  return (
    <Block className="p-5 sm:p-10">
      <TitleWithIcon
        text="Комунальні сервіси"
        optionalText={`м. ${currentHome?.city}, вул. ${currentHome?.street}, буд. ${currentHome?.building}, кв. ${currentHome?.apartment} `}
        classNameOptional="text-base text-gray500 sm:text-xl mt-2"
        classNameButton="h-9"
        classNameBlock="justify-between"
        icon={
          <IcoMoon
            className="h-10 w-10 fill-gray600 hover:fill-gray900"
            iconSet={icomoon}
            icon="arrow_left"
          />
        }
        buttonAction={routingBack}
        iconOption={
          <IcoMoon
            className="mr-5 h-10 w-10 fill-gray400 hover:fill-gray600"
            iconSet={icomoon}
            icon="kebab_points"
          />
        }
        optionalLink="#"
      />
      <div className="text-gray800 mt-10">
        <h1 className="text-xl sm:text-3xl">Додати коммунальне підприємство</h1>
        <p className="text-base sm:text-lg">
          Оберіть комунальне підприємство яке надає вам послуги за цією адресою.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-6 mb-10">
        {providers.map((el) => (
          <ServiceLink
            key={el.id}
            link={`/home/edit/${id}/choose/${el.providerName}/${el.serviceName}`}
            imgUrl={el.icon}
            imgAlt={el.provider}
            provider={el.provider}
            service={el.service}
            linkClassName="border border-black py-4 pl-4 sm:py-6 sm:pl-6 flex rounded-2xl hover:bg-gray-100"
            providerClassName={classNames("text-left text-sm sm:text-lg", {
              "text-brand400": el.providerName === "gas-supply",
              "text-blue800": el.providerName === "water-supply",
              "text-green700": el.providerName === "electricity-supply",
              "text-red600": el.providerName === "heat-supply",
            })}
            serviceClassName="text-left text-lg sm:text-2xl"
            classNameImg="w-[45px] h-[45px] sm:w-[60px] sm:h-[60px]"
          />
        ))}
      </div>
      <RoutingBack
        text="Повернутися назад"
        classNameButton="border rounded-2xl py-6 w-full text-xl cursor-pointer hover:bg-gray50 hover:shadow-lg"
      />
    </Block>
  );
};

export default ChooseServices;

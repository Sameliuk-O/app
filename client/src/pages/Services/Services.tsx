import { LoadingSkeletonService } from "@/components/LoadingSkeletonService";
import { ServiceCountersBlock } from "@/components/ServiceCountersBlock";
import { TitleWithIcon } from "@/components/TitleWithIcon";
import { Block } from "@/components/ui/Block";
import { Button } from "@/components/ui/Button";
import { ServiceTitle } from "@/components/ui/ServiceTitle";
import icomoon from "@/constants/icomoon.json";
import { getHomeCounters } from "@/services/getHomeCounters.ts";
import { getHomeServices } from "@/services/getHomeServices.ts";
import { sendCounters } from "@/services/sendCounters.ts";
import { userStore } from "@/stores/userStore.ts";
import { routingBack } from "@/utils/routingBack.ts";
import { useEffect, useState } from "react";
import IcoMoon from "react-icomoon";
import { useParams } from "react-router-dom";
import { providers } from "@/constants/providers.ts";

const Services = () => {
  const { homeId } = useParams();

  const userId = userStore((state) => state.userId);
  const userHomes = userStore((state) => state.userHomes);
  const homeServices = userStore((state) => state.homeServices) || [];
  const setHomeServices = userStore((state) => state.setHomeServices);
  const setHomeCounters = userStore((state) => state.setHomeCounters);
  const [loading, setLoading] = useState(true);
  const newHomeCounters = userStore((state) => state.newHomeCounters);
  const setNewHomeCounters = userStore((state) => state.setNewHomeCounters);
  const [isSendAllData, setIsSendAllData] = useState(false);

  const currentHome = userHomes.find(
    (el) => homeId && +homeId === el.id && userId === el.uuid,
  );

  const fetchServices = async () => {
    if (homeId) {
      setLoading(true);
      try {
        const services = await getHomeServices(+homeId);
        setHomeServices(services);
      } catch (error) {
        console.error("Error fetching home services:", error);
      } finally {
        setTimeout(() => setLoading(false), 400);
      }
    }
  };

  const fetchCounters = async () => {
    if (homeId) {
      try {
        const counters = await getHomeCounters(+homeId);
        setHomeCounters(counters);
      } catch (error) {
        console.error("Error fetching home counters:", error);
      }
    }
  };

  useEffect(() => {
    setNewHomeCounters({});
    fetchServices();
    fetchCounters();
  }, [homeId]);

  if (loading) {
    return <LoadingSkeletonService />;
  }

  const handleSubmitAllCounters = async () => {
    try {
      if (homeId) {
        const response = await sendCounters({
          ...newHomeCounters,
          homeId: +homeId,
        });
        setIsSendAllData(true);
        setHomeCounters(response);
        return response;
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Block className="p-5 mb:p-6 2xl:p-10">
      <TitleWithIcon
        text="Всі адреси"
        optionalText={`м. ${currentHome?.city}, вул. ${currentHome?.street}, буд. ${currentHome?.building}, кв. ${currentHome?.apartment} `}
        classNameOptional="text-gray400 text-xl mt-2"
        classNameButton="h-9"
        optionalLink={`/home/edit/${homeId}`}
        classNameBlock="justify-between"
        icon={
          <IcoMoon
            className="h-10 w-10 fill-gray600 hover:fill-gray900"
            iconSet={icomoon}
            icon="arrow_left"
          />
        }
        iconOption={
          currentHome && (
            <IcoMoon
              iconSet={icomoon}
              className="text-xl mt-2 h-14 w-14 fill-gray600 hover:fill-gray900"
              icon="setting"
            />
          )
        }
        buttonAction={routingBack}
      />

      <h2 className="text-gray500 text-3xl my-10">Передача показників</h2>

      {homeServices.map((service, index) =>
        providers.map(
          (provider) =>
            provider.serviceName === service.serviceName && (
              <div
                key={provider.serviceName + service.service + index}
                className={
                  homeServices.length - 1 !== index
                    ? "pb-10 border-b-2 border-dashed border-gray200"
                    : ""
                }
              >
                <ServiceTitle
                  icon={provider.icon}
                  service={provider.service}
                  provider={provider.provider}
                  providerName={provider.providerName}
                />
                <ServiceCountersBlock
                  service={provider?.serviceName}
                  classNameBlockDescription="xl:flex"
                  classNameButton="w-full xl:max-w-[250px] lg:mr-20 text-xl"
                  displayTitle={false}
                  serviceName={provider.service}
                  isSendAllData={isSendAllData}
                  setIsSendAllData={setIsSendAllData}
                />
              </div>
            ),
        ),
      )}
      <Button
        text="Передати всі показники"
        className="rounded-2xl w-full py-5 text-2xl text-white mt-10"
        type="submit"
        onClick={handleSubmitAllCounters}
      />
    </Block>
  );
};

export default Services;

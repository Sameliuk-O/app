import { OverlayContainer } from "@/components/OverlayContainer";
import {
  blueChart,
  greenChart,
  redChart,
  yellowChart,
} from "@/constants/colors.ts";
import { getUserFlowStateFrigade } from "@/services/getUserFlowStateFrigade.ts";
import { IFlowState } from "@/types/IFlowState.ts";
import * as Frigade from "@frigade/react";
import { useEffect, useState } from "react";
import IcoMoon from "react-icomoon";
import { useNavigate, useParams } from "react-router-dom";
import classNames from "classnames";

import { BarChart } from "@/components/chart/BarChart";
import { DoughnutChartSlider } from "@/components/chart/DoughnutChartSlider";
import { LineChart } from "@/components/chart/LineChart";
import { HistoryCounters } from "@/components/HistoryCounters";
import { LoadingSkeletonService } from "@/components/LoadingSkeletonService";
import { PersonalInformationInService } from "@/components/PersonalInformationInService";
import { ToggleChart } from "@/components/ToggleChart";
import { YearSelector } from "@/components/YearSelector";
import { getHomeCounters } from "@/services/getHomeCounters.ts";
import { getHomeCountersByYear } from "@/services/getHomeCountersByYear.ts";
import {
  extractKeyValuePairsWithServiceName,
  ICounter,
} from "@/utils/extractKeyValuePairsWithServiceName.ts";
import { ListServicesIcons } from "@/components/ListServicesIcons";
import { ServiceCountersBlock } from "@/components/ServiceCountersBlock";
import { TariffBlock } from "@/components/TariffBlock";
import { TitleWithIcon } from "@/components/TitleWithIcon";
import { Block } from "@/components/ui/Block";
import { Button } from "@/components/ui/Button";
import { ServiceTitle } from "@/components/ui/ServiceTitle";
import { providers } from "@/constants/providers.ts";
import { getHomeServices } from "@/services/getHomeServices.ts";
import { userStore } from "@/stores/userStore.ts";
import { routingBack } from "@/utils/routingBack.ts";
import { ServiceNavigation } from "@/components/ServiceNavigation";
import { ChartOptionsSelector } from "@/components/ChartOptionsSelector";

import icomoon from "@/constants/icomoon.json";

const Service = () => {
  const navigate = useNavigate();
  const { homeId } = useParams<{ homeId: string }>();
  const userHomes = userStore((state) => state.userHomes);
  const setHomeServices = userStore((state) => state.setHomeServices);
  const userId = userStore((state) => state.userId);
  const homeServices = userStore((state) => state.homeServices) || [];
  const setHomeCounters = userStore((state) => state.setHomeCounters);

  const [counters, setCounters] = useState([]);
  const [serviceCounters, setServiceCounters] = useState<ICounter[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeService, setActiveService] = useState<number | undefined>(
    homeServices.length > 0 ? homeServices[0]?.id : undefined,
  );
  const [serviceName, setServiceName] = useState<string | undefined>(
    homeServices.length > 0 ? homeServices[0]?.serviceName : undefined,
  );
  const displayedName = serviceName
    ? providers.find((el) => el.serviceName === serviceName)
    : undefined;
  const [displayService, setDisplayService] = useState(displayedName);
  const [displayInformation, setDisplayInformation] = useState(true);
  const [service, setService] = useState(
    homeServices.length > 0 ? homeServices[0] : undefined,
  );
  const [prevService, setPrevService] = useState<number>(
    homeServices.length - 1,
  );
  const [nextService, setNextService] = useState<number>(1);
  const [showStatistic, setShowStatistic] = useState(true);
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState<number | string>(
    currentYear,
  );
  const [selectOptions, setSelectOptions] = useState<string | number>(
    "Всі лічильники",
  );

  const colors = [blueChart, greenChart, redChart, yellowChart];

  const currentHome = userHomes.find(
    (el) => homeId && +homeId === el.id && userId === el.uuid,
  );

  const home = userHomes.find((el) => homeId && +homeId === el.id);

  const fetchServices = async () => {
    if (homeId) {
      setLoading(true);
      try {
        const services = await getHomeServices(+homeId);
        setHomeServices(services);
        if (services.length > 0) {
          setActiveService(services[0].id);
          setServiceName(services[0].serviceName);
          setDisplayService(
            providers.find((el) => el.serviceName === services[0].serviceName),
          );
          setService(services[0]);
        } else {
          setActiveService(undefined);
          setServiceName(undefined);
          setDisplayService(undefined);
          setService(undefined);
        }
      } catch (error) {
        console.error("Error fetching home services:", error);
      } finally {
        setTimeout(() => setLoading(false), 400);
      }
    }
  };

  const getCountersByYear = async (year: number) => {
    setLoading(true);
    try {
      if (homeId) {
        const data = {
          homeId: +homeId,
          year: year,
        };
        const counters = homeId && (await getHomeCountersByYear(data));
        setCounters(counters);
      }
    } catch (error) {
      console.error("Error fetching counters by year:", error);
    } finally {
      setLoading(false);
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

  const handleActiveService = (serviceId: number, serviceName: string) => {
    setActiveService(serviceId);
    setServiceName(serviceName);
    setDisplayService(providers.find((el) => el.serviceName === serviceName));
    setService(
      homeServices.find(
        (el) => el.id === serviceId,
      ) as (typeof homeServices)[0],
    );
  };

  const getServiceIndexes = (activeServiceId: number) => {
    const index = homeServices.findIndex((el) => el.id === activeServiceId);
    const prevIndex = (index - 1 + homeServices.length) % homeServices.length;
    const nextIndex = (index + 1) % homeServices.length;
    return { prevIndex, nextIndex };
  };

  const [flow, setFlow] = useState(true);

  useEffect(() => {
    const fetchFlowState = async () => {
      const resp = await getUserFlowStateFrigade("my-user-id");
      const filterRes = resp.eligibleFlows.filter(
        (el: IFlowState) => el.flowSlug === "flow_3yeh7VKC",
      )[0].$state.completed;
      setFlow(filterRes);
    };

    fetchFlowState();
  }, []);

  useEffect(() => {
    if (homeId) {
      fetchServices();
      fetchCounters();
    }
  }, [homeId]);

  useEffect(() => {
    if (!displayInformation) {
      typeof selectedYear === "number" && getCountersByYear(selectedYear);
    }
  }, [selectedYear, displayInformation]);

  useEffect(() => {
    if (activeService !== undefined) {
      const { prevIndex, nextIndex } = getServiceIndexes(activeService);
      setPrevService(prevIndex);
      setNextService(nextIndex);
    }
  }, [activeService, homeServices]);

  useEffect(() => {
    if (displayService?.serviceName) {
      const filteredKeys = extractKeyValuePairsWithServiceName(
        counters,
        displayService.serviceName,
      );
      setServiceCounters(filteredKeys);
    }
  }, [counters, displayService?.serviceName]);

  if (loading) {
    return <LoadingSkeletonService />;
  }

  return (
    <>
      {!flow && <OverlayContainer />}

      <Block className="p-2 lg:p-10 overflow-hidden">
        <TitleWithIcon
          text="Комунальні сервіси"
          optionalText={`м. ${home?.city}, вул. ${home?.street}, буд. ${home?.building}, кв. ${home?.apartment} `}
          classNameOptional="text-gray400 text-xl mt-2"
          classNameButton="h-9"
          optionalLink={currentHome ? `/home/edit/${homeId}` : undefined}
          classNameBlock="justify-between"
          icon={
            <IcoMoon
              className="h-10 w-10 fill-gray600 hover:fill-gray900"
              iconSet={icomoon}
              icon="arrow_left"
            />
          }
          iconOption={
            currentHome ? (
              <IcoMoon
                iconSet={icomoon}
                className="text-xl mt-2 h-14 w-14 fill-gray600 hover:fill-gray900"
                icon="setting"
              />
            ) : undefined
          }
          buttonAction={routingBack}
        />
        {service ? (
          <>
            {activeService !== undefined && (
              <ListServicesIcons
                handleActiveService={handleActiveService}
                activeService={activeService}
              />
            )}
            <h2 className="text-gray500 text-3xl mb-7">Загальна інформація</h2>
            {displayService && (
              <ServiceTitle
                icon={displayService.icon}
                service={displayService.service}
                provider={displayService.provider}
                contact={displayService.contact}
                providerName={displayService.providerName}
              />
            )}

            <div className="justify-between mt-6 sm:flex">
              <div
                className={classNames("flex gap-x-4", {
                  "bg-white p-2 lg:py-4 lg:px-6 z-50 relative lg:-ml-6 rounded-2xl":
                    !flow,
                })}
              >
                <Button
                  type="button"
                  text="Інформація"
                  className={classNames(
                    "py-2.5 px-6 border rounded-3xl text-lg w-full sm:w-fit hover:bg-brand300 hover:!text-white",
                    {
                      ["!text-gray800 bg-gray100 "]: !displayInformation,
                    },
                  )}
                  onClick={() => setDisplayInformation(true)}
                />
                <Button
                  type="button"
                  text="Статистика"
                  className={classNames(
                    "py-2.5 px-6 border rounded-3xl text-lg w-full sm:w-fit hover:!text-white",
                    {
                      ["bg-gray100 !text-gray800"]: displayInformation,
                    },
                  )}
                  onClick={() => setDisplayInformation(false)}
                />
              </div>
            </div>

            {service && displayInformation ? (
              <>
                <PersonalInformationInService
                  personalAccount={service.personalAccount}
                  userInfo={service.userEmail}
                />
                <TariffBlock service={displayService?.serviceName} />
                <ServiceCountersBlock
                  service={displayService?.serviceName}
                  serviceName={displayService?.service}
                />
              </>
            ) : (
              <>
                <div>
                  <h1 className="text-xl md:text-2xl mt-4 mb-2 md:mt-6 md:mb-4 text-gray800">
                    Історія споживання
                  </h1>
                </div>

                {!displayInformation && (
                  <>
                    <div className=" grid grid-cols-1 mb-4 md:grid-cols-2 gap-x-5 gap-y-4 md:mb-7">
                      <ChartOptionsSelector
                        selectOption={selectOptions}
                        setSelectOption={setSelectOptions}
                        serviceName={serviceName}
                      />
                      <div className="flex justify-between">
                        <YearSelector
                          selectedYear={selectedYear}
                          currentYear={currentYear}
                          setSelectedYear={setSelectedYear}
                        />

                        <ToggleChart
                          setShowStatistic={setShowStatistic}
                          showStatistic={showStatistic}
                        />
                      </div>
                    </div>
                    <p className="text-gray500 ml-2 text-lg">
                      {serviceName === "energozbut" ? (
                        <span>кВт</span>
                      ) : (
                        <span>
                          м<sup>3</sup>
                        </span>
                      )}
                    </p>
                  </>
                )}

                <div className="overflow-x-auto">
                  <div className="min-w-[800px]">
                    {showStatistic ? (
                      <BarChart
                        selectOptions={selectOptions}
                        counter={serviceCounters}
                        serviceName={serviceName}
                        colors={colors}
                      />
                    ) : (
                      <LineChart
                        selectOptions={selectOptions}
                        counter={serviceCounters}
                        serviceName={serviceName}
                        colors={colors}
                      />
                    )}
                  </div>
                </div>
                <div className="flex justify-center mt-8">
                  <div className="w-full">
                    <DoughnutChartSlider
                      selectOptions={selectOptions}
                      serviceName={serviceName}
                      allCounters={serviceCounters}
                      colors={colors}
                    />
                  </div>
                </div>
                <div>
                  <HistoryCounters allCounters={serviceCounters} />
                </div>
              </>
            )}
            {homeServices.length >= 3 && (
              <ServiceNavigation
                prevService={
                  homeServices[prevService]
                    ? providers.find(
                        (el) =>
                          el.serviceName ===
                          homeServices[prevService]?.serviceName,
                      )?.service
                    : undefined
                }
                nextService={
                  homeServices[nextService]
                    ? providers.find(
                        (el) =>
                          el.serviceName ===
                          homeServices[nextService]?.serviceName,
                      )?.service
                    : undefined
                }
                onClickPrevService={() =>
                  handleActiveService(
                    homeServices[prevService].id,
                    homeServices[prevService].serviceName,
                  )
                }
                onClickNextService={() =>
                  handleActiveService(
                    homeServices[nextService].id,
                    homeServices[nextService].serviceName,
                  )
                }
              />
            )}
          </>
        ) : (
          <div>
            <h2 className="text-2xl text-gray500 text-center my-5">
              Немає доданих сервісів за вашою адресою
            </h2>
            {currentHome && (
              <Button
                text="Перейти до налаштувань помешкання"
                type="button"
                className="w-full py-5 text-gray500 border border-grayMain rounded-2xl"
                onClick={() => navigate(`/home/edit/${homeId}`)}
              />
            )}
          </div>
        )}

        {!flow && (
          <div
            className={classNames(
              "z-20 max-w-[348px] absolute mt-2.5 ml-4 mr-4 rounded-2xl inset-0 h-fit top-1/3 lg:mr-0 lg:left-0 lg:-ml-4 lg:top-1/3 2xl:max-w-[400px] 2xl:lg:-ml-24",
              {
                "bg-white": !flow,
              },
            )}
          >
            <Frigade.Card
              flowId="flow_3yeh7VKC"
              dismissible={true}
              className="onboarding z-50"
              onComplete={() => setFlow(true)}
            />
          </div>
        )}
      </Block>
    </>
  );
};

export default Service;

import { OverlayContainer } from "@/components/OverlayContainer";
import { onboardingSteps } from "@/constants/onboardingSteps.ts";
import { getUserFlowStateFrigade } from "@/services/getUserFlowStateFrigade.ts";
import { useOnboardingStore } from "@/stores/flowStore.ts";
import { IFlowState } from "@/types/IFlowState.ts";
import { useState, useEffect } from "react";
import * as Frigade from "@frigade/react";
import { DescriptionTextBlock } from "@/components/DescriptionTextBlock";
import IcoMoon from "react-icomoon";
import { ServiceLink } from "@/components/ui/ServiceLink";
import { providers } from "@/constants/providers.ts";
import { IServicesSection } from "@/types/IServicesSection.ts";
import classNames from "classnames";
import icomoon from "@/constants/icomoon.json";

const ServicesSection = (props: IServicesSection) => {
  const { services, handleClickServiceSetting, currentHome, id } = props;

  const { currentStep, setCurrentStep } = useOnboardingStore();
  const [displayFlow, setDisplayFlow] = useState(false);
  const [isPreviousStepComplete, setIsPreviousStepComplete] = useState(false);

  const handleCompleteFlow = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
      setDisplayFlow(true);
    } else {
      setDisplayFlow(true);
    }
  };

  const fetchFlowState = async () => {
    const resp = await getUserFlowStateFrigade("my-user-id");
    const isComplete = resp.eligibleFlows.filter(
      (el: IFlowState) =>
        el.flowSlug === onboardingSteps[currentStep - 1].flowId,
    )[0].$state.completed;
    setIsPreviousStepComplete(isComplete);
  };

  useEffect(() => {
    if (currentStep > 0) {
      fetchFlowState();
    } else {
      setIsPreviousStepComplete(true);
    }
  }, [currentStep]);

  return (
    <div>
      {!displayFlow && <OverlayContainer />}

      <div
        className={classNames("relative z-20 rounded-2xl", {
          "bg-white px-4 py-4 md:-mt-4 md:-ml-4": !displayFlow,
        })}
      >
        <div className="mt-5 sm:mt-10">
          <DescriptionTextBlock mainText="Комунальні підприємства" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5 mb-10">
          {services.length !== 0 &&
            services.map((el) =>
              providers.map(
                (provider) =>
                  el.serviceName === provider.serviceName && (
                    <ServiceLink
                      key={el.id}
                      link="#"
                      imgUrl={provider.icon}
                      imgAlt={provider.provider}
                      provider={provider.provider}
                      service={provider.service}
                      linkClassName="border py-4 pl-4 sm:py-6 sm:pl-6 flex justify-between rounded-2xl hover:bg-brand25 focus-ring-brand"
                      providerClassName={classNames("text-left text-lg", {
                        "text-brand400": provider.providerName === "gas-supply",
                        "text-blue800":
                          provider.providerName === "water-supply",
                        "text-green700":
                          provider.providerName === "electricity-supply",
                        "text-red600": provider.providerName === "heat-supply",
                      })}
                      serviceClassName="text-xl text-left lg:text-2xl"
                      onClickIconSetting={handleClickServiceSetting}
                      iconSetting={
                        currentHome && (
                          <IcoMoon
                            className="mr-5 h-10 w-10 fill-gray400 hover:fill-gray600"
                            iconSet={icomoon}
                            icon="kebab_points"
                          />
                        )
                      }
                      serviceId={el.id}
                      classNameImg="h-[45px] sm:h-[60px] w-[45px] sm:w-[60px]"
                    />
                  ),
              ),
            )}

          {currentHome && (
            <ServiceLink
              link={`/home/edit/${id}/choose/services`}
              icon={
                <IcoMoon
                  className="w-[45px] h-[45px] sm:h-[60px] sm:w-[60px]"
                  iconSet={icomoon}
                  icon="add_home"
                />
              }
              linkClassName="border py-4 pl-4 sm:py-6 sm:pl-6 flex rounded-2xl hover:bg-brand25 focus-ring-brand"
              serviceClassName="text-left text-2xl"
              textInfo="Додати підприємство"
              textInfoClassName="text-xl sm:text-2xl pl-0.5"
            />
          )}
        </div>
      </div>

      <>
        {!displayFlow && isPreviousStepComplete && (
          <div
            className={classNames(
              "z-20 max-w-[300px] absolute mt-2.5 mr-4 rounded-2xl lg:mr-0 lg:left-0 lg:-ml-4 lg:top-1/2 2xl:max-w-[400px] 2xl:lg:-ml-24",
              {
                "bg-white": !displayFlow,
              },
            )}
          >
            <Frigade.Card
              flowId={onboardingSteps[currentStep].flowId}
              dismissible={true}
              className="onboarding z-50"
              onComplete={handleCompleteFlow}
            />
          </div>
        )}
      </>
    </div>
  );
};

export default ServicesSection;

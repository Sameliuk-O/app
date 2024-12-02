import { OverlayContainer } from "@/components/OverlayContainer";
import { onboardingSteps } from "@/constants/onboardingSteps.ts";
import { fetchFlowState } from "@/helpers/fetchFlowState/fetchFlowState.ts";
import { useOnboardingStore } from "@/stores/flowStore.ts";
import { useEffect, useState, useMemo } from "react";
import { IStore, userStore } from "@/stores/userStore";
import { useKeycloak } from "@react-keycloak/web";
import { Link } from "@/components/ui/Link";
import IcoMoon from "react-icomoon";
import { useLocation } from "react-router-dom";
import classNames from "classnames";
import icomoon from "@/constants/icomoon.json";
import * as Frigade from "@frigade/react";

interface INavigation {
  classNameNavigation?: string;
  setCloseModal?: (value: boolean) => void;
}

const Nav = ({ classNameNavigation, setCloseModal }: INavigation) => {
  const { keycloak } = useKeycloak();
  const setUserId = userStore((state: IStore) => state.setUserId);
  const messages = userStore((state) => state.messages);
  const userId = userStore((state) => state.userId);
  const setMessagesCounter = userStore((state) => state.setMessagesCounter);
  const messagesCounter = userStore((state) => state.messagesCounter);
  const location = useLocation();
  const [activeLink, setActiveLink] = useState<string | null>(null);
  const { currentStep, setCurrentStep } = useOnboardingStore();
  const [displayFlow, setDisplayFlow] = useState(false);
  const [isStepAllowed, setIsStepAllowed] = useState(false); // Додаємо перевірку завершеності

  const handleCompleteFlow = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
      setDisplayFlow(true);
    } else {
      setDisplayFlow(true);
    }
  };

  // Додаємо логіку перевірки завершеності попереднього флоу
  useEffect(() => {
    const checkPreviousStepCompletion = async () => {
      if (currentStep > 0) {
        const flowSlug = onboardingSteps[currentStep - 1].flowId; // Попередній флоу
        const completed = await fetchFlowState(flowSlug); // Перевіряємо завершення
        setIsStepAllowed(completed);
      } else {
        setIsStepAllowed(true); // Якщо це перший етап
      }
    };

    checkPreviousStepCompletion();
  }, [currentStep]);

  const filteredMessages = useMemo(() => {
    return messages
      .filter((el) => el !== null && el.readMessage)
      .map((el) =>
        el.readMessage.find((value) => !value.read && value.userId === userId),
      )
      .filter((value) => value !== undefined).length;
  }, [messages, userId]);

  useEffect(() => {
    setMessagesCounter(filteredMessages);
  }, [filteredMessages, setMessagesCounter]);

  useEffect(() => {
    if (keycloak.authenticated && keycloak.token) {
      const userId = keycloak?.tokenParsed?.sub;
      if (userId) {
        setUserId(userId);
      }
    }

    const parts = location.pathname.split("/");
    setActiveLink(`/${parts[1]}`);
  }, [
    keycloak.authenticated,
    keycloak.token,
    keycloak?.tokenParsed?.sub,
    setUserId,
    location.pathname,
  ]);

  const links = [
    { link: "/", icon: "profile", text: "Home" },
    { link: "/profile", icon: "profile", text: "Профіль" },
    { link: "/home", icon: "home", text: "Помешкання" },
    { link: "/counters", icon: "counter", text: "Лічильники" },
    {
      link: "/messages",
      icon: "message",
      text: "Повідомлення",
      messages: messagesCounter > 0 ? messagesCounter : undefined,
      onClick: () => setMessagesCounter(0),
    },
  ].map((item) => ({
    ...item,
    icon: <IcoMoon iconSet={icomoon} icon={item.icon} className="h-10 w-10" />,
  }));

  const informationLink = {
    link: "/information",
    icon: (
      <IcoMoon iconSet={icomoon} icon="information" className="h-10 w-10" />
    ),
    text: "Довідка",
  };

  console.log(isStepAllowed);

  return (
    <div className={classNames(classNameNavigation)}>
      {!displayFlow && <OverlayContainer />}

      <section className="x-auto">
        <nav
          className={classNames("text-blue-800", {
            "border border-gray200 rounded-2xl": !!classNameNavigation,
          })}
        >
          <div className="px-5 pt-6 md:pt-4 md:pb-3 w-full">
            <ul className="mx-auto font-semibold font-heading">
              {links.map((linkItem, index) => (
                <li
                  key={linkItem.link}
                  className={classNames("", {
                    "relative z-20 bg-white rounded-2xl":
                      !displayFlow &&
                      isStepAllowed &&
                      linkItem.text === "Помешкання",
                  })}
                >
                  <Link
                    link={linkItem.link}
                    icon={linkItem.icon}
                    text={linkItem.text}
                    classNameLink={classNames("py-2", {
                      "active-link": activeLink === linkItem.link,
                      "mb-0": links.length - 1 === index,
                    })}
                    setActiveLink={setActiveLink}
                    setCloseModal={setCloseModal}
                    isActive={activeLink === linkItem.link}
                    messages={linkItem.messages}
                    onClick={linkItem.onClick}
                  />
                </li>
              ))}
            </ul>
          </div>
        </nav>
        <nav
          className={classNames("text-blue-800  md:mt-5 ", {
            "border border-gray200 rounded-2xl": !!classNameNavigation,
          })}
        >
          <div className="px-5 md:pt-4 md:pb-3 w-full">
            <ul className="mx-auto font-semibold font-heading">
              <li key={informationLink.link}>
                <Link
                  link={informationLink.link}
                  icon={informationLink.icon}
                  text={informationLink.text}
                  classNameLink={classNames("py-2 mb-0", {
                    "active-link": activeLink === informationLink.link,
                  })}
                  setActiveLink={setActiveLink}
                  setCloseModal={setCloseModal}
                  isActive={activeLink === informationLink.link}
                />
              </li>
            </ul>
          </div>
        </nav>
      </section>
      {!displayFlow &&
        isStepAllowed && ( // Додаємо перевірку isStepAllowed
          <div
            className={classNames(
              "z-20 max-w-[300px] absolute inset-0 m-auto h-fit rounded-2xl lg:ml-8 lg:left-1/4 lg:top-1/5 lg:max-w-[400px]",
              {
                "bg-white": !displayFlow,
              },
            )}
          >
            <div className="onboarding-flow">
              <Frigade.Card
                flowId={onboardingSteps[currentStep].flowId}
                dismissible={true}
                className="onboarding z-50"
                onComplete={handleCompleteFlow}
              />
            </div>
          </div>
        )}
    </div>
  );
};

export default Nav;

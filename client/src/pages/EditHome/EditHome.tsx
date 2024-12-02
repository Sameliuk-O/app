import { HomeSetting } from "@/components/HomeSetting";
import { Block } from "@/components/ui/Block";
import { RoutingBack } from "@/components/ui/RoutingBack";
import { UsersSection } from "@/components/UsersSection";
import icomoon from "@/constants/icomoon.json";
import { deleteHomeService } from "@/services/deleteHomeService.ts";
import { deleteUserWithHome } from "@/services/deleteUserWithHome.ts";
import { getHomeServices } from "@/services/getHomeServices.ts";
import { getHomeUsers } from "@/services/getHomeUsers.ts";
import { IService } from "@/types/IService.ts";
import { routingBack } from "@/utils/routingBack.ts";
import { useEffect, useState } from "react";
import IcoMoon from "react-icomoon";
import { useParams } from "react-router-dom";
import { TitleWithIcon } from "@/components/TitleWithIcon";
import { userStore } from "@/stores/userStore.ts";
import { ServicesSection } from "@/components/ServicesSection";

const EditHome = () => {
  const { id } = useParams();
  const userId = userStore((state) => state.userId);
  const userInfo = userStore((state) => state.userInfo);
  const setUserInfo = userStore((state) => state.setUserInfo);
  const userHomes = userStore((state) => state.userHomes);
  const setHomeServices = userStore((state) => state.setHomeServices);
  const [activeServiceButton, setActiveServiceButton] = useState(true);
  const [isModal, setIsModal] = useState(false);

  const [services, setServices] = useState<IService[]>([]);
  const [isAddedNewUser, setIsAddedNewUser] = useState(false);
  const [isModalSettingUser, setIsModalSettingUser] = useState(false);
  const [editableUser, setEditableUser] = useState("");
  const [isModalSettingService, setIsModalSettingService] = useState(false);
  const [editableService, setEditableService] = useState<number | null>(null);

  const currentHome = userHomes.find(
    (el) => id && +id === el.id && userId === el.uuid,
  );

  const fetchUserHomes = async () => {
    if (id) {
      try {
        const homes = await getHomeUsers(id);
        homes !== false && setUserInfo(Array.isArray(homes) ? homes : []);
      } catch (error) {
        console.error("Error fetching user homes:", error);
      }
    }
  };

  const fetchServices = async () => {
    if (id) {
      try {
        const services = await getHomeServices(+id);
        setHomeServices(services);
        setServices(services);
      } catch (error) {
        console.error("Error fetching home services:", error);
      }
    }
  };
  const deleteService = async (serviceId: number) => {
    if (id) {
      try {
        await deleteHomeService({
          userId: userId,
          serviceId: serviceId,
        });
        await fetchServices();
        setIsModalSettingUser(false);
      } catch (error) {
        console.error("Error deleted user", error);
      }
    }
  };

  const deleteUser = async () => {
    if (id) {
      try {
        await deleteUserWithHome({
          deleteUser: editableUser,
          homeId: +id,
        });
        await fetchUserHomes();
        setIsModalSettingUser(false);
      } catch (error) {
        console.error("Error deleted user", error);
      }
    }
  };

  useEffect(() => {
    if (id) {
      fetchUserHomes();
      fetchServices();
    }
    if (isAddedNewUser) {
      fetchServices();
    }
  }, [id, isAddedNewUser]);

  const handleClickUserSetting = (id: string) => {
    setEditableUser(id);
    setIsModalSettingUser(true);
  };

  const handleClickAddUser = () => {
    setIsModal(true);
  };

  const handleDeleteService = (serviceId: number) => {
    deleteService(serviceId);
    setIsModalSettingService(false);
  };

  const handleClickServiceSetting = (serviceId: number) => {
    setIsModalSettingService(true);
    setEditableService(serviceId);
  };

  return (
    <Block className="p-4">
      <TitleWithIcon
        text="Всі адреси"
        optionalText={`м. ${currentHome?.city}, вул. ${currentHome?.street}, буд. ${currentHome?.building}, кв. ${currentHome?.apartment} `}
        classNameOptional="text-gray500 text-lg sm:text-xl mt-2"
        classNameButton="h-9"
        optionalLink="update"
        classNameBlock="justify-between"
        icon={
          <IcoMoon
            className="h-10 w-10 fill-gray600 hover:fill-gray900"
            iconSet={icomoon}
            icon="arrow_left"
          />
        }
        iconOption={
          <IcoMoon
            iconSet={icomoon}
            className="text-xl mt-2 h-14 w-14 fill-gray600 hover:fill-gray900"
            icon="setting"
          />
        }
        buttonAction={routingBack}
      />
      <HomeSetting
        title="Налаштування"
        titleClassName="mt-7 sm:mt-10 mb-5 text-2xl sm:text-3x text-gray800"
        information={
          activeServiceButton
            ? "Тут Ви можете видаляти або додавати коммунальні підприємства для подальшої швидкої передачі показників лічильників за цією адресою."
            : "Тут Ви можете видаляти або додавати мешканців, це дозволить їм швидко передавати показники лічильників, без реєстрації помешкання."
        }
        firstTextButton="Підприємства"
        secondTextButton="Мешканці"
        secondTypeButton="button"
        firstTypeButton="button"
        firstClassName={`mr-2 rounded-3xl py-2.5 w-full sm:w-[210px] ${activeServiceButton && "bg-gray300"}`}
        secondClassName={`rounded-3xl py-2.5 w-full sm:w-[210px]  ${!activeServiceButton && "bg-gray300"}`}
        informationClassName="mt-5 text-gray500 text-lg lg:text-xl"
        firstButtonOnClick={() => setActiveServiceButton(true)}
        secondButtonOnClick={() => setActiveServiceButton(false)}
      />
      {activeServiceButton && id && currentHome ? (
        <ServicesSection
          services={services}
          id={id}
          currentHome={currentHome}
          handleClickServiceSetting={handleClickServiceSetting}
          handleDeleteService={handleDeleteService}
          isModal={isModalSettingService}
          setIsModal={setIsModalSettingService}
          editableService={editableService}
        />
      ) : (
        userInfo &&
        currentHome &&
        id && (
          <UsersSection
            userInfo={userInfo}
            currentHome={currentHome}
            handleClickUserSetting={handleClickUserSetting}
            handleClickAddUser={handleClickAddUser}
            deleteUser={deleteUser}
            isModal={isModal}
            setIsModal={setIsModal}
            isModalSettingUser={isModalSettingUser}
            setIsModalSettingUser={setIsModalSettingUser}
            setIsAddedNewUser={setIsAddedNewUser}
            userId={userId}
            homeId={id}
          />
        )
      )}
      <RoutingBack
        classNameButton="border rounded-2xl py-6 w-full text-xl cursor-pointer hover:bg-gray50 hover:shadow-lg"
        text="Повернутися назад"
      />
    </Block>
  );
};

export default EditHome;

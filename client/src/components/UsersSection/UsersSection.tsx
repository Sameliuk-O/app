import { DescriptionTextBlock } from "@/components/DescriptionTextBlock";
import { AddUserToHomeForm } from "@/components/forms/AddUserToHomeForm";
import IcoMoon from "react-icomoon";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { UserBlock } from "@/components/UserBlock";
import { IUsersSection } from "@/types/IUsersSection.ts";
import icomoon from "@/constants/icomoon.json";

const UsersSection = (props: IUsersSection) => {
  const {
    userInfo,
    handleClickUserSetting,
    handleClickAddUser,
    currentHome,
    isModal,
    setIsModal,
    homeId,
    userId,
    setIsAddedNewUser,
    isModalSettingUser,
    setIsModalSettingUser,
    deleteUser,
  } = props;

  return (
    <>
      <div className="mt-5 sm:mt-10">
        <DescriptionTextBlock mainText="Власник" />
      </div>
      {userInfo &&
        userInfo.map(
          (user, index) =>
            index === 0 && (
              <UserBlock
                key={index}
                userRoleText="Власник помешкання"
                classNameRole="text-red600 text-lg"
                firstName={user.first_name}
                lastName={user.last_name}
                email={user.email}
                userId={user.id}
                classNameButtonBlock="cursor-default sm:w-[48%]"
              />
            ),
        )}
      <div className="mt-5">
        <DescriptionTextBlock mainText="Мешканці" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5 mb-10">
        {userInfo &&
          userInfo.map(
            (user, index) =>
              index !== 0 && (
                <UserBlock
                  key={index}
                  userRoleText="Мешканець"
                  classNameRole="text-blue800 text-lg text-left"
                  firstName={user.first_name}
                  lastName={user.last_name}
                  email={user.email}
                  icon={
                    currentHome && (
                      <IcoMoon
                        className="h-10 w-10 fill-gray400 hover:fill-gray600"
                        iconSet={icomoon}
                        icon="kebab_points"
                      />
                    )
                  }
                  onClickIconSetting={handleClickUserSetting}
                  userId={user.id}
                  classNameButtonBlock="cursor-default"
                />
              ),
          )}
        {currentHome && (
          <UserBlock
            userRoleText="Додати мешканця"
            classNameRole="text-2xl pl-1.5 sm:pl-5"
            onClickBlock={handleClickAddUser}
            iconAddUser={
              <IcoMoon
                className="h-10 w-10"
                iconSet={icomoon}
                icon="add_user"
              />
            }
          />
        )}
      </div>
      <Modal isOpen={isModal} onClose={() => setIsModal(false)}>
        <AddUserToHomeForm
          homeId={homeId}
          userId={userId}
          setIsModal={setIsModal}
          setIsAddedNewUser={setIsAddedNewUser}
        />
      </Modal>
      <Modal
        isOpen={isModalSettingUser}
        onClose={() => setIsModalSettingUser(false)}
      >
        <p className="text-2xl text-gray500 mb-3">
          Ви можете видалити користувача з вашого помешкання
        </p>
        <div className="flex justify-center">
          <Button
            type="button"
            text="Видалити користувача"
            className="bg-red-600 text-white px-8 py-2.5 hover:text-blackMain rounded"
            onClick={deleteUser}
          />
        </div>
      </Modal>
    </>
  );
};

export default UsersSection;

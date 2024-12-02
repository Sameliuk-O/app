import { disabledUser } from "@/services/disabledUser.ts";
import useLogout from "@/services/handleLogoutUser.ts";
import { userStore } from "@/stores/userStore.ts";
import { keycloak } from "@/utils/keycloak.ts";

const UserDeleteProfileBlock = () => {
  const userId = userStore((state) => state.userId);
  const logout = useLogout();

  const deleteUserProfile = async () => {
    try {
      const response = await disabledUser({ uuid: userId, enabled: false });
      if (response?.status === 200) {
        logout();
        await keycloak.logout();

        return response;
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section>
      <h2 className="text-lg mb-3 md:text-xl">Видалити обліковий запис</h2>
      <p className="text-gray500 text-lg md:text-xl">
        Видалення облікового запису призведе до втрати всих данних в Comunapp.
        Зверніть увагу що раніше передані показники лишаються в історії
        показників відповідних комунальних компаній.
      </p>
      <button
        className="text-red600 underline text-lg mt-2.5 md:text-xl focus-ring-brand"
        onClick={deleteUserProfile}
      >
        Видалити мій обліковий запис
      </button>
    </section>
  );
};

export default UserDeleteProfileBlock;

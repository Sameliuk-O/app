import { Button } from "@/components/ui/Button";
import { enabledUser } from "@/services/enabledUser.ts";
import { updatePassword } from "@/services/updatePassword.ts";
import { userStore } from "@/stores/userStore.ts";

const EnabledUserAccount = () => {
  const userId = userStore((state) => state.userId);

  const enabledUserAccount = async () => {
    try {
      const response = await enabledUser({ uuid: userId, enabled: true });
      if (response?.status === 200) {
        await updatePassword();
        return response;
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Button
      type="button"
      text="Відновити акаунт"
      onClick={enabledUserAccount}
    />
  );
};

export default EnabledUserAccount;

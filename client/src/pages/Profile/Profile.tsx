import { Block } from "@/components/ui/Block";
import { SettingPushMessage } from "@/components/SettingPushMessage";
import { UserDeleteProfileBlock } from "@/components/UserDeleteProfileBlock";
import { UserSettingBlock } from "@/components/UserSettingBlock";
import { UserUpdateLoginAndPasswordBlock } from "@/components/UserUpdateLoginAndPasswordBlock";

const Profile = () => {
  return (
    <Block className="p-5">
      <UserSettingBlock />
      <SettingPushMessage />
      <UserUpdateLoginAndPasswordBlock />
      <UserDeleteProfileBlock />
    </Block>
  );
};

export default Profile;

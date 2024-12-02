import { IUserInfo } from "@/stores/userStore.ts";
import { IHome } from "@/types/IHome.ts";

export interface IUsersSection {
  userInfo: IUserInfo[];
  currentHome: IHome;
  handleClickUserSetting?: (id: string) => void;
  handleClickAddUser?: () => void;
  isModal: boolean;
  setIsModal: (value: boolean) => void;
  homeId: string;
  userId: string;
  setIsAddedNewUser: (value: boolean) => void;
  isModalSettingUser: boolean;
  setIsModalSettingUser: (value: boolean) => void;
  deleteUser: () => void;
}

import { ReactNode } from "react";

export interface IUserBlock {
  firstName?: string;
  lastName?: string;
  userRoleText?: string;
  classNameRole?: string;
  email?: string;
  classNameImg?: string;
  imgUrl?: string;
  imgAlt?: string;
  onClickIconSetting?: (id: string) => void;
  onClickBlock?: () => void;
  userId?: string;
  classNameButtonBlock?: string;
  imgAddUserUrl?: string;
  imgAddUserAlt?: string;
  imgAddUserClassName?: string;
  iconAddUser?: ReactNode;
  icon?: ReactNode;
}

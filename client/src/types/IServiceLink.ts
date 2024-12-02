import { ReactNode } from "react";

export interface IServiceLink {
  imgUrl?: string;
  imgAlt?: string;
  provider?: string;
  service?: string;
  linkClassName?: string;
  providerClassName?: string;
  serviceClassName?: string;
  link: string;
  optionalLink?: string;
  optionalIcon?: string;
  optionalAlt?: string;
  textInfo?: string;
  textInfoClassName?: string;
  classNameImg?: string;
  icon?: ReactNode;
  optionalIconComponent?: ReactNode;
  onClickIconSetting?: (serviceId: number) => void;
  iconSetting?: ReactNode;
  serviceId?: number;
}

import { ReactElement } from "react";

export interface ILink {
  link: string;
  icon?: ReactElement;
  text?: string;
  classNameLink?: string;
  setActiveLink: (value: string) => void;
  isActive: boolean;
  messages?: number;
  setCloseModal?: (value: boolean) => void;
  onClick?: () => void;
}

import { ReactNode } from "react";

export interface ITitleWithIcon {
  icon: ReactNode;
  iconOption?: ReactNode;
  text: string;
  classNameBlock?: string;
  optionalText?: string;
  classNameOptional?: string;
  classNameButton?: string;
  classNameLink?: string;
  optionalLink?: string;
  buttonAction: () => void;
}

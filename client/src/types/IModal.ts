import { ReactNode } from "react";

export interface IModal {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

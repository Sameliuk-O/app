import { ReactNode } from "react";

export interface IMobileMenuModal {
  isOpen: boolean;
  onClose: (value: boolean) => void;
  children: ReactNode;
}

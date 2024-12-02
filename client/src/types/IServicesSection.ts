import { IHome } from "@/types/IHome.ts";
import { IService } from "@/types/IService.ts";

export interface IServicesSection {
  services: IService[];
  currentHome: IHome;
  handleClickServiceSetting: (serviceId: number) => void;
  id: string;
  isModal: boolean;
  setIsModal: (value: boolean) => void;
  editableService: number | null;
  handleDeleteService: (value: number) => void;
}

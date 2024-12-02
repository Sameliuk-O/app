export interface IService {
  id: number;
  userId: string;
  homeId: number;
  serviceName: string;
  firstName?: string;
  lastName?: string;
  patronymic?: string;
  personalAccount: string;
  userPhone: string;
  userEmail: string;
  company?: string;
  service: string;
  month?: number;
  year?: number;
  street?: string;
  homeNumber?: string;
  privateHome: boolean;
  apartmentNumber?: string;
  threeFirstLetterLastName?: string;
}

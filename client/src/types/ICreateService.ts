export interface ICreateService {
  userId: string;
  homeId: number;
  serviceName?: string;
  firstName?: string;
  lastName?: string;
  patronymic?: string;
  personalAccount?: string;
  userPhone?: string;
  userEmail?: string;
  lastPaidAmount?: string;
  company?: string;
  service?: string;
  month?: number;
  year?: number;
  street?: string;
  homeNumber?: string;
  privateHome?: boolean;
  apartmentNumber?: string;
  threeFirstLaterLastName?: string;
}

export interface CreateServiceParams {
  data: ICreateService;
  provider: string;
}

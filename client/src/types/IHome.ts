export interface IHome {
  id: number;
  uuid: string;
  homeName?: string;
  city: string;
  street: string;
  building: string;
  apartment?: string;
  privateHome?: boolean;
  providers: number[];
  roommates: number[];
  createdAt: string;
  updatedAt: string;
}

export interface IAddUserToHomeForm {
  homeId: string;
  userId: string;
  setIsAddedNewUser?: (value: boolean) => void;
  setIsModal?: (value: boolean) => void;
}

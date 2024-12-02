interface IAddUserToHome {
  homeId: string;
  userId: string;
  email: string;
}

export interface AddUserToHomeParams {
  data: IAddUserToHome;
}

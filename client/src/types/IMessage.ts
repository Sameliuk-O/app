interface ReadMessage {
  userId: string | number;
  read: boolean;
}

export interface IMessage {
  id: string;
  uuid: string;
  firstName: string;
  homeId: number;
  homeName: string;
  users?: string[];
  interaction: string;
  message: string;
  description: string;
  action: string;
  readMessage: ReadMessage[];
  createdAt: string;
}

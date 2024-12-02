import { BACK_END_URL } from "@/constants/constants.ts";
import { getLocalStoreToken } from "@/utils/getLocalStoreToken.ts";
import axios from "axios";

interface IReadMessage {
  userId: string;
}
export const readMessage = async (data: IReadMessage) => {
  try {
    const { token } = getLocalStoreToken();

    const response = await axios.put(
      `${BACK_END_URL}/messages/update/${data.userId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error("Error updating message read status:", error);
    return false;
  }
};

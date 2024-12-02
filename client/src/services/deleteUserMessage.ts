import { BACK_END_URL } from "@/constants/constants.ts";
import { getLocalStoreToken } from "@/utils/getLocalStoreToken.ts";
import axios from "axios";

export const deleteUserMessage = async ({
  userId,
  messageId,
}: {
  userId: string;
  messageId: string;
}) => {
  try {
    const { token } = getLocalStoreToken();

    const response = await axios.delete(`${BACK_END_URL}/messages/delete`, {
      data: { userId, messageId },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting service:", error);
    return false;
  }
};

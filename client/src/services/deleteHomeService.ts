import { BACK_END_URL } from "@/constants/constants.ts";
import { getLocalStoreToken } from "@/utils/getLocalStoreToken.ts";
import axios from "axios";

export const deleteHomeService = async ({
  userId,
  serviceId,
}: {
  userId: string;
  serviceId: number;
}) => {
  try {
    const { token } = getLocalStoreToken();

    const response = await axios.delete(`${BACK_END_URL}/service/delete`, {
      data: { userId, id: serviceId },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting service :", error);
    return false;
  }
};

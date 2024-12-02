import { BACK_END_URL } from "@/constants/constants.ts";
import { getLocalStoreToken } from "@/utils/getLocalStoreToken.ts";
import axios from "axios";

export const getHomeUsers = async (homeId: string) => {
  try {
    const { token } = getLocalStoreToken();

    const response = await axios.get(
      `${BACK_END_URL}/home/${homeId}/roommates`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching home users:", error);
    return false;
  }
};

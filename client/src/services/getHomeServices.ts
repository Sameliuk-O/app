import { BACK_END_URL } from "@/constants/constants.ts";
import { getLocalStoreToken } from "@/utils/getLocalStoreToken.ts";
import axios from "axios";

export const getHomeServices = async (homeId: number) => {
  try {
    const { token } = getLocalStoreToken();

    const response = await axios.get(`${BACK_END_URL}/service/get/${homeId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching home service:", error);
    return false;
  }
};

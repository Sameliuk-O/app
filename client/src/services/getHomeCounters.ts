import { BACK_END_URL } from "@/constants/constants.ts";
import { getLocalStoreToken } from "@/utils/getLocalStoreToken.ts";
import axios from "axios";

export const getHomeCounters = async (homeId: number) => {
  try {
    const { token } = getLocalStoreToken();

    const response = await axios.get(
      `${BACK_END_URL}/counters/home/${homeId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching home counters:", error);
    return false;
  }
};

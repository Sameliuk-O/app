import { BACK_END_URL } from "@/constants/constants.ts";
import { getLocalStoreToken } from "@/utils/getLocalStoreToken.ts";
import axios from "axios";

interface ISendCounters extends Record<string, string | number> {
  homeId: number;
}

export const sendCounters = async (data: ISendCounters) => {
  try {
    const { token } = getLocalStoreToken();

    const response = await axios.post(`${BACK_END_URL}/counters/send`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error send counters :", error);
    return false;
  }
};

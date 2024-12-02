import { BACK_END_URL } from "@/constants/constants.ts";
import { IGetHomeCountersByYear } from "@/types/IGetHomeCountersByYear.ts";
import { getLocalStoreToken } from "@/utils/getLocalStoreToken.ts";
import axios from "axios";

export const getHomeCountersByYear = async (data: IGetHomeCountersByYear) => {
  try {
    const { token } = getLocalStoreToken();

    const response = await axios.post(`${BACK_END_URL}/counters/home`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

import { BACK_END_URL } from "@/constants/constants.ts";
import { getLocalStoreToken } from "@/utils/getLocalStoreToken.ts";
import axios from "axios";

export type UpdateHomeData = {
  homeName: string;
  city: string;
  street: string;
  building: string;
  apartment?: string;
  privateHome: boolean;
  uuid: string;
  homeId: string;
};

export const updateUserHome = async (data: UpdateHomeData) => {
  try {
    const { token } = getLocalStoreToken();

    const response = await axios.post(`${BACK_END_URL}/home/update`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating user home:", error);
    return false;
  }
};

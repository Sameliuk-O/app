import { BACK_END_URL } from "@/constants/constants.ts";
import { getLocalStoreToken } from "@/utils/getLocalStoreToken.ts";
import axios from "axios";

export const getUserById = async (userId: string) => {
  try {
    const { token } = getLocalStoreToken();

    const response = await axios.get(`${BACK_END_URL}/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching user:", error);
    return false;
  }
};

import { BACK_END_URL } from "@/constants/constants.ts";
import { AddUserToHomeParams } from "@/types/IAddUserToHome.ts";
import { getLocalStoreToken } from "@/utils/getLocalStoreToken.ts";
import axios from "axios";

export const addUserToHome = async ({ data }: AddUserToHomeParams) => {
  try {
    const { token } = getLocalStoreToken();

    const response = await axios.post(
      `${BACK_END_URL}/home/roommates/add`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error("Error adding roommates :", error);
    return false;
  }
};

import { BACK_END_URL } from "@/constants/constants.ts";
import { getLocalStoreToken } from "@/utils/getLocalStoreToken.ts";
import axios from "axios";

export type UpdateUser = {
  uuid: string;
  email: string;
};

export const updateUserEmail = async (data: UpdateUser) => {
  try {
    const { token } = getLocalStoreToken();

    const response = await axios.put(
      `${BACK_END_URL}/user/update-email`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error("Error updating user email:", error);
    return false;
  }
};

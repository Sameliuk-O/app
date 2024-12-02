import { BACK_END_URL } from "@/constants/constants.ts";
import { getLocalStoreToken } from "@/utils/getLocalStoreToken.ts";
import axios from "axios";

export const deleteUserWithHome = async ({
  deleteUser,
  homeId,
}: {
  deleteUser: string;
  homeId: number;
}) => {
  try {
    const { token } = getLocalStoreToken();

    const response = await axios.delete(
      `${BACK_END_URL}/home/roommates/delete`,
      {
        data: { deleteUser, homeId },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting roommates :", error);
    return false;
  }
};

import { BACK_END_URL } from "@/constants/constants.ts";
import { IEnabledUser } from "@/types/IEnabledUser.ts";
import { getLocalStoreToken } from "@/utils/getLocalStoreToken.ts";
import axios from "axios";

export const enabledUser = async (data: IEnabledUser) => {
  try {
    const { token } = getLocalStoreToken();

    return await axios.put(
      `${BACK_END_URL}/user/enabled-user`,
      {
        ...data,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  } catch (error) {
    console.error(error);
  }
};

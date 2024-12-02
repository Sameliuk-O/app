import { BACK_END_URL } from "@/constants/constants.ts";
import { CreateServiceParams } from "@/types/ICreateService.ts";
import { getLocalStoreToken } from "@/utils/getLocalStoreToken.ts";
import axios from "axios";

export const createService = async ({
  data,
  provider,
}: CreateServiceParams) => {
  try {
    const { token } = getLocalStoreToken();

    const response = await axios.post(
      `${BACK_END_URL}/service/create/${provider}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error("Error creating service :", error);
    return false;
  }
};

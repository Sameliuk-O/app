import { BACK_END_URL } from "@/constants/constants.ts";
import { getLocalStoreToken } from "@/utils/getLocalStoreToken.ts";
import axios from "axios";
import { CreateHomeData } from "@/components/forms/CreateHomeForm/CreateHomeForm.tsx";

export const createUserHome = async (data: CreateHomeData) => {
  try {
    const { token } = getLocalStoreToken();

    const response = await axios.post(`${BACK_END_URL}/home/create`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating user home:", error);
    return false;
  }
};

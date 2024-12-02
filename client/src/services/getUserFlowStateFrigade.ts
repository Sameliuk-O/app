import axios from "axios";

const token =
  "api_public_eJ2W2vrijG9wKSt2qfKmIXcK2lbtTyb0WSuGrThpkPgqrkJXiwYqc7fGENPplnKS";

export const getUserFlowStateFrigade = async (userId: string) => {
  try {
    const response = await axios.get(
      `https://api.frigade.com/v1/public/flowStates?userId=${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data; // Повертаємо дані з відповіді
  } catch (error) {
    console.error("Error fetching user flow states:", error);
    return null; // Повертаємо null у разі помилки
  }
};

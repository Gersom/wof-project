import axios from "axios";
import { API_URL_CAREGIVERS } from "@common/constants/api";

export const getCaredPets = async (caregiverId) => {
  try {
    const response = await axios.get(
      `${API_URL_CAREGIVERS}/${caregiverId}/cared-pets`
    );
    console.log("API Response (Success):", response);

    return response.data;
  } catch (error) {
    console.error("API Response (Error):", error);
    throw error;
  }
};

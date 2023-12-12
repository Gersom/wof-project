import axios from "axios";
import { API_URL_OWNERS } from "@common/constants/api";

export const getHiredCaregivers = async (ownerId) => {
  try {
    const response = await axios.get(
      `${API_URL_OWNERS}/${ownerId}/hired-caregivers`
    );
    console.log("API Response (Success):", response);

    return response.data;
  } catch (error) {
    console.error("API Response (Error):", error);
    throw error;
  }
};

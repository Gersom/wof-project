import { API_URL_REVIEWS } from "@src/common/constants/api";
import axios from "axios";

export const getReviews = async () => {
  try {
    const response = await axios.get(API_URL_REVIEWS);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

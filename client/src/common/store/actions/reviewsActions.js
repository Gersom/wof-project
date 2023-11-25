import { getReviews } from "@src/common/utils/helpers-redux/getReviews";

export const actionGetReviews = (caregiverId, ownerId) => async (dispatch) => {
  try {
    const caregiversReviews = await getReviews(caregiverId, ownerId);
    dispatch({
      type: "GET_REVIEWS",
      payload: caregiversReviews,
    });
  } catch (error) {
    console.error("Error en actionGetReviews:", error);
  }
};

import reviewState from "../states/reviewsState";

const reviewsReducer = (state = reviewState, { type, payload }) => {
  switch (type) {
    case "GET_REVIEWS":
      return {
        ...state,
        reviews: payload,
      };

    default:
      return { ...state };
  }
};

export default reviewsReducer;

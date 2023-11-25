import reviewState from "../states/reviewsState";

const reviewReducer = (state = reviewState, { type, payload }) => {
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

export default reviewReducer;

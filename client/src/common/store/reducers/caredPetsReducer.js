const caredPetsReducer = (state = caredPetState, action) => {
  switch (action.type) {
    case "FETCH_CARED_PETS_SUCCESS":
      return { ...state, caredPets: action.payload, error: null };
    case "FETCH_CARED_PETS_FAILURE":
      return { ...state, caredPets: [], error: action.payload };
    default:
      return state;
  }
};

export default caredPetsReducer;

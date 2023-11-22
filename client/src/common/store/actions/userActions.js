import { SET_USER } from "../types/userTypes";

import { getUser } from "../../utils/helpers-redux/getUser";

export const actionGetUser = () => async (dispatch) => {
  const user = await getUser();
  return dispatch({
    type: SET_USER,
    payload: user,
  });
}
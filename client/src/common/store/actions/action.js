import { 
  ACTIVE_LOADING,
  DISABLED_LOADING,
  ADD_ITEM,
} from "../types/types"

export const activateLoading = () => {
  return { type: ACTIVE_LOADING }
}
export const disabledLoading = () => {
  return { type: DISABLED_LOADING }
}
export const addNewItem = (newItem) => {
  return { 
    type: ADD_ITEM, 
    payload: newItem 
  }
}
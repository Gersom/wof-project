import walletState from "../states/walletState";

const walletReducer = (state = walletState, { type, payload }) => {
  switch(type){
    case 'GET_WALLET':
      return {
        ...state,
        MyWallet: payload,
      };
    default:
      return {...state}
  }
}

export default walletReducer;
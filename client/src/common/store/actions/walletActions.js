import { getWallet } from '@src/common/utils/helpers-redux/getWallet';


const actionGetWallet = (id) => async (dispatch) =>{
  const wallet = await getWallet(id);
	return dispatch({
		type: 'GET_WALLET',
		payload: wallet,
	});
}

export default actionGetWallet
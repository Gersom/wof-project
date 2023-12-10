import { getWallet, ChangeEmailPaypal } from '@src/common/utils/helpers-redux/getWallet';


export const actionGetWallet = (id) => async (dispatch) =>{
  const wallet = await getWallet(id);
	return dispatch({
		type: 'GET_WALLET',
		payload: wallet,
	});
}

export const actionsEmailPaypal = (obj) => async () => {
	try {
		await ChangeEmailPaypal(obj)
	} catch (error) {
		console.log(error);
	}
}


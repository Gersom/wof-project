// imports
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import ThunkMiddleware from 'redux-thunk';
import reducer from './reducers/reducer';
import userReducer from './reducers/userReducer';
import offersReducer from './reducers/offersReducer';
import navBarSlice from './slices/navBarSlice';
import myPetsSlice from './slices/myPetsSlice';
import alertSlice from './slices/alertSlice';
import walletReducer from './reducers/walletReducer';
// combinaed Reducers
const rootReducerCombined = combineReducers({
	reducer: reducer,
	userReducer: userReducer,
	offersReducer: offersReducer,
	navBarReducer: navBarSlice, // rename the assignment reducer name
	myPetsReducer: myPetsSlice,
	alertReducer: alertSlice,
	myWallet: walletReducer
});

// configured store
const store = configureStore({
	reducer: rootReducerCombined,
	middleware: [ThunkMiddleware],
});

export default store;

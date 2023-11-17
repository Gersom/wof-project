// imports
import { configureStore, combineReducers } from '@reduxjs/toolkit'
import ThunkMiddleware from 'redux-thunk'
import reducer from "./reducers/reducer"
import navBarSlice from './slices/navBarSlice';

// combinaed Reducers
const rootReducerCombined = combineReducers({
  reducer: reducer,
  navBarReducer: navBarSlice, // rename the assignment reducer name
});

// configured store
const store = configureStore({
reducer: rootReducerCombined,
middleware: [ThunkMiddleware],
});

export default store
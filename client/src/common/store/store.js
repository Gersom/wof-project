// imports
import { 
  createStore, 
  applyMiddleware, 
  compose 
} from 'redux'
import ThunkMiddleware from 'redux-thunk'
import reducer from "./reducer"

// explorer extension
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

// Create Store
const store = createStore(
  reducer,
  composeEnhancer(applyMiddleware(ThunkMiddleware))
)

export default store
// Imports React
import { useEffect } from 'react';

// Imports Store
import { 
  useSelector, 
  useDispatch
} from "react-redux";

// Common
import {activateLoading} from "~src/common/store/actions/action"
import routerNames from '~common/constants/routes'

// Imports Router
import { 
  Routes, 
  Route, 
} from "react-router-dom";

// Imports Pages
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Prueba from "./pages/Prueba";

// Imports Components
// import SearchBar from "./components/SearchBar";

function App() {
  const dispatch = useDispatch()
  const isLoading = useSelector(
    (state) => state.reducer.loading
  )

  useEffect(() => {
    setTimeout(function() {
      dispatch(activateLoading())
    }, 1000)
  }, [dispatch])

  const AllRoutes = (
    <Routes>
      {/* Home */}
      <Route 
        path={routerNames['home']}
        element={ <Home /> }
      />
      <Route
      path={routerNames['prueba']}
      element={ <Prueba /> }
      />
      {/* Not Found 404 */}
      <Route 
        path={'*'}
        element={ <NotFound /> }
      />
    </Routes>
  )

  return (
    <div className="App">
      {
        !isLoading 
        ? <div>Loading...</div>
        : AllRoutes
      }
    </div>
  )
}

export default App

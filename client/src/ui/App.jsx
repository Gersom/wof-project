// Imports React
import { useEffect } from "react";

// Imports Store
import { useSelector, useDispatch } from "react-redux";

// Common
import { activateLoading } from "~src/common/store/actions/action";
import routerNames from "~common/constants/routes";

// Imports Router
import { Routes, Route } from "react-router-dom";

// Imports Pages
import LandingPage from "./pages/LandingPage/LandingPage";
import Home from "./pages/Home/Home";
import NotFound from "./pages/NotFound";

// Imports Components
// import SearchBar from "./components/SearchBar";

function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.loading);

  useEffect(() => {
    setTimeout(function () {
      dispatch(activateLoading());
    }, 1000);
  }, [dispatch]);

  const AllRoutes = (
    <Routes>
      <Route path={routerNames["landing"]} element={<LandingPage />} />
      {/* Home */}

      <Route path={routerNames["home"]} element={<Home />} />

      {/* Not Found 404 */}
      <Route path={"*"} element={<NotFound />} />
    </Routes>
  );

  return (
    <div className="App">{!isLoading ? <div>Loading...</div> : AllRoutes}</div>
  );
}

export default App;

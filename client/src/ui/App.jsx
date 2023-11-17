// Imports React
import { useEffect } from "react";

// Imports Store
import { useSelector, useDispatch } from "react-redux";

// Common
import { activateLoading } from "~common/store/action";
import routerNames from "~common/constants/routes";

// Imports Router
import { Routes, Route } from "react-router-dom";

// Imports Pages
import Home from "./pages/Home/Home";
import NotFound from "./pages/NotFound";
import LandingPage from "./pages/LandingPage/LandingPage";

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
      {/* Home */}
      <Route path={routerNames["landing"]} element={<LandingPage />} />
      <Route path={routerNames["home"]} element={<Home />} />
      <Route path={"*"} element={<NotFound />} />
    </Routes>
  );

  return (
    <div className="App">{!isLoading ? <div>Loading...</div> : AllRoutes}</div>
  );
}

export default App;

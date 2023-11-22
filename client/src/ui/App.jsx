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
import Home from "./pages/home/Home";
import NotFound from "./pages/NotFound";
import Landing from "./pages/Landing/Landing";
import Dashboard from "./pages/dashboard/Dashboard";
import Offers from "./pages/offers/Offers";
import Details from "./pages/details/Details";
import FormRegister from "./components/formRegister/FormRegister";
// Imports Components
// import SearchBar from "./components/SearchBar";

function App() {
  return (
    <div className="App">
      <Routes>
        {/* Home */}
        <Route path={routerNames["home"]} element={<Home />} />
        <Route path={routerNames["landing"]} element={<Landing />} />
        {/* Form */}
        <Route path={routerNames["formRegister"]} element={<FormRegister />} />
        {/* dashboard */}
        <Route path={routerNames["dashboard"]} element={<Dashboard />}>
          <Route index path={routerNames["offers"]} element={<Offers />} />
          <Route path={routerNames["details"]} element={<Details />} />
          <Route path={routerNames["profile"]} element={<Landing />} />
        </Route>
        {/* Not Found 404 */}
        <Route path={"*"} element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;

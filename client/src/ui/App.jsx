// Imports React

import routerNames from "@common/constants/routes";

// Imports Router
import { Routes, Route } from "react-router-dom";

// Imports Pages
import Home from "./pages/home/Home";
import NotFound from "./pages/NotFound";
import Landing from "./pages/Landing/Landing";
import Dashboard from "./pages/dashboard/Dashboard";
import Offers from "./pages/offers/Offers";
import Details from "./pages/details/Details";
import FormRegister from "./components/forms/formRegister/FormRegister";
import Login from "./components/login/Login";
import FormReview from "./components/reviews/FormReview";
import MyPets from "./pages/my-pets/MyPets";
import MyPetsEdit from "./pages/my-pets/my-pets-edit/MyPetsEdit";
import FormProfile from "./components/forms/formProfile/formProfile";
// Imports Components

function App() {
  return (
    <div className="App">
      <Routes>
        {/* Home */}
        <Route path={routerNames["home"]} element={<Home />} />
        <Route path={routerNames["landing"]} element={<Landing />} />
        {/* Forms */}
        <Route path={routerNames["login"]} element={<Login />} />
        <Route path={routerNames["register"]} element={<FormRegister />} />
        <Route path={routerNames["profile"]} element={<FormProfile />} />
        {/* dashboard */}
        <Route path={routerNames["dashboard"]} element={<Dashboard />}>
          <Route index path={routerNames["offers"]} element={<Offers />} />
          <Route path={routerNames["details"] + ":id"} element={<Details />} />
          {/* <Route path={routerNames["profile"]} element={<Landing />} /> */}
          <Route path={routerNames["formReview"]} element={<FormReview />} />
          <Route path={routerNames["myPets"]} element={<MyPets />} />
          <Route path={routerNames["myPetsCreate"]} element={<MyPetsEdit />} />
          <Route
            path={routerNames["myPetsEdit"] + ":idPet"}
            element={<MyPetsEdit />}
          />
        </Route>
        {/* Not Found 404 */}
        <Route path={"*"} element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;

// Imports React
import routerNames from "@common/constants/routes";

// Imports Router
import { Routes, Route, useLocation } from "react-router-dom";

// Imports Pages
import Home from "./pages/home/Home";
import NotFound from "./pages/not-found/NotFound";
import Landing from "./pages/landing/Landing";
import Dashboard from "./pages/dashboard/Dashboard";
import Offers from "./pages/offers/Offers";
import Details from "./pages/details/Details";
import Login from "./pages/login/Login";
import FormReview from "./components/reviews/FormReview";
import MyPets from "./pages/my-pets/MyPets";
import MyPetsEdit from "./pages/my-pets/my-pets-edit/MyPetsEdit";
import ProtectedRoute from "./pages/protected-route/ProtectedRoute";
import VerifyingLogin from "./pages/verifying-login/VerifyingLogin";
import DetailsCaregivers from "./pages/details/DetailsCaregivers";
import { useAuth } from "@src/context/auth-provider/authProvider";
import { Navigate } from "react-router-dom";
import MyHome from "./pages/my-home/MyHome";
import {
  saveToLocalStorage,
  getFromLocalStorage,
} from "@src/common/utils/localStorage";

import FormProfile from "./components/forms/formProfile/FormProfile";
import Register from "./pages/register/Register";

//import useAlert
import useAlert from "@src/common/hooks/use-alert/useAlert";
import MyClients from "./pages/my-clients/MyClients";

// Imports Components

function App() {
  const location = useLocation();
  useAlert();
  useAuth();

  const storeCurrentRouteInSession = () => {
    const storage = getFromLocalStorage("session");
    let currentRoute;

    if (currentRoute !== "/verificando" || currentRoute !== "/iniciar-sesion") {
      currentRoute = location.pathname;
    }

    if (storage?.token && storage?.userId) {
      const updatedstorage = {
        token: storage?.token,
        userId: storage?.userId,
        history: currentRoute,
      };
      saveToLocalStorage("session", updatedstorage);
    }
  };
  storeCurrentRouteInSession();

  const tokenExist = async () => {
    const sessionLS = await getFromLocalStorage("session");

    if (sessionLS?.token) return true;
    return false;
  };

  return (
    <div className="App" id="App">
      <Routes>
        {/* Home */}
        <Route path={routerNames["home"]} element={<Home />} />
        <Route path={routerNames["landing"]} element={<Landing />} />

        {/* Forms */}
        <Route path={routerNames["login"]} element={<Login />} />
        <Route path={routerNames["register"]} element={<Register />} />
        <Route path={routerNames["loading"]} element={<VerifyingLogin />} />

        {/* dashboard */}
        <Route path={"/"} element={<ProtectedRoute />}>
          <Route
            path={routerNames["dashboard"]}
            element={
              tokenExist() ? (
                <Dashboard />
              ) : (
                <Navigate to={routerNames["login"]} />
              )
            }
          >
            <Route
              index
              path={routerNames["offersCaregivers"]}
              element={<Offers />}
            />
            <Route
              path={routerNames["detailsCaregivers"] + ":id"}
              element={<Details />}
            />
            <Route path={routerNames["profile"]} element={<FormProfile />} />
            <Route
              path={routerNames["offersOwners"] + ":id"}
              element={<Offers />}
            />
            <Route
              path={routerNames["detailsOwners"] + ":id"}
              element={<DetailsCaregivers />}
            />

            <Route path={routerNames["formReview"]} element={<FormReview />} />

            <Route path={routerNames["myPets"]} element={<MyPets />} />
            <Route
              path={routerNames["myPetsCreate"]}
              element={<MyPetsEdit />}
            />
            <Route
              path={routerNames["myPetsEdit"] + ":idPet"}
              element={<MyPetsEdit />}
            />
            <Route path={routerNames["myHome"]} element={<MyHome />} />
            <Route path={routerNames["myClients"]} element={<MyClients />} />
          </Route>
        </Route>

        {/* Not Found 404 */}
        <Route path={"*"} element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;

// Imports React
import routerNames from "@common/constants/routes";

// Imports Router
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";

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
import OffersCaregivers from "./components/offers/offers-caregivers/OffersCaregivers";
import MyWallet from "./pages/my-wallet/MyWallet";
import { useAuth } from "@common/context/authProvider";
import { Navigate } from "react-router-dom";
import MyHome from "./pages/my-home/MyHome";
import {
  saveToLocalStorage,
  getFromLocalStorage,
} from "@src/common/utils/localStorage";

import FormProfile from "./components/forms/form-profile/FormProfile";
import Register from "./pages/register/Register";

//import useAlert
import useAlert from "@src/common/hooks/use-alert/useAlert";
import MyClients from "./pages/my-clients/MyClients";
import NotificatioPanel from "./components/notification/NotificatioPanel";
import { useEffect } from "react";
import Admin from "./pages/admin/admin";
import Users from "./pages/users/users";
import MyCaregivers from "./pages/my-caregivers/MyCaregivers";

// Imports Components

function App() {
  const location = useLocation();
  useAlert();
  useAuth();

  const storeCurrentRouteInSession = (newRoute) => {
    const storage = getFromLocalStorage("session");

    if (newRoute !== "/verificando" && newRoute !== "/iniciar-sesion") {
      if (storage?.token && storage?.userId) {
        const updatedstorage = {
          token: storage?.token,
          userId: storage?.userId,
          history: newRoute,
        };
        saveToLocalStorage("session", updatedstorage);
      }
    }
  };

  const tokenExist = async () => {
    const sessionLS = await getFromLocalStorage("session");

    if (sessionLS?.token) return true;
    return false;
  };

  useEffect(() => {
    const newRoute = location.pathname;
    storeCurrentRouteInSession(newRoute);
  }, [location.pathname]);

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
              path={routerNames["offersOwners"]}
              element={<OffersCaregivers />}
            />
            <Route
              path={routerNames["offersOwners"] + ":id"}
              element={<Offers />}
            />
            <Route
              path={routerNames["alerts"]}
              element={<NotificatioPanel />}
            />
            <Route path={routerNames["MyWallet"]} element={<MyWallet />} />
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
            <Route
              path={routerNames["lastsCaregivers"]}
              element={<MyCaregivers />}
            />
          </Route>
        </Route>
        <Route path={routerNames["admin"]} element={<Admin />}>
          <Route path={routerNames["users"]} element={<Users />}></Route>
        </Route>

        {/* Not Found 404 */}
        <Route path={"*"} element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;

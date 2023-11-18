// Imports React

import routerNames from "@common/constants/routes";

// Imports Router
import { Routes, Route } from "react-router-dom";

// Imports Pages

import NotFound from "./pages/NotFound";
import Landing from "./pages/Landing/Landing";

// Imports Components
// import SearchBar from "./components/SearchBar";

function App() {
  return (
    <div className="App">
      <Routes>
        /* Home */
        <Route path={routerNames["landing"]} element={<Landing />} />
        /* Not Found 404 */
        <Route path={"*"} element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;

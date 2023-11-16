import { useLocation } from "react-router-dom";
import Home from "~src/views/home/Home";
import Landing from "~src/views/landing/Landing";

function App() {
  const location = useLocation();

  return (
    <div>
      {location.pathname !== "/" && <NavBar></NavBar>}
      <Routes>
        <Route path="/home" element={<Home></Home>}></Route>
        <Route path="/" element={<Landing></Landing>}></Route>
      </Routes>
    </div>
  );
}

export default App;

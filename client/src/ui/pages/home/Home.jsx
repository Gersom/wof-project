import { Link } from "react-router-dom";
import routerNames from "@src/common/constants/routes";
import styles from "./styles.module.css";

const Home = () => {
  return (
    <>
      <div className={styles.home}>
        <Link to={routerNames["registro"]}>
          <button>Register</button>
        </Link>
        <Link to={routerNames["inicio"]}>
          <button>Login</button>
        </Link>
      </div>
    </>
  );
};

export default Home;

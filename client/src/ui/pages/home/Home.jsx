import { Link } from "react-router-dom";
import routerNames from "@src/common/constants/routes";
import styles from "./styles.module.css";

const Home = () => {
  return (
    <>
      <div className={styles.home}>
        <Link to={routerNames["register"]}>
          <button>Register</button>
        </Link>
        <Link to={routerNames["login"]}>
          <button>Login</button>
        </Link>
      </div>
    </>
  );
};

export default Home;

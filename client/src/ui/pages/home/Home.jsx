import { Link } from "react-router-dom";
import routerNames from "@src/common/constants/routes";
import styles from "./styles.module.css";

const Home = () => {
  return (
    <>
      <div className={styles.home}>
        <Link to={routerNames["formRegister"]}>
          <button>Register</button>
        </Link>

        <button>Login</button>
      </div>
    </>
  );
};

export default Home;

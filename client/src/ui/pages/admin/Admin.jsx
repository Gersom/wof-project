import { Outlet } from "react-router-dom";
import NavBar from "@src/ui/components/navbar/NavBar";
import styles from "./styles.module.scss";

Outlet;

const Admin = () => {
  return (
    <div className={styles.container}>
      <NavBar userData={{ role: "admin" }} />
      <Outlet />
    </div>
  );
};

export default Admin;

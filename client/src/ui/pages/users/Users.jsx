import UserStats from "@src/ui/components/users-stats/UserStats";
import styles from "./styles.module.scss";

const Users = () => {
  return (
    <div className={styles.containerUsers}>
      <h1 className={styles.usuarios}>Usuarios</h1>
      <UserStats></UserStats>
    </div>
  );
};

export default Users;

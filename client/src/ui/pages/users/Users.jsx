import UserStats from "@src/ui/components/users-stats/UserStats";
import styles from "./styles.module.scss";
import UserInfo from "@src/ui/components/user-info/UserInfo";

const Users = () => {
  return (
    <div className={styles.containerUsers}>
      <h1 className={styles.usuarios}>Usuarios</h1>
      <UserStats></UserStats>
      <UserInfo></UserInfo>
    </div>
  );
};

export default Users;

import UserStats from "@src/ui/components/users-stats/UserStats";
import styles from "./styles.module.scss";
import UserInfo from "@src/ui/components/user-info/UserInfo";
import { useState } from "react";

const Users = () => {
  const [updateCounter, setUpdateCounter] = useState(0);

  const handleUpdate = () => {
    console.log(updateCounter,"COMPONENT IS UPDATING");
    setUpdateCounter((prevCounter) => prevCounter +1);
  };

  return (
    <div className={styles.containerUsers}>
      <h1 className={styles.usuarios}>Usuarios</h1>
      <UserStats triggerUpdate={updateCounter}/>
      <UserInfo onUpdate={()=>handleUpdate()} />
    </div>
  );
};

export default Users;

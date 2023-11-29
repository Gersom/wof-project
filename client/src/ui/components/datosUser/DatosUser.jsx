import { useSelector } from "react-redux";
import styles from "./styles.module.scss";
import emailIcon from "@icons/email.svg";

const DatosUser = () => {
  const userData = useSelector((state) => state.userReducer.user);

  return (
    <>
      <div className={styles.container}>
        <div className={styles["input_container"]}>
          <label>
            <div
              className={styles["auth_form_icon"]}
              style={{ backgroundImage: "url('" + emailIcon + "')" }}
            ></div>
            <span>Email:</span>
          </label>
          <input type="text" name="email" value={userData?.email} onChange="" />
        </div>
        <div className={styles["input_container"]}>
          <label>
            <div
              className={styles["auth_form_icon"]}
              style={{ backgroundImage: "url('" + emailIcon + "')" }}
            ></div>
            <span>Email:</span>
          </label>
          <input
            type="text"
            name="password"
            value={userData?.password}
            onChange=""
          />
        </div>
      </div>
      {console.log(userData)}
    </>
  );
};

export default DatosUser;

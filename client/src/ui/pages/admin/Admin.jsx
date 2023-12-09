import { actionGetUser } from "@common/store/actions/userActions";
import { getFromLocalStorage } from "@common/utils/localStorage";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import NavBar from "@src/ui/components/navbar/NavBar";
import routerNames from "@src/common/constants/routes";
import styles from "./styles.module.scss";

const Admin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((state) => state?.userReducer?.user);

  useEffect(() => {
    const { userId } = getFromLocalStorage("session");
    if (userId) {
      dispatch(actionGetUser(userId));
    } else {
      navigate(routerNames["login"]);
    }
  }, [dispatch, navigate]);

  return (
    <div className={styles.container}>
      <NavBar userData={userData}></NavBar>
      <Outlet></Outlet>
    </div>
  );
};

export default Admin;

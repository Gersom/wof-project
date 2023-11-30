import styles from './styles.module.scss';

import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Auth0Button = () => {
  const { loginWithRedirect } = useAuth0();
  
  return <button className={styles.auth_btn} onClick={() => loginWithRedirect()}>Otras Opciones</button>;
};

export default Auth0Button;
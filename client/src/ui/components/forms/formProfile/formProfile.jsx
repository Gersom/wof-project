import DatosUser from "@components/datosUser/DatosUser";
import React from "react";
import styles from "./styles.module.scss";
import FormProfileLocation from "../formProfileLocation/FormProfileLocation";

const formProfile = () => {
  return (
    <div>
      <DatosUser />
      <FormProfileLocation />
    </div>
  );
};

export default formProfile;

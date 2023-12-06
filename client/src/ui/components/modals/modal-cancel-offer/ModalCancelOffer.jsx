import { API_URL } from "@src/common/constants/api";
import { useSelector } from "react-redux";
import styles from "./styles.module.scss";
import axios from "axios";

const ModalCancelOffer = ({ nameOwner, data }) => {
  const userData = useSelector((state) => state.userReducer?.user);
  const cancelOffer = async (data) => {
    try {
      const response = await axios.put(API_URL + "/requests/" + `${data.id}`, {
        userId: userData.id,
      });
      //console.log(response);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };
  //console.log(data);
  const asyncOperation = async () => {
    await cancelOffer(data);
  };
  asyncOperation();

  return (
    <div className={styles.container}>
      <h1>¡OH NO!</h1>
      <h3>OFERTA CANCELADA</h3>
      <section>
        <h4>Tu oferta la hemos eliminado</h4>
        <h2>{nameOwner}</h2>
        <h4> ya no podra ver tu oferta</h4>
      </section>
    </div>
  );
};

export default ModalCancelOffer;

import styles from "./styles.module.scss";
import CardPetInfo from "../../cards/card-pets/CardPetInfo";
import etiquetaTarifa from "@icons/etiquetaTarifa.svg";
import axios from "axios";
import { API_URL } from "@src/common/constants/api";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setAlert } from "@src/common/store/slices/alertSlice";
import useWsCaregiver from "@src/common/utils/websocket/useWsCaregiver";

const ModalPrice = ({ data, toggleModal, setSuccess }) => {
  const dispatch = useDispatch();
  const { sendMessage } = useWsCaregiver("caregiver");

  const dataUser = useSelector((state) => state.userReducer?.user);

  const [price, setPrice] = useState("");

  const postPrice = async (dataPost) => {
    try {
      const response = await axios.post(API_URL + "/requests", {
        ...dataPost,
        userId: dataUser.id,
      });
      return response.data;
    } catch (error) {
      dispatch(setAlert({ message: "Algo ha salido mal!", type: "error" }));
    }
  };

  const userData = useSelector((state) => state.userReducer?.user);

  const params = useParams();

  const pressOffer = async () => {
    if (validate("tarifa", price)) {
      await postPrice({
        price: price,
        postId: params.id,
        caregiverId: userData?.caregiver?.id,
      });
      dispatch(
        setAlert({ message: "¡Tarifa enviada correctamente!", type: "success" })
      );
      setSuccess(true);
      sendMessage({
        type: "request_update",
        petName: data.pet.name,
        caregiverName: dataUser?.name,
        ownerId: data.owner.id,
      });
      toggleModal(false);
    }
  };

  const changeValue = (e) => {
    const { value } = e.target;
    const regex = /^[0-9\b]+$/; // Expresión regular para permitir solo dígitos
    if (regex.test(value) || value === "") {
      setPrice(value);
    } else {
      dispatch(
        setAlert({ message: "¡Solo se admiten números!", type: "warning" })
      );
    }
  };

  const validate = (name, value) => {
    // Utiliza la misma lógica de validación que en el componente Form
    const inputMaxLength = 3;
    switch (name) {
      case "tarifa":
        if (value === "") {
          // Campo requerido
          dispatch(
            setAlert({ message: "¡Intrudice el precio!", type: "warning" })
          );
          return false;
        } else if (value.length > inputMaxLength) {
          // Longitud máxima excedida
          dispatch(
            setAlert({
              message: "La tarifa no puede exceder los 3 digitos",
              type: "warning",
            })
          );
          return false;
        } else if (isNaN(Number(value))) {
          // No es un número
          dispatch(
            setAlert({ message: "¡Introduce solo números!", type: "warning" })
          );
          return false;
        } else {
          // Válido
          return true;
        }
      default:
        return "";
    }
  };

  return (
    <div className={styles.containerModalPrice}>
      <h1>Ofertar</h1>
      <h3>Pon una tarifa y espera que el dueño responda</h3>
      <div className={styles.containerModalPriceChildren}>
        <CardPetInfo data={data} />
        <div className={styles.containerOfferPrice}>
          <h3>
            ¿Cuál sería la tarifa que quieres proponer para cuidar a esta
            mascota?
          </h3>
          <div className={styles.ofertas}>
            <h5>TARIFAS</h5>
            <h6>
              <img src={etiquetaTarifa} />
              Tarifa por día
            </h6>
            <div className={styles.priceInput}>
              <span>$.</span>
              <input
                type="text" // Cambiado a tipo texto para permitir mensajes de error
                placeholder="Ingrese la tarifa"
                maxLength="3" // Limita la longitud a 3 dígitos
                onChange={changeValue}
                value={price}
              />
            </div>
            <button onClick={pressOffer}>OFERTAR</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalPrice;

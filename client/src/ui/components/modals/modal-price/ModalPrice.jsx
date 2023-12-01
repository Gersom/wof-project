import styles from "./styles.module.scss";
import CardPetInfo from "../../cards/card-pets/CardPetInfo";
import etiquetaTarifa from "@icons/etiquetaTarifa.svg";
import axios from "axios";
import { API_URL } from "@src/common/constants/api";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const ModalPrice = ({ message, data, toggleModal }) => {
  const [price, setPrice] = useState("");
  const postPrice = async (dataPost) => {
    try {
      const response = await axios.post(API_URL + "/requests", dataPost);
      console.log(response);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const userData = useSelector((state) => state.userReducer?.user);

  const params = useParams();

  const pressOffer = async () => {
    const successPost = await postPrice({
      price: price,
      postId: params.id,
      caregiverId: userData?.caregiver?.id,
    });
    toggleModal(false);
  };

  const changeValue = (e) => {
    setPrice(e.target.value);
    console.log(e.target.value);
  };

  const validate = (name, value) => {
    // Utiliza la misma lógica de validación que en el componente Form
    switch (name) {
      case "tarifa":
        const inputMaxLength = 3;
        if (value === "") {
          // Campo requerido
          return "Campo requerido.";
        } else if (value.length > inputMaxLength) {
          // Longitud máxima excedida
          return "La tarifa no puede exceder los 3 dígitos.";
        } else if (isNaN(Number(value))) {
          // No es un número
          return "Ingrese solo números.";
        } else {
          // Válido
          return "";
        }
      default:
        return "";
    }
  };

  const handleKeyPress = (event) => {
    const name = "tarifa";
    const value = event.target.value + event.key;

    const errorMessage = validate(name, value);

    if (errorMessage !== "") {
      event.preventDefault();
    }
  };

  return (
    <div className={styles.container}>
      <h1>Ofertar</h1>
      <h3>Pon una tarifa y espera que el dueño responda</h3>
      <div className={styles.containerChildren}>
        <CardPetInfo data={data}></CardPetInfo>
        <div className={styles.containerOffer}>
          <h4>
            ¿Cuál sería la tarifa que quieres proponer para cuidar a esta
            mascota?
          </h4>
          <div className={styles.ofertas}>
            <h5>TARIFAS</h5>
            <h6>
              <img className={styles.img} src={etiquetaTarifa} />
              TARIFA POR DÍA
            </h6>
            <div className={styles.priceInput}>
              <span className={styles.currencySymbol}>$</span>
              <input
                type="text" // Cambiado a tipo texto para permitir mensajes de error
                placeholder="Ingrese la tarifa"
                maxLength="3" // Limita la longitud a 3 dígitos
                onKeyPress={handleKeyPress}
                onChange={changeValue}
              />
            </div>
            <button className={styles.botonOferta} onClick={pressOffer}>
              OFERTAR
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalPrice;

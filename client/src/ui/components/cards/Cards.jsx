import styles from "./styles.module.css";

import Card from "../card/Card";

const Cards = ({ mascotas }) => {
  return (
    <div className={styles.Container}>
      {mascotas.map((mascota) => (
        <Card
          nombre={mascota.name}
          nombre_mascota={mascota.last_name}
          lugar={mascota.lugar}
          horas={mascota.img}
          fechas={mascota.fechas}
          review={mascota.review}
        ></Card>
      ))}
    </div>
  );
};

export default Cards;

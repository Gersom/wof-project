import styles from "./styles.module.scss";
const CardReviewPets = ({ comment }) => {
  return (
    <div>
      <div className={styles.cardCont}>
        <h3 className={styles.title}>Reseñas</h3>
        <hr className={styles.firstRounded}></hr>
        <h5 className={styles.paragraph}>
          “ ... Anny fue muy correcta al describir su mascota, me gusto tenerlo
          en mi casa, no causa problemas y avisa cuando tiene que ir al baño. ”
        </h5>
        <div className={styles.infoPerson}>
          <img
            className={styles.profilePic}
            src="https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="Foto de Perfil"
          />
          <div className={styles.textInfo}>
            <p className={styles.personName}>Gabriel</p>
            <p className={styles.date}>Octubre de 2023</p>
          </div>
        </div>
        <hr className={styles.secondRounded}></hr>
        <h5 className={styles.paragraph}>
          “ ... ese perro es muy problematico, me saca la lengua a cada rato, me
          babea el mueble, cero recomendado ”
        </h5>
        <div className={styles.infoPerson}>
          <img
            className={styles.profilePic}
            src="https://images.pexels.com/photos/1310522/pexels-photo-1310522.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="Foto de Perfil"
          />
          <div className={styles.textInfo}>
            <p className={styles.personName}>Gaby</p>
            <p className={styles.date}>Julio de 2023</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardReviewPets;

import styles from './styles.module.scss';

const CardAccept = ({
  startDate,
  endDate,
  completedAcept,
  onAccept = () => null,
  toggleModal,
  onCancel = () => null,
  toggleCancelModal
}) => {

  const formatDate = (fechaString) => {
    if (fechaString) {
      const fecha = new Date(fechaString);

      const opcionesDeFormato = { year: 'numeric', month: 'long', day: 'numeric' };

      const formato = new Intl.DateTimeFormat('es-ES', opcionesDeFormato);
      const fechaFormateada = formato.format(fecha);
      return fechaFormateada
    }
    else return ''
  }
  const handleAccept = () => {
    onAccept();
    toggleModal();
  }

  const handleCancel = () => {
    onCancel();
    toggleCancelModal();
  }
  return (
    <article className={styles.article}>
      <h3>Publicación</h3>
      <div className={styles.info}>
        <h4>Tiempo a cuidar:</h4>
      </div>
      <div className={styles.info}>
        <h5>Desde: {formatDate(startDate)}</h5>
      </div>
      <div className={styles.info}>
        <h5>Hasta: {formatDate(endDate)}</h5>
      </div>
      {
        !completedAcept ?
          <button className={styles.linkContainer}
            onClick={handleAccept}>
            Deseo Cuidar
          </button>
          :
          <button className={styles.cancelButton}
            onClick={handleCancel}>
            Cancelar oferta
          </button>
      }

    </article>
  )
}

export default CardAccept;
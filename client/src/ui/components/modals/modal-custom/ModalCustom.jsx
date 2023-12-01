import styles from "./styles.module.scss";
import cross from "@icons/filterSortLocationBar/cross.svg";

const ModalCustom = ({
  state,
  toggleModal,
  children,
  isWarning,
  closeButton = true,
}) => {
  const handleOverlayClick = (event) => {
    if (isWarning) {
      if (event.target.classList.contains(styles.containerOverlay)) {
        toggleModal();
      }
    }
  };
  return (
    <>
      {state && (
        <div className={styles.containerOverlay} onClick={handleOverlayClick}>
          <div className={styles.containerModal}>
            {closeButton ? (
              <img
                src={cross}
                alt="cross"
                className={styles.cross}
                onClick={toggleModal}
              />
            ) : (
              ""
            )}

            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default ModalCustom;

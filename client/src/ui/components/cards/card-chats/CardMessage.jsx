import { useState } from "react";
import styles from "./styles.module.scss";
import { convertDate } from "@src/common/utils/converDates";
import ModalCustom from "../../modals/modal-custom/ModalCustom";

const CardMessage = ({
  data = {
    isOwner: false,
    isCaregiver: false,
    message: "",
    createdAt: "",
    image: null,
  },
  caregiverName,
  ownerName,
  role,
}) => {
  const [modalState, setModalState] = useState(false);
  const date = convertDate(data.createdAt);

  const renderMessage = () => {
    if ((role === "owner") & data.isOwner) {
      return (
        <div className={styles.messageOwnerByOwner}>
          <section>
            <h4>{date}</h4>
            <h3>🦮{ownerName} :</h3>
          </section>
          {data.image ? (
            <p className={styles.pImg}>
              <img
                src={data.image}
                onClick={() => setModalState(!modalState)}
              />
              {data.message}
            </p>
          ) : (
            <p dangerouslySetInnerHTML={{ __html: data.message }}></p>
          )}
        </div>
      );
    } else if ((role === "owner") & data.isCaregiver) {
      return (
        <div className={styles.messageOwnerByCaregiver}>
          <section>
            <h3>🤝{caregiverName} :</h3>
            <h4>{date}</h4>
          </section>
          {data.image ? (
            <p className={styles.pImg}>
              <img
                src={data.image}
                onClick={() => setModalState(!modalState)}
              />
              {data.message}
            </p>
          ) : (
            <p dangerouslySetInnerHTML={{ __html: data.message }}></p>
          )}
        </div>
      );
    } else if ((role === "caregiver") & data.isCaregiver) {
      return (
        <div className={styles.messageCaregiverByCaregiver}>
          <section>
            <h4>{date}</h4>
            <h3> 🤝{caregiverName} :</h3>
          </section>
          {data.image ? (
            <p className={styles.pImg}>
              <img
                src={data.image}
                onClick={() => setModalState(!modalState)}
              />
              {data.message}
            </p>
          ) : (
            <p dangerouslySetInnerHTML={{ __html: data.message }}></p>
          )}
        </div>
      );
    } else if ((role === "caregiver") & data.isOwner) {
      return (
        <div className={styles.messageCaregiverByOwner}>
          <section>
            <h3>🦮{ownerName} :</h3>
            <h4>{date}</h4>
          </section>
          {data.image ? (
            <p className={styles.pImg}>
              <img
                src={data.image}
                onClick={() => setModalState(!modalState)}
              />
              {data.message}
            </p>
          ) : (
            <p dangerouslySetInnerHTML={{ __html: data.message }}></p>
          )}
        </div>
      );
    }
  };

  return (
    <>
      {renderMessage()}{" "}
      <ModalCustom
        state={modalState}
        toggleModal={() => setModalState(!modalState)}
        isWarning={true}
        closeButton={false}
      >
          <img src={data.image} alt="image" className={styles.imgModal} onClick={() => setModalState(!modalState)} />

      </ModalCustom>
    </>
  );
};

export default CardMessage;

import { useState, useEffect } from "react";
import styles from "./styles.module.scss";
import CardUser from "@src/ui/components/cards/card-user/CardUser";
import Carousel from "@src/ui/components/carousel/Carousel";
import { useParams } from "react-router-dom";
import useGetDetails from "@src/common/hooks/useGetDetails";
import CardInfoPet from "@src/ui/components/cards/card-info/CardInfoPet";
import CardReviewPets from "@src/ui/components/cards/card-reviews/CardReviewPets";
import CardAccept from "@src/ui/components/cards/card-accept/cardAccept";
import ModalPrice from "@src/ui/components/modals/modal-price/ModalPrice";
import ModalCustom from "@src/ui/components/modals/modal-custom/ModalCustom";
import ModalSendOffer from "@src/ui/components/modals/modal-send-offer/SendOffer";

const Details = () => {
  const { id } = useParams();
  const { isLoading, details } = useGetDetails(id);
  const [success, setSuccess] = useState(false);
  const [statusModal, setStatusModal] = useState(false);
  const [payedInfoModal, setPayedInfoModal] = useState(false);
  const [cancelModal, setCancelModal] = useState(false);

  console.log(details);


  const manageModal = () => {
    setStatusModal(false)
    if (statusModal) {
      setPayedInfoModal(true);
    }
  }

  const acceptFunc = () => {
    setStatusModal(true);
  };

  const cancelFunc = () => {
    setCancelModal(true);
  };

  return (
    <div className={styles.mainContainerGrid}>
      <div className={styles.containerLeft}>
        {!isLoading && (
          <CardUser
            name={details.owner.name}
            role={details.owner.role}
            address={details.owner.address}
            rating={details.owner.rating}
            imgSrc={details.owner.profilePicture}
            cellPhone={details.owner.cellPhone}
            success={success}
          />
        )}
        {!isLoading && <CardReviewPets />}
      </div>
      <div className={styles.containerRight}>
        {!isLoading && <h1>{details.pet.name}</h1>}
        {!isLoading && <Carousel images={details.pet.images} />}
        {!isLoading && <CardInfoPet data={details} role={"owner"} />}
        <CardAccept
          startDate={details.startDate}
          endDate={details.endDate}
          completedAcept={success}
          onAccept={acceptFunc}
          toggleModal={() => setStatusModal(true)}
          onCancel={cancelFunc}
          toggleCancelModal={() => setCancelModal(false)}
        />
        {!isLoading && (
          <>
            <ModalCustom
              state={statusModal}
              toggleModal={() => setStatusModal(!statusModal)}
              isWarning={false}
            >
              <ModalPrice
                data={details}
                toggleModal={() => manageModal()}
              />


            </ModalCustom>
            <ModalCustom
              state={payedInfoModal}
              toggleModal={() => { setPayedInfoModal(false); setSuccess(true); }}

            >
              <ModalSendOffer />
            </ModalCustom>
            {/* <ModalCustom
              state={cancelModal}
              toggleModal={() => {setPayedInfoModal(false); setSuccess(true);}}

            >
              <ModalSendOffer />
            </ModalCustom> */}

          </>
        )}
      </div>
    </div>
  );
};

export default Details;

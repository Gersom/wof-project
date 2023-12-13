import { useState, useEffect } from "react";
import styles from "./styles.module.scss";
import CardUser from "@src/ui/components/cards/card-user/CardUser";
import Carousel from "@src/ui/components/carousel/Carousel";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import useGetDetails from "@src/common/hooks/useGetDetails";
import CardInfoPet from "@src/ui/components/cards/card-info/CardInfoPet";
import CardReviewPets from "@src/ui/components/cards/card-reviews/CardReviewPets";
import CardAccept from "@src/ui/components/cards/card-accept/cardAccept";
import ModalPrice from "@src/ui/components/modals/modal-price/ModalPrice";
import ModalCustom from "@src/ui/components/modals/modal-custom/ModalCustom";
import ModalSendOffer from "@src/ui/components/modals/modal-send-offer/SendOffer";
import ModalCancelOffer from "@src/ui/components/modals/modal-cancel-offer/ModalCancelOffer";
import { API_URL_SERVICES } from "@src/common/constants/api";

const Details = () => {
  const { id } = useParams();
  const { isLoading, details } = useGetDetails(id);
  const [success, setSuccess] = useState(false);
  const [statusModal, setStatusModal] = useState(false);
  const [payedInfoModal, setPayedInfoModal] = useState(false);
  const [cancelModal, setCancelModal] = useState(false);
  const caregiverId = useSelector(
    (state) => state?.userReducer?.user?.caregiver?.id
  );
  // console.log(details);

  useEffect(() => {
    const getRequest = async () => {
      const response = await fetch(`${API_URL_SERVICES}${id}`);
      const data = await response.json();
      if (data.some((item) => item.caregiverId === caregiverId)) {
        setSuccess(true);
      } else {
        setSuccess(false);
      }
    };
    getRequest();
  }, [id, caregiverId]);

  const manageModal = () => {
    setStatusModal(false);
    if (statusModal) {
      setPayedInfoModal(true);
    }
  };

  const acceptFunc = () => {
    setStatusModal(false);
  };

  const cancelFunc = async () => {
    setCancelModal(false);
    setStatusModal(false);
    let options = {
      method : 'DELETE',
      headers : {
        'Content-Type' : 'application/json'
      },
      body : JSON.stringify({caregiverId : caregiverId})
    }
    await fetch(`${API_URL_SERVICES}${id}`, options);

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
        {!isLoading && <CardReviewPets id={details.owner.id} role={details.owner?.role}  reviewsData={details.owner.reviews} />}
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
          toggleModal={() => setStatusModal(!statusModal)}
          onCancel={cancelFunc}
          toggleCancelModal={() => setCancelModal(true)}
        />
        {!isLoading && (
          <>
            <ModalCustom
              state={statusModal}
              toggleModal={() => setStatusModal(!statusModal)}
              isWarning={false}
              closeButton={true}
            >
              <ModalPrice
                data={details}
                toggleModal={ manageModal}
                setSuccess={() => setSuccess(true)}
              />
            </ModalCustom>
            <ModalCustom
              state={payedInfoModal}
              toggleModal={() => {
                setPayedInfoModal(false);
              }}
            >
              <ModalSendOffer nameOwner={details.owner.name} />
            </ModalCustom>
            <ModalCustom
              state={cancelModal}
              toggleModal={() => {
                setCancelModal(false);
                setSuccess(false);
              }}
            >
              <ModalCancelOffer nameOwner={details.owner.name} data={details} />
            </ModalCustom>
          </>
        )}
      </div>
    </div>
  );
};

export default Details;

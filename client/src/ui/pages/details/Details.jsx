import { useState } from 'react';
import styles from "./styles.module.scss";
import CardUser from "@src/ui/components/card-user/CardUser";
import Carousel from "@src/ui/components/carousel/Carousel";
import { useParams } from "react-router-dom";
import useGetDetails from "@src/common/hooks/useGetDetails";
import CardInfoPet from "@src/ui/components/card-info/CardInfoPet";
import CardReviewPets from "@src/ui/components/card-reviews/CardReviewPets";
import CardAccept from "@src/ui/components/card-accept/cardAccept";

const Details = () => {
  const { id } = useParams();
  const { isLoading, details } = useGetDetails(id);
  const [success, setSuccess] = useState(false);

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
        {!isLoading && (
          <CardInfoPet
            breed={details.pet.breed}
            temperaments={details.pet.temperaments}
            manners={details.pet.manners}
            notes={details.pet.notes}
          />
        )}
        <CardAccept 
          startDate={details.startDate} 
          endDate={details.endDate}
          completedAcept={success}
          onAccept={()=>setSuccess(true)}
        />
      </div>
    </div>
  );
};

export default Details;

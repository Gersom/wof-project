import React from 'react';
import styles from './styles.module.scss';
import CardUser from '@src/ui/components/cards/card-user/CardUser';
import Carousel from '@src/ui/components/carousel/Carousel';
import { useParams } from 'react-router-dom';
import CardReviewPets from '@src/ui/components/cards/card-reviews/CardReviewPets';
import useGetDetailsCaregivers from '@src/common/hooks/useGetDetailsCaregivers';
import InfoCuidador from '@src/ui/components/cards/card-info-cuidador/cardInfoCuidador';
import { AceptarButton } from '@src/ui/components/button/button';

const DetailsCaregivers = () => {
  const { id } = useParams();
  const { isLoading, details } = useGetDetailsCaregivers(id);

  const returnForm = (event) => {
    event.preventDefault();
    console.log('Formulario enviado');
    // Aquí puedes manejar la lógica de envío del formulario si es necesario
  };

  return (
    <div className={styles.mainContainerGrid}>
      <div className={styles.containerLeft}>
        {!isLoading && (
          <CardUser
            name={details.user.name}
            role={details.user.role}
            address={details.user.address}
            rating={details.user.rating}
            imgSrc={details.user.profilePicture}
          />
        )}
        {!isLoading && <CardReviewPets />}
      </div>
      <div className={styles.containerRight}>
        <h1>Detalles del Cuidador</h1>
        {!isLoading && <Carousel images={details.caregiversImages} />}
        <InfoCuidador data={details}></InfoCuidador>
        <form name="form" onSubmit={returnForm} style={{ display: 'flex', alignItems: 'center' }}>
		<div className={styles.check}> 
		<input type="checkbox" name="acepto" id="miID" />
          <label htmlFor="miID" style={{ color: 'Black', marginRight: '8px' }}>
            Acepto los términos y condiciones
          </label>
		  </div>
        </form>

        <AceptarButton type="Aceptar" disabled={false} onClick={() => { console.log('Aceptar'); }}></AceptarButton>
      </div>
    </div>
  );
};

export default DetailsCaregivers;

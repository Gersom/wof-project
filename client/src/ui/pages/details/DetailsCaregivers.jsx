import styles from "./styles.module.scss";
import CardUser from '@src/ui/components/cards/card-user/CardUser';
import Carousel from '@src/ui/components/carousel/Carousel';
import { useParams } from 'react-router-dom';
import CardReviewPets from '@src/ui/components/cards/card-reviews/CardReviewPets';
import useGetDetailsCaregivers from '@src/common/hooks/useGetDetailsCaregivers';
import CardInfoCaregiver from '@src/ui/components/cards/card-info-caregiver/CardInfoCaregiver';
import CareInProgress from '@src/ui/components/care-in-progress/CareInProgress';
import { AceptarButton } from '@src/ui/components/button/button';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DetailsCaregivers = () => {
  const navigate = useNavigate();
	const { id } = useParams();
	const { isLoading, details } = useGetDetailsCaregivers(id);
	const myPets = useSelector((state) => state?.myPetsReducer?.myPets);
	const [petsRelation, setPetsRelation] = useState([]);

	const posts = useSelector((state) => state?.myPetsReducer?.posts);

	useEffect(() => {
		setPetsRelation(
			myPets?.map((pet) => {
				if (pet?.status === 'paid' && pet.caregiver.id == id) {
					return pet;
				} else{
					return null
				}
			}).filter((pet) => pet !== null) 
		);
	}, [myPets, id]);

	return (
		<div className={styles.mainContainerGrid}>
			<div className={styles.containerLeft}>
				{!isLoading && (
					<CardUser
						name={details.user.name}
						role={details.user.role}
						address={details.user.address}
						rating={details.rating}
						imgSrc={details.user.profilePicture}
					/>
				)}
				{!isLoading && <CardReviewPets id={details.id} role={details.user?.role}/>}
			</div>
			<div className={styles.containerRight}>
				<h1>Detalles del Cuidador</h1>
				{!isLoading && (
					<Carousel
						images={details.caregiversImages.map((image) => image.imageUrl)}
					/>
				)}
				<CardInfoCaregiver data={details} />
				{
          posts.length > 0 
          ? <AceptarButton
            type='Aceptar'
            disabled={false}
            onClick={() => {
              navigate(-1)
            }}
          />
          : ''
        }
				{!isLoading && petsRelation?.length > 0 && (
					<>
						<h1>{details.user.name} esta cuidando de </h1>
						{petsRelation.map((pet) => (
							<CareInProgress
								key={pet?.id}
								endDate={pet?.endDate}
								startDate={pet?.startDate}
								image={pet?.pet?.imageUrl}
								petName={pet?.pet?.name}
								style={'small'}
								postId={pet?.id}
								caregiverId={pet?.caregiver?.id}
								ownerId={pet?.owner?.id}
							/>
						))}
					</>
				)}
			</div>
		</div>
	);
};

export default DetailsCaregivers;

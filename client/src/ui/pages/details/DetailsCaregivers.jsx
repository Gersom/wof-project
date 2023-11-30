import styles from './styles.module.scss';
import CardUser from '@src/ui/components/cards/card-user/CardUser';
import Carousel from '@src/ui/components/carousel/Carousel';
import { useParams } from 'react-router-dom';
import CardReviewPets from '@src/ui/components/cards/card-reviews/CardReviewPets';
import useGetDetailsCaregivers from '@src/common/hooks/useGetDetailsCaregivers';

const DetailsCaregivers = () => {
	const { id } = useParams();
	const { isLoading, details } = useGetDetailsCaregivers(id);

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
			</div>
		</div>
	);
};

export default DetailsCaregivers;

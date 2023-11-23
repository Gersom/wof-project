import styles from './styles.module.scss';
import CardUser from '@src/ui/components/card-user/CardUser';
import Carousel from '@src/ui/components/carousel/Carousel';
import { useParams } from 'react-router-dom';
import useGetDetails from '@src/common/hooks/useGetDetails';
import CardInfoPet from '@src/ui/components/card-info/CardInfoPet';

const Details = () => {
	const { id } = useParams();
	const { isLoading, details } = useGetDetails(id);

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
					/>
				)}
			</div>
			<div className={styles.containerRight}>
				{!isLoading && (<h1>{details.pet.name}</h1>)}

				{!isLoading && <CardInfoPet
					breed={details.pet.breed}
					temperaments={details.pet.temperaments}
					manners={details.pet.manners}
					notes={details.pet.notes}
				/> }
			</div>
		</div>
	);
};

export default Details;

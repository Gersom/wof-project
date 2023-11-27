import styles from './styles.module.scss';
import { Link } from 'react-router-dom';
import routerNames from '@src/common/constants/routes';
import PetImage from './atoms/PetImage';
import SectionInfo from './atoms/SectionInfo';

const CardOffersOwner = ({
	data = {
		pet: { imageUrl: '', name: '',id : 0},
		owner: { name: '' },
		address: '',
		startDate: '',
		endDate: '',
		rating: 0,
	},
}) => {
	return (
		<Link to={routerNames['details'] + data.pet.id} className={styles.link}>
			<article className={styles.article}>
				<PetImage data={data} />
				<SectionInfo data={data}/>
			</article>
		</Link>
	);
};

export default CardOffersOwner;

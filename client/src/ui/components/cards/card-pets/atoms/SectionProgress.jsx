import styles from '../styles.module.scss';
import starReview from '@icons/starReview.svg';
import { Link } from 'react-router-dom';
import FooterDates from './FooterDates';
import routerNames from '@src/common/constants/routes';

const SectionProgress = ({data = {
    owner : {
        name: '',
        id: 0,
    },
    starDate : '',
    endDate : '',
    rating : 0,
	caregiver :{
		name: '',
		id: 0,
		rating: 0,
	}
}}) => {
	console.log(data);
	return (
		<section className={styles.sectionPublic}>
			<h3>Actualmente esta al cuidado de: </h3>
			<div className={styles.containerInfo}>
				<Link to={routerNames['detailsOwners'] + data.caregiver.id}>
					<h2>{data.caregiver.name}</h2>
				</Link>
				<img src={starReview} alt='starReview' />
				<h4>{data.caregiver.rating}</h4>
			</div>
			<FooterDates data={data} />
		</section>
	);
};

export default SectionProgress;

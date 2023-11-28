import styles from '../styles.module.scss';
import starReview from '@icons/starReview.svg';
import { Link } from 'react-router-dom';
import FooterDates from './FooterDates';

const SectionProgress = ({data = {
    owner : {
        name: '',
        id: 0,
    },
    starDate : '',
    endDate : '',
    rating : 0,
}}) => {
	return (
		<section className={styles.sectionPublic}>
			<h3>Actualmente esta al cuidado de: </h3>
			<div className={styles.containerInfo}>
				<Link to='/dashboard/details/1'>
					<h2>Gersom</h2>
				</Link>
				<img src={starReview} alt='starReview' />
				<h4>5.0</h4>
			</div>
			<FooterDates data={data} />
		</section>
	);
};

export default SectionProgress;

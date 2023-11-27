import styles from './styles.module.scss';
import PetImage from './atoms/PetImage';
import SectionProgress from './atoms/SectionProgress';
import SectionPublished from './atoms/SectionPublished';
import SectionDefault from './atoms/SectionDefault';

const CardPetPublic = ({
	data = {
		pet: {
			imageUrl:
				'https://static.fundacion-affinity.org/cdn/farfuture/PVbbIC-0M9y4fPbbCsdvAD8bcjjtbFc0NSP3lRwlWcE/mtime:1643275542/sites/default/files/los-10-sonidos-principales-del-perro.jpg',
			name: '',
		},
		owner: { name: '' },
		address: '',
		startDate: '',
		endDate: '',
		rating: 0,
		estado: '',
	},
}) => {
	return (
		<>
			<article className={styles.article}>
				<PetImage data={data} isEditable={true} />
				<SectionDefault data={data} />
			</article>
		</>
	);
};

export default CardPetPublic;

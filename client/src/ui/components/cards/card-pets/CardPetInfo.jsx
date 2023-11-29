import PetImage from './atoms/PetImage';
import styles from './styles.module.scss';
import SectionInfo from './atoms/SectionInfo';

const CardPetInfo = ({
	data = {
		pet: {
			imageUrl:
				'https://static.fundacion-affinity.org/cdn/farfuture/PVbbIC-0M9y4fPbbCsdvAD8bcjjtbFc0NSP3lRwlWcE/mtime:1643275542/sites/default/files/los-10-sonidos-principales-del-perro.jpg',
			name: 'Tukis',
			breed: 'Mestizo',
			manners: 'Es tranquilo a veces le dar por ladrar a las 3am pero es tranquilo en general',
		},
	},
}) => {
	return (
		<article className={styles.articleInfo}>
			<PetImage data={data} />
			<SectionInfo data={data} />
		</article>
	);
};

export default CardPetInfo;

import styles from './styles.module.scss';
import PetImage from './atoms/PetImage';
import ModalCustom from '@src/ui/components/modals/modal-custom/ModalCustom';
import ModalPublicPet from '@src/ui/components/modals/modal-public-pet/ModalPublicPet';
import SectionProgress from './atoms/SectionProgress';
import SectionPublished from './atoms/SectionPublished';
import SectionDefault from './atoms/SectionDefault';
import { useState } from 'react';

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
	const [modal, setModal] = useState(false);
	
	const handleRenderSection = () => {
		switch (data.status) {
			case 'progress':
				return <SectionProgress data={data} />;
			case 'published':
				return <SectionPublished data={data} toggleModal={() => setModal(true)}/>;
			default:
				return <SectionDefault data={data} toggleModal={() => setModal(true)}/>;
		}
	}

	return (
		<>
			<article className={styles.article}>
				<PetImage data={data} isEditable={true} />
				{handleRenderSection()}
			</article>
			<ModalCustom
				isWarning={false}
				state={modal}
				toggleModal={() => setModal(!modal)}
			>
				<ModalPublicPet data={data} />
			</ModalCustom>
		</>
	);
};

export default CardPetPublic;

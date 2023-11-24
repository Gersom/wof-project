import { useState, useEffect } from 'react';
import styles from './styles.module.scss';
import CardUser from '@src/ui/components/card-user/CardUser';
import Carousel from '@src/ui/components/carousel/Carousel';
import { useParams } from 'react-router-dom';
import useGetDetails from '@src/common/hooks/useGetDetails';
import CardInfoPet from '@src/ui/components/card-info/CardInfoPet';
import CardReviewPets from '@src/ui/components/card-reviews/CardReviewPets';
import CardAccept from '@src/ui/components/card-accept/cardAccept';
import ModalPost from '@src/ui/components/modal-post/ModalPost';
import {
	saveToLocalStorage,
	getFromLocalStorage,
} from '@common/utils/localStorage';

const Details = () => {
	const { id } = useParams();
	const { isLoading, details } = useGetDetails(id);
	const [success, setSuccess] = useState(false);
	const [toggleModal, setToggleModal] = useState(false);
	const handleToggleModal = () => setToggleModal(!toggleModal);
	const acceptFunc = () => {
		let posts = getFromLocalStorage('posts');
		if (posts) {
			const includeId = posts.includes(id);
			if (!includeId) {
				posts.push(id);
				saveToLocalStorage('posts', posts);
				setSuccess(true);
			}
		} else {
			saveToLocalStorage('posts', [id]);
			setSuccess(true);
		}
	};

	useEffect(() => {
		const posts = getFromLocalStorage('posts');
		if (posts) {
			const includeId = posts.includes(id);
			if (includeId) setSuccess(true);
		}
	}, [id]);

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
						success={success}
					/>
				)}
				{!isLoading && <CardReviewPets />}
			</div>
			<div className={styles.containerRight}>
				{!isLoading && <h1>{details.pet.name}</h1>}
				{!isLoading && <Carousel images={details.pet.images} />}
				{!isLoading && (
					<CardInfoPet
						breed={details.pet.breed}
						temperaments={details.pet.temperaments}
						manners={details.pet.manners}
						notes={details.pet.notes}
					/>
				)}
				<CardAccept
					startDate={details.startDate}
					endDate={details.endDate}
					completedAcept={success}
					onAccept={acceptFunc}
					toggleModal={handleToggleModal}
				/>
				{toggleModal && (
					<div className={styles.containerOverlay}>
						<div className={styles.containerModal}>
							<ModalPost
								nameOwner={details.owner.name}
								toggleModal={handleToggleModal}
							/>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default Details;

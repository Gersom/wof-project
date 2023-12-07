import CareInProgress from '@src/ui/components/care-in-progress/CareInProgress';
import styles from './styles.module.scss';
import FilterSortLocationBar from '@src/ui/components/filter-sort-location-bar/FilterSortLocationBar';
import OffersCaregiversDetail from '@src/ui/components/offers/offers-caregivers/OffersCaregiversDetail';
import OffersOwner from '@src/ui/components/offers/offers-owner/OffersOwner';
import { useSelector } from 'react-redux';
import useGetPostsCaregiverId from '@src/common/hooks/useGetPostsCaregiverId';

const Offers = () => {
	const role = useSelector((state) => state.userReducer.user.role);

	const { isLoading, posts } = useGetPostsCaregiverId();

	const renderOffers = () => {
		if (role === 'caregiver') {
			return (
				<>
					{!isLoading && posts.length > 0 && (
						<>
							{posts.map(
								(post, index) =>
									post.status === 'paid' && (
										<CareInProgress
											endDate={post.startDate}
											startDate={post.startDate}
                      petName={post.pet.name}
											image={post.pet.imageUrl}
											key={index}
											postId={post.id}
										/>
									)
							)}
							<h1>Mas ofertas</h1>
						</>
					)}

					<OffersOwner />
				</>
			);
		} else {
			return <OffersCaregiversDetail />;
		}
	};

	return (
		<div className={styles.containerGrid}>
			<h1>
				{role === 'caregiver'
					? 'Mascotas para cuidar'
					: 'Cuidadores para tu mascota'}
			</h1>
			<FilterSortLocationBar role={role} />

			{renderOffers()}
		</div>
	);
};

export default Offers;

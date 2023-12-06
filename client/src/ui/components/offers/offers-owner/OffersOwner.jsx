import styles from './styles.module.scss';
import CardOffersOwner from '../../cards/card-pets/CardOffersOwner';
import useOffersOwner from '@src/common/hooks/useOffersOwner';

function OffersOwner() {
	const { offersOwner } = useOffersOwner();
	return (
		<div className={styles.container}>
			{offersOwner.map(
				(offer, index) =>
					offer.status !== 'paid' && offer.status !== 'completed' && (
						<CardOffersOwner key={index} data={offer} />
					)
			)}
		</div>
	);
}

export default OffersOwner;

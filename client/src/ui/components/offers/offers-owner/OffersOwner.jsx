import styles from './styles.module.scss';
import CardOffersOwner from '../../cards/card-pets/CardOffersOwner';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { actionGetOffersOwner } from '@src/common/store/actions/offersActions';
import useOffersOwner from '@src/common/hooks/useOffersOwner';

function OffersOwner() {
  const dispatch = useDispatch();
	const { offersOwner } = useOffersOwner();

  useEffect(() => {
    dispatch(actionGetOffersOwner());
	}, [dispatch]);

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

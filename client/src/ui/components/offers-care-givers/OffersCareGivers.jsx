import { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import CardOffersCaregivers from '../card-offers-caregivers/CardOffersCaregivers';
import { getOffersCareGivers } from '@src/common/utils/getOffersCareGivers';
import CardInfo from '../card-info/CardInfo';

const OffersCareGivers = () => {
    const [offers, setOffers] = useState([]);

    useEffect(() => {
        const getOffers = async () => {
            const offers = await getOffersCareGivers();
            setOffers(offers);
        };
        getOffers();
    }, []);

	return (
		<div className={styles.containerMainGrid}>
			<div className={styles.containerCardInfo}>
				<h1>tukis</h1>
				<CardInfo />
			</div>
			<div className={styles.containerOffers}>
				{offers.slice(0,3).map((offer,index) => (
                    <CardOffersCaregivers
                        key={index}
                        name={offer.name}
                        rango={offer.experiencie}
                        imgSrc={offer.imgProfile}
                        address={offer.address}
                        price={offer.price}
                        rating={offer.rating}
                    />
                ))}
			</div>
		</div>
	);
};

export default OffersCareGivers;

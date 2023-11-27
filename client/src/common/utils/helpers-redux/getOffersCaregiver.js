import { API_URL_OFFERS } from '../../constants/api';
import { getOffersCareGivers } from '../getOffersCareGivers';

export const getOffersCaregiver = async () => {
    // const response = await fetch(API_URL_OFFERS);
    // const data = await response.json();
    const offers = await getOffersCareGivers();
    return offers;
}
const { RequestsModel } = require("../../models");

const getAllOffersService = async () => {
    try {
        const offers = await RequestsModel.findAll();
        return offers;
    } catch (error) {
        console.error('Error retrieving all offers:', error.message);
        throw new Error('Could not retrieve all offers');
    }
}

const getOfferService = async (offerId) => {
    try {
        const offer = await RequestsModel.findByPk(offerId);

        if (!offer) {
            throw new Error(`Offer with ID ${offerId} not found`);
        }
        return offer;
    } catch (error) {
        console.error(`Error retrieving offer with ID ${offerId}:`, error.message);
        throw new Error(`Could not retrieve offer with ID ${offerId}`);
    }
}

module.exports = {
    getAllOffersService,
    getOfferService
};

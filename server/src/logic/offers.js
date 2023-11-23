const { PostsModel } = require("../models");

const getAllOffersLogic = async () => {
    try {
        const offers = await PostsModel.findAllData();
        return offers;
    } catch (error) {
        console.error('Error retrieving all offers:', error.message);
        throw new Error('Could not retrieve all offers');
    }
}

const getOfferLogic = async (offerId) => {
    try {
        const offer = await PostsModel.findDataById(offerId);

        if (!offer) {
            throw new Error(`Offer with ID ${offerId} not found`);
        }
        return offer;
    } catch (error) {
        console.error(`Error retrieving offer with ID ${offerId}:`, error.message);
        throw new Error(`Could not retrieve offer with ID ${offerId}`);
    }
}

const postOfferLogic = async (data) =>{
    try {
       const created = PostsModel.createData(data);
       return created;
    } catch (error) {
        console.error(`Error creating offer:`, error.message);
        throw new Error(`Could not create offer`);
    }
}

module.exports = {
    getAllOffersLogic,
    getOfferLogic,
    postOfferLogic
};

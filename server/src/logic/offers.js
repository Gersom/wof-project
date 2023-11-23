const { PostsModel } = require("../models");

const getAllOffersLogic = async () => {
    try {
        const offers = await PostsModel.findAllOffers()
        const formattedOffers = offers.map((ele) => {
          const offer = ele.toJSON()
          let petImgUrl = ""
          if(offer.pet.petsImages.length > 0) {
            petImgUrl = offer.pet.petsImages[0].imageUrl
          }
          return {
            ...offer,
            rating: "4.70",
            owner: {
              id: offer.owner.id,
              userId: offer.owner.userId,
              name: offer.owner.user.name
            },
            pet: {
              id: offer.pet.id,
              name: offer.pet.name,
              imageUrl: petImgUrl
            }
          }
        })
        return formattedOffers
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

const {
  PostsModel,
  ReviewsModel,
  RequestsModel,
  UsersModel,
} = require("../models");

const getAllOffersLogic = async () => {
  try {
    const offers = await PostsModel.findAllOffers();
    const formattedOffers = offers.map((ele) => {
      const offer = ele.toJSON();
      let petImgUrl = "";

      if (offer.pet.petsImages.length > 0) {
        petImgUrl = offer.pet.petsImages[0].imageUrl;
      }
      return {
        ...offer,
        rating: offer.owner.rating,
        owner: {
          id: offer.owner.id,
          userId: offer.owner.userId,
          name: offer.owner.user.name,
        },
        pet: {
          id: offer.pet.id,
          name: offer.pet.name,
          species: offer.pet.species,
          imageUrl: petImgUrl,
          gender: offer.pet.gender.name,
        },
      };
    });
    return formattedOffers;
  } catch (error) {
    console.error("Error retrieving all offers:", error.message);
    throw new Error("Could not retrieve all offers");
  }
};

const getOfferLogic = async (offerId) => {
  try {
    let offer = await PostsModel.findOfferById(offerId);

    if (!offer) {
      throw new Error(`Offer with ID ${offerId} not found`);
    }

    offer = offer.toJSON();
    let reviewsData = await ReviewsModel.findByOwner(offer.owner.id);
    const formattedOffer = {
      ...offer,
      owner: {
        id: offer.owner.id,
        rating: offer.owner?.rating?.toFixed(2),
        ...offer.owner.user,
        reviews: reviewsData.map((ele) => {
          const review = ele.toJSON();
          return {
            ...review,
            caregiver: {
              id: review.caregiver.id,
              ...review.caregiver.user,
            },
          };
        }),
      },
      pet: {
        id: offer.pet.id,
        name: offer.pet.name,
        temperaments: offer.pet.temperaments,
        manners: offer.pet.manners,
        notes: offer.pet.notes,
        species: offer.pet.species,
        breed: offer.pet.breed.name,
        images: offer.pet.petsImages.map((ele) => {
          return ele.imageUrl;
        }),
      },
    };
    return formattedOffer;
  } catch (error) {
    console.error(`Error retrieving offer with ID ${offerId}:`, error.message);
    throw new Error(`Could not retrieve offer with ID ${offerId}`);
  }
};

const postServiceRequestLogic = async (data) => {
  try {
    if (data.caregiverId && data.postId) {
      return RequestsModel.createData(data);
    }

    return new Error("missing data: caregiverId or publicationId");
  } catch (error) {
    console.error(`Error creating offer:`, error.message);
    throw new Error(`Could not create offer`);
  }
};

module.exports = {
  getAllOffersLogic,
  getOfferLogic,
  postServiceRequestLogic,
};

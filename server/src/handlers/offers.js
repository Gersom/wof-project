const getAllOffersErrorHandler = (error, req, res, next) => {

    console.error("Error in getAllOffers:", error);
    res.status(500).json({ error: "An error occurred while retrieving the Offers." });
};

const getOfferErrorHandler = (error, req, res, next) => {

    console.error("Error in getOffer:", error);
    res.status(500).json({ error: "An error occurred while retrieving the Offer." });
};

const postOfferErrorHandler = (error, req, res, next) => {

    console.error("Error in getOffer:", error);
    res.status(500).json({ error: "An error occurred while posting the Offer." });
};


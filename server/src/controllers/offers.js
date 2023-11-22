const services = require("../services/internal/offers");
const catchedAsync = require("../utils/catchedAsync");
const ErrorHandler = require("../handlers/offers");

const getAllOffers = catchedAsync(async(req, res) => {
    const offers = await (services.getAllOffersService());
    res.status(200).json(offers)
},ErrorHandler.getAllOffersErrorHandler)

const getOffer = catchedAsync(async(req, res) => {
    const offerId = req.params.id;
    const offer = await (services.getOfferService(offerId));
    res.status(200).json(offer)
},ErrorHandler.getOfferErrorHandler)


module.exports = { getAllOffers, getOffer };
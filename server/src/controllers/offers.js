const logic = require("../logic/offers");
const catchedAsync = require("../utils/catchedAsync");
const ErrorHandler = require("../handlers/offers");

const getAllOffers = catchedAsync(async(req, res) => {
    const offers = await (logic.getAllOffersLogic());
    res.status(200).json(offers)
},ErrorHandler.getAllOffersErrorHandler)

const getOffer = catchedAsync(async(req, res) => {
    const offerId = req.params.id;
    const offer = await (logic.getOfferLogic(offerId));
    res.status(200).json(offer)
},ErrorHandler.getOfferErrorHandler)

const postOffer = catchedAsync(async(req, res)=>{
    const data = req.body;

    const created = await (logic.postServiceRequestLogic(data));
    res.status(200).json(created);

}, ErrorHandler.postOfferErrorHandler) 


module.exports = { getAllOffers, getOffer, postOffer };
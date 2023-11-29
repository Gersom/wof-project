const { getBreedsErrorHandler } = require("../handlers/breeds");
const { getBreedsLogic } = require("../logic/breeds");
const catchedAsync = require("../utils/catchedAsync");

const getBreeds = catchedAsync(async(req, res) => {
    const breeds = await getBreedsLogic(req);
    res.status(200).json(breeds)
}, getBreedsErrorHandler)

module.exports = { getBreeds };
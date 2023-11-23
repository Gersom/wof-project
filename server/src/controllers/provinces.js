const { getAllProvincesErrorHandler } = require("../handlers/provinces");
const { getProvincesLogic } = require("../logic/provinces");
const catchedAsync = require("../utils/catchedAsync");

const getAllProvinces = catchedAsync(async(req, res) => {
    const provinces = await getProvincesLogic(req);
    res.status(200).json(provinces)
}, getAllProvincesErrorHandler)

module.exports = { getAllProvinces };
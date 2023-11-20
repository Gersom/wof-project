const { getAllProvincesErrorHandler } = require("../handlers/provinces");
const { getProvincesController } = require("../services/provinces/provinces");
const catchedAsync = require("../utils/catchedAsync");

const getAllProvinces = catchedAsync(async(req, res) => {
    const provinces = await getProvincesController();
    res.status(200).json(provinces)
}, getAllProvincesErrorHandler)

module.exports = { getAllProvinces };
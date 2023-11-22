const { getAllProvincesErrorHandler } = require("../handlers/provinces");
const { getProvincesService } = require("../services/external/provinces");
const catchedAsync = require("../utils/catchedAsync");

const getAllProvinces = catchedAsync(async(req, res) => {
    const provinces = await getProvincesService();
    res.status(200).json(provinces)
}, getAllProvincesErrorHandler)

module.exports = { getAllProvinces };
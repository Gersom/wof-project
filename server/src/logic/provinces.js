const { ProvincesModel } = require("../models")
const getProvincesLogic = async () => {
    const provinces = await ProvincesModel.findAllData();
    return provinces.map(province => province.name)
}

module.exports = { getProvincesLogic }


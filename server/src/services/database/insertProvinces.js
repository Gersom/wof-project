const { ProvincesModel } = require("../../models/index")
const ProvincesModelData = require("../../data/provinces.json")
const insertRecords = require("./insertRecords")

const insertProvinces = async () => {
  insertRecords({
    name: 'Provinces',
    model: ProvincesModel,
    data: ProvincesModelData,
  })
}

module.exports = insertProvinces
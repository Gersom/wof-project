const { GerdersModel } = require("../../models/index")
const gerdersData = require("../../data/genders.json")
const insertRecords = require("./insertRecords")

const insertGerders = async () => {
  insertRecords({
    name: 'Genders',
    model: GerdersModel,
    data: gerdersData,
  })
}

module.exports = insertGerders
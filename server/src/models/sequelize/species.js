const { DataTypes } = require("sequelize")
const { sequelize } = require("../../config/dbConnect/engines/postgresql")

const name = 'species'
const config = { 
  timestamps: false, // createAt, updateAt
  freezeTableName: true
}
const schema = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  icon: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}

const SpeciesModel = sequelize.define(name, schema, config)

// add static methods (functions) to model
SpeciesModel['findAllData'] = () => {
  return SpeciesModel.findAll()
}
SpeciesModel['findOneData'] = (value, key= "id") => {
  // return SpeciesModel.findByPk(id)
  return SpeciesModel.findOne({
    where: {
      [key]: value
    }
  })
}
SpeciesModel['updateData'] = (id, body) => {
  return SpeciesModel.update(body, { where: {id} })
}
SpeciesModel['removeData'] = (id) => {
  return SpeciesModel.destroy({ where: {id} })
}
SpeciesModel['dataExist'] = async () => {
  const amountData = await SpeciesModel.count()
  return amountData > 0
}
SpeciesModel['createMany'] = (data = []) => {
  return SpeciesModel.bulkCreate(data, { ignoreDuplicates: true })
}

module.exports = SpeciesModel

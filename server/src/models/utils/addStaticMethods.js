const addStaticMethods = (model) => {
  model['findAllData'] = () => {
    return model.findAll()
  }
  model['findDataById'] = (id) => {
    return model.findByPk(id)
  }
  model['findOneData'] = (key= "name", value) => {
    return model.findOne({
      where: { [key]: value }
    })
  }
  model['findIdData'] = async (key= "name", value) => {
    const data = await model.findOne({
      where: { [key]: value }
    })
    return data ? data.toJSON().id : data
  }
  model['dataExist'] = async () => {
    const amountData = await model.count()
    return amountData > 0
  }
  model['createMany'] = (data = []) => {
    return model.bulkCreate(data, { ignoreDuplicates: true })
  }
  model['updateData'] = (id, body) => {
    return model.update(body, { where: {id} })
  }
  model['removeData'] = (id) => {
    return model.destroy({ where: {id} })
  }
}

module.exports = addStaticMethods
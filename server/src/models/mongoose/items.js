const mongoose = require("mongoose")

const name = 'items'
const config = {
  timestamps: true, // createAt, updateAt
  versionKey: false
}
const schema = {
  name: { 
    type: String,
    required: true
  },
  description: { 
    type: String,
    required: true
  },
  price: { 
    type: String,
    required: true
  },
  amount: { 
    type: Number,
    required: true
  },
}

const ItemsScheme = new mongoose.Schema(schema, config)

// add static methods (functions) to model
ItemsScheme.static('findAllData', () => {
  return this.find({})
})
ItemsScheme.static('findOneData', (id) => {
  return this.findById(id)
})
ItemsScheme.static('updateData', (id, body) => {
  return this.findOneAndUpdate({ _id: id }, body)
})
ItemsScheme.static('removeData', (id) => {
  return this.deleteOne({ _id: id })
})

const ItemsModel = mongoose.model(name, ItemsScheme)

module.exports = ItemsModel
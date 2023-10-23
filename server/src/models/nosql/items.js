const mongoose = require("mongoose")

const ItemsScheme = new mongoose.Schema(
  {
    name: { type: String },
    description: { type: String },
    price: { type: String },
    amount: { type: Number },
  },
  {
    timestamps: true, // createAt, updateAt
    versionKey: false
  }
)

module.exports = mongoose.model("items", ItemsScheme)
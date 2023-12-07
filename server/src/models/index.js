require('dotenv').config()
const DB_ENGINE = process.env.DB_ENGINE
let pathModel = ''

switch (DB_ENGINE) {
  case "postgresql":
    pathModel = 'sequelize'
    break
  case "mongodb":
    pathModel = 'mongoose'
    break
  default:
    throw new Error("Environment variable 'DB_ENGINE' is not valid.")
}

const models = {
  BreedsModel: require(`./${pathModel}/breeds`),
  CaregiversImagesModel: require(`./${pathModel}/caregivers_images`),
  CaregiversModel: require(`./${pathModel}/caregivers`),
  CountriesModel: require(`./${pathModel}/countries`),
  OwnersModel: require(`./${pathModel}/owners`),
  PetsImagesModel: require(`./${pathModel}/pets_images`),
  PetsModel: require(`./${pathModel}/pets`),
  PostsModel: require(`./${pathModel}/servicePostings`),
  ProvincesModel: require(`./${pathModel}/provinces`),
  RequestsModel: require(`./${pathModel}/serviceRequests`),
  ReviewsModel: require(`./${pathModel}/reviews`),
  SpeciesModel: require(`./${pathModel}/species`),
  TransactionsModel: require(`./${pathModel}/transactions`),
  UsersModel: require(`./${pathModel}/users`),
  GerdersModel: require(`./${pathModel}/genders`),
  NotificationsModel: require(`./${pathModel}/notifications`),
  AdminModel: require(`./${pathModel}/admin`),
  VerifyEmailModel: require(`./${pathModel}/verify_email`),
  ChatModel: require(`./${pathModel}/chat`),
  MessagesChatModel: require(`./${pathModel}/messageChat`),
}

module.exports = models
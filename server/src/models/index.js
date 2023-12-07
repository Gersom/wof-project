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
  AdminModel: require(`./${pathModel}/admin`),
  BreedsModel: require(`./${pathModel}/breeds`),
  CaregiversImagesModel: require(`./${pathModel}/caregiversImages`),
  CaregiversModel: require(`./${pathModel}/caregivers`),
  CaregiverTransactionsModel: require(`./${pathModel}/caregiverTransactions`),
  CountriesModel: require(`./${pathModel}/countries`),
  GerdersModel: require(`./${pathModel}/genders`),
  NotificationsModel: require(`./${pathModel}/notifications`),
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
  VerifyEmailModel: require(`./${pathModel}/verify_email`),
}

module.exports = models
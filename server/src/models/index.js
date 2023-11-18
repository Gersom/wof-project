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
  PostsModel: require(`./${pathModel}/posts`),
  ProvincesModel: require(`./${pathModel}/provinces`),
  RequestsModel: require(`./${pathModel}/requests`),
  ReviewsModel: require(`./${pathModel}/reviews`),
  UsersModel: require(`./${pathModel}/users`),
}

module.exports = models
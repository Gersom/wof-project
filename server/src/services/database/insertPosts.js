const { PostsModel, PetsModel, OwnersModel, UsersModel } = require("../../models")
let postsData = require("../../data/posts.json")
const insertRecords = require("./insertRecords")

const insertPosts = async () => {
  try {
    const annyUser = await UsersModel.findOneData("email", "anny@gmail.com")
    const annyOwnerId = await OwnersModel.findIdData("userId", annyUser.id)

    const gersomUser = await UsersModel.findOneData("email", "gersom@gmail.com")
    const gersomOwnerId = await OwnersModel.findIdData("userId", gersomUser.id)
    
    const pelucheId = await PetsModel.findIdData("name", "peluche")
    const simbaId = await PetsModel.findIdData("name", "simba")
    const ramsesId = await PetsModel.findIdData("name", "ramses")
    

    postsData[0] = {
      ...postsData[0],
      ownerId: annyOwnerId,
      petId: pelucheId,
      address: annyUser.address
    }
    postsData[1] = {
      ...postsData[1],
      ownerId: annyOwnerId,
      petId: simbaId,
      address: annyUser.address
    }
    postsData[2] = {
      ...postsData[2],
      ownerId: gersomOwnerId,
      petId: ramsesId,
      address: gersomUser.address
    }

    

    await insertRecords({
      name: 'Posts',
      model: PostsModel,
      data: postsData,
    })
  }
  catch (error) {
    throw Error(error.message)
  }
}

module.exports = insertPosts
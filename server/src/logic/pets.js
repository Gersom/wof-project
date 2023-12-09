const { createdPet, deletedPet, updatedPet } = require("../data/notifications");
const { PetsModel, UsersModel, OwnersModel } = require("../models");
const { PetsImagesModel } = require("../models");
const { NotificationsModel } = require("../models");

const getAllPetsLogic = async (ownerId) => {
  const pets = await PetsModel.findAllPets(ownerId);
  return pets.map((pet) => {
    let petImgUrl = "";

    const postObj = pet?.servicePostings[0]?.toJSON();

    if (pet?.petsImages?.length > 0) {
      petImgUrl = pet?.petsImages[0]?.imageUrl;
    }
    return {
      id: postObj?.id ?? null,
      status: postObj?.status ?? null,
      address: postObj?.address ?? null,
      startDate: postObj?.startDate ?? null,
      endDate: postObj?.endDate ?? null,
      pet: {
        id: pet?.id,
        name: pet?.name,
        temperaments: pet?.temperaments,
        manners: pet?.manners,
        notes: pet?.notes,

        imageUrl: petImgUrl,
        species: pet?.species,
        breed: pet?.breed,
        gender: pet?.gender,
      },
      owner: {
        id: pet?.owner?.id,
        userId: pet?.owner?.userId,
        name: pet?.owner?.user?.name,
        rating: pet?.owner?.rating,
      },
      caregiver: {
        id: postObj?.caregiver?.id,
        experiencies: postObj?.caregiver?.experiencies,
        myHouse: postObj?.caregiver?.myHouse,
        notes: postObj?.caregiver?.notes,

        userId: postObj?.caregiver?.user?.id,
        name: postObj?.caregiver?.user?.name,
        lastName: postObj?.caregiver?.user?.lastName,
        profilePicture: postObj?.caregiver?.user?.profilePicture,
        address: postObj?.caregiver?.user?.address,
        rating: postObj?.caregiver?.rating,
      },
    };
  });
};

const getPetLogic = async (id) => {
  const pet = await PetsModel.findPet(id);
  if (!pet) throw Error("Pet not found");
  return pet;
};

const postPetLogic = async (data) => {
  const newPet = await PetsModel.createPet(data);
  const images = data.imageUrl;
  if (images) {
    const imagesFormated = images.map((img) => ({
      petId: newPet.id,
      imageUrl: img,
    }));
    await PetsImagesModel.createMany(imagesFormated);
  }
  await NotificationsModel.create({
    ...createdPet,
    ownerId: data.ownerId,
    userId: data.userId,
  });

  return newPet;
  //   return {
  //     success: 'The user was created successfully.'
  //   }
};

const updatePetLogic = async (petId, data) => {
  await PetsImagesModel.removeDataByPet(petId);
  await PetsModel.updateData(petId, data);
  const pet = await PetsModel.findDataById(petId);
  const owner = await OwnersModel.findDataById(pet.ownerId);
  const images = data.imageUrl;

  if (images) {
    const imagesFormated = images.map((img) => ({
      petId,
      imageUrl: img,
    }));
    await PetsImagesModel.createMany(imagesFormated);
  }
  await NotificationsModel.create({
    ...updatedPet,
    userId: owner.userId,
  });
  return {
    success: "Pet was update correctly.",
  };
};
const deletePetLogic = async (id) => {
  const dataPet = await PetsModel.findDataById(id);
  const dataOwner = await UsersModel.findDataById(id);
  await PetsModel.removeData(id);
  await NotificationsModel.create({
    ...deletedPet,
    userId: dataOwner.userId,
    message: deletedPet.message + dataPet.name,
  });
  return {
    success: "Pet was deleted correctly.",
  };
};

module.exports = {
  getAllPetsLogic,
  getPetLogic,
  postPetLogic,
  updatePetLogic,
  deletePetLogic,
};

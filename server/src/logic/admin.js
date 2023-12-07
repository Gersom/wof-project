const { UsersModel, PetsModel } = require("../models");

const getAllUsersStatsLogic = async () => {
    const allUsers = await UsersModel.findAllUsers();
    const allPets = await PetsModel.findAllPets();

    const roleCounts = allUsers.reduce((acc, user) => {
        const role = user.role;
        acc[role] = (acc[role] || 0) + 1;
        return acc;
    }, {});

    const totalUsers = allUsers.length;
    const totalPets = allPets.length;

    return {
        usersCount: totalUsers,
        roleCounts: roleCounts,
        petsCount: totalPets
    };
}

module.exports={
    getAllUsersStatsLogic
}
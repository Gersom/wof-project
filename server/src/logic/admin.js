const { UsersModel, PetsModel, TransactionsModel, CaregiverTransactionsModel } = require("../models");

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

const getUsersInfoLogic = async (page = 1, pageSize = 10) => {
    const offset = (page - 1) * pageSize;

    const users = await UsersModel.findAll({
        attributes: ['profilePicture', 'role', 'email'],
        offset,
        limit: pageSize,
    });


    const usersWithTransactions = await Promise.all(users.map(async (user) => {
        let totalTransactions = 0;

        if (user.role === 'caregiver') {
           
            const caregiverTransactions = await CaregiverTransactionsModel.findAll({
                where: { email: user.email },
                attributes: ['amount'],
            });

           
            if (caregiverTransactions.length > 0) {
                totalTransactions = caregiverTransactions.reduce((sum, transaction) => sum + transaction.amount, 0);
            }
        } else {
            
            const regularTransactions = await TransactionsModel.findAll({
                where: { email: user.email },
                attributes: ['amount'],
            });

          
            if (regularTransactions.length > 0) {
                totalTransactions = regularTransactions.reduce((sum, transaction) => sum + transaction.amount, 0);
            }
        }

        return {
            profilePicture: user.profilePicture,
            role: user.role,
           
            email: user.email,
           
            totalTransactions: totalTransactions || 0,
        };
    }));
    return usersWithTransactions;
};

module.exports = {
    getAllUsersStatsLogic,
    getUsersInfoLogic
}
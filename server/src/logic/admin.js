require('dotenv').config()

const SERVER_HOST = process.env.HOST || "localhost"
const SERVER_PORT = process.env.PORT || "3000"
const MODE = process.env.MODE

let urlHost;

if(MODE){
  urlHost = SERVER_HOST;
}
else{
  urlHost = `${SERVER_HOST}:${SERVER_PORT}`;
}

const {
  UsersModel,
  PetsModel,
  TransactionsModel,
  CaregiverTransactionsModel,
} = require("../models");

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
    petsCount: totalPets,
  };
};

const getUsersInfoLogic = async (page = 1, pageSize = 10) => {
  const offset = (page - 1) * pageSize;

  const users = await UsersModel.findAndCountAll({
    attributes: ["profilePicture", "role", "email", "name"],
    offset,
    limit: pageSize,
  });

  const totalCount = users.count;
  const totalPages = Math.ceil(totalCount / pageSize);

  const usersWithTransactions = await Promise.all(
    users.rows.map(async (user) => {
      let totalTransactions = 0;

      if (user.role === "caregiver") {
        const caregiverTransactions = await CaregiverTransactionsModel.findAll({
          where: { email: user.email },
          attributes: ["amount"],
        });

        if (caregiverTransactions.length > 0) {
          totalTransactions = caregiverTransactions.reduce(
            (sum, transaction) => sum + transaction.amount,
            0
          );
        }
      } else {
        const regularTransactions = await TransactionsModel.findAll({
          where: { email: user.email },
          attributes: ["amount"],
        });

        if (regularTransactions.length > 0) {
          totalTransactions = regularTransactions.reduce(
            (sum, transaction) => sum + transaction.amount,
            0
          );
        }
      }

      return {
        profilePicture: user.profilePicture,
        role: user.role,
        email: user.email,
        name: user.name,
        totalTransactions: totalTransactions || 0,
      };
    })
  );

  const nextPage = page < totalPages ? page + 1 : null;
  const prevPage = page > 1 ? page - 1 : null;

  return {
    count: totalCount,
    next: nextPage ? `${urlHost}/api/admin/users-info?page=${nextPage}&pageSize=${pageSize}` : null,
    previous: prevPage ? `${urlHost}/api/admin/users-info?page=${prevPage}&pageSize=${pageSize}` : null,
    results: usersWithTransactions,
  };
};

module.exports = {
  getAllUsersStatsLogic,
  getUsersInfoLogic,
};
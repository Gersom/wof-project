require('dotenv').config()
const { Op } = require('sequelize');

const SERVER_HOST = process.env.HOST || "localhost"
const SERVER_PORT = process.env.PORT || "3000"
const MODE = process.env.MODE

let urlHost;

if (MODE) {
  urlHost = SERVER_HOST;
}
else {
  urlHost = `${SERVER_HOST}:${SERVER_PORT}`;
}

const {
  UsersModel,
  PetsModel,
  TransactionsModel,
  CaregiverTransactionsModel,
} = require("../models");

const getAllUsersStatsLogic = async () => {
  const normalUsers = await UsersModel.findAllUsers({ where: { deletedAt: null } });
  const bannedUsersCount = await UsersModel.count({paranoid:false, where: { deletedAt: { [Op.not]: null }}});
  const allPets = await PetsModel.findAllPets();

  const roleCounts = normalUsers.reduce((acc, user) => {
    const role = user.role;
    acc[role] = (acc[role] || 0) + 1;
    return acc;
  }, {});

  const totalPets = allPets.length;
  const totalUsers = normalUsers.length;

  return {
    usersBanned: bannedUsersCount,
    usersNotBanned: totalUsers,
    usersTotal: totalUsers+bannedUsersCount,
    roleCounts: roleCounts,
    petsCount: totalPets,
  };
};

const getUsersInfoLogic = async (page = 1, pageSize = 10) => {
  const offset = (page - 1) * pageSize;

  const users = await UsersModel.findAndCountAll({
    attributes: ["profilePicture", "role", "email", "name", "id", "deletedAt"],
    offset,
    limit: pageSize,
    paranoid: false,
    order: [['id', 'ASC']],
  });

  const totalCount = users.count;
  const totalPages = Math.ceil(totalCount / pageSize);

  const usersWithTransactions = await Promise.all(
    users.rows.map(async (user) => {
      let totalTransactions = 0;

      if (user.role === "caregiver") {
        const caregiverTransactions = await CaregiverTransactionsModel.findAll({
          where: { email: user.email },
          attributes: ["amountPaid"],
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
        userId: user.id,
        profilePicture: user.profilePicture,
        role: user.role,
        email: user.email,
        name: user.name,
        totalTransactions: totalTransactions || 0,
        banned:user.deletedAt?true:false,
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

const deleteUserLogic = async (userId) => {
  try {
    const deletedUser = await UsersModel.deleteUser(userId);
    console.log('User logically deleted:', deletedUser);
    return deletedUser;
  } catch (error) {
    console.error('Error deleting user logically:', error.message);
    throw error;
  }
};

const getUserLogicSuper = async (id) => {
  const User = await UsersModel.findUserSuperById(id);
  if (!User) throw Error("User not found");
  return User;
};

const restoreUserLogic = async (userId) => {
  try {
    const restoredUser = await UsersModel.restoreUser(userId);
    console.log('User logically restored:', restoredUser);
    return restoredUser;
  } catch (error) {
    console.error('Error restoring user logically:', error.message);
    throw error;
  }
};



module.exports = {
  getAllUsersStatsLogic,
  getUsersInfoLogic,
  deleteUserLogic,
  restoreUserLogic,
  getUserLogicSuper
};
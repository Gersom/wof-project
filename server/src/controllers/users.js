const ErrorHandler = require("../handlers/users");
const {
  getAllUsersLogic,
  getUserLogic,
  postUserLogic,
  updateUserLogic,
  deleteUserLogic,
  postNewRoleLogic,
} = require("../logic/users");
const catchedAsync = require("../utils/catchedAsync");
const createUserMail = require("../config/mailing/createUserMail.js");
const deleteUserMail = require("../config/mailing/deleteUserMail.js");
const { loginUserLogic } = require("../logic/sing-in.js");

// READ ITEMS
const getAllUsers = catchedAsync(async (req, res) => {
  const users = await getAllUsersLogic();
  res.status(200).json(users);
}, ErrorHandler.getAllUsersErrorHandler);

//LOGIN
const loginUser = catchedAsync(async (req, res) => {
  const { email, password } = req.body;

  const loginResult = await loginUserLogic(email, password);

  if (loginResult.error) {
    return res.status(401).json({ error: loginResult.error });
  }

  res.status(200).json(loginResult);
});

// DETAIL ITEM
const getUser = catchedAsync(async (req, res) => {
  const { id } = req.params;
  const user = await getUserLogic(id);
  res.status(200).json(user);
}, ErrorHandler.getUserErrorHandler);

// CREATE ITEM
const createUser = catchedAsync(async (req, res) => {
  const newUser = await postUserLogic(req.body);
  const { email, name, lastName } = req.body;
  createUserMail(email, name, lastName);
  res.status(200).json(newUser);
}, ErrorHandler.createUserErrorHandler);

// UPDATE ITEM
const updateUser = catchedAsync(async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  const updatedUser = await updateUserLogic(id, body);
  res.status(200).json(updatedUser);
}, ErrorHandler.updateUserErrorHandler);

// DELETE ITEM
const deleteUser = catchedAsync(async (req, res) => {
  const { id } = req.params;
  const deletedUser = await deleteUserLogic(id);
  const { email, name, lastName } = req.body;
  deleteUserMail(email, name, lastName);
  res.status(200).json(deletedUser);
}, ErrorHandler.deleteUserErrorHandler);

// DELETE ITEM
const newRole = catchedAsync(async (req, res) => {
  const { id } = req.params;
  const newRole = await postNewRoleLogic(id, req.body);
  res.status(200).json(newRole);
}, ErrorHandler.postNewRoleErrorHandler);

module.exports = {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
  newRole,
};

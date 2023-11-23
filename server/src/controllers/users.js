const ErrorHandler = require("../handlers/users");
const {
  getAllUsersLogic,
  getUserLogic,
  postUserLogic,
  updateUserLogic,
  deleteUserLogic,
} = require("../logic/users");
const UsersModel = require("../models/sequelize/users.js");
const catchedAsync = require("../utils/catchedAsync");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// READ ITEMS
const getAllUsers = catchedAsync(async (req, res) => {
  const users = await getAllUsersLogic();
  res.status(200).json(users);
}, ErrorHandler.getAllUsersErrorHandler);

//LOGIN

const loginUser = catchedAsync(async (req, res) => {
  const { email, password } = req.body;

  // Buscar al usuario por correo electrónico
  const user = await UsersModel.findOne({
    where: {
      email: email,
    },
  });
  // return res.status(200).send(user)

  if (!user) {
    // El usuario no existe
    return res.status(401).json({ error: "No recibi informacion" });
  }

  // Verificar la contraseña utilizando el método de comparación de hash
  const isPasswordValid = await user.comparePassword(password);
  
  console.log("Contraseña ingresada:", password);
  console.log("Contraseña almacenada:", user.password);
  
  if (!isPasswordValid) {
    // Contraseña incorrecta
    console.log("Contraseña incorrecta");
    return res.status(401).json({ error: "Contraseña incorrecta" });
  }
  
  // Autenticación exitosa, generar un token JWT
  const token = jwt.sign({ userId: user.id }, "tu_secreto_secreto", {
    expiresIn: "1h",
  });
  // return res.status(501).send(isPasswordValid)
  
  res.status(200).json({ token, success: "Inicio de sesión exitoso" });
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
  res.status(200).json(deletedUser);
}, ErrorHandler.deleteUserErrorHandler);

module.exports = {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
};

const jwt = require("jsonwebtoken");
const UsersModel = require("../models/sequelize/users.js");

const loginUserLogic = async (email, password) => {
    try {
        const user = await UsersModel.findOne({
            where: {
                email: email,
            },
        });

        if (!user) {
            return { error: "Usuario no encontrado" };
        }

        const isPasswordValid = await user.comparePassword(password);

        if (!isPasswordValid) {
            return { error: "Contraseña incorrecta" };
        }

        const token = jwt.sign({ userId: user.id }, "tu_secreto_secreto", {
            expiresIn: "24h",
        });

        return { token, userId: user.id, success: "Inicio de sesión exitoso" };
    } catch (error) {
        return { error: "Error en el servidor al procesar la solicitud" };
    }
};

module.exports = { loginUserLogic }
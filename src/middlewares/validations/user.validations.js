import { body, param } from "express-validator";
import {UserModel} from "../../models/user.model.js";
import { Op } from "sequelize";

export const idParamsUserValidation = [
  param("id")
    .isInt()
    .withMessage("El id debe ser un número entero")
    .custom(async (id) => {
      if (Number(id) < 1) throw new Error("El id debe ser positivo");
      return true;
    })
    .custom(async (id) => {
      const user = await UserModel.findByPk(id);
      if (!user) throw new Error("El usuario no existe");
      return true;
    }),
];

export const updateUserValidation = [
  param("id")
    .isInt()
    .withMessage("El id debe ser un número entero")
    .custom(async (id) => {
      if (Number(id) < 1) throw new Error("El id debe ser positivo");
      return true;
    })
    .custom(async (id) => {
      const user = await UserModel.findByPk(id);
      if (!user) throw new Error("El usuario no existe");
      return true;
    }),
  body("username")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("El username es obligatorio")
    .isLength({ min: 3, max: 20 })
    .withMessage(
      "El username debe tener un minimo de 3 caracteres y un maximo de 20"
    )
    .isAlphanumeric()
    .withMessage("El username debe ser alfanumerico")
    .custom(async (username, { req }) => {
      const usernameMinuscula = username.toLowerCase();
      const user = await UserModel.findOne({
        where: { username: usernameMinuscula, id: { [Op.ne]: req.params.id } },
      });
      if (user) {
        throw new Error("El username ya existe");
      }
      return true;
    }),
  body("email")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("El email es obliatorio")
    .isEmail()
    .withMessage("No tiene el formato ejemplo@gmail.com")
    .isLength({ max: 100 })
    .withMessage("El email debe tener al un maximos de 100 caracteres ")
    .custom(async (email, { req }) => {
      const emailMinuscula = email.toLowerCase();
      const emailExiste = await UserModel.findOne({
        where: { email: emailMinuscula, id: { [Op.ne]: req.params.id } },
      });
      if (emailExiste) {
        throw new Error("El email ya existe");
      }
      return true;
    })
    .escape(),
  body("password")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("El password es obligatorio")
    .isLength({ min: 8, max: 255 })
    .withMessage(
      "El password debe tener un minimo de 8 caracteres y no puede tener más de 255 caracteres"
    )
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/)
    .withMessage(
      "La contraseña debe tener al menos una minuscula, una mayuscula y un número"
    ),
  body("role")
    .optional()
    .isIn(["user", "admin"])
    .withMessage("El campo role sólo puede ser 'user' o 'admin'"),
];

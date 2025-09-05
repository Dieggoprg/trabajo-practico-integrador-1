import { body } from "express-validator";
import {UserModel} from "../../models/user.model.js";

export const createRegisterValidation = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("El username es obligatorio")
    .isLength({ min: 3, max: 20 })
    .withMessage(
      "El username debe tener un minimo de 3 caracteres y un maximo de 20"
    )
    .isAlphanumeric()
    .withMessage("El username debe ser alfanumerico")
    .custom(async (username) => {
      const usernameMinuscula = username.toLowerCase();
      const user = await UserModel.findOne({
        where: { username: usernameMinuscula },
      });
      if (user) {
        throw new Error("El usurname ya existe");
      }
      return true;
    }),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("El email es obliatorio")
    .isEmail()
    .withMessage("No tiene el formato ejemplo@gmail.com")
    .isLength({ max: 100 })
    .withMessage("El email debe tener al un maximos de 100 caracteres ")
    .custom(async (email) => {
      const emailExiste = await UserModel.findOne({
        where: { email },
      });
      if (emailExiste) {
        throw new Error("El email ya existe");
      }
      return true;
    })
    .escape(),

  body("password")
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
    )
    .matches(/^\S*$/),

  body("role")
    .optional()
    .isIn(["user", "admin"])
    .withMessage("El campo role sólo puede ser 'user' o 'admin'"),

  body("first_name")
    .trim()
    .notEmpty()
    .withMessage("El nombre es obligatorio")
    .isLength({ min: 2, max: 50 })
    .withMessage("El nombre debe tener entre 2 y 50 caracteres")
    .escape(),

  body("last_name")
    .trim()
    .notEmpty()
    .withMessage("El apellido es obligatorio")
    .matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñÜü\s]+$/)
    .withMessage("El apellido solo puede contener letras y espacios")
    .isLength({ min: 2, max: 50 })
    .withMessage("El apellido debe tener entre 2 y 50 caracteres")
    .escape(),

  body("biography")
    .optional()
    .notEmpty()
    .withMessage("La biografía no puede estar vacía")
    .isLength({ max: 500 })
    .withMessage("La biografía tiene un máximo de 500 caracteres"),

  body("avatar_url")
    .optional()
    .notEmpty()
    .withMessage("El avatar_url no puede estar vacío")
    .isURL()
    .withMessage("El avatar_url no tiene el formato correcto"),

  body("birth_date")
    .optional()
    .notEmpty()
    .withMessage("La fecha de nacimiento no puede estar vacía")
    .isISO8601()
    .withMessage("El birth_date debe estar en formato YYYY-MM-DD"),

  body("user_id").optional(),
];

export const updateProfileValidation = [
  body("first_name")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("El nombre es obligatorio")
    .isLength({ min: 2, max: 50 })
    .withMessage("El nombre debe tener entre 2 y 50 caracteres")
    .escape(),
  body("last_name")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("El apellido es obligatorio")
    .isLength({ min: 2, max: 50 })
    .withMessage("El apellido debe tener entre 2 y 50 caracteres")
    .escape(),
  body("biography")
    .optional()
    .notEmpty()
    .withMessage("La biografía no puede estar vacía")
    .isLength({ max: 500 })
    .withMessage("La biografía tiene un máximo de 500 caracteres"),
  body("avatar_url")
    .optional()
    .notEmpty()
    .withMessage("El avatar_url no puede estar vacío")
    .isURL()
    .withMessage("El avatar_url no tiene el formato correcto"),
  body("birth_date")
    .optional()
    .notEmpty()
    .withMessage("La fecha de nacimiento no puede estar vacía")
    .isISO8601()
    .withMessage("El birth_date debe estar en formato YYYY-MM-DD"),
  body("user_id")
  .optional(),
];

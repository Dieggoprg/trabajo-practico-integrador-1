import { body, param } from "express-validator";
import { UserModel } from "../../models/user.model.js";

export const createUserValidation = [
 body("username")
    .notEmpty().withMessage("El campo Username es Obligatorio"),

 body("email")
    .notEmpty().withMessage("el campo Email es obligatorio")
];

export const updateUserValidation = [
 body("username")
    .optional()
    .notEmpty().withMessage("No puedes dejar vacio el campo Username")
    .isString().withMessage("El campo username debe ser una cadena de caracteres")
    .isLength({min: 3, max: 20}).withMessage("El username debe ser entre 3 y 20 caracteres"),

  body("email")
    .optional()
    .notEmpty().withMessage("No puedes dejar vacio el campo Email")
    .isEmail().withMessage("Debe ser un email válido"),

  body("password")
  .optional()
  .notEmpty().withMessage("No puedes dejar vacio el campo Password")
  .isLength({ min: 6, max: 225 }).withMessage("La contraseña debe tener entre 6 y 225 caracteres"),

  body("role")
  
];
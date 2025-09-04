import { body } from "express-validator";

export const createUserValidation = [
body("username")
    .isAlphanumeric()
    .withMessage("'username' debe ser un string.")
    .trim()
    .notEmpty()
    .withMessage("'username' no puede estar vacío")
    .isLength({ min: 3, max: 20 })
    .withMessage("'username' debe tener entre 3 y 20 caracteres"),
  body("email")
    .isString()
    .withMessage("'email' debe ser un string.")
    .trim()
    .notEmpty()
    .withMessage("'email' no puede estar vacío")
    .isEmail()
    .withMessage("formato de email no válido.")
    .isLength({ max: 100 })
    .withMessage("'email' solo permite 255 carácteres."),
  body("password")
    .isString()
    .withMessage("'password' debe ser un string.")
    .trim()
    .notEmpty()
    .withMessage("'password' no puede estar vacío")
    .isStrongPassword({ minNumbers: 0, minSymbols: 0 })
    .withMessage(
      "'password' debe tener una longitud de 8 caracteres, debe contener al menos una minúscula, al menos una mayúscula, y al menos un número."
    ),
  body("role")
    .optional()
    .isString()
    .withMessage("'role' debe ser un string.")
    .trim()
    .toLowerCase()
    .notEmpty()
    .withMessage("'role' no puede estar vacío")
    .custom((value) => {
      if (value != "admin" && value != "user")
        throw new Error("'role' solo puede tomar los valores 'admin' y 'user'");
      return true;
    })
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
  .optional()
  .isString().withMessage("El campo 'role' debe ser una cadena de Texto")
  .trim()
  .toLowerCase()
  .notEmpty()
  .withMessage("El campo 'role' no puede estar vacío")
  .custom((value) => {
    if (value != "admin" && value != "user") 
      throw new Error('el campo "role" solo puede tomar los valores "admin" y/o "user" ');
    return true;
  })
];
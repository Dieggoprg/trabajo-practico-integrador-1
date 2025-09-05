import { body, param } from "express-validator";
import {UserModel} from "../../models/user.model.js";
import {ArticleModel} from "../../models/article.model.js";

export const createArticleValidation = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("El titulo es obligatorio")
    .isLength({ min: 2, max: 200 })
    .withMessage(
      "El titulo debe tener un minimo de 2 caracteres y un maximo de 200 caracteres"
    )
    .escape(),
  body("content")
    .trim()
    .notEmpty()
    .withMessage("El content es obligatorio")
    .isLength({ min: 50 })
    .withMessage("El content debe contener al menos 50 caracteres"),
  body("excerpt")
    .optional()
    .notEmpty()
    .withMessage("Excerpt no puede ser vacio")
    .isLength({ max: 500 })
    .withMessage("El excerpt no puede contener mas de 500 caracteres")
    .escape(),
  body("status")
    .optional()
    .isIn(["published", "archived"])
    .withMessage("El status solo puede ser published o archived "),
  body("user_id")
    .optional()
    .notEmpty()
    .withMessage("El user_id es obligatorio")
    .isInt()
    .withMessage("El user_id debe ser un número entero")
    .custom(async (user_id) => {
      if (Number(user_id) < 1) throw new Error("El user_id debe ser positivo");
      return true;
    })
    .custom(async (user_id) => {
      const user = await UserModel.findByPk(user_id);
      if (!user) throw new Error("El usuario no existe");
      return true;
    }),
];

export const idArticleValidation = [
  param("id")
    .isInt()
    .withMessage("El user_id debe ser un número entero")
    .custom(async (id) => {
      if (Number(id) < 1) throw new Error("El id debe ser positivo");
      return true;
    })
    .custom(async (id) => {
      const article = await ArticleModel.findByPk(id);
      if (!article) throw new Error("El Article no existe");
      return true;
    }),
];

export const updateArticleValidation = [
  param("id")
    .isInt()
    .withMessage("El id debe ser un número entero")
    .custom(async (id) => {
      if (Number(id) < 1) throw new Error("El id debe ser positivo");
      return true;
    })
    .custom(async (id) => {
      const article = await ArticleModel.findByPk(id);
      if (!article) throw new Error("El Article no existe");
      return true;
    }),
  body("title")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("El titulo es obligatorio")
    .isLength({ min: 2, max: 200 })
    .withMessage(
      "El titulo debe tener un minimo de 2 caracteres y un maximo de 200 caracteres"
    )
    .escape(),
  body("content")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("El content es obligatorio")
    .isLength({ min: 50 })
    .withMessage("El content debe contener al menos 50 caracteres"),
  body("excerpt")
    .optional()
    .notEmpty()
    .withMessage("Excerpt no puede ser vacio")
    .isLength({ max: 500 })
    .withMessage("El excerpt no puede contener mas de 500 caracteres")
    .escape(),
  body("status")
    .optional()
    .isIn(["published", "archived"])
    .withMessage("El status solo puede ser published o archived "),
  body("user_id")
    .optional()
    .notEmpty()
    .withMessage("El user_id es obligatorio")
    .isInt()
    .withMessage("El user_id debe ser un número entero")
    .custom(async (user_id) => {
      if (Number(user_id) < 1) throw new Error("El user_id debe ser positivo");
      return true;
    })
    .custom(async (user_id) => {
      const user = await UserModel.findByPk(user_id);
      if (!user) throw new Error("El usuario no existe");
      return true;
    }),
];

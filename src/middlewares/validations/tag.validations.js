import { body, param } from "express-validator";
import {TagsModel} from "../../models/tag.model.js";

export const createTagValidation = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("El name es obligatorio")
    .isLength({ min: 2, max: 30 })
    .withMessage("El name debe tener al menos 2 caracteres y un maximo de 30")
    .custom(async (name) => {
      const nameMinuscula = name.toLowerCase();
      const nameExiste = await TagsModel.findOne({
        where: { name: nameMinuscula },
      });
      if (nameExiste) throw new Error("El name ya existe");
      return true;
    }),
];

export const idParamsTagValidation = [
  param("id")
    .isInt()
    .withMessage("El id debe ser un número entero")
    .custom(async (id) => {
      if (Number(id) < 1) throw new Error("El id debe ser positivo");
      return true;
    })
    .custom(async (id) => {
      const user = await TagsModel.findByPk(id);
      if (!user) throw new Error("El Tag no existe");
      return true;
    }),
];

export const updateTagValidation = [
  param("id")
    .isInt()
    .withMessage("El id debe ser un número entero")
    .custom(async (id) => {
      if (Number(id) < 1) throw new Error("El id debe ser positivo");
      return true;
    })
    .custom(async (id) => {
      const user = await TagsModel.findByPk(id);
      if (!user) throw new Error("El Tag no existe");
      return true;
    }),
  body("name")
    .trim()
    .notEmpty()
    .withMessage("El name es obligatorio")
    .isLength({ min: 2, max: 30 })
    .withMessage("El name debe tener al menos 2 caracteres y un maximo de 30")
    .custom(async (name) => {
      const nameMinuscula = name.toLowerCase();
      const nameExiste = await TagsModel.findOne({
        where: { name: nameMinuscula },
      });
      if (nameExiste) throw new Error("El name ya existe");
      return true;
    }),
];

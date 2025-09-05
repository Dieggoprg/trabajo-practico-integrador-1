import { body, param } from "express-validator";
import {ArticleModel} from "../../models/article.model.js";
import {TagsModel} from "../../models/tag.model.js";
import { ArticleTags } from "../../models/ArticlesTags.js";

export const createArticleTagValidation = [
  body("article_id")
    .notEmpty()
    .withMessage("El article_id es obligatorio")
    .isInt()
    .withMessage("El article_id debe ser un número entero")
    .custom(async (article_id) => {
      if (Number(article_id) < 1)
        throw new Error("El article_id debe ser positivo");
      return true;
    })
    .custom(async (article_id) => {
      const article = await ArticleModel.findByPk(article_id);
      if (!article) throw new Error("El article no existe");
      return true;
    })
    .custom(async (article_id, { req }) => {
      const tag_id = req.body.tag_id;
      const existe = await ArticleTags.findOne({
        where: { article_id, tag_id },
      });
      if (existe) throw new Error("La relacion ya existe");
      return true;
    }),
  body("tag_id")
    .notEmpty()
    .withMessage("El tag_id es obligatorio")
    .isInt()
    .withMessage("El tag_id debe ser un número entero")
    .custom(async (tag_id) => {
      if (Number(tag_id) < 1) throw new Error("El tag_id debe ser positivo");
      return true;
    })
    .custom(async (tag_id) => {
      const tag = await TagsModel.findByPk(tag_id);
      if (!tag) throw new Error("El tag no existe");
      return true;
    }),
];

export const deleteArticleTagValidation = [
  param("articleTagId")
    .isInt()
    .withMessage("El id debe ser un número entero")
    .custom(async (articleTagId) => {
      if (Number(articleTagId) < 1) throw new Error("El id debe ser positivo");
      return true;
    })
    .custom(async (articleTagId) => {
      const articleTag = await ArticleTags.findByPk(articleTagId);
      if (!articleTag) throw new Error("La relación no existe");
      return true;
    }),
];

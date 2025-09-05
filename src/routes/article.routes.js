import { Router } from "express";
import {
  createArticle,
  deleteArticle,
  getAllArticles,
  getArticleUserLogin,
  getArticleUserLoginById,
  getByPkArticle,
  updateArticle,
} from "../controllers/article.controller.js";

import {
  createArticleValidation,
  idArticleValidation,
  updateArticleValidation,
} from "../middlewares/validations/article.validation.js";

import applyValidations from "../middlewares/validator.js";
import { authMiddleware } from "../middlewares/auth.Middleware.js";
import { ownerMiddleware } from "../middlewares/owner.middleware.js";
import { dataValidada } from "../middlewares/matched_data.middleware.js";

export const articleRouter = Router();

articleRouter.post(
  "/articles",
  authMiddleware,
  createArticleValidation,
  applyValidations,
  dataValidada,
  createArticle
);

articleRouter.get("/articles", authMiddleware, getAllArticles);

articleRouter.get(
  "/articles/:id",
  authMiddleware,
  idArticleValidation,
  applyValidations,
  getByPkArticle
);

articleRouter.get("/articles/user", authMiddleware, getArticleUserLogin);

articleRouter.get(
  "/articles/user/:id",
  authMiddleware,
  idArticleValidation,
  applyValidations,
  getArticleUserLoginById
);

articleRouter.put(
  "/articles/:id",
  authMiddleware,
  ownerMiddleware,
  updateArticleValidation,
  applyValidations,
  dataValidada,
  updateArticle
);

articleRouter.delete(
  "/articles/:id",
  authMiddleware,
  ownerMiddleware,
  idArticleValidation,
  applyValidations,
  deleteArticle
);



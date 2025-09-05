import { Router } from "express";
import {
  createArticleTag,
  deleteArticleTag,
} from "../controllers/article_tag.controller.js";

import {
  createArticleTagValidation,
  deleteArticleTagValidation,
} from "../middlewares/validations/article_tag.validation.js";

import applyValidations from "../middlewares/validator.js";
import { authMiddleware } from "../middlewares/auth.Middleware.js";
import { ownerMiddleware } from "../middlewares/owner.middleware.js";

export const articleTagRouter = Router();

articleTagRouter.post(
  "/articles-tags",
  authMiddleware,
  ownerMiddleware,
  createArticleTagValidation,
  applyValidations,
  createArticleTag
);

articleTagRouter.delete(
  "/articles-tags/:articleTagId",
  authMiddleware,
  ownerMiddleware,
  deleteArticleTagValidation,
  applyValidations,
  deleteArticleTag
);


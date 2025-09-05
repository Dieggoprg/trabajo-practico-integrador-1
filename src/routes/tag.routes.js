import { Router } from "express";
import {
  createTag,
  deleteTag,
  getAllTags,
  getByPkTag,
  updateTag,
} from "../controllers/tag.controller.js";

import {
  createTagValidation,
  idParamsTagValidation,
  updateTagValidation,
} from "../middlewares/validations/tag.validation.js";

import applyValidations from "../middlewares/validator.js";
import { authMiddleware } from "../middlewares/auth.Middleware.js";
import { adminMiddleware } from "../middlewares/admin.Middleware.js";
import { dataValidada } from "../middlewares/matched_data.middleware.js";

export const tagRouter = Router();

tagRouter.post(
  "/tags",
  authMiddleware,
  adminMiddleware,
  createTagValidation,
  applyValidations,
  createTag
);

tagRouter.get("/tags", authMiddleware, getAllTags);

tagRouter.get(
  "/tags/:id",
  authMiddleware,
  adminMiddleware,
  idParamsTagValidation,
  applyValidations,
  getByPkTag
);

tagRouter.put(
  "/tags/:id",
  authMiddleware,
  adminMiddleware,
  updateTagValidation,
  applyValidations,
  dataValidada,
  updateTag
);

tagRouter.delete(
  "/tags/:id",
  authMiddleware,
  adminMiddleware,
  idParamsTagValidation,
  applyValidations,
  deleteTag
);



import { Router } from "express";
import {
  getProfile,
  login,
  logout,
  register,
  updateProfile,
} from "../controllers/auth.controller.js";
import {
  createRegisterValidation,
  updateProfileValidation,
} from "../middlewares/validations/auth.validations.js";

import applyValidations from "../middlewares/validator.js";
import { authMiddleware } from "../middlewares/auth.Middleware.js";
import { dataValidada } from "../middlewares/matched_data.middleware.js";

export const authRoutes = Router();

authRoutes.post(
  "/auth/register",
  createRegisterValidation,
  applyValidations,
  dataValidada,
  register
);

authRoutes.post("/auth/login", login);

authRoutes.post("/auth/logout", logout);

authRoutes.get("/auth/profile", authMiddleware, getProfile);

authRoutes.put(
  "/auth/profile",
  authMiddleware,
  updateProfileValidation,
  applyValidations,
  dataValidada,
  updateProfile
);

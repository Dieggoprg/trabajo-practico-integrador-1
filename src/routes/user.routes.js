import { Router } from "express";
import {
    createUser,
//   deleteUser,
  getAllUser
//   getByPkUser
//   updateUser
}
from "../controllers/user.controller.js";
import {
  idParamsUserValidation,
  updateUserValidation,
} from "../middlewares/validations/user.validations.js";
import applyValidations from "../middlewares/validator.js";
import { authMiddleware } from "../middlewares/auth.Middleware.js";
import { adminMiddleware } from "../middlewares/admin.Middleware.js";
import { dataValidada } from "../middlewares/matched_data.middleware.js";

export const userRouter = Router();

userRouter.get("/users", authMiddleware, adminMiddleware, getAllUser);

userRouter.get(
  "/users/:id",
  authMiddleware,
  adminMiddleware,
  idParamsUserValidation,
  applyValidations,
//   getByPkUser
);

userRouter.post(
  "/users",
  authMiddleware,
  adminMiddleware,
  createUser
);

userRouter.put(
  "/users/:id",
  authMiddleware,
  adminMiddleware,
  updateUserValidation,
  applyValidations,
  dataValidada,
//   updateUser
);
userRouter.delete(
  "/users/:id",
  authMiddleware,
  adminMiddleware,
  idParamsUserValidation,
  applyValidations,
//   deleteUser
);



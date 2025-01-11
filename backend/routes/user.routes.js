import express from "express";
const router = express.Router();
import { body } from "express-validator";
import {
  loginUser,
  registerUser,
  getUserProfile,
  logoutUser,
} from "../controllers/user.controllers.js";
import { authUser } from "../middleware/auth.middleware.js";
// import { isEmail, isLength, withMessage } from "validator";

router.post(
  "/register",
  [
    body("email").isEmail().withMessage("invalid email"),
    body("fullName.firstName")
      .isLength({ min: 3 })
      .withMessage("First name must be at least 3 characters"),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters"),
  ],
  registerUser
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("invalid email"),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters"),
  ],
  loginUser
);

router.get("/profile", authUser, getUserProfile);

router.get("/logout", authUser, logoutUser);

export default router;

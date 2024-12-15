import express from "express";
const router = express.Router();
import { body } from "express-validator";
import { registerUser } from "../controllers/user.controllers.js";
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

export default router;

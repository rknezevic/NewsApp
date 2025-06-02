import { body } from "express-validator";

export const UserValidator = {
  register: [
    body("name")
      .trim()
      .optional()
      .isLength({ max: 30 })
      .withMessage("Name must be less than 30 characters"),
    body("email")
      .trim()
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Email must be a valid email address")
      .isLength({ max: 30 })
      .withMessage("Email must be less than 30 characters"),
    body("password")
      .trim().notEmpty()
      .withMessage("Password is required")
      .isLength({ min: 6, max: 20 })
      .withMessage("Password must be between 6 and 20 characters"),
    body("alias")
      .trim()
      .notEmpty()
      .withMessage("Alias is required")
      .isLength({ max: 10 })
  ],
  login: [
    body("email")
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Email must be a valid email address"),
    body("password")
      .notEmpty()
      .withMessage("Password is required")
      .isLength({ min: 6, max: 20 })
  ]
}   
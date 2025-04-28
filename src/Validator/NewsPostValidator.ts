import { body } from "express-validator";
import { createNewsPost, updateNewsPost } from "../Repository/NewsPostRepository";

export const NewsPostValidator =
{
    createNewsPost: [
        body("headline")
            .trim()
            .notEmpty()
            .withMessage("Headline is required")
            .isLength({ max: 100 })
            .withMessage("Headline must be less than 100 characters"),
        body("shortDescription")
            .trim()
            .notEmpty()
            .withMessage("Short description is required")
            .isLength({ max: 200 })
            .withMessage("Short description must be less than 200 characters"),
        body("fullDescription")
            .trim()
            .notEmpty()
            .withMessage("Full description is required")
            .isLength({ max: 5000 })
            .withMessage("Full description must be less than 5000 characters"),
        body("category")
            .trim()
            .notEmpty()
            .withMessage("Category is required"),
        body("image")
            .trim()
            .optional()
            .isURL()
            .withMessage("Image must be a valid URL"),
        body("isBreaking")
            .trim()
            .optional()
            .isBoolean()
            .withMessage("isBreaking must be a boolean value")
    ],
    updateNewsPost: [
        body("headline")
            .trim()
            .optional()
            .isLength({ max: 100 })
            .withMessage("Headline must be less than 100 characters"),
        body("shortDescription")
            .trim()
            .optional()
            .isLength({ max: 200 })
            .withMessage("Short description must be less than 200 characters"),
        body("fullDescription")
            .trim()
            .optional()
            .isLength({ max: 5000 })
            .withMessage("Full description must be less than 5000 characters"),
        body("category")
            .trim()
            .optional()
            .isString()
            .withMessage("Category must be a string"),
        body("image")
            .trim()
            .optional()
            .isURL()
            .withMessage("Image must be a valid URL")
    ]
}
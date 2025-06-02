import { body } from "express-validator";

export const commentValidator = {

    addComment: [
        body("comment")
            .trim()
            .notEmpty()
            .withMessage("Comment is required")
            .isLength({ max: 200 })
            .withMessage("Comment must be less than 200 characters")
    ]
}

import { NewsCategory } from "../Utilities/Enums/NewsCategory";

export interface INewsPostUpdate {
    headline: string,
    shortDescription: string,
    fullDescription: string,
    image: string,
    category: NewsCategory,
    lastEditedBy?: string,
    updatedAt?: Date,
};

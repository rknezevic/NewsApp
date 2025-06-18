import { NewsCategory } from "../enums/NewsCategory";

export type BreakingNewsType = {
    _id : string;
    headline: string;
    shortDescription: string;
    createdAt: Date;
    updatedAt: Date;
    createdBy: { name: string };
    isBreaking?: boolean;
    category: NewsCategory;
}
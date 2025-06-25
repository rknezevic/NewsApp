import { NewsCategory } from "../../../enums/NewsCategory";

export interface CardProps {
  headline: string;
  shortDescription: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy: { name: string };
  isBreaking?: boolean;
  category: NewsCategory;
}
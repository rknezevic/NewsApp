import { ICategory } from "../Utilities/Enums/ICategory";

export interface INewsPostUpdate {
    headline: string,
    shortDescription: string,
    fullDescription: string,
    image: string,
    category: ICategory
};

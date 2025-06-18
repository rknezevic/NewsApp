import { NewsCategory } from "../../../enums/NewsCategory";
import { NewsPostType } from "./NewsPost";
export type CategoryGroupType = {
    posts: NewsPostType[],
    category: NewsCategory
}
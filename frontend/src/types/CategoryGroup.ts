import { NewsCategory } from "../components/enums/NewsCategory";
import { NewsPostType } from "./NewsPost";
export type CategoryGroupType = {
    posts: NewsPostType[],
    category: NewsCategory
}
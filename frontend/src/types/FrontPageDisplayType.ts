import { NewsPostType } from "./NewsPost";
import { CategoryGroupType } from "./CategoryGroup"

export type FrontPageReturnType = {
    newsPosts: CategoryGroupType[];
    breakingNews: NewsPostType;
}
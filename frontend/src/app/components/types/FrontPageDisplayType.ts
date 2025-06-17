import { BreakingNewsType } from "./BreakingNewsPost";
import { CategoryGroupType } from "./CategoryGroup"

export type FrontPageReturnType = {
    newsPosts: CategoryGroupType[];
    breakingNews: BreakingNewsType
}
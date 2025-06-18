import Link from "next/link";
import { NewsPostType } from "../../types/NewsPost";
import styles from '../FrontPageView/NewsList.module.css';
import Card from "../card/newsPostCard";
import { NewsPostComponentProps } from "../../types/NewsPostComponentProps"

export default function NewsPostComponent({ group }: NewsPostComponentProps) {
  return (
      <div key={group.category} className={styles['category-section']}>
        <div className={styles['category-posts']}>
          {group.posts.map((post: NewsPostType) => (
            <Link href={`/news-post-details/${post._id}`} key={post._id} >
              <Card
                category={post.category}
                headline={post.headline}
                shortDescription={post.shortDescription}
                createdAt={post.createdAt}
                updatedAt={post.updatedAt}
                createdBy={{ name: post.createdBy?.name || 'Unknown' }}
                isBreaking={false}
              />
            </Link>
          ))}
        </div>
      </div>
  );
}

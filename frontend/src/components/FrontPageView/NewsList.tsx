'use client'

import styles from './NewsList.module.css'
import { useQuery } from '@tanstack/react-query'
import { fetchNews } from '../../features/actions/fetchNews'
import BreakingNewsComponent from '../BreakingNewsComponent/breakingNewsPost'
import NewsPostComponent from '../NewsPostComponent/newsPost'
import { CategoryGroupType } from '../../types/CategoryGroup'
import { NewsListProps } from '@/types/NewsListProps'
import { NewsPostType } from '@/types/NewsPost'
import Link from 'next/link'
import Card from '../card/newsPostCard'

export default function NewsList({ category }: NewsListProps) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['news'],
    queryFn: fetchNews,
  })

  if (isLoading) return <p>Loading...</p>
  if (error) return <p>Failed to load news.</p>

  let posts = data.newsPosts.flatMap((group: CategoryGroupType) => group.posts);

  if (category !== 'front-page') {
    posts = posts.filter((post: NewsPostType) => post.category === category);
    console.log(posts);
  }
  posts.sort(
    (a: NewsPostType, b: NewsPostType) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <div className={styles['news-grid']}>
      {category === 'front-page' && data.breakingNews &&
        <BreakingNewsComponent news={data.breakingNews} />
      }
      <div className={styles['categories-container']}>
        {posts.map((post: NewsPostType) => (
          <Link href={`/news-post-details/${post._id}`} key={post._id}>
            <Card
              category={post.category}
              headline={post.headline}
              shortDescription={post.shortDescription}
              createdAt={post.createdAt}
              updatedAt={post.updatedAt}
              createdBy={{ name: post.createdBy?.name || 'Unknown' }}
              isBreaking={false}
            />
          </Link>))}
      </div>
    </div>
  );

}
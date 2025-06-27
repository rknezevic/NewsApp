'use client'

import styles from './NewsList.module.css'
import { useQuery } from '@tanstack/react-query'
import { fetchNews } from '../../features/actions/fetchNews'
import BreakingNewsComponent from '../BreakingNewsComponent/breakingNewsPost'
import NewsPostComponent from '../NewsPostComponent/newsPost'
import { CategoryGroupType } from '../../types/CategoryGroup'
import { NewsListProps } from '@/types/NewsListProps'

export default function NewsList( {category} : NewsListProps) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['news'],
    queryFn: fetchNews,
  })

  if (isLoading) return <p>Loading...</p>
  if (error) return <p>Failed to load news.</p>

  const filteredGroup = 
  category === 'front-page'
  ? data.newsPosts?.filter((group: CategoryGroupType) => group.posts.length > 0)
  : data.newsPosts?.filter((group: CategoryGroupType) => group.category === category);

  return (
  <div className={styles['news-grid']}>
    {data.breakingNews && 
      <BreakingNewsComponent news= {data.breakingNews}/>
      }
    <div className={styles['categories-container']}>
      {filteredGroup
        .map((group: CategoryGroupType) => (
          <NewsPostComponent key={group.category} group={group} />
        ))}
    </div>
  </div>
);

}
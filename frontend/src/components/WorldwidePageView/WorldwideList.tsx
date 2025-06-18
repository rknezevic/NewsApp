'use client'
import { useQuery } from '@tanstack/react-query'
import { fetchNews } from '../../features/actions/fetchNews'
import BreakingNewsComponent from '../BreakingNewsComponent/breakingNewsPost'
import NewsPostComponent from '../NewsPostComponent/newsPost'
import { CategoryGroupType } from '../../types/CategoryGroup'

export default function NewsList() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['news'],
    queryFn: fetchNews,
  })

  if (isLoading) return <p>Loading...</p>
  if (error) return <p>Failed to load news.</p>
  return (
  <div className='news-grid'>
    {data && data.breakingNews ? BreakingNewsComponent(data.breakingNews) : null}
    <div className='categories-container'>
      {data.newsPosts
        ?.filter((group: CategoryGroupType) => group.category == 'worldwide')
        .map((group: CategoryGroupType) => (
          <NewsPostComponent key={group.category} group={group} />
        ))}
    </div>
  </div>
);

}
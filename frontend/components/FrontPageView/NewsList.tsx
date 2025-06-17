'use client'

import styles from './NewsList.module.css'
import { useQuery } from '@tanstack/react-query'
import { fetchNews } from '../../src/app/actions/fetchNews'
import Card from '../card/newsPostCard'

import Link from 'next/link'

export default function NewsList() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['news'],
    queryFn: fetchNews,
  })
  console.log('NewsList query data:', data)
  //console.log('NewsPosts:', data.newsPosts)

  if (isLoading) return <p>Loading...</p>
  if (error) return <p>Failed to load news.</p>
  //        <Link href={`/news/${post._id}`} key={post._id}>

  console.log("mapped data", data.newsPosts.map((post: any) => ({
    _id: post._id,
  })))
  return (
    <div className={styles['news-grid']}>
      {data?.breakingNews && (
        <div className={styles['breaking-news-section']}>
          <h1>Breaking News</h1>
          <Link href={`/news/${data.breakingNews._id}`} passHref>
            <Card
              key={data.breakingNews._id}
              headline={data.breakingNews.headline}
              shortDescription={data.breakingNews.shortDescription}
              createdAt={data.breakingNews.createdAt}
              updatedAt={data.breakingNews.updatedAt}
              createdBy={{ name: data.breakingNews.createdBy?.name || 'Unknown' }}
              isBreaking={true}
            />
          </Link>
        </div>
      )}
      <div className={styles['categories-container']}>
        {data?.newsPosts?.map((categoryGroup: any) =>
          categoryGroup.posts.length > 0 && ( // ako nema postova u kategoriji, ne prikazuj kategoriju
            <div key={categoryGroup.category} className={styles['category-section']}>
              <h3>{categoryGroup.category.charAt(0).toUpperCase() + categoryGroup.category.slice(1)}</h3>
              <div className={styles['category-posts']}>
                {categoryGroup.posts.map((post: any) => (
                  <Link href={`/news/${post._id}`} key={post._id} passHref>
                    <Card
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
          )
        )}
      </div>

    </div>
  )
}
'use client'

import { useQuery } from '@tanstack/react-query'
import { fetchNews } from '../src/app/actions/fetchNews'
import  Card  from './card/newsPostCard'

import Link from 'next/link'

export default function NewsList() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['news'],
    queryFn: fetchNews,
  })
  console.log('NewsList data:', data)

  if (isLoading) return <p>Loading...</p>
  if (error) return <p>Failed to load news.</p>


  //ovdje je i dalje error ali uspjesno dohvatim podatke pa cu to sutra rijesiti
  return (
    <div className="news-grid">
      <h2 title= "Front page "></h2>
      {data.newsPosts.map((post: any) => (
        <Link href={`/news/${post._id}`} key={post._id}>
        <Card
          key={post._id}
          headline={post.headline}
          shortDescription={post.shortDescription}
          image={post.image}
          createdAt={post.createdAt}
          updatedAt={post.updatedAt}
          createdBy={{ name: post.createdBy?.name || 'Unknown' }}
          isBreaking={post.isBreaking}
        />
        </Link>
      
      ))}
    </div>
  )
}
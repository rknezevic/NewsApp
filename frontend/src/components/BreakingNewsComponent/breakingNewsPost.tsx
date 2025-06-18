import Link from 'next/link'
import styles from './breakingNewsPost.module.css'
import Card from '../card/newsPostCard'
import { BreakingNewsType } from '../../types/BreakingNewsPost'


export default function BreakingNewsComponent(data: BreakingNewsType){
return (
    data && (
        <div className={styles['breaking-news-section']}>
          <h1>Breaking News</h1>
          <Link href={`/news/${data._id}`}  >
            <Card
              key={data._id}
              headline={data.headline}
              shortDescription={data.shortDescription}
              createdAt={data.createdAt}
              updatedAt={data.updatedAt}
              createdBy={{ name: data.createdBy?.name || 'Unknown' }}
              isBreaking={true}
              category={data.category}
            />
          </Link>
        </div>
      )
)}
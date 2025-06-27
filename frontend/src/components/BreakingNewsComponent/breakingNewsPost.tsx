import Link from 'next/link'
import styles from './breakingNewsPost.module.css'
import Card from '../card/newsPostCard'
import { NewsPostType } from '@/types/NewsPost'

export default function BreakingNewsComponent({news}: { news: NewsPostType }) {
return (

        <div className={styles['breaking-news-section']}>
          <h1>Breaking News</h1>
          <Link href={`/news-post-details/${news._id}`}  >
            <Card
              key={news._id}
              headline={news.headline}
              shortDescription={news.shortDescription}
              createdAt={news.createdAt}
              updatedAt={news.updatedAt}
              createdBy={{ name: news.createdBy?.name || 'Unknown' }}
              isBreaking={true}
              category={news.category}
            />
          </Link>
        </div>
    
)}
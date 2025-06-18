import styles from './newsPostCard.module.css';
import formatDate from '../../lib/dateFormatter';
import { CardProps } from '../../types/CardProps';
import { getCategoryColor } from '@/features/actions/getCategoryColor';

export default function Card({
  category,
  headline,
  shortDescription,
  createdAt,
  updatedAt,
  createdBy,
  isBreaking = false,
}: CardProps) {

  return (
    <div className={`${styles.card} ${isBreaking ? styles.breaking : ''}`}>
      <div className={styles.content}>
        <h2 className={`${styles.categoryLabel} ${getCategoryColor(category)}`}>
          {headline}
        </h2>
        <p className={styles.description}>{shortDescription}</p>
        <div className={styles.meta}>
          <span className={styles.author}>Published by: {createdBy.name}, </span>
          <span className={styles.date}>{formatDate(createdAt)}</span>
          {updatedAt !== createdAt && (
            <div className={styles.date}>Updated at: {formatDate(updatedAt)}</div>
          )}
        </div>
      </div>
    </div>
  );
}

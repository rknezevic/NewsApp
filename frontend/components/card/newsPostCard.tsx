// components/Card.tsx
import styles from './newsPostCard.module.css';
import Image from 'next/image';
import { format } from 'date-fns';

interface CardProps {
  headline: string;
  shortDescription: string;
  image?: string;
  createdAt: string;
  updatedAt?: string;
  createdBy: { name: string };
  isBreaking?: boolean;
}

export default function Card({
  headline,
  shortDescription,
  image,
  createdAt,
  updatedAt,
  createdBy,
  isBreaking = false,
}: CardProps) {
  const formattedDate = format(
    new Date(updatedAt || createdAt),
    'dd.MM.yyyy HH:mm'
  );

  return (
    <div className={`${styles.card} ${isBreaking ? styles.breaking : ''}`}>
      {image && (
        <div className={styles.imageWrapper}>
          <Image
            src={image}
            alt="News image"
            width={400}
            height={200}
            className={styles.image}
          />
        </div>
      )}
      <div className={styles.content}>
        <h2 className={styles.headline}>{headline}</h2>
        <p className={styles.description}>{shortDescription}</p>
        <div className={styles.meta}>
          <span className={styles.author}>By {createdBy.name}</span>
          <span className={styles.date}>{formattedDate}</span>
        </div>
      </div>
    </div>
  );
}

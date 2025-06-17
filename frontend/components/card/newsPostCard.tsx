// components/Card.tsx
import styles from './newsPostCard.module.css';
import Image from 'next/image';
import { format } from 'date-fns';
import { create } from 'domain';
import  formatDate  from '../../lib/dateFormatter';

interface CardProps {
  headline: string;
  shortDescription: string;
  //  image?: string;
  createdAt: Date;
  updatedAt?: Date;
  createdBy: { name: string };
  isBreaking?: boolean;
}

export default function Card({
  headline,
  shortDescription,
  //  image,
  createdAt,
  updatedAt,
  createdBy,
  isBreaking = false,
}: CardProps) {

  return (
    <div className={`${styles.card} ${isBreaking ? styles.breaking : ''}`}>
      <div className={styles.content}>
        <h2 className={styles.headline}>{headline}</h2>
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

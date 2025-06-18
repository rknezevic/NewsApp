'use client'

import { fetchNewsPostDetails } from "@/features/actions/newsPostDetails";
import { useQuery } from "@tanstack/react-query";
import styles from './NewsPostDetails.module.css';

export default function NewsPostDetails({ postId }: { postId: string }) {
    const { data, isLoading, error } = useQuery({
        queryKey: ['newsPostDetails', postId],
        queryFn: () => fetchNewsPostDetails(postId),
    });

    if (isLoading) return <p>Loading post details...</p>;
    if (error) return <p>Error loading post details: {error.message}</p>;

    return (
    <div className={styles.container}>
      <div className={styles.headerRow}>
        <h1 className={styles.headline}>{data.headline}</h1>
        <div className={styles.meta}>
          <p>Published by {data.createdBy?.name}</p>
          <p>{new Date(data.createdAt).toLocaleDateString()}</p>
        </div>
      </div>

      <h2 className={styles.shortDescription}>{data.shortDescription}</h2>

      <div className={styles.fullDescription}>
        <p>{data.fullDescription}</p>
      </div>
    </div>
  );
}
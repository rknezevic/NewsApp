'use client'

import { fetchNewsPostDetails } from "@/features/actions/newsPostDetails";
import { useQuery } from "@tanstack/react-query";
import styles from './NewsPostDetails.module.css';
import { PublisherType } from "@/enums/PublisherType";

export default function NewsPostDetails({ postId }: { postId: string }) {
    const { data, isLoading, isError } = useQuery({
        queryKey: ['newsPostDetails', postId],
        queryFn: () => fetchNewsPostDetails(postId),
    });

    if (isLoading) return <p>Loading post details...</p>;
    if (isError) return <p>Error loading post details: {isError}</p>;

    const parsedDate = (date: string) => {
        return new Date(date).toLocaleDateString();
    };

    return (
    <div className={styles.container}>
      <div className={styles.headerRow}>
        <h1 className={styles.headline}>{data.headline}</h1>
        <div className={styles.meta}>
          <p>Published by {data.createdBy.name || PublisherType.Guest}</p>
          <p>{parsedDate(data.createdAt)}</p>
        </div>
      </div>

      <h2 className={styles.shortDescription}>{data.shortDescription}</h2>

      <div className={styles.fullDescription}>
        <p>{data.fullDescription}</p>
      </div>
    </div>
  );
}
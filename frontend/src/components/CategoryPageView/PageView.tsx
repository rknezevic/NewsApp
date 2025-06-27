'use client'
import { useParams } from "next/navigation"
import NewsList from "../FrontPageView/NewsList";

const allowedSlugs = ['front-page', 'local', 'entertainment', 'economy', 'worldwide', 'sport', 'weather'];

export default function PageView() {
    const params = useParams();
    const slug = params.slug as string;

    if (!allowedSlugs.includes(slug)) {
        return <div>Page not found</div>;
    }

    return (
        <div>
            <NewsList category={slug} />
        </div>
    )
}
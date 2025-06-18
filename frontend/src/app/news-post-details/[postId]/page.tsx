import NewsPostDetails from "../../../components/DetailsView/NewsPostDetails";

export default async function DetailsPage(props: { params: Promise<{ postId: string }> }) {
  const params = await props.params;
  const postId = params.postId;
  return (
      <div>
        <NewsPostDetails postId={postId} />
      </div>
    )
}
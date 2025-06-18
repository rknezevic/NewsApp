import NewsPostDetails from "../../../components/DetailsView/NewsPostDetails";

export default function DetailsPage( { params }: { params: { postId: string } }) {
  const postId = params.postId;
    return (
        <div>
          <NewsPostDetails postId={postId} />
        </div>
      )
}
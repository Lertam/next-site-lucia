import { getNewsItem } from "@/app/(authenticated)/(admin)/dashboard/news/_queries";
import BackLink from "@/components/Common/BackLink";
import Survey from "../_components/Survey";
import { getNewsComments } from "../_queries";
import Comment from "../_components/Comment";
import { getAuth } from "@/features/auth/queries/get-auth";
import CommentForm from "../_components/CommentForm";

const NewsPage = async ({
  params,
}: {
  params: Promise<{ newsId: string }>;
}) => {
  const { newsId } = await params;
  const node = await getNewsItem(newsId);
  if (!node) return <span>Новость не найдена</span>;

  const comments = await getNewsComments(newsId);
  const { user } = await getAuth();

  return (
    <div className={"pt-10 mt-4 relative"}>
      <BackLink href={"/news"} />
      <h1 className={"font-bold text-2xl mb-10"}>{node.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: node.content }} />

      {node.surveyId && <Survey surveyId={node.surveyId} />}
      <div className={"flex justify-between mt-5 text-sm text-gray-500"}>
        <span>Комментариев - {comments.length}</span>
        <span>{node.created.toLocaleDateString()}</span>
      </div>
      <div className={"flex flex-col"}>
        {comments.map((c) => (
          <Comment key={`cmt-${c.id}`} {...c} />
        ))}
        {user ? (
          <CommentForm newsId={newsId} />
        ) : (
          <div>Для комментирования необходимо авторизоваться</div>
        )}
      </div>
    </div>
  );
};

export default NewsPage;

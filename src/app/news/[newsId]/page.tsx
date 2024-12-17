import { getNewsItem } from "@/app/(authenticated)/(admin)/dashboard/news/_queries";
import BackLink from "@/components/Common/BackLink";
import Survey from "../_components/Survey";

const NewsPage = async ({
  params,
}: {
  params: Promise<{ newsId: string }>;
}) => {
  const { newsId } = await params;
  const node = await getNewsItem(newsId);
  if (!node) return <span>Новость не найдена</span>;

  // const { user } = await getAuth();
  // const variants = node.surveyId ? await getSurveyVariants(node.survey.id) : [];

  return (
    <div className={"pt-10 mt-4 relative"}>
      <BackLink href={"/news"} />
      <h1 className={"font-bold text-2xl mb-10"}>{node.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: node.content }} />

      {node.surveyId && <Survey surveyId={node.surveyId} />}
      <div className={"flex justify-between mt-5 text-sm text-gray-500"}>
        <span>Комментариев - 5</span>
        <span>{node.created.toLocaleDateString()}</span>
      </div>
    </div>
  );
};

export default NewsPage;

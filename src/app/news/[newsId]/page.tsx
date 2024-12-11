import { getNewsItem } from "@/app/(authenticated)/(admin)/dashboard/news/_queries";
import BackLink from "@/components/Common/BackLink";

const NewsPage = async ({
  params: { newsId },
}: {
  params: { newsId: string };
}) => {
  const node = await getNewsItem(newsId);
  if (!node) return <span>Новость не найдена</span>;
  return (
    <div className={"pt-10"}>
      <BackLink href={"/news"} />
      <h1 className={"font-bold text-2xl mb-10"}>{node.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: node.content }} />
      <div className={"flex justify-between mt-5 text-sm text-gray-500"}>
        <span>Комментариев - 5</span>
        <span>{node.created.toLocaleDateString()}</span>
      </div>
    </div>
  );
};

export default NewsPage;

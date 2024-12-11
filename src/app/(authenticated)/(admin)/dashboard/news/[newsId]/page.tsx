import BackLink from "@/components/Common/BackLink";
import { getNewsItem } from "../_queries";
import EditNewsForm from "../_components/EditNewsItem";

const EditNewsPage = async ({
  params: { newsId },
}: {
  params: { newsId: string };
}) => {
  const newsItem = await getNewsItem(newsId);
  if (!newsItem) {
    return <span>Новость не найдена</span>;
  }
  return (
    <div className={"relative mt-4"}>
      <h1 className={"text-center font-bold uppercase"}>
        Редактирование вопроса
      </h1>
      <BackLink href={"/dashboard/news"} />
      <EditNewsForm newsItem={newsItem} />
    </div>
  );
};

export default EditNewsPage;

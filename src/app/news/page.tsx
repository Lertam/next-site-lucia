import Pagination from "../(authenticated)/(admin)/dashboard/news/_components/Pagination";
import { getNewsList } from "../(authenticated)/(admin)/dashboard/news/_queries";
import NewsCard from "./_components/NewsCard";
import { getNewsTotalPages } from "./_queries";

const NewsPage = async () => {
  const newsList = await getNewsList();
  const totalPages = await getNewsTotalPages();
  return (
    <div className={"h-full w-full m-auto flex flex-col"}>
      <h1 className={"text-center font-bold mt-4 uppercase relative"}>
        Новости
      </h1>
      <div className={"grid grid-col-1 gap-3 sm:grid-cols-2 md:grid-cols-3 mt-4"}>
        {newsList.map((node) => (
          <NewsCard key={node.id} {...node} />
        ))}
      </div>
      {totalPages > 1 && <Pagination totalPages={totalPages} />}
    </div>
  );
};

export default NewsPage;

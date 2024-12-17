import BackLink from "@/components/Common/BackLink";
import Link from "next/link";
import { getNewsCount, getNewsList } from "./_queries";
import NewsItem from "./_components/NewsItem";
import Search from "./_components/Search";
import Pagination from "./_components/Pagination";

export const metadata = {
  title: "Новости",
};

const NewsPage = async (props: {
  searchParams?: Promise<{ query?: string; page?: string }>;
}) => {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;

  const newsItems = await getNewsList(currentPage, query);
  const totalNewsPages = await getNewsCount(query);
  // TODO Добавление конкурса
  // TODO Добавление магазина
  return (
    <div className={"h-full w-full m-auto flex flex-col"}>
      <div className={"relative my-4"}>
        <h1 className={"text-center font-bold uppercase relative"}>
          Управление новостями
        </h1>
        <BackLink href={"/dashboard"} />
        <Link href={"/dashboard/news/add"} className={"absolute right-0 top-0"}>
          + Создать
        </Link>
      </div>
      <div className={"pb-4"}>
        <Search placeholder={"Поиск"} />
      </div>
      <div className={"flex flex-col gap-2"}>
        {newsItems.length === 0 && (
          <p className={"text-center"}>Пока нет новостей</p>
        )}

        {newsItems.map((n) => (
          <NewsItem key={`news-${n.id}`} {...n} />
        ))}
      </div>
      {totalNewsPages > 1 && (
        <div>
          <Pagination totalPages={totalNewsPages} />
        </div>
      )}
    </div>
  );
};

export default NewsPage;

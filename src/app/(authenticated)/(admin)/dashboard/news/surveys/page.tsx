import BackLink from "@/components/Common/BackLink";
import Search from "../../../../../../components/Common/Search";
import Link from "next/link";
import { getSurveys, getTotalSurveysPages } from "./_queries";
import SurveyRow from "./_components/SurveyRow";
import Pagination from "../../../../../../components/Common/Pagination";

const SurveysPage = async (props: {
  searchParams?: Promise<{ query?: string; page?: string }>;
}) => {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;

  const surveys = await getSurveys(currentPage, query);
  const totalPages = await getTotalSurveysPages(query);

  return (
    <div className={"h-full w-full m-auto flex flex-col"}>
      <div className={"relative my-4"}>
        <h1 className={"text-center font-bold uppercase relative"}>
          Управление опросами
        </h1>
        <BackLink href={"/dashboard"} />
        <Link
          href={"/dashboard/news/surveys/add"}
          className={"absolute right-0 top-0"}
        >
          + Создать
        </Link>
      </div>
      <div className={"pb-4"}>
        <Search placeholder={"Поиск по названию"} />
      </div>
      <div className={"flex flex-col gap-2"}>
        {surveys.length === 0 && (
          <p className={"text-center"}>Пока нет опросов</p>
        )}
        {surveys.map((survey) => (
          <SurveyRow {...survey} />
        ))}

        {totalPages > 1 && <Pagination totalPages={totalPages} />}
      </div>
    </div>
  );
};

export default SurveysPage;

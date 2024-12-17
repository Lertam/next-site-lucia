import BackLink from "@/components/Common/BackLink";
import { getSurveyVariants } from "./_queries";
import SurveyVariantRow from "./_components/SurveyVariantRow";
import Link from "next/link";

const VariantsPage = async ({
  params: { surveyId },
}: {
  params: { surveyId: string };
}) => {
  const variants = await getSurveyVariants(surveyId);

  return (
    <div className={"relative mt-4"}>
      <h1 className={"text-center font-bold uppercase"}>Варианты опроса</h1>
      <BackLink href={`/dashboard/news/surveys`} />
      <Link
        href={`/dashboard/news/surveys/${surveyId}/variants/add`}
        className={"absolute right-0 top-0"}
      >
        + Создать
      </Link>
      <div className={"flex flex-col gap-2 mt-4"}>
        {variants.length === 0 && (
          <p className={"text-center"}>Пока нет вариантов</p>
        )}
        {variants.map((variant) => (
          <SurveyVariantRow
            key={`svvar-${variant.id}`}
            {...variant}
            surveyId={surveyId}
          />
        ))}
      </div>
    </div>
  );
};

export default VariantsPage;

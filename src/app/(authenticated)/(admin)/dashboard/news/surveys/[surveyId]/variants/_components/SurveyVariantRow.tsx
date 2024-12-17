import { SurveyVariant, SurveyVote } from "@prisma/client";
import Link from "next/link";
import { FC } from "react";

const SurveyVariantRow: FC<
  SurveyVariant & { votes: SurveyVote[]; surveyId: string }
> = ({ id, text, votes, surveyId }) => {
  return (
    <div
      className={
        "flex justify-between items-center border border-black p-4 first:border-t py-1"
      }
    >
      <span className={"trancate"}>{text}</span>

      <div className={"flex gap-4 items-center"}>
        <Link href={`/dashboard/news/surveys/${id}/variants`}>
          Голосов -{votes.length}
        </Link>
        <Link
          href={`/dashboard/news/surveys/${surveyId}/variants/${id}`}
          className={"px-4 py-2 bg-foreground text-white"}
        >
          Редактировать
        </Link>
      </div>
    </div>
  );
};

export default SurveyVariantRow;

import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { Survey, SurveyVariant, SurveyVote } from "@prisma/client";
import Link from "next/link";
import { FC } from "react";

const SurveyRow: FC<
  Survey & { variants: Array<SurveyVariant & { votes: SurveyVote[] }> }
> = ({ id, title, finished, variants }) => {
  // TODO Покаывать количество голосов
  return (
    <div
      className={
        "flex justify-between items-center border border-black p-4 first:border-t py-1"
      }
    >
      <span className={"trancate"}>{title}</span>

      <div className={"flex gap-4 items-center"}>
        <span>Варианты ({variants.length})</span>
        {finished && (
          <CheckCircleIcon className={"w-10 h-10 text-foreground"} />
        )}
        <Link
          href={`/dashboard/news/surveys/${id}`}
          className={"px-4 py-2 bg-foreground text-white"}
        >
          Редактировать
        </Link>
      </div>
    </div>
  );
};

export default SurveyRow;

import { Faq } from "@prisma/client";
import Link from "next/link";
import { FC } from "react";

const Question: FC<Faq> = ({ id, question, weight }) => {
  return (
    <div
      className={
        "flex justify-between items-center border border-t-0 border-black p-4 first:border-t"
      }
    >
      <span className={"trancate"}>{question}</span>
      <div className={"flex gap-4 items-center"}>
        <span>{weight}</span>
        <Link
          href={`/dashboard/faq/${id}`}
          className={"px-4 py-2 bg-foreground text-white"}
        >
          Редактировать
        </Link>
      </div>
    </div>
  );
};

export default Question;

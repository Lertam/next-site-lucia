import BackLink from "@/components/Common/BackLink";
import { getQuestions } from "./_queries";
import Link from "next/link";
import { Faq } from "@prisma/client";
import { FC } from "react";

const FAQPage = async () => {
  const questions = await getQuestions();
  return (
    <div className={"h-full w-full m-auto flex flex-col"}>
      <div className={"relative my-4"}>
        <h1 className={"text-center font-bold uppercase relative"}>
          Управление вопросами и ответами
        </h1>
        <BackLink href={"/dashboard"} />
        <Link href={"/dashboard/faq/add"} className={"absolute right-0 top-0"}>
          + Создать
        </Link>
      </div>
      <div>
        {questions.length === 0 && (
          <p className={"text-center"}>Пока нет вопросов</p>
        )}

        {questions.map((q) => (
          <Question key={`faq-${q.id}`} {...q} />
        ))}
      </div>
    </div>
  );
};

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

export default FAQPage;

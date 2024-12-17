import BackLink from "@/components/Common/BackLink";
import { getQuestions } from "./_queries";
import Link from "next/link";
import Question from "./_components/Question";

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

export default FAQPage;

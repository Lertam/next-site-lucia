import BackLink from "@/components/Common/BackLink";
import { getQuestion } from "../_queries";
import EditFAQForm from "../_components/EditFAQ";

const EditQuestionPage = async ({
  params: { questionId },
}: {
  params: { questionId: string };
}) => {
  const question = await getQuestion(questionId);
  return (
    <div className={"relative mt-4"}>
      <h1 className={"text-center font-bold uppercase"}>
        Редактирование вопроса
      </h1>
      <BackLink href={"/dashboard/faq"} />
      <EditFAQForm question={question} />
    </div>
  );
};

export default EditQuestionPage;

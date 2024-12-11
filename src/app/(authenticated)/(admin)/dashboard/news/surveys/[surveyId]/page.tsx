import BackLink from "@/components/Common/BackLink";
import EditSurveyForm from "../_components/EditSurveyForm";
import { getSurvey } from "../_queries";

const EditSurveyPage = async ({
  params: { surveyId },
}: {
  params: { surveyId: string };
}) => {
  const survey = await getSurvey(surveyId);
  if (!survey) {
    return <span>Новость не найдена</span>;
  }
  return (
    <div className={"relative mt-4"}>
      <h1 className={"text-center font-bold uppercase"}>
        Редактирование опроса
      </h1>
      <BackLink />
      <EditSurveyForm survey={survey} />
    </div>
  );
};

export default EditSurveyPage;

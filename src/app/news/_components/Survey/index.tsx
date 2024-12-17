import { getAuth } from "@/features/auth/queries/get-auth";
import SurveyForm from "./Form";
import { getSurvey, getUserSurveyVote } from "../../_queries";

const Survey = async ({ surveyId }: { surveyId: string }) => {
  const { user } = await getAuth();
  const survey = await getSurvey(surveyId);
  if (!survey) return null;
  if (!user)
    return (
      <div className={"flex flex-col"}>
        <div dangerouslySetInnerHTML={{ __html: survey.text }} />
        <span>Для участия в опросе необходимо авторизоваться</span>
      </div>
    );

  const userVote = await getUserSurveyVote(surveyId);
  if (!!userVote || survey.finished) {
    const totalVotesCount = survey.variants.reduce(
      (acc, v) => acc + v.votes.length,
      0
    );

    return (
      <div className={"flex flex-col mt-4"}>
        <div dangerouslySetInnerHTML={{ __html: survey.text }} />
        <div className={"flex flex-col gap-4 mt-4"}>
          {survey.variants.map((v) => {
            const percents = Math.round(
              (v.votes.length / totalVotesCount) * 100
            );
            return (
              <div key={`srvvrnt-${v.id}`} className={"relative flex flex-col"}>
                <span>{v.text}</span>
                <div
                  className={`relative bg-gray-400 text-center py-0.5 mt-1 text-white text-shadow shadow-black bg-foreg`}
                  style={{
                    background: `linear-gradient(90deg, var(--foreground) ${percents}%, rgba(156,163,175,1) ${percents}%)`,
                  }}
                >
                  {v.votes.length}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return <SurveyForm survey={survey} userVote={userVote} />;
};

export default Survey;

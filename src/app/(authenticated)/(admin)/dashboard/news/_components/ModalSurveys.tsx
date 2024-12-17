import { Survey } from "@prisma/client";
import { FC, useEffect, useState } from "react";
import { connectSurvey } from "../_actions/disconnect-survey";

const ModalSurveys: FC<{ newsId: string }> = ({ newsId }) => {
  const [data, setData] = useState<Survey[]>([]);

  useEffect(() => {
    fetch("/dashboard/news/surveys/api")
      .then((res) => res.json())
      .then(setData);
  }, []);

  return (
    <div>
      <div
        className={
          "fixed w-[100vw] h-[100vh] top-0 left-0 bg-gray-800 z-10 bg-opacity-50"
        }
      />
      <div
        className={
          "w-[100vw] h-[100vh] flex justify-center items-center fixed top-0 left-0 z-20"
        }
      >
        <div className={"w-96 h-96 bg-background p-4"}>
          {data.length === 0 && <span>Опросов нет</span>}
          {data.map((survey) => (
            <button
              key={"svr-" + survey.id}
              onClick={(ev) => {
                ev.preventDefault();
                connectSurvey(newsId, survey.id);
                // TODO Реализовать без перезагрузки
                location.reload();
              }}
            >
              {survey.title}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ModalSurveys;

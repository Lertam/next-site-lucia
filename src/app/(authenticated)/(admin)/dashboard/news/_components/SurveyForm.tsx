"use client";

import { XMarkIcon } from "@heroicons/react/24/outline";
import { Survey } from "@prisma/client";
import { FC, useState } from "react";
import { disconnectSurvey } from "../_actions/disconnect-survey";
import ModalSurveys from "./ModalSurveys";

const SurveyForm: FC<{ newsId: string; survey?: Survey | null }> = ({
  survey,
  newsId,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  if (survey) {
    return (
      <div className={"flex gap-4"}>
        <span>Опрос &quot;{survey.title}&quot;</span>
        <button
          onClick={(ev) => {
            ev.preventDefault();
            disconnectSurvey(newsId, survey.id);
            // TODO Реализовать без перезагрузки
            location.reload();
          }}
        >
          <XMarkIcon className={"w-5 h-5"} />
        </button>
      </div>
    );
  }
  return (
    <div className={"relative"}>
      <button
        onClick={(ev) => {
          ev.preventDefault();
          setIsOpen(true);
        }}
      >
        Добавить опрос
      </button>
      {isOpen && <ModalSurveys newsId={newsId} />}
    </div>
  );
};

export default SurveyForm;

"use client";

import { Survey, SurveyVariant, SurveyVote } from "@prisma/client";
import RadioInput from "@/components/Forms/RadioInput";
import { FC, useActionState } from "react";
import { vote } from "../../_actions/vote";

const SurveyForm: FC<{
  survey: Survey & { variants: Array<SurveyVariant & { votes: SurveyVote[] }> };

  userVote: SurveyVote | null;
}> = ({ survey, userVote }) => {
  const [state, action, pending] = useActionState(vote, { ok: false });

  if (survey.finished || !!userVote) {
    return <span>Опрос завершен</span>;
  }
  return (
    <form className={"mt-4"} action={action}>
      <span
        className={"font-bold text-xl"}
        dangerouslySetInnerHTML={{ __html: survey.title }}
      />

      <div className={"flex flex-col gap-4 my-4"}>
        {survey.variants.map((v) => (
          <RadioInput
            key={`variant-${v.id}`}
            id={"variant-" + v.id}
            name={"voteId"}
            value={v.id}
            text={v.text + ` ${v.votes.length}`}
            error={state.errors?.voteId}
          />
        ))}
      </div>
      <button
        className={"px-4 py-2 bg-foreground text-white"}
        disabled={pending}
      >
        Проголосовать
      </button>
    </form>
  );
};

export default SurveyForm;

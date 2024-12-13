"use client";

import { Survey, SurveyVariant } from "@prisma/client";
import { FC, useState } from "react";
import { useFormState } from "react-dom";
import RichTextEditor from "@/components/Forms/RichTextEditor";
import FormSwitch from "@/components/Forms/FormSwitch";
import SubmitButton from "@/components/Forms/SubmitButton";
import { editSurvey } from "../_actions/edit-survey";
import { deleteSurvey } from "../_actions/delete-survey";
import FormInput from "@/components/Forms/FormInput";
import VariantsEdit from "./VariantsEdit";

const EditSurveyForm: FC<{
  survey?: Survey & { variants: SurveyVariant[] };
}> = ({ survey }) => {
  const [form] = useState<Survey & { variants: SurveyVariant[] }>(
    survey
      ? survey
      : {
          id: "add",
          title: "",
          text: "",
          created: new Date(),
          finished: false,
          variants: [],
        }
  );

  const [state, action] = useFormState(editSurvey, { ok: false });

  return (
    <form
      className={"mt-4"}
      action={(formData) => {
        const variantIds = formData.getAll("variants[][id]");
        const variantTexts = formData.getAll("variants[][text]");
        const variants = variantIds.map((id, ind) => ({
          id,
          text: variantTexts[ind],
        }));
        console.log("asd", variantIds, variantTexts);

        formData.append("variants", JSON.stringify(variants));
        console.log(formData.get("variants"));
        console.log(
          "form.variants",
          formData.getAll("variants[][id]"),
          form.variants
        );

        action(formData);
      }}
    >
      <input
        type={"hidden"}
        name={"surveyId"}
        value={survey ? survey.id : "add"}
      />

      <FormInput
        id={"title"}
        label={"Название"}
        name={"title"}
        error={state.errors?.title}
        defaultValue={form.title}
        helper={"Для быстрого поиска в админке"}
      />

      <RichTextEditor
        id={"text"}
        label={"Текст опроса"}
        name={"text"}
        value={form.text}
        error={state.errors?.text}
      />

      <div
        className={
          "grid grid-cols-1 md:grid-cols-2 gap-4 items-center justify-center"
        }
      >
        <FormSwitch
          label={"Завершен"}
          id={"finished"}
          name={"finished"}
          defaultChecked={form.finished}
          error={state.errors?.finished}
        />
      </div>
      {survey && (
        <VariantsEdit surveyId={survey.id} variants={survey.variants} />
      )}
      <div className={"flex justify-center"}>
        <SubmitButton text={"Сохранить"} loadingText={"Сохраняем"} />
        {survey && (
          <button
            className={"bg-foreground text-white p-2 ml-4"}
            onClick={(ev) => {
              ev.preventDefault();
              if (confirm("Вы уверены?")) {
                deleteSurvey(survey.id);
              }
            }}
          >
            Удалить
          </button>
        )}
      </div>
    </form>
  );
};

export default EditSurveyForm;

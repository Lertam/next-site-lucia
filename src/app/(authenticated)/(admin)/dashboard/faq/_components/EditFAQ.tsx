"use client";

import { Faq } from "@prisma/client";
import { FC, useState } from "react";
import { useFormState } from "react-dom";
import { editQuestion } from "../_actions/edit-faq";
import FormInput from "@/components/Forms/FormInput";
import RichTextEditor from "@/components/Forms/RichTextEditor";
import FormSwitch from "@/components/Forms/FormSwitch";
import SubmitButton from "@/components/Forms/SubmitButton";
import { deleteRetouchPrice } from "../../services/_actions/delete-retouch-price";

const EditFAQForm: FC<{ question?: Faq }> = ({ question }) => {
  const [form] = useState<Faq>(
    question
      ? question
      : {
          id: "add",
          question: "",
          answer: "",
          weight: 0,
          hidden: false,
        }
  );

  const [state, action] = useFormState(editQuestion, { ok: false });

  return (
    <form className={"mt-4"} action={action}>
      <input
        type={"hidden"}
        name={"questionId"}
        value={question ? question.id : "add"}
      />

      <FormInput
        id={"question"}
        label={"Вопрос"}
        name={"question"}
        error={state.errors?.question}
        defaultValue={form.question}
      />
      <RichTextEditor
        id={"answer"}
        label={"Ответ"}
        name={"answer"}
        value={form.answer}
        error={state.errors?.answer}
      />
      <div
        className={
          "grid grid-cols-1 md:grid-cols-2 gap-4 items-center justify-center"
        }
      >
        <div className={"max-w-24"}>
          <FormInput
            id={"weight"}
            label={"Вес"}
            name={"weight"}
            type={"number"}
            inline
            defaultValue={form.weight}
            error={state.errors?.weight}
          />
        </div>
        <FormSwitch
          label={"Скрыт"}
          id={"hidden"}
          name={"hidden"}
          defaultChecked={form.hidden}
          error={state.errors?.hidden}
        />
      </div>
      <div className={"flex justify-center"}>
        <SubmitButton text={"Сохранить"} loadingText={"Сохраняем"} />
        {question && (
          <button
            className={"bg-foreground text-white p-2 ml-4"}
            onClick={(ev) => {
              ev.preventDefault();
              if (confirm("Вы уверены?")) {
                deleteRetouchPrice(question.id);
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

export default EditFAQForm;

"use client";

import { News } from "@prisma/client";
import { FC, useState } from "react";
import { useFormState } from "react-dom";
import FormInput from "@/components/Forms/FormInput";
import RichTextEditor from "@/components/Forms/RichTextEditor";
import FormSwitch from "@/components/Forms/FormSwitch";
import SubmitButton from "@/components/Forms/SubmitButton";
import { editNewsItem } from "../_actions/edit-news";
import { deleteNews } from "../_actions/delete-news";

const EditNewsForm: FC<{ newsItem?: News }> = ({ newsItem }) => {
  const [form] = useState<News>(
    newsItem
      ? newsItem
      : {
          id: "add",
          title: "",
          content: "",
          image: "",
          created: new Date(),
          updated: new Date(),
          published: false,
        }
  );

  const [state, action] = useFormState(editNewsItem, { ok: false });

  return (
    <form className={"mt-4"} action={action}>
      <input
        type={"hidden"}
        name={"newsId"}
        value={newsItem ? newsItem.id : "add"}
      />

      <FormInput
        id={"title"}
        label={"Название"}
        name={"title"}
        error={state.errors?.title}
        defaultValue={form.title}
      />
      <RichTextEditor
        id={"content"}
        label={"Текст новости"}
        name={"content"}
        value={form.content}
        error={state.errors?.content}
      />
      <div
        className={
          "grid grid-cols-1 md:grid-cols-2 gap-4 items-center justify-center"
        }
      >
        <FormSwitch
          label={"Опубликовано"}
          id={"published"}
          name={"published"}
          defaultChecked={form.published}
          error={state.errors?.published}
        />
      </div>
      <div className={"flex justify-center"}>
        <SubmitButton text={"Сохранить"} loadingText={"Сохраняем"} />
        {newsItem && (
          <button
            className={"bg-foreground text-white p-2 ml-4"}
            onClick={(ev) => {
              ev.preventDefault();
              if (confirm("Вы уверены?")) {
                deleteNews(newsItem.id);
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

export default EditNewsForm;

"use client";

import FormInput from "@/components/Forms/FormInput";
import SubmitButton from "@/components/Forms/SubmitButton";
import { FC, useActionState } from "react";
import { createComment } from "../_actions/comment";

const CommentForm: FC<{ newsId: string }> = ({ newsId }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_state, action] = useActionState(createComment, { message: "" });
  return (
    <form action={action}>
      <input type={"hidden"} name={"newsId"} value={newsId} />
      <FormInput name={"text"} id={"text"} label={"Ваш комментарий"} />
      <div className={"text-center"}>
        <SubmitButton text={"Отправить"} loadingText={"Отправляем"} />
      </div>
    </form>
  );
};

export default CommentForm;

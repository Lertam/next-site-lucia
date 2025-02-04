"use client";
import FormInput from "@/components/Forms/FormInput";
import SubmitButton from "@/components/Forms/SubmitButton";
import { FC, useActionState } from "react";
import { changeEmail } from "./change-email";

const ChangeEmailForm: FC<{ userId: string }> = ({ userId }) => {
  const [state, action] = useActionState(changeEmail, { ok: false });

  return (
    <form className={"mt-4"} action={action}>
      <input type={"hidden"} name={"userId"} value={userId} />
      <FormInput
        label={"Новый email"}
        type={"email"}
        id={"email"}
        name={"email"}
        error={state.errors?.email}
        containerProps={{ className: "mt-2" }}
        inputProps={{
          className: "w-full",
        }}
      />
      <div className={"mt-4"}>
        <SubmitButton
          text={"Сохранить"}
          loadingText={"Сохраняем"}
          className={"w-full"}
        />
      </div>
    </form>
  );
};

export default ChangeEmailForm;

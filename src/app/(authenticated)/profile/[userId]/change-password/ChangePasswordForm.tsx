"use client";
import FormInput from "@/components/Forms/FormInput";
import SubmitButton from "@/components/Forms/SubmitButton";
import { FC, useActionState } from "react";
import { changePassword } from "./change-password";

const ChangePasswordForm: FC<{ userId: string }> = ({ userId }) => {
  const [state, action] = useActionState(changePassword, { ok: false });
// TODO Модальность
  return (
    <form className={"mt-4"} action={action}>
      <input type={"hidden"} name={"userId"} value={userId} />
      <FormInput
        label={"Новый пароль"}
        type={"password"}
        id={"password"}
        name={"password"}
        error={state.errors?.password}
        containerProps={{ className: "mt-2" }}
        inputProps={{
          className: "w-full",
        }}
      />
      <FormInput
        label={"Повторите пароль"}
        type={"password"}
        id={"password2"}
        name={"password2"}
        error={state.errors?.password2}
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

export default ChangePasswordForm;

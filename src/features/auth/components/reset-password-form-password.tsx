"use client";

import { useFormState } from "react-dom";
import { resetPasswordPassword } from "../actions/reset-password";
import { FC, useEffect } from "react";
import FormInput from "@/components/Forms/FormInput";
import SubmitButton from "@/components/Forms/SubmitButton";
import { useRouter } from "next/navigation";

const ResetPasswordFormPassword: FC<{ token: string }> = ({ token }) => {
  const [state, action] = useFormState(resetPasswordPassword, {
    errors: undefined,
    ok: false,
  });

  const router = useRouter();

  useEffect(() => {
    if (router && state.ok) {
      setTimeout(() => router.replace("/auth/signin"), 5000);
    }
  }, [state.ok, router]);

  return (
    <form action={action} className={"w-[570px] m-auto p-3.5"}>
      <div className={"flex flex-col"}>
        <input type={"hidden"} name={"token"} value={token} />
        <FormInput
          name={"password"}
          type={"password"}
          label={"Пароль"}
          id={"password"}
          error={state?.errors?.password}
        />
        <FormInput
          name={"confirmPassword"}
          type={"password"}
          label={"Подтвердите пароль"}
          id={"confirmPassword"}
          error={state?.errors?.confirmPassword}
        />
        <SubmitButton text={"Сохранить"} loadingText={"Меняем пароль"} />
        {state.message && state.ok ? (
          <p className={"text-green-700 text-center"}>{state.message}</p>
        ) : (
          <p className={"text-red-700 text-center"}>{state.message}</p>
        )}
      </div>
    </form>
  );
};

export default ResetPasswordFormPassword;

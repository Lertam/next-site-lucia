"use client";
import React from "react";
import { signIn } from "@/features/auth/actions/sign-in";
import FormInput from "@/components/Forms/FormInput";
import SubmitButton from "@/components/Forms/SubmitButton";
import { useFormState } from "react-dom";

const SignInForm = () => {
  const [state, action] = useFormState(signIn, {
    errors: undefined,
  });
  return (
    <form className={"w-[570px] m-auto p-3.5"} action={action} autoComplete={"on"}>
      <div className={"flex flex-col"}>
        <FormInput
          label={"Логин или Email"}
          id={"login"}
          name={"login"}
          required
          autocomplete={"username"}
          error={state?.errors?.login}
        />
        <FormInput
          label={"Пароль"}
          id={"password"}
          name={"password"}
          type={"password"}
          required
          autocomplete={"current-password"}
          error={state?.errors?.password}
        />
        <SubmitButton text={"Войти"} loadingText={"Входим"} />
      </div>
    </form>
  );
};

export default SignInForm;

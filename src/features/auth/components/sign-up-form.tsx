"use client";
import React from "react";
import { signUp } from "@/features/auth/actions/sign-up";
import FormInput from "@/components/Forms/FormInput";
import FormCheckbox from "@/components/Forms/FormCheckbox";
import SubmitButton from "@/components/Forms/SubmitButton";
import { useFormState } from "react-dom";

const SignUpForm = () => {
  const [state, action] = useFormState(signUp, undefined);

  return (
    <form className={"w-[570px] m-auto p-3.5"} action={action}>
      <div className={"flex flex-col"}>
        <FormInput
          label={"Логин"}
          id={"login"}
          name={"login"}
          placeholder={"Придумайте логин"}
          required
          error={state?.errors?.login}
        />
        <FormInput
          label={"Email"}
          id={"email"}
          name={"email"}
          type={"email"}
          placeholder={"Ваш Email"}
          required
          error={state?.errors?.email}
        />
        <FormInput
          label={"Ваш пароль"}
          id={"password"}
          name={"password"}
          type={"password"}
          placeholder={"Придумайте пароль"}
          required
          min={8}
          error={state?.errors?.password}
        />
        <FormInput
          label={"Повторите пароль"}
          id={"confirmPassword"}
          name={"confirmPassword"}
          type={"password"}
          placeholder={"Повторите пароль для проверки"}
          required
          min={8}
          error={state?.errors?.confirmPassword}
        />
        <FormCheckbox
          label={
            "Я согласен с политикой конфиденциальности и пользовательским соглашением"
          }
          name={"agree"}
          id={"agree"}
          error={state?.errors?.agree}
        />
        <SubmitButton text={"Зарегистрироваться"} />
        {state?.message && (
          <p className={"text-green-400 text-sm"}>{state.message}</p>
        )}
      </div>
    </form>
  );
};

export default SignUpForm;

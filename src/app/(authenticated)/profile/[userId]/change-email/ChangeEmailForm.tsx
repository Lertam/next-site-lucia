"use client";
import FormInput from "@/components/Forms/FormInput";
import SubmitButton from "@/components/Forms/SubmitButton";
import { FC, useState } from "react";
import { changeEmail } from "../_actions";

const ChangeEmailForm: FC<{ userId: string }> = ({ userId }) => {
  const [email, setEmail] = useState<string>("");
  return (
    <form className={"mt-4"}>
      <input type={"hidden"} name={"userId"} value={userId} />
      <FormInput
        label={"Новый email"}
        id={"email"}
        name={"email"}
        containerProps={{ className: "mt-2" }}
        inputProps={{ className: "w-full" }}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <div className={"mt-4"}>
        <SubmitButton
          onClick={(ev) => {
            ev.preventDefault();
            ev.stopPropagation();
            changeEmail(userId, email);
          }}
          text={"Сохранить"}
          loadingText={"Сохраняем"}
          className={"w-full"}
        />
      </div>
    </form>
  );
};

export default ChangeEmailForm;

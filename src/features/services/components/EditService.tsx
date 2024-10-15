"use client";
import FileInput from "@/components/Forms/FileInput";
import FormInput from "@/components/Forms/FormInput";
import SubmitButton from "@/components/Forms/SubmitButton";
import { FC } from "react";
import { useFormState } from "react-dom";
import { editRetouchService } from "../actions/edit-retouch-service";

const EditServiceForm: FC<{ id: string }> = ({ id }) => {
  const [state, action] = useFormState(editRetouchService, { ok: false });
  return (
    <form className={"mt-4"} action={action}>
      <input type={"hidden"} name={"serviceId"} value={id} />
      <div className={"grid grid-cols-1 md:grid-cols-2 gap-4"}>
        <FormInput
          id={"title"}
          label={"Название"}
          name={"title"}
          error={state.errors?.title}
        />
        <FormInput
          id={"weight"}
          label={"Вес"}
          name={"weight"}
          type={"number"}
          defaultValue={0}
          error={state.errors?.weight}
        />
      </div>
      <FormInput
        id={"description"}
        label={"Описание"}
        name={"description"}
        error={state.errors?.description}
      />
      <FileInput
        id={"image"}
        label={"Файл для витрины"}
        name={"image"}
        error={state.errors?.image}
      />
      <div className={"flex justify-center"}>
        <SubmitButton />
      </div>
    </form>
  );
};

export default EditServiceForm;

"use client";
import FileInput from "@/components/Forms/FileInput";
import FormInput from "@/components/Forms/FormInput";
import SubmitButton from "@/components/Forms/SubmitButton";
import { FC, useState } from "react";
import { useFormState } from "react-dom";
import { RetouchService } from "@prisma/client";
import { editRetouchService } from "../_actions/edit-retouch-service";
import { deleteRetouchService } from "../_actions/delete-retouch-service";

const EditServiceForm: FC<{ service?: RetouchService }> = ({ service }) => {
  const [form] = useState<Omit<RetouchService, "image"> & { image?: string }>(
    service
      ? service
      : {
          id: "add",
          title: "",
          description: "",
          image: undefined,
          weight: 0,
        }
  );

  const [state, action] = useFormState(editRetouchService, { ok: false });
  return (
    <form className={"mt-4"} action={action}>
      <input
        type={"hidden"}
        name={"serviceId"}
        value={service ? service.id : "add"}
      />
      <div className={"grid grid-cols-1 md:grid-cols-2 gap-4"}>
        <FormInput
          id={"title"}
          label={"Название"}
          name={"title"}
          error={state.errors?.title}
          defaultValue={form.title}
        />
        <FormInput
          id={"weight"}
          label={"Вес"}
          name={"weight"}
          type={"number"}
          error={state.errors?.weight}
          defaultValue={form.weight}
        />
      </div>
      <FormInput
        id={"description"}
        label={"Описание"}
        name={"description"}
        error={state.errors?.description}
        defaultValue={form.description}
      />
      <FileInput
        id={"image"}
        label={"Файл для витрины"}
        name={"image"}
        error={state.errors?.image}
        value={
          form.image ? `/modules/services/images/${form.image}` : undefined
        }
      />
      <div className={"flex justify-center"}>
        <SubmitButton text={"Сохранить"} loadingText={"Сохраняем"} />
        {service && (
          <button
            className={"bg-foreground text-white p-2 ml-4"}
            onClick={(ev) => {
              ev.preventDefault();
              if (confirm("Вы уверены?")) {
                deleteRetouchService(service.id);
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

export default EditServiceForm;

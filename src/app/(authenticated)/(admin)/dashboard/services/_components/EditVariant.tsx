"use client";

import FormInput from "@/components/Forms/FormInput";
import SubmitButton from "@/components/Forms/SubmitButton";
import { RetouchVariant } from "@prisma/client";
import { FC } from "react";
import { useFormState } from "react-dom";
import FileInput from "@/components/Forms/FileInput";
import { editRetouchVariant } from "../_actions/edit-retouch-variant";
import { deleteRetouchVariant } from "../_actions/delete-retouch-variant";
import FormSwitch from "@/components/Forms/FormSwitch";

const EditRetouchVariantForm: FC<{
  serviceId: string;
  variantId: string;
  variant?: RetouchVariant;
}> = ({ variantId, serviceId, variant }) => {
  const [state, action] = useFormState(editRetouchVariant, { ok: false });

  return (
    <form className={"mt-4"} action={action}>
      <input type={"hidden"} name={"serviceId"} value={serviceId} />
      <input type={"hidden"} name={"variantId"} value={variantId} />
      <div className={"grid grid-cols-1 md:grid-cols-2 gap-4 items-center"}>
        <FormInput
          label={"Название"}
          id={"title"}
          name={"title"}
          required
          error={state.errors?.title}
          defaultValue={variant?.title}
        />
        <FormInput
          label={"Цена"}
          id={"price"}
          name={"price"}
          required
          type={"number"}
          error={state.errors?.price}
          defaultValue={variant?.price}
        />
      </div>
      <FormInput
        label={"Описание"}
        id={"description"}
        name={"description"}
        required
        error={state.errors?.description}
        defaultValue={variant?.description}
      />
      <div className={"grid grid-cols-1 md:grid-cols-2 gap-4 items-center"}>
        <FormInput
          label={"Вес"}
          id={"weight"}
          name={"weight"}
          required
          type={"number"}
          error={state.errors?.weight}
          defaultValue={variant?.weight}
        />
        <FileInput
          id={"image"}
          label={"Файл для витрины"}
          name={"image"}
          error={state.errors?.image}
          value={
            variant && variant.image
              ? `/modules/services/images/${variant.image}`
              : undefined
          }
        />

        <div className={"flex justify-start ml-4 items-center h-min mt-4"}>
          <FormSwitch
            id={"withFiles"}
            name={"withFiles"}
            label={"Загрузка дополнительных файлов"}
            error={state.errors?.withFiles}
            defaultChecked={variant?.withFiles}
          />
        </div>
        <div className={"flex justify-start ml-4 items-center h-min mt-4"}>
          <FormSwitch
            id={"withText"}
            name={"withText"}
            label={"Заполнение надписей"}
            error={state.errors?.withText}
            defaultChecked={variant?.withText}
          />
        </div>
      </div>
      {state.message && <p>{state.message}</p>}
      <div className={"flex justify-center"}>
        <SubmitButton text={"Сохранить"} loadingText={"Сохраняем"} />
        {variant && (
          <button
            className={"bg-foreground text-white p-2 ml-4"}
            onClick={(ev) => {
              ev.preventDefault();
              if (confirm("Вы уверены?")) {
                deleteRetouchVariant(variant.id);
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

export default EditRetouchVariantForm;

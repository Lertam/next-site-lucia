"use client";

import FormCheckbox from "@/components/Forms/FormCheckbox";
import FormInput from "@/components/Forms/FormInput";
import SubmitButton from "@/components/Forms/SubmitButton";
import { editRetouchPrice } from "@/features/services/actions/edit-retouch-price";
import { RetouchPrice } from "@prisma/client";
import { FC } from "react";
import { useFormState } from "react-dom";

const EditRetouchPriceForm: FC<{
  serviceId: string;
  priceId: string;
  price?: RetouchPrice;
}> = ({ priceId, serviceId, price }) => {
  const [state, action] = useFormState(editRetouchPrice, { ok: false });
  console.log(price);
  return (
    <form className={"mt-4"} action={action}>
      <input type={"hidden"} name={"serviceId"} value={serviceId} />
      <input type={"hidden"} name={"priceId"} value={priceId} />
      <div className={"grid grid-cols-1 md:grid-cols-2 gap-4 items-center"}>
        <FormInput
          label={"Название"}
          id={"title"}
          name={"title"}
          required
          error={state.errors?.title}
          defaultValue={price?.title}
        />
        <FormInput
          label={"Цена"}
          id={"price"}
          name={"price"}
          required
          type={"number"}
          error={state.errors?.price}
          defaultValue={price?.price}
        />
      </div>
      <FormInput
        label={"Описание"}
        id={"description"}
        name={"description"}
        required
        error={state.errors?.description}
        defaultValue={price?.description}
      />
      <div className={"grid grid-cols-1 md:grid-cols-2 gap-4 items-center"}>
        <FormInput
          label={"Вес"}
          id={"weight"}
          name={"weight"}
          required
          type={"number"}
          error={state.errors?.weight}
          defaultValue={price?.weight}
        />
        <div className={"flex justify-start ml-4 items-center h-min mt-4"}>
          <FormCheckbox
            id={"express"}
            name={"express"}
            label={"Срочность"}
            error={state.errors?.express}
            defaultChecked={price?.express}
          />
        </div>
      </div>
      {state.message && <p>{state.message}</p>}
      <div className={"flex justify-center"}>
        <SubmitButton text={"Сохранить"} loadingText={"Сохраняем"} />
        {price && (
          <button
            className={"bg-foreground text-white p-2 ml-4"}
            onClick={(ev) => {
              ev.preventDefault();
              if (confirm("Вы уверены?")) {
                // console.log("delete", id, service);
                // deleteRetouchService(id);
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

export default EditRetouchPriceForm;

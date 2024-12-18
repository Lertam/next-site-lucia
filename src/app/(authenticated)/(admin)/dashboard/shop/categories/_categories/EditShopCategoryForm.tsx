"use client";
import FormInput from "@/components/Forms/FormInput";
import { ShopCategory } from "@prisma/client";
import { FC, useActionState } from "react";
import { deleteCategory, editShopCategory } from "../_action";
import SubmitButton from "@/components/Forms/SubmitButton";

const EditShopCategoryForm: FC<{ category?: ShopCategory }> = ({
  category,
}) => {
  const form: ShopCategory = category
    ? category
    : {
        id: "add",
        name: "",
        weight: 0,
      };

  const [state, action] = useActionState(editShopCategory, {});
  return (
    <form action={action} className={"max-w-64 m-auto mt-4"}>
      <input type={"hidden"} name={"categoryId"} value={form.id} />
      <FormInput
        label={"Название"}
        name={"name"}
        defaultValue={form.name}
        id={"name"}
        error={state.errors?.weight}
      />
      <FormInput
        label={"Вес"}
        name={"weight"}
        defaultValue={form.weight}
        id={"weight"}
        inline
        error={state.errors?.weight}
        type={"number"}
      />
      <div className={"text-center"}>
        <SubmitButton text={"Сохранить"} loadingText={"Сохранение"} />
        {category && (
          <button
            className={"bg-foreground text-white p-2 ml-4"}
            onClick={(ev) => {
              ev.preventDefault();
              if (confirm("Вы уверены?")) {
                deleteCategory(category.id);
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

export default EditShopCategoryForm;

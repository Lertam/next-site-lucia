"use client";

import FileInput from "@/components/Forms/FileInput";
import FormInput from "@/components/Forms/FormInput";
import FormSelect from "@/components/Forms/FormSelect";
import SubmitButton from "@/components/Forms/SubmitButton";
import { ShopCategory, ShopItem } from "@prisma/client";
import { FC, useActionState } from "react";
import { editShopItem } from "../_actions";

const EditShopItemForm: FC<{ categories: ShopCategory[]; item?: ShopItem }> = ({
  categories,
  item,
}) => {
  const form: ShopItem = item
    ? item
    : {
        id: -1,
        name: "",
        preview: "",
        source: "",
        categoryId: null,
        created: new Date(),
        data: "",
      };

  const [state, action] = useActionState(editShopItem, {});
  return (
    <form className={"mt-4"} action={action}>
      <input type={"hidden"} name={"itemId"} value={form.id} />
      {/* <div className={"flex gap-4"}> */}
      <FormInput
        label={"Название"}
        name={"name"}
        id={"name"}
        defaultValue={form.name}
        error={state.errors?.name}
      />

      <FormSelect
        name={"categoryId"}
        options={categories.map((c) => ({ value: c.id, label: c.name }))}
        label={"Категория"}
        id={"categoryId"}
        value={form.categoryId}
      />
      <div className={"mt-4 grid grid-cols-2 gap-4 items-end"}>
        <FileInput
          label={"Превью"}
          id={"preview"}
          name={"preview"}
          value={form.preview ? `/modules/shop/previews/${form.preview}` : ""}
        />
        <FileInput
          label={"Файл магазина"}
          name={"source"}
          id={"source"}
          value={form.source}
          noImage
        />
      </div>
      <div className={"flex justify-center"}>
        <SubmitButton text={"Сохранить"} loadingText={"Сохраняем"} />
      </div>
    </form>
  );
};

export default EditShopItemForm;

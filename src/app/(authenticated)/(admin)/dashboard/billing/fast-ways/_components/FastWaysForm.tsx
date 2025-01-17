"use client";

import FormInput from "@/components/Forms/FormInput";
import FormSelect from "@/components/Forms/FormSelect";
import { FastWay, PaymentGateways } from "@prisma/client";
import { FC, useActionState } from "react";
import { editFastWay } from "../_actions";
import { PaymentwayNames } from "@/lib/utils/contants";

const FastWaysForm: FC<{
  settings: Record<PaymentGateways, boolean>;
  fastWay?: FastWay;
}> = ({ settings, fastWay }) => {
  const ways = Object.keys(settings)
    .filter((key) => settings[key as PaymentGateways])
    .map((way) => ({
      value: way,
      label: PaymentwayNames[way as PaymentGateways] as string,
    }));

  const [state, action] = useActionState(editFastWay, { ok: false });

  return (
    <form className={"w-80 mx-auto mt-5"} action={action}>
      {fastWay && <input type={"hidden"} name={"id"} value={fastWay.id} />}
      <FormSelect
        label={"Агрегатор"}
        name={"way"}
        options={ways}
        id={"way"}
        value={fastWay ? fastWay.way : null}
        containerProps={{ className: "flex items-center justify-between" }}
        error={state.errors?.way}
      />
      <FormInput
        id={"sum"}
        label={"Сумма"}
        type={"number"}
        min={0}
        name={"sum"}
        defaultValue={fastWay?.sum}
        containerProps={{ className: "mt-4 flex items-center justify-between" }}
        error={state.errors?.sum}
      />
      <FormInput
        id={"weight"}
        label={"Вес"}
        type={"number"}
        name={"weight"}
        defaultValue={fastWay ? fastWay.weight : 0}
        containerProps={{ className: "mt-4 flex items-center justify-between" }}
        error={state.errors?.sum}
      />
      <button className={"text-white bg-foreground uppercase py-2 w-full mt-4"}>
        Сохранить
      </button>
      {/* {fastWay && <DeleteButton id={fastWay.id} />} */}
    </form>
  );
};

export default FastWaysForm;

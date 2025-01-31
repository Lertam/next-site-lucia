"use client";
import FormInput from "@/components/Forms/FormInput";
import FormSelect from "@/components/Forms/FormSelect";
import { Billing, BillingStatus } from "@prisma/client";
import { FC, useActionState } from "react";
import UserSelect, { UserType } from "./UserSelect";
import { editOrder } from "../../_actions";
import SubmitButton from "@/components/Forms/SubmitButton";

const options: Array<{ label: string; value: string }> = [
  {
    value: BillingStatus.WAIT,
    label: "В ожидании",
  },
  {
    value: BillingStatus.DELETED,
    label: "Удален",
  },
  {
    value: BillingStatus.READY,
    label: "Готово",
  },
];

const BillingForm: FC<{
  order?: Billing;
  user?: UserType;
}> = ({ order, user }) => {
  const [state, action] = useActionState(editOrder, { ok: false });
  return (
    <form className={"w-64 m-auto"} action={action}>
      {order && <input type={"hidden"} name={"orderId"} value={order.id} />}
      <UserSelect error={state.errors?.userId} user={user} />

      <FormInput
        label={"Сумма"}
        name={"sum"}
        defaultValue={order?.sum}
        id={"sum"}
        required
        error={state.errors?.sum}
      />
      <FormInput
        label={"№ картинки"}
        name={"shopItemId"}
        id={"shopItemId"}
        defaultValue={order && order.shopItemId ? order.shopItemId : undefined}
        type={"number"}
        error={state.errors?.shopItemId}
      />
      <div className={"flex flex-col mt-4"}>
        <span className={"mb-2"}>Комментарий:</span>
        <textarea
          className={"px-2 py-1 focus-within:outline-none rounded"}
          defaultValue={order?.comment}
        />
        {state.errors?.comment && (
          <span className={"text-red-500"}>{state.errors?.comment}</span>
        )}
      </div>
      {!order ? (
        <input type={"hidden"} name={"status"} value={BillingStatus.WAIT} />
      ) : (
        <FormSelect
          label={"Статус"}
          options={options}
          name={"status"}
          value={order.status}
          id={"status"}
          containerProps={{
            className: "flex items-center justify-between mt-4",
          }}
          inputProps={{
            onChange: () => {},
          }}
          error={state.errors?.status}
        />
      )}

      <SubmitButton
        text={"Сохранить"}
        loadingText={"Сохранение"}
        className={"mt-4 w-full"}
      />
    </form>
  );
};

export default BillingForm;

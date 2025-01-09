"use client";
import FormSwitch from "@/components/Forms/FormSwitch";
import { PaymentGateways } from "@prisma/client";
import { FC, useActionState } from "react";
import { saveGatewaySettings } from "../_actions/save-settings";

const SettingsForm: FC<{ settings: Record<PaymentGateways, boolean> }> = ({
  settings,
}) => {
  const [message, action] = useActionState(saveGatewaySettings, "");

  return (
    <form className={"flex flex-col"} action={action}>
      <FormSwitch
        id={"robokassa"}
        name={"robokassa"}
        defaultChecked={settings[PaymentGateways.ROBOKASSA]}
        label={"Робокасса"}
      />
      <FormSwitch
        id={"unitpay"}
        name={"unitpay"}
        defaultChecked={settings[PaymentGateways.UNITPAY]}
        label={"Unitpay"}
      />
      <FormSwitch
        id={"walletOne"}
        name={"walletOne"}
        defaultChecked={settings[PaymentGateways.WALLET_ONE]}
        label={"Единая Касса"}
      />
      <FormSwitch
        id={"yoomoney"}
        name={"yoomoney"}
        defaultChecked={settings[PaymentGateways.YOOMONEY]}
        label={"ЮMoney"}
      />
      <button className={"bg-foreground text-white px-6 py-2"}>
        Сохранить
      </button>
      {message && message.length > 0 && <span>{message}</span>}
    </form>
  );
};

export default SettingsForm;

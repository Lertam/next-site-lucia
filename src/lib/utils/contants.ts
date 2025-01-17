import { PaymentGateways } from "@prisma/client";

export const PaymentwayNames: Record<PaymentGateways, string> = {
  [PaymentGateways.ROBOKASSA]: "Робокасса",
  [PaymentGateways.UNITPAY]: "Unitpay",
  [PaymentGateways.WALLET_ONE]: "Единая касса",
  [PaymentGateways.YOOMONEY]: "ЮMoney",
};

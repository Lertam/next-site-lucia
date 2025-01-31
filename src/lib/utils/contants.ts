import { PaymentGateways } from "@prisma/client";

export const PaymentwayNames: Record<PaymentGateways, string> = {
  [PaymentGateways.ROBOKASSA]: "Робокасса",
  [PaymentGateways.UNITPAY]: "Unitpay",
  [PaymentGateways.WALLET_ONE]: "Единая касса",
  [PaymentGateways.YOOMONEY]: "ЮMoney",
};

// TODO Проверить Тинькофф (Есть на странице с вводом суммы при пополнении)
export const PaymentwayImage: Record<
  PaymentGateways,
  { mini: string; base: string }
> = {
  [PaymentGateways.ROBOKASSA]: {
    mini: "robokassa_mini.png",
    base: "robokassa.png",
  },
  [PaymentGateways.UNITPAY]: { mini: "unitpay_mini.png", base: "unitpay.png" },
  [PaymentGateways.WALLET_ONE]: { mini: "w1_logo.png", base: "w1_logo.png" },
  [PaymentGateways.YOOMONEY]: { mini: "yoomoney.png", base: "yoomoney.png" },
};

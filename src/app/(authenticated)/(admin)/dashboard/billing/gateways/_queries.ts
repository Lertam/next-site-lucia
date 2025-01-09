"use server";

import { PaymentGateways } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export const getPaymentGatewaysSettings = async () => {
  const defaults: Record<PaymentGateways, boolean> = {
    [PaymentGateways.ROBOKASSA]: false,
    [PaymentGateways.UNITPAY]: false,
    [PaymentGateways.WALLET_ONE]: false,
    [PaymentGateways.YOOMONEY]: false,
  };
  const existed = await prisma.config.findUnique({
    where: { key: "paymentGatewaysConfig" },
  });
  if (existed) return existed.value as Record<PaymentGateways, boolean>;
  else return defaults;
};

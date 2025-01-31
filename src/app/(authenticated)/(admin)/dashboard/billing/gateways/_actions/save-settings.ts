"use server";

import { PaymentGateways } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { generateId } from "lucia";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export const saveGatewaySettings = async (
  state: string,
  formData: FormData
): Promise<string> => {
  const settings: Record<PaymentGateways, boolean> = {
    ROBOKASSA: formData.get("robokassa") === "checked",
    YOOMONEY: formData.get("yoomoney") === "checked",
    WALLET_ONE: formData.get("walletOne") === "checked",
    UNITPAY: formData.get("unitpay") === "checked",
  };

  console.log(settings);

  await prisma.config.upsert({
    where: { key: "paymentGatewaysConfig" },
    update: { value: settings },
    create: {
      id: generateId(15),
      key: "paymentGatewaysConfig",
      value: settings,
    },
  });
  revalidatePath("/dashboard/billing/gateways");
  redirect("/dashboard");
  return "Настройки сохранены!";
};

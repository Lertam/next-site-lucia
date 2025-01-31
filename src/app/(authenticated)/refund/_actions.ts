"use server";

import { getAuth } from "@/features/auth/queries/get-auth";
import { PaymentGateways } from "@prisma/client";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

export const createBilling = async (way: PaymentGateways, sum: number) => {
  if (sum <= 0) throw new Error("Сумма должна быть больше 0");
  const { user } = await getAuth();
  if (!user) throw new Error("Пользователь не авторизован");
  await prisma.billing.create({
    data: {
      userId: user.id,
      sum,
      way,
    },
  });
  redirect(`/payment-gateway/${way}/${sum}`);
};

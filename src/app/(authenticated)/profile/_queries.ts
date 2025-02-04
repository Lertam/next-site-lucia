"use server";

import { getAuth } from "@/features/auth/queries/get-auth";
import { BillingStatus } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export const getUserBalance = async (): Promise<number> => {
  const { user } = await getAuth();
  if (!user) return 0; //throw new Error("Need to auth");

  const res = await prisma.billing.aggregate({
    _sum: { sum: true },
    where: { userId: user.id, status: BillingStatus.READY },
  });
  return res && res._sum && res._sum.sum ? res._sum.sum : 0;
};

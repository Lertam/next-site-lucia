"use server";
import { getAuth } from "@/features/auth/queries/get-auth";
import { prisma } from "@/lib/prisma";

export const getBillings = async (_startDate: string, _endDate: string) => {
  const startDate = new Date(_startDate);
  startDate.setHours(0, 0, 0, 0);
  const endDate = new Date(_endDate);
  endDate.setHours(23, 59, 59, 999);

  return prisma.billing.findMany({
    where: {
      created: {
        gte: new Date(startDate),
        lte: new Date(endDate),
      },
    },
    orderBy: {
      id: "desc",
    },
    include: {
      user: {
        select: {
          login: true,
        },
      },
    },
  });
};

export const getBilling = async (id: string) => {
  const { user } = await getAuth();

  const order = await prisma.billing.findUniqueOrThrow({
    where: { id: Number(id) },
    include: { user: true },
  });
  if (!user || (user.id !== order?.userId && user.role !== "ADMIN")) {
    throw new Error("Unauthorized");
  }
  return order;
};

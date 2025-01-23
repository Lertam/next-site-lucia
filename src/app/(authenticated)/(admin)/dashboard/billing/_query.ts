"use server";
import { prisma } from "@/lib/prisma";

export const getBillings = async (startDate: Date, endDate: Date) => {
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

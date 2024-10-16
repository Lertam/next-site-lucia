"use server";
import { RetouchPrice } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export const getRetouchPrices = async (
  serviceId: string
): Promise<RetouchPrice[]> => {
  return prisma.retouchPrice.findMany({
    where: {
      serviceId,
    },
    orderBy: { weight: "desc" },
  });
};

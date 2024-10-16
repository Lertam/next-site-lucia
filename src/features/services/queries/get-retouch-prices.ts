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

export const getRetouchPrice = async (
  priceId: string
): Promise<RetouchPrice> => {
  return prisma.retouchPrice.findUniqueOrThrow({ where: { id: priceId } });
};

"use server";
import { RetouchVariant } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export const getRetouchVariants = async (
  serviceId: string
): Promise<RetouchVariant[]> => {
  return prisma.retouchVariant.findMany({
    where: {
      serviceId,
    },
    orderBy: { weight: "desc" },
  });
};

export const getRetouchVariant = async (
  variantId: string
): Promise<RetouchVariant> => {
  return prisma.retouchVariant.findUniqueOrThrow({ where: { id: variantId } });
};

"use server";
import { prisma } from "@/lib/prisma";

export const getCategories = async () => {
  return prisma.shopCategory.findMany({
    orderBy: {
      weight: "desc",
    },
  });
};

export const getCategory = async (categoryId: string) => {
  return prisma.shopCategory.findUnique({
    where: {
      id: categoryId,
    },
  });
};

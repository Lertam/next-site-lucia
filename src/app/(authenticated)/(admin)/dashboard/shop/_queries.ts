"use server";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

const ITEMS_PER_PAGE = 10;

export const getShopItems = async (
  page: number = 1,
  query: string = "",
  category: string = "all"
) => {
  const where: Prisma.ShopItemWhereInput = {
    OR: [
      {
        name: {
          contains: query,
          mode: "insensitive",
        },
      },
      {
        id: Number(query),
      },
    ],
  };
  if (category !== "all") {
    where.categoryId = category;
  }
  return prisma.shopItem.findMany({
    where,
    orderBy: {
      created: "desc",
    },
    take: ITEMS_PER_PAGE,
    skip: (page - 1) * ITEMS_PER_PAGE,
  });
};

export const getShopItemsCount = async (
  page: number = 1,
  query: string = "",
  category: string = "all"
) => {
  const where: Prisma.ShopItemWhereInput = {
    OR: [
      {
        name: {
          contains: query,
          mode: "insensitive",
        },
      },
      {
        id: Number(query),
      },
    ],
  };
  if (category !== "all") {
    where.categoryId = category;
  }
  const totalItems = await prisma.shopItem.count({
    where,
  });
  return Math.ceil(totalItems / ITEMS_PER_PAGE);
};

"use server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export const getShopItems = async (
  category: string,
  sorting: string,
  query: string = "",
  currentPage: number = 1
) => {
  console.log(category, sorting, query, currentPage);
  const where: Prisma.ShopItemWhereInput = {};
  if (category !== "all") {
    where.categoryId = category;
  }

  if (query && query.length > 0) {
    where.OR = [
      {
        name: {
          contains: query,
          mode: "insensitive",
        },
      },
    ];
    if (!isNaN(Number(query))) {
      where.OR.push({
        id: Number(query),
      });
    }
  }

  console.log(where);
  return prisma.shopItem.findMany({ where });
};

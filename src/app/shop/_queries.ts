"use server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export const getShopItems = async (
  category: string,
  sorting: "popular" | "id_asc" | "id_desc" | "price_asc" | "price_desc",
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

  const orderBy: Prisma.ShopItemOrderByWithAggregationInput = {};
  switch (sorting) {
    case "price_asc":
      orderBy.price = "asc";
      break;
    case "price_desc":
      orderBy.price = "desc";
      break;
    case "id_asc":
      orderBy.id = "asc";
      break;
    case "id_desc":
      orderBy.id = "desc";
      break;

    case "popular":
    default:
      // TODO По умолчанию - по популярности
      orderBy.id = "desc";
  }

  console.log(where);
  return prisma.shopItem.findMany({ where, orderBy });
};

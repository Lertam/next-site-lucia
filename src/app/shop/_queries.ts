"use server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";

const ITEMS_PER_PAGE = 10;

export const getShopItems = async (
  category: string,
  sorting: "popular" | "id_asc" | "id_desc" | "price_asc" | "price_desc",
  query: string = "",
  currentPage: number = 1
) => {
  return prisma.shopItem.findMany({
    where: generateWhere(category, query),
    orderBy: generateOrderBy(sorting),
    take: ITEMS_PER_PAGE,
    skip: (currentPage - 1) * ITEMS_PER_PAGE,
  });
};

const generateWhere = (category: string, query: string) => {
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
  return where;
};

const generateOrderBy = (
  sorting: "popular" | "id_asc" | "id_desc" | "price_asc" | "price_desc"
): Prisma.ShopItemOrderByWithAggregationInput => {
  switch (sorting) {
    case "price_asc":
      return { price: "asc" };
    case "price_desc":
      return { price: "desc" };
    case "id_asc":
      return { id: "asc" };
    case "id_desc":
      return { id: "desc" };

    case "popular":
    default:
      // TODO По умолчанию - по популярности
      return { id: "desc" };
  }
};

export const getShopPages = async (category: string, query: string = "") => {
  const totalCount = await prisma.shopItem.count({
    where: generateWhere(category, query),
  });
  console.log(totalCount)
  return Math.ceil(totalCount / ITEMS_PER_PAGE);
};

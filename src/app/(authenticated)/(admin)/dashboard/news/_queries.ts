"use server";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

const ITEMS_PER_PAGE = 10;

export const getNewsList = async (page: number = 1, query?: string) => {
  const where: Prisma.NewsWhereInput = {};
  if (query && query.length > 0) {
    where.OR = [
      {
        title: {
          contains: query,
          mode: "insensitive",
        },
      },
      {
        content: {
          contains: query,
          mode: "insensitive",
        },
      },
    ];
  }
  return prisma.news.findMany({
    where,
    orderBy: {
      created: "desc",
    },
    take: ITEMS_PER_PAGE,
    skip: (page - 1) * ITEMS_PER_PAGE,
  });
};

export const getNewsCount = async (query?: string) => {
  const where: Prisma.NewsWhereInput = {};
  if (query && query.length > 0) {
    where.OR = [
      {
        title: {
          contains: query,
          mode: "insensitive",
        },
      },
      {
        content: {
          contains: query,
          mode: "insensitive",
        },
      },
    ];
  }
  const totalNews = await prisma.news.count({ where });
  return Math.ceil(totalNews / ITEMS_PER_PAGE);
};

export const getNewsItem = async (id: string) => {
  return prisma.news.findUnique({ where: { id }, include: { survey: true } });
};

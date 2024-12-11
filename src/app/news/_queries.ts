"use server";
import { prisma } from "@/lib/prisma";

export const getNewsList = async (page: number = 1, query: string = "") => {
  // TODO Проверка ролей
  // TODO Фильтровать по содержанию
  return prisma.news.findMany({
    where: {
      title: {
        contains: query,
      },
    },
    skip: (page - 1) * 9,
    take: 9,
    orderBy: {
      created: "desc",
    },
  });
};

export const getNewsTotalPages = async (query: string = "") => {
  // TODO Проверка ролей
  // TODO Фильтровать по содержанию
  const totalNews = await prisma.news.count({
    where: {
      title: {
        contains: query,
      },
    },
  });
  return Math.ceil(totalNews / 9);
};

"use server";
import { prisma } from "@/lib/prisma";

const ITEMS_PER_PAGE = 10;

export const getSurveys = async (page: number = 1, query: string = "") => {
  return prisma.survey.findMany({
    where: {
      text: { contains: query },
    },
    orderBy: {
      created: "desc",
    },
    include: {
      variants: {
        include: {
          votes: true,
        },
      },
    },
    take: ITEMS_PER_PAGE,
    skip: (page - 1) * ITEMS_PER_PAGE,
  });
};

export const getTotalSurveysPages = async (query: string = "") => {
  const surveysCount = await prisma.survey.count({
    where: {
      text: { contains: query },
    },
  });
  return Math.ceil(surveysCount / ITEMS_PER_PAGE);
};

export const getSurvey = async (id: string) => {
  return prisma.survey.findUnique({ where: { id } });
};
